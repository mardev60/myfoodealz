import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import express from 'express';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});