document.getElementById('search-bar').addEventListener('input', function() {
    const query = this.value;
    const clearButton = document.getElementById('clear-button');

    if (query.length > 0) {
        clearButton.style.display = 'inline';
    } else {
        clearButton.style.display = 'none';
    }

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

document.getElementById('clear-button').addEventListener('click', function() {
    document.getElementById('search-bar').value = '';
    document.getElementById('clear-button').style.display = 'none';
    document.getElementById('suggestions-container').innerHTML = '';
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
