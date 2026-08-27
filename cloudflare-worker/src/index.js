// Proxies Places API (New) autocomplete so the Google API key never reaches the browser.
// Deploy: wrangler deploy
// Set the key once: wrangler secret put GOOGLE_PLACES_API_KEY

const ALLOWED_ORIGINS = new Set([
  'https://communitysparkevents.netlify.app',
  'http://localhost:8888',
  'http://localhost:3000',
]);

const INDIANA_BOUNDS = { low: { latitude: 37.77, longitude: -88.10 }, high: { latitude: 41.76, longitude: -84.78 } };
const FIELD_MASK = 'suggestions.placePrediction.text.text,suggestions.placePrediction.structuredFormat.mainText.text,suggestions.placePrediction.structuredFormat.secondaryText.text';

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = { ...corsHeaders(origin), 'Content-Type': 'application/json' };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
    }
    if (!ALLOWED_ORIGINS.has(origin)) {
      return new Response(JSON.stringify({ error: 'Origin not allowed' }), { status: 403, headers });
    }

    let input;
    try {
      input = (await request.json()).input;
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers });
    }

    if (typeof input !== 'string' || input.trim().length < 3) {
      return new Response(JSON.stringify({ suggestions: [] }), { status: 200, headers });
    }

    const googleRes = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': env.GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': FIELD_MASK,
      },
      body: JSON.stringify({ input, includedRegionCodes: ['us'], locationBias: { rectangle: INDIANA_BOUNDS } }),
    });

    const data = await googleRes.text();
    return new Response(data, { status: googleRes.status, headers });
  },
};
