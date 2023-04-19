import express from 'express'
import http from 'http'
import mongoose, { connection } from 'mongoose'
import { config } from './config/config';
import Logger from './library/Logger';
import userRoute from './routes/User';
import responseFormat from './middlewares/Response';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const router = express();

declare module 'express-session' {
    export interface SessionData {
        user: string;
    }
}

mongoose.connect(config.mongo.url)
    .then(() => {
        Logger.info('Connected to MongoDB')
        StartServer()
    })
    .catch((error) => {
        Logger.error(error.message)
    })

const StartServer = () => {
    router.use((req, res, next) => {
        Logger.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logger.info(`Outgoing <- Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });

    router.use(express.urlencoded({ extended: true }))
    router.use(express.json())

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == "PATCH") {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({})
        }

        next();
    })

    // const sessionStore = new MongoStore({
    //     mongooseConnection: connection,
    //     collection: 'sessions'
    // })

    router.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: config.mongo.url
        }),
        cookie: {
            maxAge: 1000 * 24 * 60 * 60
        }

    }));


    router.use('/user', userRoute);
    // router.use(responseFormat)


    router.get('/health', (req, res, next) => {
        req.session.user = 'satyam'
        req.session.save()
        console.log(req.session)
        res.status(200).json({ message: 'All good!!' })
    })

    router.use((req, res, next) => {
        const error = new Error('not found')
        return res.status(404).json({ message: error.message })
    })

    http.createServer(router).listen(config.server.port, () => Logger.info(`Server is running on port ${config.server.port}.`))
}

