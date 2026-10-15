# Maida Khan — Portfolio Website

An expressive, professional and responsive portfolio for **Maida Khan**, a designer, developer and product-minded Computer Science undergraduate from Lahore, Pakistan.

**Ready for GitHub and Vercel. No npm, API key, subscription, backend or build system needed.** The site is written in semantic HTML, CSS and lightweight JavaScript.

## Website contents

- Premium dark aesthetic with a fully working light-mode toggle.
- Responsive navigation, mobile layout and accessible keyboard interactions.
- Six project cards with original illustrative design, filtering, and verified repository links where publicly available.
- About, 7 experience entries, skills, education and certifications based on the supplied CV.
- Direct email/contact links, copy-email action, LinkedIn and GitHub links.
- Downloadable CV (`assets/Maida-Khan-Resume.pdf`).
- SEO/social preview image and structured Person metadata.
- Simple `content.json` for editable portfolio data and a no-dependency Python generator.
- Optional GitHub profile README and automated file checks.

## 1. Preview the site on your computer

Open `index.html` in any modern browser. Nothing needs to be installed.

For a local development server (optional), open a terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/.

## 2. Upload to GitHub

**Option A — web upload**

1. Go to [github.com/MaidaAdeelKhan](https://github.com/MaidaAdeelKhan/) and sign in.
2. Create a new **public** repository called `maida-portfolio`.
3. Download/extract the supplied ZIP, open its inner `maida-khan-portfolio` folder.
4. Upload **the files and folders inside that folder** to the **root** of the new GitHub repository, including `index.html`, `assets/`, `content.json`, `tools/` and `vercel.json`.
5. Choose **Commit changes**. GitHub must show `index.html` in the repository root.

**Option B — git command line (best for all folders including hidden files)**

Run these commands from inside `maida-khan-portfolio`:

```bash
git init
git add .
git commit -m "Publish Maida Khan portfolio"
git branch -M main
git remote add origin https://github.com/MaidaAdeelKhan/maida-portfolio.git
git push -u origin main
```

Change the URL if the new repository has another name.

## 3. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub, and import the new repository.
2. Use **Framework Preset: Other** (plain static website).
3. Set **Root Directory: `./`** if `index.html` is at the GitHub repository root. If you uploaded the enclosing folder too, select that folder instead.
4. Keep **Build Command empty** (enable Override and leave it blank if Vercel asks).
5. Set **Output Directory: `.`** (root) if asked. `vercel.json` also specifies `.`.
6. Click **Deploy**. Vercel will assign a live `*.vercel.app` URL.

Every new GitHub push will redeploy the website automatically. No environment variables are required.

Vercel's documentation for serving a repository root without a build step: https://vercel.com/docs/builds/configure-a-build

## 4. Edit the profile later

Most profile content is in **`content.json`**:
- `profile`: name, email, phone, GitHub, LinkedIn, resume path.
- `featuredProjects`: featured projects, tags, categories and working links.
- `experience`, `capabilities`, `education`, `certifications`.

After editing `content.json`, run:

```bash
python3 tools/build_site.py
python3 tools/check_site.py
```

Then commit the changed `index.html` and `content.json` to GitHub. You can edit `index.html` directly for design-related wording, and `assets/styles.css` for colors, layout and typography. Interactive behavior lives in `assets/site.js`.

To update the resume, replace `assets/Maida-Khan-Resume.pdf` using the same filename.

To change the public site preview, replace `assets/og-cover.png` and add the final absolute URL after a custom domain has been connected (recommended for social sharing).

## 5. Optional GitHub profile enhancement

`GITHUB_PROFILE_README.md` is an **additional** profile README, not the site README.

For it to appear directly on Maida's GitHub **profile homepage**:
1. Create a **public** repository named **`MaidaAdeelKhan`** (exact match to the GitHub username).
2. Copy the **contents** of `GITHUB_PROFILE_README.md` into a file called `README.md` at the root of that special repository.
3. Commit the file. GitHub will display the profile introduction.

This is separate from the `maida-portfolio` site repository.

## Project structure

```text
maida-khan-portfolio/
├── .github/workflows/verify.yml
├── assets/
│   ├── favicon.svg
│   ├── Maida-Khan-Resume.pdf
│   ├── og-cover.png
│   ├── site.js
│   └── styles.css
├── tools/
│   ├── build_site.py
│   └── check_site.py
├── .gitignore
├── content.json
├── GITHUB_PROFILE_README.md
├── index.html
├── README.md
├── robots.txt
├── .vercelignore
└── vercel.json
```

## Accuracy and publishing notes

The supplied CV is the basis for work experience, education, certification and research descriptions. Public repositories were checked for MoodWave, Traffic Sign Detection, the movie recommendation system, the frontend internship collection and Fantasy Car Showroom. The 95% accuracy referenced for Traffic Sign Detection is **as described in that repository**, not independently benchmarked. Project visuals are **original conceptual illustrations**, not actual screenshots. No testimonials, revenue results, clients, awards or live demo links have been invented.

**Privacy:** Your CV contains a publicly visible phone number and email address. Delete or replace the CV before publishing if you do not want these exposed.

**No deployment has been made from this package:** uploading to Maida's GitHub account and linking Vercel require authorized account access.

---

Created for Maida Khan · October 2026
