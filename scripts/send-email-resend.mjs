#!/usr/bin/env node
import fs from 'fs';

function parseArgs(argv) {
  const args = { digest: '', to: '' };
  for (let i = 2; i < argv.length; i++) {
    const cur = argv[i];
    if (cur === '--digest') args.digest = argv[++i];
    else if (cur === '--to') args.to = argv[++i];
  }
  return args;
}

async function main() {
  const { digest, to } = parseArgs(process.argv);
  if (!digest) {
    console.error('Usage: node scripts/send-email-resend.mjs --digest <digest.json> [--to "a@b.com,c@d.com"]');
    process.exit(1);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM;
  const subscribers = (to || process.env.NEWSLETTER_SUBSCRIBERS || '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

  if (!apiKey || !from || subscribers.length === 0) {
    console.error('Missing RESEND_API_KEY, NEWSLETTER_FROM, or subscribers');
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(digest, 'utf-8'));
  const email = payload.email;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: subscribers,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });

  const body = await res.text();
  if (!res.ok) {
    console.error(`Resend failed (${res.status}): ${body}`);
    process.exit(1);
  }

  console.log(`email_sent_to=${subscribers.length}`);
  console.log(body);
}

main();
