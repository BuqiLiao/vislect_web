const dotenv = require('dotenv');
const app = require('./app');
const http = require('http');
const https = require('https');
const fs = require('fs');
const os = require('os');


switch (process.env.NODE_ENV) {
  case 'production':
    dotenv.config({ path: '.env.production' });
    break;
  case 'development':
    dotenv.config({ path: '.env.development' });
    break;
  default:
    console.error('NODE_ENV is not set! Using default .env file.');
    dotenv.config();
}
function getLocalIPv4() {
    const interfaces = os.networkInterfaces();
    for (const name in interfaces) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}
const localIP = getLocalIPv4();


const HTTP_PORT = normalizePort(process.env.HTTP_PORT || 80);
const HTTPS_PORT = normalizePort(process.env.HTTPS_PORT || 443);
const HTTPS_KEY_PATH = process.env.HTTPS_KEY_PATH;
const HTTPS_CERT_PATH = process.env.HTTPS_CERT_PATH;
const SERVER_USER = process.env.SERVER_USER;

app.set('port', HTTPS_PORT);

const options = {
  key: fs.readFileSync(HTTPS_KEY_PATH),
  cert: fs.readFileSync(HTTPS_CERT_PATH)
};

const server = https.createServer(options, app);

server.listen(HTTPS_PORT);
server.on('error', (error) => onError(error, HTTPS_PORT));
server.on('listening', () => {
  console.log(`HTTPS Server running on https://${localIP}:${HTTPS_PORT}`);
});

const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
});

httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP Server running on http://${localIP}:${HTTP_PORT}`);
});
httpServer.on('error', (error) => onError(error, HTTP_PORT));


function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

function onError(error, port) {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

if (process.platform !== 'win32') {
  try {
      process.setuid(SERVER_USER);
  } catch (err) {
      console.error(`Failed to change user ID: ${err}`);
  }
} else {
  console.log('setuid method not available on Windows');
}
