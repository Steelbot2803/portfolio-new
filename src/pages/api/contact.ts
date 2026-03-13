import type { APIRoute } from 'astro';

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 6;
const requestsByIp = new Map<string, { count: number; start: number }>();

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress || 'unknown';
    const now = Date.now();
    const record = requestsByIp.get(ip);

    if (!record || now - record.start > WINDOW_MS) {
      requestsByIp.set(ip, { count: 1, start: now });
    } else {
      if (record.count >= MAX_PER_WINDOW) {
        return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 });
      }
      record.count += 1;
      requestsByIp.set(ip, record);
    }

    const body = await request.json();
    const requiredFields = ['name', 'email', 'phone', 'message'];
    const missing = requiredFields.some((field) => !String(body[field] || '').trim());

    if (missing) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    if (body.company) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    if (!isEmail(String(body.email))) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
    }

    const webhookUrl = import.meta.env.CONTACT_WEBHOOK_URL;
    if (!webhookUrl) {
      return new Response(JSON.stringify({ ok: true, warning: 'No webhook configured yet.' }), {
        status: 202,
      });
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        phone: body.phone,
        callbackWindow: body.callbackWindow || '',
        message: body.message,
        source: 'portfolio-contact-form',
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!webhookResponse.ok) {
      return new Response(JSON.stringify({ error: 'Webhook delivery failed' }), { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), { status: 500 });
  }
};
