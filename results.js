document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const progressIndicator = document.getElementById('progress-indicator');
    const resultsContainer = document.getElementById('search-results');

    if (query) {
        // Show progress indicator
        progressIndicator.style.display = 'inline-block';

        fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(results => {
            resultsContainer.innerHTML = results.map(item => `<div>${item.title}: ${item.content}</div>`).join('');

            // Hide progress indicator
            progressIndicator.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
            // Hide progress indicator
            progressIndicator.style.display = 'none';
            resultsContainer.innerHTML = '<p>There was an error retrieving the search results. Please try again later.</p>';
        });
    } else {
        resultsContainer.innerHTML = '<p>No query provided. Please go back and enter a search term.</p>';
    }
});
