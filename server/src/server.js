import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema/schema.graphql';
import resolvers from './graphql/resolvers';

const typeDefs = [schema];

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
export { app as default };
