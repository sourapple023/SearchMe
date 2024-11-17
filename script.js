document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search-bar').value;
        if (query) {
            // Encode the query to make it URL-safe
            const encodedQuery = encodeURIComponent(query);
            // Open a new tab with the Google search results
            window.open(`https://www.google.com/search?q=${encodedQuery}`, '_blank');
        }
    });
});
