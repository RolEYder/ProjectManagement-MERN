import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import  compression  from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';
import userRoutes from './routes/user.routers';
import userAuth from './routes/auth.routes';
import devBunble from './devBundle';
import path from 'path';

const app = express();
devBunble.complite(app);

const DIR = process.cwd();
app.use('/dist', express.static(path.join(DIR, 'dist')));




app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        res.status(401).json({
            error: `${err.name}`
        })
    }
})
//Routers
app.use('/', userRoutes)
app.use('/', userAuth)
app.get('/', (req, res) => {
    res.status(200).send(Template())
})

export default app;
