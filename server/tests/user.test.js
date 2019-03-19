/* eslint-disable func-names */
/* global it describe before */

require('@babel/polyfill/noConflict');
require('@babel/polyfill');

import 'cross-fetch/polyfill';

import ApolloClient, { gql } from 'apollo-boost';
import bcrypt from 'bcrypt';
import app from '../src/server';

app.listen(1337, '127.0.0.1');

import User from '../src/models/user';

const { expect, assert } = require('chai');

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
});

const createdUser = { username: 'kaiskas', password: 'test1234' };

describe('User Test', async function () {
  this.timeout(10000);

  before(async () => {
    await User.deleteMany({});
    await User.create({
      username: createdUser.username,
      password: await bcrypt.hash(createdUser.password, 10),
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
    // eslint-disable-next-line no-unused-expressions
    expect(response.data.login).to.not.be.null;
  });
});
