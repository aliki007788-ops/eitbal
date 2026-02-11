/* ===========================================
   API: NEWS FEED - RSS Aggregator
   نسخه: 2.0.0
   وضعیت: ✅ سرورساید - Node.js
=========================================== */

const Parser = require('rss-parser');
const parser = new Parser();
const router = express.Router();

// RSS sources
const sources = [
  {
    id: 'varzesh3',
    name: 'ورزش سه',
    url: 'https://www.varzesh3.com/rss/latest',
    icon: '🟢'
  },
  {
    id: 'mehr',
    name: 'خبرگزاری مهر',
    url: 'https://www.mehrnews.com/rss/sport',
    icon: '🔵'
  },
  {
    id: 'tasnim',
    name: 'تسنیم',
    url: 'https://www.tasnimnews.com/fa/rss/sport',
    icon: '🟡'
  },
  {
    id: 'fars',
    name: 'فارس',
    url: 'https://www.farsnews.ir/rss/sport',
    icon: '🔴'
  },
  {
    id: 'football360',
    name: 'فوتبال ۳۶۰',
    url: 'https://football360.ir/rss',
    icon: '🟠'
  }
];

// Get latest news from all sources
router.get('/latest', async (req, res) => {
  try {
    const allNews = [];
    
    for (const source of sources) {
      try {
        const feed = await parser.parseURL(source.url);
        
        const items = feed.items.slice(0, 5).map(item => ({
          id: `${source.id}-${item.guid || item.link}`,
          source: source.name,
          sourceIcon: source.icon,
          title: item.title,
          summary: item.contentSnippet?.slice(0, 150) + '...',
          link: item.link,
          pubDate: item.pubDate,
          timestamp: new Date(item.pubDate).getTime()
        }));
        
        allNews.push(...items);
      } catch (err) {
        console.error(`Error fetching ${source.name}:`, err);
      }
    }
    
    // Sort by date
    allNews.sort((a, b) => b.timestamp - a.timestamp);
    
    res.json(allNews.slice(0, 20));
    
  } catch (error) {
    console.error('RSS aggregator error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Get news by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const allNews = [];
    
    // Fetch and filter by category
    // Implementation depends on category mapping
    
    res.json(allNews);
    
  } catch (error) {
    console.error('Category news error:', error);
    res.status(500).json({ error: 'Failed to fetch category news' });
  }
});

module.exports = router;