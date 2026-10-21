/**
 * ZeptoMail transactional email helper.
 * Server-side only — used inside Nitro API routes.
 *
 * Host: cpaas.zoho.com
 * Agent alias: 7b38fcb712f0637a
 */

const ZEPTOMAIL_URL = "https://api.zeptomail.com/v1.1/email";

export interface ZeptoMailRecipient {
  email_address: { address: string; name?: string };
}

export interface ZeptoMailPayload {
  to: ZeptoMailRecipient[];
  subject: string;
  htmlbody: string;
  textbody?: string;
}

/**
 * Send a transactional email via ZeptoMail REST API.
 * Requires `ZEPTOMAIL_API_KEY` and `ZEPTOMAIL_FROM_EMAIL` env vars.
 */
export async function sendEmail(payload: ZeptoMailPayload): Promise<{ ok: boolean; status: number; body?: unknown }> {
  const apiKey = process.env.ZEPTOMAIL_API_KEY;
  const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL ?? "noreply@russelltechnologies.org";

  if (!apiKey) {
    console.warn("[ZeptoMail] ZEPTOMAIL_API_KEY is not set — email will be skipped.");
    return { ok: false, status: 0 };
  }

  try {
    const response = await fetch(ZEPTOMAIL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": apiKey,
      },
      body: JSON.stringify({
        from: { address: fromEmail, name: "Russell Technologies" },
        ...payload,
      }),
    });

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("[ZeptoMail] Send failed:", response.status, body);
    }

    return { ok: response.ok, status: response.status, body };
  } catch (err) {
    console.error("[ZeptoMail] Network error:", err);
    return { ok: false, status: 0 };
  }
}

/**
 * Send a batch email to multiple recipients (chunks of 50).
 */
export async function sendBatchEmail(
  recipients: ZeptoMailRecipient[],
  subject: string,
  htmlbody: string,
): Promise<{ totalSent: number; errors: number }> {
  const chunkSize = 50;
  let totalSent = 0;
  let errors = 0;

  for (let i = 0; i < recipients.length; i += chunkSize) {
    const batch = recipients.slice(i, i + chunkSize);
    const result = await sendEmail({ to: batch, subject, htmlbody });
    if (result.ok) {
      totalSent += batch.length;
    } else {
      errors += batch.length;
    }
  }

  return { totalSent, errors };
}
