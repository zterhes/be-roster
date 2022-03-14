import { google } from "googleapis";

require('dotenv').config();

const driveConfigService = ()=>{
   return new google.auth.GoogleAuth({
        keyFile:process.env.KEYFILE_PATH,
        scopes:process.env.SCOPES
    })
}

export default driveConfigService