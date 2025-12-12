import { NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

// Only fetch from PDGA on the 14th of each month
export const revalidate = 86400; // Revalidate daily

interface CachedRating {
  rating: string;
  previousRating: string | null;
  lastFetched: string; // ISO date string
}

async function getCachedRating(): Promise<CachedRating | null> {
  try {
    const filePath = join(process.cwd(), 'data', 'pdga-rating.json');
    const fileContent = await readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return null;
  }
}

async function saveCachedRating(data: CachedRating): Promise<void> {
  const dataDir = join(process.cwd(), 'data');
  const filePath = join(dataDir, 'pdga-rating.json');
  
  // Create data directory if it doesn't exist
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
  
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function isCheckDay(): boolean {
  const today = new Date();
  return today.getDate() === 14;
}

export async function GET() {
  try {
    const pdgaNumber = '207735';
    
    // Check if today is the 14th
    const shouldFetch = isCheckDay();
    
    // Try to get cached rating first
    let cachedData = await getCachedRating();
    
    // If it's not the 14th and we have cached data, return it immediately
    if (!shouldFetch && cachedData) {
      const response = NextResponse.json({
        rating: cachedData.rating,
        previousRating: cachedData.previousRating,
        pdgaNumber
      });
      response.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=2592000');
      return response;
    }
    
    // If no cached data exists, fetch from PDGA to initialize (regardless of date)
    // Otherwise, only fetch from PDGA on the 14th
    // If we can't get previousRating from PDGA, use a default based on current rating
    const playerResponse = await fetch(`https://www.pdga.com/player/${pdgaNumber}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; bradyswiech.com/1.0)',
      },
    });

    if (!playerResponse.ok) {
      throw new Error('Failed to fetch PDGA player data');
    }

    const playerHtml = await playerResponse.text();
    
    // Extract current rating from the HTML
    // PDGA page format: "Current Rating: 929 +1 (as of 11-Nov-2025)"
    // Try multiple patterns to find the rating and change
    let currentRating = null;
    let changeValue = null;
    
    // Pattern 1: Look for "Current Rating:" followed by number and change
    const ratingMatch1 = playerHtml.match(/Current Rating[^>]*>(\d+)\s*([\+\-]?\d+)/i);
    if (ratingMatch1) {
      currentRating = ratingMatch1[1];
      changeValue = parseInt(ratingMatch1[2]);
    }
    
    // Pattern 2: Look for rating in a more flexible format
    if (!currentRating) {
      const ratingMatch2 = playerHtml.match(/Current Rating[^>]*>(\d{3,4})/i);
      if (ratingMatch2) {
        currentRating = ratingMatch2[1];
      }
    }
    
    // Pattern 3: Look for rating with change in parentheses or after
    if (currentRating && !changeValue) {
      const changeMatch = playerHtml.match(new RegExp(`Current Rating[^>]*>${currentRating}[^<]*([\+\-]\\d+)`, 'i'));
      if (changeMatch) {
        changeValue = parseInt(changeMatch[1]);
      }
    }
    
    // Pattern 4: Look for rating change anywhere near "Current Rating"
    if (currentRating && !changeValue) {
      const ratingSection = playerHtml.match(/Current Rating[^<]{0,200}/i);
      if (ratingSection) {
        const changeInSection = ratingSection[0].match(/([\+\-]\d+)/);
        if (changeInSection) {
          changeValue = parseInt(changeInSection[1]);
        }
      }
    }
    
    // If we have the change value, calculate previous rating
    let previousRating = null;
    if (currentRating && changeValue !== null) {
      previousRating = (parseInt(currentRating) - changeValue).toString();
    } else {
      // Fallback: try to fetch ratings history page
      try {
        const historyResponse = await fetch(`https://www.pdga.com/player/${pdgaNumber}/ratings`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; bradyswiech.com/1.0)',
          },
        });

        if (historyResponse.ok) {
          const historyHtml = await historyResponse.text();
          
          // Try to extract the previous rating from ratings history table
          // Look for rating entries in the history table
          const ratingMatches = historyHtml.match(/(\d{3,4})\s*\+\d+/g);
          if (ratingMatches && ratingMatches.length > 1) {
            // Get the second rating entry (previous month)
            const prevMatch = ratingMatches[1].match(/(\d{3,4})/);
            if (prevMatch) {
              previousRating = prevMatch[1];
            }
          }
          
          // Alternative: look for rating history table rows
          const tableRowMatches = historyHtml.match(/<tr[^>]*>[\s\S]*?(\d{3,4})[\s\S]*?<\/tr>/gi);
          if (tableRowMatches && tableRowMatches.length > 1) {
            // Extract rating from second row (previous month)
            const prevRowMatch = tableRowMatches[1].match(/(\d{3,4})/);
            if (prevRowMatch) {
              previousRating = prevRowMatch[1];
            }
          }
        }
      } catch (historyError) {
        console.error('Error fetching ratings history:', historyError);
        // Continue without previous rating
      }
      
      // If we still don't have previousRating, use cached data if available
      if (!previousRating && cachedData && cachedData.previousRating) {
        previousRating = cachedData.previousRating;
      }
    }
    
    // If we have the change value but didn't set previousRating yet, calculate it
    if (currentRating && changeValue !== null && !previousRating) {
      previousRating = (parseInt(currentRating) - changeValue).toString();
    }

    if (!currentRating) {
      // Fallback: try alternative pattern
      const altMatch = playerHtml.match(/"rating"[^>]*>(\d+)/i) || playerHtml.match(/Rating[^>]*>(\d{3,4})/i);
      const fallbackRating = altMatch ? altMatch[1] : '929';
      
      // If we have cached data, use it
      if (cachedData) {
        return NextResponse.json({
          rating: cachedData.rating,
          previousRating: cachedData.previousRating,
          pdgaNumber
        });
      }
      
      return NextResponse.json({ 
        rating: fallbackRating,
        previousRating: '928', // Default previous rating (929 - 1)
        pdgaNumber 
      });
    }

    // If we still don't have previousRating after all attempts, try one more time
    // by looking at the cached data's previous rating and calculating from there
    if (!previousRating && cachedData) {
      // If we have cached data with a previous rating, use that as a fallback
      if (cachedData.previousRating) {
        previousRating = cachedData.previousRating;
      } else if (cachedData.rating) {
        // If cached rating exists but no previousRating, calculate backwards
        // This shouldn't happen often, but helps maintain continuity
        const cachedRatingNum = parseInt(cachedData.rating);
        const currentRatingNum = parseInt(currentRating);
        if (cachedRatingNum !== currentRatingNum) {
          // Rating changed, use cached rating as previous
          previousRating = cachedData.rating;
        }
      }
    }

    // Save the fetched data
    const ratingData: CachedRating = {
      rating: currentRating,
      previousRating,
      lastFetched: new Date().toISOString()
    };
    
    await saveCachedRating(ratingData);
    
    const response = NextResponse.json({ 
      rating: currentRating, 
      previousRating,
      pdgaNumber 
    });
    
    // Add cache headers - cache for 30 days since we only update monthly
    response.headers.set('Cache-Control', 'public, s-maxage=2592000, stale-while-revalidate=2592000');
    
    return response;
  } catch (error) {
    console.error('Error fetching PDGA rating:', error);
    
    // If fetch fails, try to return cached data
    const cachedData = await getCachedRating();
    if (cachedData) {
      return NextResponse.json({
        rating: cachedData.rating,
        previousRating: cachedData.previousRating,
        pdgaNumber: '207735'
      });
    }
    
    // Fallback to default rating
    return NextResponse.json({ 
      rating: '929', 
      previousRating: null,
      pdgaNumber: '207735' 
    });
  }
}

