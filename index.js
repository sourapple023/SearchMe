const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let data = [
    { id: 1, title: 'First Item', content: 'This is the first searchable item.' },
    { id: 2, title: 'Second Item', content: 'This is the second searchable item.' },
    // Add more items as needed
];

app.post('/search', (req, res) => {
    const query = req.body.query.toLowerCase();
    const results = data.filter(item => item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query));
    res.json(results);
});

app.get('/suggestions', (req, res) => {
    const query = req.query.q.toLowerCase();
    const suggestions = data
        .filter(item => item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query))
        .map(item => item.title);
    res.json(suggestions);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
