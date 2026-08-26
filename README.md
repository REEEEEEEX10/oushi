# Ultimate College Finder 🎓

A beautiful, modern web application for researching colleges with real-time data aggregation from across the internet.

## Features ✨

- **🔍 Intelligent Search**: Search any college worldwide
- **📊 Comprehensive Data**: Get detailed information including:
  - Courses offered
  - Fee structure
  - Campus size and facilities
  - Academic excellence metrics
  - World rankings
- **💬 Real Student Reviews**: Aggregated from:
  - Reddit
  - YouTube
  - Quora
  - College review platforms
- **🖼️ Visual Experience**: Beautiful campus images
- **🎨 Modern UI**: Sleek red-black themed design with smooth 60fps animations

## Tech Stack 🛠️

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Data Sources**: Wikipedia API, Reddit API, Web scraping
- **Styling**: Custom CSS with modern animations

## Installation 📦

1. Clone or navigate to the project directory:
```bash
cd C:\code
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Usage 🚀

1. Enter a college name in the search bar (e.g., "Harvard", "MIT", "Stanford")
2. Click the search button or press Enter
3. Wait while the system aggregates data from multiple sources
4. Explore comprehensive college information and real student reviews
5. Click on review links to visit the original sources

## API Endpoints 🔌

### POST `/api/college-search`
Search for college information

**Request Body:**
```json
{
  "collegeName": "Harvard University"
}
```

**Response:**
```json
{
  "name": "Harvard University",
  "location": "Cambridge, Massachusetts, USA",
  "image": "...",
  "quickStats": { ... },
  "courses": [ ... ],
  "fees": { ... },
  "campus": { ... },
  "academic": { ... },
  "reviews": [ ... ]
}
```

## Features in Detail 📋

### Search Experience
- Smooth hover animations on the search bar
- Real-time loading indicators with progress steps
- Beautiful transitions between views

### College Information
- Hero image of the campus
- Quick stats overview
- Detailed course listings
- Fee structure breakdown
- Campus facilities information
- Academic metrics

### Student Reviews
- Platform badges (Reddit, YouTube, Quora)
- Author information
- Direct links to original reviews
- Timestamps for each review
- Authentic, unfiltered student perspectives

## Customization 🎨

### Color Scheme
Edit `styles.css` to change the color theme:
```css
:root {
    --red-primary: #ff3b3b;
    --red-secondary: #ff5252;
    --bg-primary: #0a0a0a;
}
```

### API Keys (for Production)
For enhanced data quality, add API keys:
- YouTube Data API (for video reviews)
- Unsplash API (for high-quality images)
- Reddit API (for better rate limits)

## Development 💻

Run in development mode with auto-reload:
```bash
npm run dev
```

## Notes 📝

- The application fetches real-time data from multiple sources
- Some data may require API keys for production use
- Review links direct users to actual student comments and posts
- Images are sourced from Unsplash and other public sources

## Future Enhancements 🚀

- [ ] User accounts and saved colleges
- [ ] College comparison tool
- [ ] Application deadline tracker
- [ ] Scholarship finder
- [ ] Virtual campus tours
- [ ] Alumni network information
- [ ] Admission statistics and trends

## Browser Support 🌐

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License 📄

MIT License - Feel free to use and modify!

---

Built with ❤️ for students worldwide
