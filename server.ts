import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Database Setup
const db = new Database('store.db');
db.pragma('journal_mode = WAL');

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    discount INTEGER DEFAULT 0,
    category TEXT NOT NULL,
    image TEXT,
    stock INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    address TEXT NOT NULL,
    total_amount REAL NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    items TEXT NOT NULL, -- JSON string of items
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed initial data if empty
const productCount = db.prepare('SELECT count(*) as count FROM products').get() as { count: number };
if (productCount.count === 0) {
  const insert = db.prepare('INSERT INTO products (name, description, price, discount, category, image, stock) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const seedData = [
    ['Fast Charging 20W Mobile Charger', 'High speed Type-C charger.', 499, 10, 'Mobile Chargers', 'https://picsum.photos/seed/charger/300/300', 50],
    ['Braided USB-C Cable', 'Durable 1m nylon braided cable.', 299, 5, 'USB Cables', 'https://picsum.photos/seed/cable/300/300', 100],
    ['10000mAh Power Bank', 'Slim and portable power bank.', 1299, 15, 'Power Banks', 'https://picsum.photos/seed/powerbank/300/300', 30],
    ['Premium Hair Spray', 'Strong hold for all day style.', 350, 0, 'Hair Sprays', 'https://picsum.photos/seed/hairspray/300/300', 40],
    ['Smart LED Bulb', 'WiFi controlled RGB bulb.', 699, 20, 'Home Essentials', 'https://picsum.photos/seed/bulb/300/300', 60],
    ['Wireless Earbuds', 'Noise cancelling earbuds.', 1999, 25, 'Mobile Chargers', 'https://picsum.photos/seed/earbuds/300/300', 25]
  ];
  seedData.forEach(p => insert.run(...p));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // Get all products
  app.get('/api/products', (req, res) => {
    const stmt = db.prepare('SELECT * FROM products');
    const products = stmt.all();
    res.json(products);
  });

  // Add product
  app.post('/api/products', (req, res) => {
    const { name, description, price, discount, category, image, stock } = req.body;
    const stmt = db.prepare('INSERT INTO products (name, description, price, discount, category, image, stock) VALUES (?, ?, ?, ?, ?, ?, ?)');
    const info = stmt.run(name, description, price, discount, category, image, stock);
    res.json({ id: info.lastInsertRowid });
  });

  // Update product
  app.put('/api/products/:id', (req, res) => {
    const { name, description, price, discount, category, image, stock } = req.body;
    const { id } = req.params;
    const stmt = db.prepare('UPDATE products SET name = ?, description = ?, price = ?, discount = ?, category = ?, image = ?, stock = ? WHERE id = ?');
    stmt.run(name, description, price, discount, category, image, stock, id);
    res.json({ success: true });
  });

  // Delete product
  app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    stmt.run(id);
    res.json({ success: true });
  });

  // Create order
  app.post('/api/orders', (req, res) => {
    const { customer_name, customer_phone, address, total_amount, payment_method, items } = req.body;
    const stmt = db.prepare('INSERT INTO orders (customer_name, customer_phone, address, total_amount, payment_method, items) VALUES (?, ?, ?, ?, ?, ?)');
    const info = stmt.run(customer_name, customer_phone, address, total_amount, payment_method, JSON.stringify(items));
    res.json({ id: info.lastInsertRowid });
  });

  // Get orders
  app.get('/api/orders', (req, res) => {
    const stmt = db.prepare('SELECT * FROM orders ORDER BY created_at DESC');
    const orders = stmt.all();
    res.json(orders.map((o: any) => ({ ...o, items: JSON.parse(o.items) })));
  });

  // Get order by ID (for tracking)
  app.get('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare('SELECT id, status, created_at, total_amount FROM orders WHERE id = ?');
    const order = stmt.get(id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  });

  // Update order status
  app.put('/api/orders/:id/status', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    const stmt = db.prepare('UPDATE orders SET status = ? WHERE id = ?');
    stmt.run(status, id);
    res.json({ success: true });
  });


  // Dashboard Stats
  app.get('/api/admin/stats', (req, res) => {
    const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get() as { count: number };
    const totalSales = db.prepare('SELECT SUM(total_amount) as total FROM orders WHERE status != "cancelled"').get() as { total: number };
    const totalProducts = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
    const lowStock = db.prepare('SELECT COUNT(*) as count FROM products WHERE stock < 10').get() as { count: number };
    const recentOrders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5').all();

    res.json({
      totalOrders: totalOrders.count,
      totalSales: totalSales.total || 0,
      totalProducts: totalProducts.count,
      lowStock: lowStock.count,
      recentOrders: recentOrders.map((o: any) => ({ ...o, items: JSON.parse(o.items) }))
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
