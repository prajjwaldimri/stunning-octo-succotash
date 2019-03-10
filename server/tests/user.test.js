/* eslint-disable func-names */
/* global it describe before */

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
    expect(response.data.username).to.equal(username);
  });
});
