declare namespace NodeJS {
  export type ProcessEnv = {
    PORT: number;
    MONGO_URI: string;
    NODE_ENV: string;
    PASSWORD_SECRET: string;
    ACCESS_TOKEN_SECRETE: string;
    REFRESH_TOKEN_SECRETE: string;
    ACCESS_TOKEN_EXPIRES_IN: string;
    REFRESH_TOKEN_EXPIRES_IN: string;
    STORE_ID: string;
    STORE_PASS: string;
    PAYMENT_SUCCESS_URL: string;
    PAYMENT_FAILED_URL: string;
    PAYMENT_CANCEL_URL: string;
    SSL_PAYMENT_API: string;
    SSL_VALIDATION_API: string;
  };
}
