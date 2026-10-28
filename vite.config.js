import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

function contactApiPlugin() {
  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      const dataDir = path.resolve(process.cwd(), 'data');
      const dbPath = path.resolve(dataDir, 'contacts.json');

      const readContacts = () => {
        if (!fs.existsSync(dbPath)) return [];
        try {
          return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        } catch {
          return [];
        }
      };

      const writeContacts = (data) => {
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
      };

      server.middlewares.use(async (req, res, next) => {
        const url = req.url.split('?')[0];

        // POST /api/contact - save new submission
        if (url === '/api/contact' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { name, email, message } = JSON.parse(body || '{}');
              if (!email || !message) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(
                  JSON.stringify({ error: 'Email and message are required' })
                );
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
              return res.end(
                JSON.stringify({ success: true, contact: newEntry, total: contacts.length })
              );
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // GET /api/contacts - retrieve all submissions
        if (url === '/api/contacts' && req.method === 'GET') {
          const contacts = readContacts();
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, contacts, count: contacts.length }));
        }

        // DELETE /api/contacts - delete single submission by query id
        if (url === '/api/contact' && req.method === 'DELETE') {
          const queryId = new URL(req.url, 'http://localhost').searchParams.get('id');
          if (!queryId) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'ID is required' }));
          }
          let contacts = readContacts();
          contacts = contacts.filter((c) => c.id !== queryId);
          writeContacts(contacts);
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ success: true, count: contacts.length }));
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), contactApiPlugin()],
});
