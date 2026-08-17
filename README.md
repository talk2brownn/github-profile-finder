# GitHub Profile Finder 👨‍💻

Search any GitHub username and see their profile stats and top repositories — wrapped in a Matrix-style, code-rain themed UI.

**Live demo:** https://lighthearted-gaufre-0ac14b.netlify.app/

![GitHub Profile Finder screenshot](./screenshot.jpg)

## Features

- Search any GitHub username via the public GitHub REST API
- Profile card: avatar, name, bio, location, blog link, and follower/following/repo counts
- Top repositories grid with stars, forks, and primary language
- Animated Matrix-style code-rain background
- Friendly error state for usernames that don't exist

## Tech stack

- [React](https://react.dev/) (Create React App)
- [GitHub REST API](https://docs.github.com/en/rest) (unauthenticated, so no API key required)

## Running it locally

```bash
git clone https://github.com/talk2brownn/github-profile-finder.git
cd github-profile-finder
npm install
npm start
```

The app will open at `http://localhost:3000`.

> Note: GitHub's public API has a fairly low unauthenticated rate limit (60 requests/hour per IP). If you hit it during local testing, wait a bit or authenticate your own requests.

## Author

Built by [Emediong "Brown" Ubong Ekwere](https://github.com/talk2brownn) — see more projects on my [portfolio](https://testingreactt.netlify.app/).
