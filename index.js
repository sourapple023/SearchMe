const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let data = [
    { id: 1, title: 'First Item', content: 'This is the first searchable item.', tags: ['example', 'first'] },
    { id: 2, title: 'Second Item', content: 'This is the second searchable item.', tags: ['example', 'second'] },
    // Add more items as needed
];

// Helper function to calculate relevance score
function calculateRelevance(item, query) {
    let score = 0;
    const words = query.split(' ');

    // Increase score based on matches in title, content, and tags
    words.forEach(word => {
        if (item.title.toLowerCase().includes(word)) score += 3; // Higher weight for title matches
        if (item.content.toLowerCase().includes(word)) score += 1;
        if (item.tags.some(tag => tag.toLowerCase().includes(word))) score += 2;
    });

    return score;
}

app.post('/search', (req, res) => {
    const query = req.body.query.toLowerCase();
    console.log(`Received search query: ${query}`);

    const results = data
        .map(item => ({ ...item, score: calculateRelevance(item, query) })) // Calculate relevance score for each item
        .filter(item => item.score > 0) // Filter out items with zero score
        .sort((a, b) => b.score - a.score); // Sort by score in descending order

    console.log(`Search results: ${JSON.stringify(results)}`);
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
