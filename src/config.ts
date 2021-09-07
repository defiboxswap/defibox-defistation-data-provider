require("dotenv").config();
import signale from "signale";

// REQUIRED configurations
if (!process.env.DEFISTATION_API_CLIENT_ID) throw new Error("process.env.DEFISTATION_API_CLIENT_ID is required");
if (!process.env.DEFISTATION_API_CLIENT_SECRET) throw new Error("process.env.DEFISTATION_API_CLIENT_SECRET is required");
export const DEFISTATION_API_CLIENT_ID = process.env.DEFISTATION_API_CLIENT_ID;
export const DEFISTATION_API_CLIENT_SECRET = process.env.DEFISTATION_API_CLIENT_SECRET;
export const AUTHORIZATION_BASIC = Buffer.from(DEFISTATION_API_CLIENT_ID + ":" + DEFISTATION_API_CLIENT_SECRET).toString('base64');

if (DEFISTATION_API_CLIENT_ID.match(/[<>]/)) throw new Error("process.env.DEFISTATION_API_CLIENT_ID is invalid");
if (DEFISTATION_API_CLIENT_SECRET.match(/[<>]/)) throw new Error("process.env.DEFISTATION_API_CLIENT_SECRET is invalid");

// OPTIONAL configurations
export const DEFISTATION_API_TVL_URL = process.env.DEFISTATION_API_TVL_URL || "https://api.defistation.io/dataProvider/tvl"

signale.success("config");