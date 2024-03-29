import * as dotenv from 'dotenv';

export type TConfig = typeof config;

dotenv.config({ path: '.env' });

export const config = {
    env: process.env.NODE_ENV!,
    app: {
        name: process.env.APP_NAME!,
        port: process.env.PORT!,
        url: process.env.APP_URL!
    },
    url: {
        dashboard: process.env.DASHBOARD_URL!,
        eol: process.env.EOL_URL!,
        cop27: process.env.COP27_URL!
    },
    db: {
        uri: process.env.DB_URI!
    },
    jwt: {
        secret: process.env.JWT_SECRET!,
        expiresIn: process.env.JWT_EXPIRES_IN!
    },
    sc: {
        address: process.env.SC_ADDRESS!,
        provider: process.env.SC_PROVIDER!,
        key: process.env.SC_KEY!
    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY!,
        publicKey: process.env.STRIPE_PUBLIC_KEY!,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
        connectWebhookSecret: process.env.STRIPE_CONNECT_WEBHOOK_SECRET!
    },
    rateLimit: {
        windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS),
        max: Number(process.env.RATE_LIMIT_MAX)
    },
    mail: {
        host: process.env.MAIL_HOST!,
        port: process.env.MAIL_PORT!,
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASS!
    },
    h64: {
        invoiceNumberId: process.env.H64_INVOICE_NUMBER_ID!,
        invoiceTemplateId: process.env.H64_INVOICE_TEMPLATE_ID!
    }
};
