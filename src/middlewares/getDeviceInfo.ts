import { Request } from "express";

// Middleware to get device info from request headers
export const getDeviceInfo = (req: any) => {
  // Get IP address from x-forwarded-for or remoteAddress
  const ipAddress =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    req.socket.remoteAddress ||
    "";

  // Get device type, falling back to "unknown" if not found
  let deviceType = req.headers["sec-ch-ua-platform"] || "unknown";

  // If deviceType is "unknown", try detecting from user-agent
  if (deviceType === "unknown") {
    const userAgent = req.headers["user-agent"] || "";
    if (/mobile/i.test(userAgent)) {
      deviceType = "mobile";
    } else if (/tablet/i.test(userAgent)) {
      deviceType = "tablet";
    } else {
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
