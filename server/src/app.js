import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import consola from 'consola';
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

app.listen(process.env.PORT || 3000, () => {
  consola.success(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);
});
