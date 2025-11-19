# Davide Morelli - Personal Website

A modern, responsive personal website showcasing my research, skills, and publications. The website automatically updates publications from Google Scholar.

## Features

- 🎨 **Modern Design**: Clean, professional design with smooth animations
- 📱 **Responsive**: Works perfectly on all devices
- 📚 **Dynamic Publications**: Automatically fetches and displays publications from Google Scholar
- 🎯 **Skills Showcase**: Interactive skills section
- ⚡ **Fast Loading**: Optimized for performance

## Sections

1. **Presentation/Hero**: Introduction with profile picture and social links
2. **About**: Brief bio and research interests
3. **Skills**: Technical skills organized by category
4. **Publications**: Dynamically loaded from Google Scholar with abstracts

## Setup

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/omedivad/omedivad.github.io.git
cd omedivad.github.io
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

### Updating Publications

Publications are automatically updated via GitHub Actions. The workflow runs:
- On the 1st of every month at 00:00 UTC
- On manual trigger (workflow_dispatch)
- When `fetch_publications.py` is updated

#### Manual Update

To manually update publications:

1. Install dependencies:
```bash
pip install requests beautifulsoup4
```

2. Run the script:
```bash
python fetch_publications.py
```

This will update `publications.json` with the latest publications from your Google Scholar profile.

**Note**: Google Scholar may rate-limit or block automated requests. If the script fails:
- Wait a few hours and try again
- Manually update `publications.json` with your publications
- Consider using the `scholar.py` library for more reliable scraping

## Customization

### Update Personal Information

Edit `index.html` to update:
- Name, title, and institution
- Bio/description
- Social media links
- Profile picture path

### Update Skills

Edit the skills section in `index.html` to add or modify skills.

### Styling

Modify `styles.css` to customize:
- Colors (CSS variables in `:root`)
- Fonts
- Layout and spacing
- Animations

## Google Scholar Integration

The website uses your Google Scholar profile ID: `UJ4D3rYAAAAJ`

To change this:
1. Update `SCHOLAR_USER_ID` in `script.js`
2. Update `SCHOLAR_USER_ID` in `fetch_publications.py`
3. Update the Google Scholar link in `index.html`

## Deployment

This website is designed for GitHub Pages. To deploy:

1. Push your code to the `main` branch of your repository
2. Go to repository Settings → Pages
3. Select source: `main` branch
4. Your site will be available at `https://omedivad.github.io`

## File Structure

```
.
├── index.html              # Main HTML file
├── styles.css              # Stylesheet
├── script.js               # JavaScript for publications
├── fetch_publications.py   # Script to fetch from Google Scholar
├── publications.json       # Publications data (auto-generated)
├── images/                 # Images directory
│   └── davide.jpg         # Profile picture
├── .github/
│   └── workflows/
│       └── update-publications.yml  # GitHub Actions workflow
└── README.md              # This file
```

## License

This project is open source and available under the MIT License.

## Contact

- Email: modavide93@gmail.com
- LinkedIn: [d-morelli](https://www.linkedin.com/in/d-morelli/)
- GitHub: [omedivad](https://github.com/omedivad)
- Google Scholar: [Davide Morelli](https://scholar.google.com/citations?user=UJ4D3rYAAAAJ)

