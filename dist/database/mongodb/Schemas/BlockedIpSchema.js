"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockIpSchema = void 0;
var mongoose_1 = require("mongoose");
var BlockedIp = new mongoose_1.Schema({
    ip: { type: String, required: true, unique: true },
    duration: { type: Number, required: true, default: Date.now() + 15 * 60 * 1000 },
    created_at: { type: Date, default: Date.now() }
});
BlockedIp.methods.verifyIpBlock = function (ip) {
    var actual_date = Date.now();
    var ipb_duration = this.duration;
    // Ip has meet the ban duration. Remove it from the database.
    if (actual_date > ipb_duration) {
        return true;
    }
    return false;
};
exports.BlockIpSchema = (0, mongoose_1.model)("Blocked_Ips", BlockedIp);
//# sourceMappingURL=BlockedIpSchema.js.map