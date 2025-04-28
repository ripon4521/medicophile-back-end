import http from 'http';
import querystring from 'querystring';

export const sendSMS = (to: string, message: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({
      token: '12191181439174541047949ff22c131db41feda8f24e4a5dcca10', 
      to: to,
      message: message,
    });

    const options = {
      hostname: 'api.bdbulksms.net',
      path: '/api.php',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = http.request(options, (res) => {
      res.setEncoding('utf8');
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          resolve(body);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
};
