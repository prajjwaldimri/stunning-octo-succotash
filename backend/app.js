const express = require('express');
const cors = require('cors');
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
server.applyMiddleware({ app });
app.use(cors());

app.listen(3000, () => {
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
});
