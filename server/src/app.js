import 'dotenv/config';
import consola from 'consola';
import app from './server';

app.listen(process.env.PORT || 3000, () => {
  consola.success('🚀 Server ready at http://localhost:3000/graphql');
});
