"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainPassport = void 0;
var passport_1 = __importDefault(require("passport"));
exports.mainPassport = passport_1.default;
var passport_local_1 = __importDefault(require("passport-local"));
// Schemas
var UserSchema_1 = require("../database/mongodb/Schemas/UserSchema");
// LOCAL STRATEGY
var local_register = new passport_local_1.default.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, function (req, email, password, done) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_1, last_name, avatar, user, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, name_1 = _a.name, last_name = _a.last_name, avatar = _a.avatar;
                    return [4 /*yield*/, UserSchema_1.UserSchema.findOne({ email: email }).exec()];
                case 1:
                    user = _b.sent();
                    if (user)
                        return [2 /*return*/, done("email-in-use", false)];
                    if (!name_1 || !last_name || !email || !password)
                        return [2 /*return*/, done("invalid_credentials", false)];
                    // Create a new user.
                    return [4 /*yield*/, new UserSchema_1.UserSchema({
                            name: name_1,
                            last_name: last_name,
                            avatar: avatar,
                            email: email,
                            password: password,
                            created_at: Date.now()
                        }).save()];
                case 2:
                    // Create a new user.
                    _b.sent();
                    return [2 /*return*/, done(null, true, { message: "success" })];
                case 3:
                    error_1 = _b.sent();
                    console.error("Something went wrong while trying to register user:", error_1);
                    return [2 /*return*/, done("internal-server-error", false)];
                case 4: return [2 /*return*/];
            }
        });
    });
});
var local_login = new passport_local_1.default.Strategy({
    usernameField: "email",
    passwordField: "password",
}, function (email, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user, passwordVerify, payload, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!email || !password)
                    return [2 /*return*/, done("invalid-credentials", false)];
                return [4 /*yield*/, UserSchema_1.UserSchema.findOne({ email: email }).exec()];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, done("user-not-found", false)];
                passwordVerify = user.verifyPassword(user.password, password);
                if (!passwordVerify)
                    return [2 /*return*/, done("invalid-credentials", false)];
                payload = {
                    name: user.name,
                    last_name: user.last_name,
                    avatar: user.avatar,
                    email: user.email,
                    password: user.password,
                    created_at: user.created_at
                };
                return [2 /*return*/, done(null, payload)];
            case 2:
                error_2 = _a.sent();
                console.error("Something went wrong while logIn an user: ", error_2);
                return [2 /*return*/, done("internal-server-error", false)];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Register the local-register strategy.
passport_1.default.use("local_register", local_register);
// Register the local-login strategy.
passport_1.default.use("local_login", local_login);
// Serialization and deserialization
passport_1.default.serializeUser(function (req, user, done) {
    return done(null, user._id);
});
passport_1.default.deserializeUser(function (err, user_id, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserSchema_1.UserSchema.findById(user_id).exec()];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, done("user_not_found", false)];
                return [2 /*return*/, done(null, user)];
        }
    });
}); });
//# sourceMappingURL=passportConfig.js.map