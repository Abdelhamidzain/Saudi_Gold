// app/page.js
import GoldPricesClient from './components/GoldPricesClient';

// This page is static (ISR) and revalidates every 60 seconds
export const revalidate = 60;

// Fetch prices on the server
async function getPrices() {
  try {
    // In production, this calls our own cached API
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/prices`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching prices:', error);
    return null;
  }
}

export default async function HomePage() {
  const initialPrices = await getPrices();
  
  return <GoldPricesClient initialPrices={initialPrices} />;
}
