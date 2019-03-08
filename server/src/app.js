import schema from './graphql/schema/schema.graphql';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const consola = require('consola');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = [schema];

const resolvers = {
  Query: {
    hello: () => 'Hello World',
    user: () => ({ name: 'Test', email: 'test@test.com', username: 'testUsername' }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/public`));
  app.get(/.*/, (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
  });
}

app.listen(process.env.PORT || 3000, () => {
  consola.success(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
});
