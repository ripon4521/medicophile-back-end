"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceInfo = void 0;
// Middleware to get device info from request headers
const getDeviceInfo = (req) => {
    var _a;
    // Get IP address from x-forwarded-for or remoteAddress
    const ipAddress = ((_a = req.headers["x-forwarded-for"]) === null || _a === void 0 ? void 0 : _a.split(",")[0]) ||
        req.socket.remoteAddress ||
        "";
    // Get device type, falling back to "unknown" if not found
    let deviceType = req.headers["sec-ch-ua-platform"] || "unknown";
    // If deviceType is "unknown", try detecting from user-agent
    if (deviceType === "unknown") {
        const userAgent = req.headers["user-agent"] || "";
        if (/mobile/i.test(userAgent)) {
            deviceType = "mobile";
        }
        else if (/tablet/i.test(userAgent)) {
            deviceType = "tablet";
        }
        else {
            deviceType = "desktop";
        }
    }
    // Get device name from user-agent (or fallback to "unknown")
    const deviceName = req.headers["user-agent"] || "unknown";
    return {
        ipAddress,
        deviceType,
        deviceName,
    };
};
exports.getDeviceInfo = getDeviceInfo;
