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
  };
}
