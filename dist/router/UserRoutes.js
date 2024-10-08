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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = require("express");
var passportConfig_1 = require("../utils/passportConfig");
var router = (0, express_1.Router)();
exports.userRouter = router;
router.use(function (req, res, next) {
    res.setHeader('X-Custom-Header', 'MyValue');
    res.setHeader('Access-Control-Allow-Origin', 'https://9000-idx-to-do-1725588050425.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
router.get("/", function (req, res) {
    if (!req.user)
        return res.status(401).send("Unauthorized");
    var payload = {
        name: req.user.name,
        last_name: req.user.last_name,
        avatar: req.user.avatar,
        email: req.user.email,
        created_at: req.user.created_at
    };
    return res.status(200).json(payload);
});
router.post("/register", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            passportConfig_1.mainPassport.authenticate("local_register", (function (err, user, _info) {
                console.log(err);
                // Handle local-register strategy errors.
                if (err) {
                    switch (err) {
                        case "email-in-use":
                            res.status(409).send("email-in-use");
                            break;
                        case "invalid-credentials":
                            res.status(400).send("invalid-credentials");
                            break;
                        case "internal-server-error":
                            res.status(500).send("Internal Server Error.");
                            break;
                        default:
                            res.status(500).send("Internal Server Error.");
                            break;
                    }
                }
                // Verify if the user has been successfully created.
                if (user) {
                    return res.status(201).send("success!");
                }
            }))(req, res, next);
            return [2 /*return*/];
        });
    });
});
router.post("/login", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        passportConfig_1.mainPassport.authenticate("local_login", function (err, user, _info) {
            if (err) {
                switch (err) {
                    case "user-not-found":
                        res.status(404).send("user-not-found");
                        break;
                    case "invalid-credentials":
                        res.status(400).send("invalid-credentials");
                        break;
                    default:
                        res.status(500).send("Internal Server Error.");
                        break;
                }
            }
            if (user) {
                console.log(user);
                return res.status(200).send("success_login!");
            }
        })(req, res, next);
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=UserRoutes.js.map