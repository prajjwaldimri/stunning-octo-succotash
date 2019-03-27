/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
/* global it describe before beforeEach */

require('@babel/polyfill/noConflict');
require('@babel/polyfill');

import 'cross-fetch/polyfill';

import ApolloClient, { gql } from 'apollo-boost';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import app from '../src/server';

app.listen(1337, '127.0.0.1');

import User from '../src/models/user';

const { expect, assert } = require('chai');

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
});

let authenticatedClient;

const createdUser = { username: 'kaiskas', password: 'test1234', email: 'kaiskas@kaiskas.com' };
const createdUser2 = { username: 'kaiskas1', password: 'test12', email: 'xyz@gmail.com' };

describe('User Test', async function () {
  this.timeout(100000);
  let userToBeFollowed;

  before(async () => {
    await User.collection.drop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await User.create({
      username: createdUser.username,
      password: await bcrypt.hash(createdUser.password, 10),
      email: createdUser.email,
    });

    userToBeFollowed = await User.create({
      username: createdUser2.username,
      password: await bcrypt.hash(createdUser2.password, 10),
      email: createdUser2.email,
    });

    const login = gql`
        query {
          login(user: { username: "${createdUser.username}", password: "${createdUser.password}" })
        }
      `;

    const response = await client.query({ query: login });
    authenticatedClient = new ApolloClient({
      uri: 'http://localhost:1337/graphql',
      request: async (operation) => {
        operation.setContext({
          headers: {
            authorization: response.data.login,
          },
        });
      },
    });
  });

  it('Should create a user', async () => {
    const username = 'testUsername';
    const createAccount = gql`
      mutation {
        createAccount(user: { username: "${username}", password: "20081997" }){
          username
        }
      }
    `;
    const response = await client.mutate({ mutation: createAccount });
    expect(response.data.createAccount.username).to.equal(username);
    const user = await User.findOne({ username });
    expect(user).to.not.be.null;
  });

  it('Should not create a user(Invalid username)', async () => {
    const username = '>>?./$@_,,';
    const createAccount = gql`
      mutation {
        createAccount(user: { username: "${username}", password: "20081997" }){
          username
        }
      }
    `;
    const error = await client.mutate({ mutation: createAccount }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.lengthOf.above(0);
    const user = await User.findOne({ username });
    expect(user).to.be.null;
  });

  it('Should not create a user(Empty username)', async () => {
    const username = '    ';
    const createAccount = gql`
      mutation {
        createAccount(user: { username: "${username}", password: "20081997" }){
          username
        }
      }
    `;
    const error = await client.mutate({ mutation: createAccount }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.lengthOf.above(0);
    const user = await User.findOne({ username });
    expect(user).to.be.null;
  });

  it('Should not create a user(empty password)', async () => {
    const password = '   ';
    const createAccount = gql`
      mutation {
        createAccount(user: { username: "kaiskas", password:"${password}" }){
          username
        }
      }
    `;
    const error = await client.mutate({ mutation: createAccount }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.lengthOf.above(0);
    const user = await User.findOne({ username: 'kaiskass' });
    expect(user).to.be.null;
  });

  it('Should not create a user(User already exist)', async () => {
    const username = 'kaiskas';
    const createAccount = gql`
      mutation {
        createAccount(user: { username: "${username}", password: "password1234"}){
          username
        }
      }
    `;
    const error = await client.mutate({ mutation: createAccount }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.not.equal(username);
  });

  it('Should not login (Empty Username)', async () => {
    const username = '   ';
    const login = gql`
      query {
        login(user: { username: "${username}", password: "20081997" })
      }
    `;
    const error = await client.query({ query: login }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.lengthOf.above(0);
  });

  it('Should not login (Empty Password)', async () => {
    const password = '   ';
    const login = gql`
      query {
        login(user: { username: "kaiskas", password:"${password}" })
      }
    `;
    const error = await client.query({ query: login }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.lengthOf.above(0);
  });

  it('Should not log in (Invalid username)', async () => {
    const login = gql`
      query {
        login(user: { username: "ASD4$@#!$!", password: "20081997" })
      }
    `;
    const error = await client.query({ query: login }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.lengthOf.above(0);
  });

  it('Should not log in (Invalid password)', async () => {
    const login = gql`
      query {
        login(user: { username: "kaiskas", password: "20081997" })
      }
    `;
    const error = await client.query({ query: login }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.lengthOf.above(0);
  });

  it('Should login', async () => {
    const login = gql`
        query {
          login(user: { username: "${createdUser.username}", password: "${createdUser.password}" })
        }
      `;

    const response = await client.query({ query: login });
    expect(response.data.login).to.not.be.null;
  });

  it('Should return profile details', async () => {
    const profile = gql`
      query {
        profile {
          email
          username
        }
      }
    `;
    const response = await authenticatedClient.query({ query: profile });
    expect(response.data.profile.email).to.be.equal(createdUser.email);
  });

  it('Should not return profile details (Not Authenticated)', async () => {
    const profile = gql`
      query {
        profile {
          email
        }
      }
    `;
    const error = await client.query({ query: profile }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.length.of.above(0);
  });

  it('Should follow', async () => {
    const followUser = gql`
      mutation{
        followUser( id: "${userToBeFollowed.id}"){
          username
        }
      }
   `;
    const response = await authenticatedClient.mutate({ mutation: followUser });
    const oneWhoFollows = await User.findOne({
      username: response.data.followUser.username,
      following: { $elemMatch: { $eq: userToBeFollowed.id } },
    });
    expect(oneWhoFollows).to.be.not.null;
  });

  it('Should not follow (Not Authenticated)', async () => {
    const followUser = gql`
      mutation {
        followUser(id: "${userToBeFollowed.id}") {
          username
        }
      }
    `;
    const error = await client.mutate({ mutation: followUser }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.lengthOf.above(0);
  });

  it('Should not follow (Empty user id)', async () => {
    const followUser = gql`
      mutation {
        followUser(id: "        ") {
          username
        }
      }
    `;
    const error = await authenticatedClient
      .mutate({ mutation: followUser })
      .then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.length.above(0);
  });

  it('Should not follow (Wrong user id)', async () => {
    const followUser = gql`
      mutation {
        followUser(id: "${mongoose.Types.ObjectId()}") {
          username
        }
      }
    `;
    const error = await authenticatedClient
      .mutate({ mutation: followUser })
      .then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.length.above(0);
  });

  it('Should not refollow a user (Duplicate follow mutation)', async () => {});

  it('Should unfollow', async () => {
    const unfollowUser = gql`
      mutation {
        unfollowUser(id: "${userToBeFollowed.id}") {
          username
        }
      }
    `;
    const response = await authenticatedClient.mutate({ mutation: unfollowUser });
    const oneWhoFollows = await User.findOne({
      username: response.data.unfollowUser.username,
      following: { $elemMatch: { $eq: userToBeFollowed.id } },
    });
    expect(oneWhoFollows).to.be.null;
  });

  it('Should not unfollow(Not Authenticated)', async () => {
    const unfollowUser = gql`
      mutation {
        unfollowUser(id: "${userToBeFollowed.id}") {
          username
        }
      }
    `;

    const error = await client.mutate({ mutation: unfollowUser }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.lengthOf.above(0);
  });

  it('Should not reunfollow a user (Duplicate unfollow mutation)', async () => {});

  it('Should get following of user', async () => {
    const followUser = gql`
        mutation{
          followUser( id: "${userToBeFollowed.id}"){
            username
          }
        }
     `;
    await authenticatedClient.mutate({ mutation: followUser });

    const getFollowingOfUser = gql`
      query {
        getFollowingOfUser {
          username
        }
      }
    `;

    const response = await authenticatedClient.query({ query: getFollowingOfUser });
    expect(response.data.getFollowingOfUser).to.not.be.null;
  });

  it('should not get followings of user (Not logged in)', async () => {
    const followUser = gql`
        mutation{
          followUser( id: "${userToBeFollowed.id}"){
            username
          }
        }
     `;
    await authenticatedClient.mutate({ mutation: followUser });

    const getFollowingOfUser = gql`
      query {
        getFollowingOfUser {
          username
        }
      }
    `;

    const error = await client.query({ query: getFollowingOfUser }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.lengthOf.above(0);
  });

  it('should get followers of user', async () => {});

  it('should not get followers of user (Not logged in)', async () => {});
});
