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

app.listen(3000, () => console.log('Server running on port 3000'));

