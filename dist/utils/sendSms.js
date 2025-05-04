"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = void 0;
const http_1 = __importDefault(require("http"));
const querystring_1 = __importDefault(require("querystring"));
const sendSMS = (to, message) => {
  return new Promise((resolve, reject) => {
    const postData = querystring_1.default.stringify({
      token: "12191181439174541047949ff22c131db41feda8f24e4a5dcca10",
      to: to,
      message: message,
    });
    const options = {
      hostname: "api.bdbulksms.net",
      path: "/api.php",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData),
      },
    };
    const req = http_1.default.request(options, (res) => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          resolve(body);
        } catch (error) {
          reject(error);
        }
      });
    });
    req.on("error", (e) => {
      reject(e);
    });
    req.write(postData);
    req.end();
  });
};
exports.sendSMS = sendSMS;
