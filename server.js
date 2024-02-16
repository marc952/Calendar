const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// Use JSON parsing middleware
app.use(bodyParser.json());

// Create or open the SQLite database
const db = new sqlite3.Database("calendar.db");

// Define your database schema and tables here
// Create users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

// Create events table
db.run(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date DATE NOT NULL
  )
`);

// Create an event
app.post("/events", (req, res) => {
  const { title, date } = req.body;
  // Insert the event data into the database
  db.run("INSERT INTO events (title, date) VALUES (?, ?)", [title, date], (err) => {
    if (err) {
      return res.status(500).json({ error: "Error creating the event" });
    }
    return res.status(201).json({ message: "Event created successfully" });
  });
});

// Retrieve events
app.get("/events", (req, res) => {
  // Fetch events from the database
  db.all("SELECT * FROM events", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching events" });
    }
    return res.status(200).json(rows);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});