// server.js - Lightweight production Node server for Render / VPS
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.resolve(__dirname, 'dist');
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_PATH = path.resolve(DATA_DIR, 'contacts.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=UTF-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function readContacts() {
  if (!fs.existsSync(DB_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

function writeContacts(data) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;

  // CORS headers for API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  // API Endpoints
  if (pathname === '/api/contact' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { name, email, message } = JSON.parse(body || '{}');
        if (!email || !message) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Email and message are required' }));
        }

        const contacts = readContacts();
        const newEntry = {
          id: 'msg_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          name: (name || '').trim(),
          email: email.trim(),
          message: message.trim(),
          createdAt: new Date().toISOString(),
        };

        contacts.unshift(newEntry);
        writeContacts(contacts);

        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ success: true, contact: newEntry, total: contacts.length }));
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (pathname === '/api/contacts' && req.method === 'GET') {
    const contacts = readContacts();
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ success: true, contacts, count: contacts.length }));
  }

  if (pathname === '/api/contact' && req.method === 'DELETE') {
    const id = urlObj.searchParams.get('id');
    if (!id) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'ID is required' }));
    }
    let contacts = readContacts();
    contacts = contacts.filter(c => c.id !== id);
    writeContacts(contacts);
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ success: true, count: contacts.length }));
  }

  // Static File Serving
  const cleanPath = decodeURIComponent(pathname);
  let filePath = path.join(DIST_DIR, cleanPath === '/' ? 'index.html' : cleanPath);

  // If path doesn't exist directly, check if it's an SPA route or a missing static asset
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const hasExtension = path.extname(cleanPath) !== '';
    if (!hasExtension) {
      // SPA route fallback (e.g. /projects, /about)
      filePath = path.join(DIST_DIR, 'index.html');
    } else {
      // Missing static asset -> return 404 instead of corrupting image/css/js with index.html
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
      return res.end(`Asset not found: ${cleanPath}`);
    }
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      return res.end('Not found');
    }
    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Production server running on port ${PORT}`);
});
