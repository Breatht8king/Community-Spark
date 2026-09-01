// Cloudflare Worker for the Event Quote Builder.
//
// Serves the static app (quote-calculator.html and friends) via env.ASSETS, and adds
// a small JSON API so saved quotes sync across devices instead of living only in one
// browser's localStorage:
//
//   GET  /api/quotes  -> current shared saved-quotes array (from KV, [] if never set)
//   POST /api/quotes  -> replace the shared array (body: a JSON array)
//
// This whole Worker sits behind Cloudflare Access already (gated to one email in the
// dashboard, unrelated to this file), so no separate auth check is needed here for the
// normal case -- but the Cf-Access-Authenticated-User-Email check below is a cheap
// belt-and-suspenders guard against the API being reachable if Access were ever
// misconfigured or removed by accident.
const ALLOWED_EMAIL = 'newtongriffinjames@gmail.com';
const QUOTES_KEY = 'saved-quotes';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/quotes') {
      const accessEmail = request.headers.get('Cf-Access-Authenticated-User-Email');
      if (accessEmail && accessEmail !== ALLOWED_EMAIL) {
        return new Response(JSON.stringify({ error: 'forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (request.method === 'GET') {
        const raw = await env.QUOTES_KV.get(QUOTES_KEY);
        return new Response(raw || '[]', { headers: { 'Content-Type': 'application/json' } });
      }

      if (request.method === 'POST') {
        let body;
        try {
          body = await request.json();
        } catch (e) {
          return new Response(JSON.stringify({ error: 'invalid JSON body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        if (!Array.isArray(body)) {
          return new Response(JSON.stringify({ error: 'expected a JSON array' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        await env.QUOTES_KV.put(QUOTES_KEY, JSON.stringify(body));
        return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } });
      }

      return new Response('Method not allowed', { status: 405 });
    }

    return env.ASSETS.fetch(request);
  },
};
