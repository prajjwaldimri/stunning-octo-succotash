/* eslint-disable func-names */
/* global it describe */

require('@babel/polyfill/noConflict');
require('@babel/polyfill');

import 'cross-fetch/polyfill';

import ApolloClient, { gql } from 'apollo-boost';
import app from '../src/server';

app.listen(1337, '127.0.0.1');

const { expect, assert } = require('chai');

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
});

describe('User Test', async function () {
  this.timeout(10000);

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
        createAccount(user: { username: "kaiskas", password: "${password}" }){
          username
        }
      }
    `;
    const error = await client.mutate({ mutation: createAccount }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.lengthOf.above(0);
  });

  it('Should not login (Empty Username)', async () => {
    const username = '   ';
    const login = gql`
      mutation {
        login(user: { username: "${username}", password: "20081997" }){
          username
        }
      }
    `;
    const error = await client.mutate({ mutation: login }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.lengthOf.above(0);
  });

  it('Should not login (Empty Password)', async () => {
    const password = '   ';
    const login = gql`
      mutation {
        login(user: { username: "kaiskas", password:"${password}" }){
          username
        }
      }
    `;
    const error = await client.mutate({ mutation: login }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.lengthOf.above(0);
  });
  it('Shoud not log in ( Invalid username and Password)', async () => {
    const createAccount = gql`
      
      }
    `;
    const error = await client.mutate({ mutation: createAccount }).then(assert.fail, err => err);
    expect(error.graphQLErrors).to.have.lengthOf.above(0);
  });
});