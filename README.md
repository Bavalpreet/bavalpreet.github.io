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


## Deployment
Pushing changes to the `main` branch will trigger GitHub Pages to rebuild and deploy the site at [https://bavalpreet.github.io](https://bavalpreet.github.io).

## Contributing
Suggestions and improvements are welcome! Feel free to open an issue or submit a pull request.
