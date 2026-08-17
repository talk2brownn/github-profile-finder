import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function searchProfile() {
    if (username === '') {
      setError('Please enter a GitHub username!');
      return;
    }
    setLoading(true);
    setError('');
    setProfile(null);
    setRepos([]);

    try {
      const profileRes = await fetch(`https://api.github.com/users/${username}`);
      const profileData = await profileRes.json();

      if (profileData.message === 'Not Found') {
        setError('User not found!');
        setLoading(false);
        return;
      }

      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`);
      const reposData = await reposRes.json();

      setProfile(profileData);
      setRepos(reposData);
    } catch (err) {
      setError('Something went wrong!');
    }
    setLoading(false);
  }

 function getMatrixColumns() {
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01';
  return Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      className="matrix-column"
      style={{
        left: `${(i / 15) * 100}%`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
        fontSize: `${Math.random() * 8 + 10}px`,
      }}
    >
      {Array.from({ length: 20 }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      ).join('')}
    </div>
  ));
}
  return (
    <div className="app">
      <div className="matrix-container">
        {getMatrixColumns()}
      </div>
      
      <div className="header">
        <h1>👨‍💻 GitHub Finder</h1>
        <p>Search any GitHub profile!</p>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchProfile()}
        />
        <button onClick={searchProfile}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Searching...</p>}

      {profile && (
        <div className="profile-container">
          <div className="profile-card">
            <img src={profile.avatar_url} alt={profile.login} />
            <div className="profile-info">
              <h2>{profile.name || profile.login}</h2>
              <p className="username">@{profile.login}</p>
              {profile.bio && <p className="bio">{profile.bio}</p>}
              {profile.location && <p className="location">📍 {profile.location}</p>}
              {profile.blog && <a href={profile.blog} target="_blank" rel="noreferrer">🌐 {profile.blog}</a>}
              <div className="stats">
                <div className="stat">
                  <h3>{profile.public_repos}</h3>
                  <p>Repos</p>
                </div>
                <div className="stat">
                  <h3>{profile.followers}</h3>
                  <p>Followers</p>
                </div>
                <div className="stat">
                  <h3>{profile.following}</h3>
                  <p>Following</p>
                </div>
              </div>
              <a href={profile.html_url} target="_blank" rel="noreferrer" className="github-btn">
                View on GitHub
              </a>
            </div>
          </div>

          <div className="repos-section">
            <h3>Top Repositories</h3>
            <div className="repos-grid">
              {repos.map((repo) => (
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-card" key={repo.id}>
                  <h4>{repo.name}</h4>
                  <p>{repo.description || 'No description'}</p>
                  <div className="repo-stats">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    <span>{repo.language || 'N/A'}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
