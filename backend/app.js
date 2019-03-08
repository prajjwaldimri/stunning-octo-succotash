const express = require('express');
const cors = require('cors');
const consola = require('consola');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(cors());
server.applyMiddleware({ app });

app.listen(3000, () => {
  consola.success(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
});
