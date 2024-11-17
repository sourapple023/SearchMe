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
