import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import mongoose from 'mongoose';
import consola from 'consola';
import jsonwebtoken from 'jsonwebtoken';
import schema from './graphql/schema/schema.graphql';
import resolvers from './graphql/resolvers';

const typeDefs = [schema];

// Mongoose Initialization
let MONGODB_URI = process.env.MONGODB_URI_TEST;
switch (process.env.NODE_ENV) {
  case 'production':
    MONGODB_URI = process.env.MONGODB_URI_PROD;
    break;
  case 'test':
    MONGODB_URI = process.env.MONGODB_URI_TEST;
    break;
  default:
    MONGODB_URI = process.env.MONGODB_URI_DEV;
    break;
}

// Connecting to MongoDB Atlas instance
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
  })
  .then(() => {
    consola.ready({ message: 'Link established to database', badge: true });
  })
  .catch(() => {
    consola.fatal({ message: 'No link to database.', badge: true });
  });
mongoose.set('useCreateIndex', true);

const verifyJWT = async (req) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      return await jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
    } catch (e) {
      console.log(e);
      throw new AuthenticationError('Your sessions has expired.');
    }
  }
  return null;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const user = await verifyJWT(req);
    return { user };
  },
});

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
