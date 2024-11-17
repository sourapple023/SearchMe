document.getElementById('search-bar').addEventListener('input', function() {
    const query = this.value;

    if (query.length > 1) { // Fetch suggestions for queries longer than 1 character
        fetch(`/suggestions?q=${query}`)
            .then(response => response.json())
            .then(suggestions => {
                const suggestionsContainer = document.getElementById('suggestions-container');
                suggestionsContainer.innerHTML = suggestions.map(suggestion => `<div class="suggestion">${suggestion}</div>`).join('');
            })
            .catch(error => console.error('Error fetching suggestions:', error));
    } else {
        document.getElementById('suggestions-container').innerHTML = '';
    }
});

document.getElementById('suggestions-container').addEventListener('click', function(event) {
    if (event.target.classList.contains('suggestion')) {
        document.getElementById('search-bar').value = event.target.textContent;
        document.getElementById('suggestions-container').innerHTML = '';
    }
});

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-bar').value;

    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    })
    .then(response => response.json())
    .then(results => {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = results.map(item => `<div>${item.title}: ${item.content}</div>`).join('');
    })
    .catch(error => console.error('Error fetching search results:', error));
});

document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    let icon = document.getElementById('dark-mode-icon');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        icon.classList.replace('fa-moon', 'fa-sun');
    }
});
