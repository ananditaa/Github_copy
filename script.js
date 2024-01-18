const API_BASE_URL = 'https://api.github.com';

function fetchRepositories(username, page = 1, perPage = 10) {
  const url = `${API_BASE_URL}/users/${username}/repos?page=${page}&per_page=${perPage}`;

  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching repositories:', error);
      throw error;
    });
}

function displayRepositories(repositories) {
  const repositoriesContainer = document.getElementById('repositories');
  repositoriesContainer.innerHTML = '';

  repositories.forEach(repo => {
    const repoElement = document.createElement('div');
    repoElement.innerHTML = `<h3>${repo.name}</h3>
                             <p>${repo.description || 'No description available'}</p>
                             <p>Language: ${repo.language || 'N/A'}</p>`;
    
    repositoriesContainer.appendChild(repoElement);
  });
}

function fetchAndDisplayRepositories() {
  const username = document.getElementById('username').value;
  if (username) {
    fetchRepositories(username)
      .then(data => {
        const repositories = data || [];
        displayRepositories(repositories);
      })
      .catch(error => console.error('Error:', error));
  } else {
    alert('Please enter a GitHub username');
  }
}

// Add an event listener for the Search button
document.getElementById('searchBtn').addEventListener('click', fetchAndDisplayRepositories);

// Initial load
fetchAndDisplayRepositories();
