const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(__dirname, '..', 'dist', reqPath === '/' ? 'index.html' : reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(5432, async () => {
  console.log('Static server started at http://localhost:5432');
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  
  const capture = (url, outFile, size = '1440,1200', isMobile = false) => new Promise((resolve) => {
    const mobileFlags = isMobile ? ' --user-agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1" --hide-scrollbars' : '';
    const cmd = '"' + edgePath + '" --headless=new --disable-gpu --screenshot="' + outFile + '" --window-size=' + size + mobileFlags + ' ' + url;
    exec(cmd, (err) => {
      if (err) console.error('Error on', url, err);
      else console.log('Captured:', outFile);
      resolve();
    });
  });

  const baseDir = path.join(__dirname, '..');
  await capture('http://localhost:5432/', path.join(baseDir, 'home-desktop.png'), '1440,1400', false);
  await capture('http://localhost:5432/', path.join(baseDir, 'home-mobile.png'), '390,920', true);
  await capture('http://localhost:5432/blog/second-person/', path.join(baseDir, 'article-mobile.png'), '390,920', true);
  
  server.close();
  console.log('All previews captured.');
});
