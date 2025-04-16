const jokeTextElement = document.getElementById('joke-text');
const fetchJokeButton = document.getElementById('fetch-joke-btn');
const errorMessageElement = document.getElementById('error-message');

const apiUrl = 'https://icanhazdadjoke.com/';

function fetchJoke() {
    errorMessageElement.textContent = ''; // Clear previous errors
    jokeTextElement.textContent = 'Fetching joke...'; // Provide feedback
    fetchJokeButton.disabled = true; // Disable button during fetch

    // The icanhazdadjoke API requires a specific 'Accept' header to get JSON
    const options = {
        headers: {
            'Accept': 'application/json'
        }
    };

    fetch(apiUrl, options)
        .then(response => {
            // Check if the response was successful (status code 200-299)
            if (!response.ok) {
                // If not okay, create an error to be caught by .catch()
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the response body as JSON
            return response.json();
        })
        .then(data => {
            // Success! Update the paragraph with the fetched joke
            jokeTextElement.textContent = data.joke;
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error fetching joke:', error);
            jokeTextElement.textContent = 'Could not fetch joke. Please try again.';
            errorMessageElement.textContent = `Error: ${error.message}`;
        })
        .finally(() => {
             // This block runs whether the fetch succeeded or failed
             fetchJokeButton.disabled = false; // Re-enable button
        });
}

// Add event listener to the button
fetchJokeButton.addEventListener('click', fetchJoke);

// Optional: Fetch a joke when the page loads
// fetchJoke();