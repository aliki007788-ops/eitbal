/* ===========================================
   API: LEAGUE DATA - دریافت اطلاعات لیگ
   نسخه: 2.0.0
   وضعیت: ✅ سرورساید - Node.js
=========================================== */

const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

// Transfermarkt scraper
router.get('/transfermarkt/league', async (req, res) => {
  try {
    const url = 'https://www.transfermarkt.com/persian-gulf-pro-league/startseite/wettbewerb/IRN1';
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const teams = [];
    
    $('.items tbody tr').each((i, el) => {
      if (i < 16) {
        const rank = $(el).find('.rechts').first().text().trim();
        const name = $(el).find('.no-border-links a').text().trim();
        const played = $(el).find('td:nth-child(5)').text().trim();
        const win = $(el).find('td:nth-child(6)').text().trim();
        const draw = $(el).find('td:nth-child(7)').text().trim();
        const loss = $(el).find('td:nth-child(8)').text().trim();
        const gf = $(el).find('td:nth-child(9)').text().split(':')[0];
        const ga = $(el).find('td:nth-child(9)').text().split(':')[1];
        const points = $(el).find('.rechts').last().text().trim();
        
        teams.push({
          rank: parseInt(rank),
          name,
          played: parseInt(played),
          win: parseInt(win),
          draw: parseInt(draw),
          loss: parseInt(loss),
          gf: parseInt(gf),
          ga: parseInt(ga),
          gd: parseInt(gf) - parseInt(ga),
          points: parseInt(points)
        });
      }
    });
    
    res.json(teams);
    
  } catch (error) {
    console.error('Transfermarkt error:', error);
    res.status(500).json({ error: 'Failed to fetch league data' });
  }
});

// APWin scraper
router.get('/apwin/league', async (req, res) => {
  try {
    const url = 'https://www.apwin.com/league/iran/persian-gulf-pro-league/';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Parse APWin data
    const teams = [];
    
    res.json(teams);
    
  } catch (error) {
    console.error('APWin error:', error);
    res.status(500).json({ error: 'Failed to fetch league data' });
  }
});

// 365Scores live scores
router.get('/scores365/live', async (req, res) => {
  try {
    const url = 'https://www.365scores.com/football/iran/persian-gulf-pro-league/live';
    const response = await axios.get(url);
    
    // Parse live scores
    const matches = [];
    
    res.json(matches);
    
  } catch (error) {
    console.error('365Scores error:', error);
    res.status(500).json({ error: 'Failed to fetch live scores' });
  }
});

module.exports = router;