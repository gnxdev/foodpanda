// ipWhitelistChecker.js

const allowedIPs = [
  '3.0.217.166',
  '3.1.134.42',
  '3.1.56.76',
  '192.168.7.85',
  '192.168.7.93',
  '192.168.7.83',
  '::1'
];

function ipWhitelistChecker(req, res, next) {
  let clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // If there are multiple IPs in the header, take the first one
  if (clientIP.includes(',')) {
    clientIP = clientIP.split(',')[0].trim();
  }

  console.info(`Request from IP: ${clientIP}`);

  if (!allowedIPs.includes(clientIP)) {
    console.error(`Blocked request from unauthorized IP: ${clientIP}`);
    return res.status(403).send(`403 Forbidden: You are not allowed to access this resource. [${clientIP}]`);
  }

  next(); // Allow request to continue
}

export default ipWhitelistChecker;
