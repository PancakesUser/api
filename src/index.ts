import dotenv from "dotenv";
import express from 'express';
import cors from "cors";
import session from "express-session";
import morgan from "morgan";
dotenv.config();
const mongoStore = require("connect-mongodb-session")(session);
// Passport Config
import { mainPassport } from "./utils/passportConfig";
// MongoDB Connection
import "./database/mongodb/connect";
import { mainRouter } from "./router/router";

const app = express();
var session_storage = new mongoStore({
  uri: process.env.MONGOURI,
  collection: 'sessions',
  databaseName: "panchito_seven",
  expires: 24 * 60 * 60 * 1000
}, function (error) {
  console.error(error);
});

session_storage.on('error', function(error) {
  console.log(error);
});

// Middleware
app.use(cors({
  origin: "https://9000-idx-to-do-1725588050425.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization",
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan("dev"));
app.options('*', cors());
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24*60*60*1000,
    sameSite: "lax"
  },
  store: session_storage
}));
app.use(mainPassport.initialize());
app.use(mainPassport.session());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://9000-idx-to-do-1725588050425.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev');
  next();
});


// Routes
app.use("/api", mainRouter);



const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
