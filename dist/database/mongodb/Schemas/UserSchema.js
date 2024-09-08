"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
var mongoose_1 = require("mongoose");
var User = new mongoose_1.Schema({
    name: { type: String, required: true, minLength: 1, maxLength: 252 },
    last_name: { type: String, required: true, minLength: 1, maxLength: 252 },
    avatar: { type: String, required: false, default: null },
    email: { type: String, required: true, unique: true, minLength: 5, maxLength: 254 },
    password: { type: String, required: true, minLength: 8, maxLength: 24 },
    created_at: { type: Date, required: true, default: Date.now }
});
User.methods.verifyPassword = function (account_password, provided_password) {
    return account_password === provided_password;
};
exports.UserSchema = (0, mongoose_1.model)("User", User);
//# sourceMappingURL=UserSchema.js.map