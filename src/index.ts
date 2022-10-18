import express, { Request, Response } from 'express';
import errorMware from './middlleware/error.middleware';
import routes from './routes/index';
import config from './config';
import helmet from 'helmet';

//console.log("PORT: "+ config.port)

const app = express();

//middleware for parsing incoming request
app.use(express.json());

//HTTP security middleware
app.use(helmet());

//Middleware for handling errors
app.use(errorMware);

const PORT = config.port || 3000;
app.use('/store', routes);


app.get('/store', (_req, res) => {
  res.json({
    message: 'Welcome To my storefront Back Api',
  });
});

app.use((_req: Request, res: Response) => {
  res
    .status(404)
    .send('PAGE NOT FOUND, PLEASE READ THE README FILE AND TRY AGAIN');
});


app.listen(PORT, () => {
  console.log(`server is started at port ${PORT}`);
});
export default app;
