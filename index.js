import express from 'express'
import db from './database/db.js';
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});


const port = 3030

app.get('/', (req, res) => {
  res.send('Hello Math Score Histoire!')
})

app.get('/score-history', (req, res) => {
    const scoreList = db.prepare('SELECT * FROM history').all();
    scoreList.sort((a, b) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        return b.score - a.score;
    });
    res.json(scoreList)
})

app.post('/register-score', (req,res) => {
    const { name, score } = req.body;
    try {
        const now = new Date().toISOString();
        const stmt = db.prepare('INSERT INTO history (name, score, timestamp) VALUES (?, ?, ?)');
        const info = stmt.run(name, score, now);
        res.json({ res: 0, id: info.lastInsertRowid, name: name, score: score });
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
