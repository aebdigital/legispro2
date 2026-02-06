import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, service, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Meno, email a správa sú povinné polia' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Neplatný formát emailu' },
                { status: 400 }
            );
        }

        // Get environment variables
        const SMTP2GO_API_KEY = process.env.SMTP2GO_API_KEY;
        const SMTP2GO_FROM_EMAIL = process.env.SMTP2GO_FROM_EMAIL;
        const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL;

        if (!SMTP2GO_API_KEY || !SMTP2GO_FROM_EMAIL || !BUSINESS_EMAIL) {
            console.error('Missing environment variables');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Map service values to labels
        const serviceLabels: Record<string, string> = {
            startup: 'Start-ups & Greenfield Projects',
            gdpr: 'GDPR',
            optimization: 'Optimization Solutions',
            duediligence: 'Due Diligence',
            commercial: 'Commercial Law',
            tax: 'Financial Law',
            ecommerce: 'E-commerce',
            reality: 'Real Estate',
            litigation: 'Litigations',
            criminal: 'Criminal Law',
        };

        const serviceLabel = service ? serviceLabels[service] || service : 'Neuvedené';

        // Build email content
        const emailSubject = `LegisPro - Nová správa z kontaktného formulára`;

        const htmlBody = `
            <h2>Nová správa z kontaktného formulára</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Meno:</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
                    <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Telefón:</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${phone || 'Neuvedené'}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Služba:</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${serviceLabel}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Správa:</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${message.replace(/\n/g, '<br>')}</td>
                </tr>
            </table>
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
                Táto správa bola odoslaná z kontaktného formulára na legispro.sk
            </p>
        `;

        const textBody = `
Nová správa z kontaktného formulára

Meno: ${name}
Email: ${email}
Telefón: ${phone || 'Neuvedené'}
Služba: ${serviceLabel}

Správa:
${message}

---
Táto správa bola odoslaná z kontaktného formulára na legispro.sk
        `;

        // Send email via SMTP2GO API
        const response = await fetch('https://api.smtp2go.com/v3/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: SMTP2GO_API_KEY,
                to: [BUSINESS_EMAIL],
                sender: SMTP2GO_FROM_EMAIL,
                subject: emailSubject,
                html_body: htmlBody,
                text_body: textBody,
                custom_headers: [
                    {
                        header: 'Reply-To',
                        value: email,
                    },
                ],
            }),
        });

        const result = await response.json();

        if (!response.ok || result.data?.error) {
            console.error('SMTP2GO error:', result);
            return NextResponse.json(
                { error: 'Nepodarilo sa odoslať email. Skúste to prosím neskôr.' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Email bol úspešne odoslaný'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Nastala chyba pri spracovaní požiadavky' },
            { status: 500 }
        );
    }
}
