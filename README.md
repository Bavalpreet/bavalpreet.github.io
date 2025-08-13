# bavalpreet.github.io (Starter)

A minimal GitHub Pages + Jekyll portfolio, styled similar to the reference you shared.

## Quick start
1. Create a new public repo named **bavalpreet.github.io** on your GitHub account.
2. Upload the contents of this folder to that repo (drag & drop on GitHub is fine).
3. Go to the repo **Settings → Pages** and ensure Source is set to **Deploy from a branch: main /(root)**.
4. Wait a minute; your site will be live at https://bavalpreet.github.io

## Editing
- Home content: `index.html`
- Blog list: `posts.html`
- Styles: `assets/css/style.css`
- Layout wrapper: `_layouts/default.html`
- Config (title, description, URL): `_config.yml`
- Blog posts go under `_posts/YYYY-MM-DD-title.md` with front matter.

## Local preview (optional)
If you have Ruby:
```bash
gem install bundler jekyll
jekyll serve
```
Open http://127.0.0.1:4000