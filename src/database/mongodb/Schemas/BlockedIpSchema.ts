import {Schema, model} from "mongoose";

interface IBlockedIp {
    ip: string,
    duration: number,
    created_at: Date,
    verifyIpBlock: (ip: string) => boolean
}

const BlockedIp = new Schema({
    ip: {type: String, required: true, unique: true},
    duration: {type: Number, required: true, default: Date.now()+15*60*1000},
    created_at: {type: Date, default: Date.now()}
});

BlockedIp.methods.verifyIpBlock = function(ip: string): boolean {
    const actual_date = Date.now();
    const ipb_duration = this.duration;
    // Ip has meet the ban duration. Remove it from the database.
    if(actual_date > ipb_duration) {
        return true;
    }
    return false;
}

export const BlockIpSchema = model("Blocked_Ips", BlockedIp);

