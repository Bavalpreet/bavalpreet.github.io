# Bavalpreet Singh — Portfolio & Blog

This repository contains the source code for my personal website built with [Jekyll](https://jekyllrb.com/) and GitHub Pages. It presents my professional background, showcases selected projects, and hosts a growing collection of blogs.

## Site Structure
- `_data/profile.yml` – core profile information used across pages
- `_projects/` – markdown files for project entries
- `_posts/` – markdown files for individual blogs
- `blogs.html` – list of all blog posts

## Local Development
1. Ensure you have Ruby and Bundler installed.
2. Install dependencies:
   ```bash
   bundle install
   ```
3. Build and serve the site locally:
   ```bash
   bundle exec jekyll serve
   ```
4. Visit `http://localhost:4000` in your browser to preview changes.

## Environment Stats (optional)
To display live GPU and memory information on the home page, first install the Python dependencies and run the helper API before starting Jekyll:

```bash
pip install flask psutil
python scripts/env_server.py
```

The site will request `http://localhost:8001/system/stats` for GPU temperature, available RAM, and training progress. Commit activity is fetched directly from the GitHub API when the page loads.

By default the home page shows placeholders (`--`). Once the helper API is running and the page reloads, the tiles will update with live numbers.

### Blog count
The home page displays the total number of blogs published on Medium. No setup is required—on each page load the script calls Medium's RSS feed through `rss2json` and updates the tile with the current count. If your Medium handle differs, update the feed URL in `assets/js/main.js`.

## Deployment
Pushing changes to the `main` branch will trigger GitHub Pages to rebuild and deploy the site at [https://bavalpreet.github.io](https://bavalpreet.github.io).

## Contributing
Suggestions and improvements are welcome! Feel free to open an issue or submit a pull request.
