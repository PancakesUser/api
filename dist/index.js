"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var express_session_1 = __importDefault(require("express-session"));
var morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
var mongoStore = require("connect-mongodb-session")(express_session_1.default);
// Passport Config
var passportConfig_1 = require("./utils/passportConfig");
// MongoDB Connection
require("./database/mongodb/connect");
var router_1 = require("./router/router");
var app = (0, express_1.default)();
var session_storage = new mongoStore({
    uri: process.env.MONGOURI,
    collection: 'sessions',
    databaseName: "panchito_seven",
    expires: 24 * 60 * 60 * 1000
}, function (error) {
    console.error(error);
});
session_storage.on('error', function (error) {
    console.log(error);
});
// Middleware
app.use((0, cors_1.default)({
    origin: "https://9000-idx-to-do-1725588050425.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.options('*', (0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "lax"
    },
    store: session_storage
}));
app.use(passportConfig_1.mainPassport.initialize());
app.use(passportConfig_1.mainPassport.session());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://9000-idx-to-do-1725588050425.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev');
    next();
});
// Routes
app.use("/api", router_1.mainRouter);
var port = parseInt(process.env.PORT || '3000');
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
//# sourceMappingURL=index.js.map