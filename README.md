# Markets 360 Mobile

A premium financial insights platform for TBN Bank clients, featuring an editorial-first mobile experience with horizontal scroll patterns, market tickers, daily briefings, and immersive audio insights.

---

## 🚀 Deploying to GitHub Pages

To make the **"View site"** button work properly on GitHub Pages, follow either of the methods below:

### Option 1: Automatic Deployment via GitHub Actions (Recommended)

This repository includes a pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the app whenever you push to the `main` branch.

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```
2. In your GitHub repository, go to **Settings** > **Pages** (in the left sidebar).
3. Under **Build and deployment** > **Source**:
   - Change the dropdown from **"Deploy from a branch"** to **"GitHub Actions"**.
4. Go to the **Actions** tab in your repository to watch the build finish (takes ~30–45 seconds).
5. Return to **Settings** > **Pages** and click the **"Visit site"** / **"View site"** button!

---

### Option 2: Deploying via the `gh-pages` branch

If you want to keep the **"Deploy from a branch"** setting shown in your GitHub Pages settings:

1. Build and push the compiled production build to the `gh-pages` branch:
   ```bash
   npm run deploy
   ```
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Build and deployment**:
   - **Source**: Select **Deploy from a branch**.
   - **Branch**: Select **`gh-pages`** and folder **`/ (root)`**.
   - Click **Save**.
4. Click **"View site"** once GitHub finishes processing the branch.

> **Why `main` / `(root)` didn't work directly:**  
> In a modern React + Vite application, the source files in `main` (such as `src/main.tsx` and `src/App.tsx`) use TypeScript and JSX, which web browsers cannot execute without a build step. GitHub Pages is a static host that serves the files as-is. Deploying through GitHub Actions or `gh-pages` compiles the app into browser-ready HTML, JavaScript, and CSS inside `dist/`.

---

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```
   Outputs the production bundle to the `dist/` directory.

4. **Preview the production build**:
   ```bash
   npm run preview
   ```
