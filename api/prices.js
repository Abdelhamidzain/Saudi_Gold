export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  
  const API_KEY = '2919b5f9bdc14d018e8f3ff2d259155f';
  const API_URL = `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=XAU&currencies=SAR,USD`;
  
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch prices' 
    });
  }
}
