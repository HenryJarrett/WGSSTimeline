// Backend: Node.js with Express and MySQL
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'thurston67',
    database: 'feminism'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.get('/events', (req, res) => {
    db.query("SELECT id, name, description, DATE_FORMAT(date, '%m/%d/%Y') as formatted_date, link1, linkdesc1, link2, linkdesc2, link3, linkdesc3, image_url FROM events ORDER BY date ASC", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/events', (req, res) => {
    const { title, description, date, link1, link1_desc, link2, link2_desc, link3, link3_desc, image } = req.body;
    const sql = "INSERT INTO events (name, description, date, link1, link1_desc, image_url) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [title, description, date, link1, link1_desc, link2, link2_desc, link3, link3_desc, image], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, message: "Event added successfully!" });
    });
});

app.put('/events/:id', (req, res) => {
    const { title, description, date, link1, link1_desc, image_url } = req.body;
    const sql = "UPDATE events SET name=?, description=?, date=?, link1=?, link1_desc=?, image_url=? WHERE id=?";
    
    db.query(sql, [title, description, date, link1, link1_desc, image_url, req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Event updated successfully!" });
    });
});

app.delete('/events/:id', (req, res) => {
    const sql = "DELETE FROM events WHERE id=?";

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Event deleted successfully!" });
    });
});



app.listen(3000, () => console.log('Server running on port 3000'));

