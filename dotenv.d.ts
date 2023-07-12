declare namespace NodeJS {
  interface ProcessEnv {
    CIVITOUR_DB_USER: string;
    CIVITOUR_DB_PASS: string;
    CIVITOUR_DB_HOST: string;
    CIVITOUR_DB_DEV_DB_NAME: string;
    CIVITOUR_DB_TEST_DB_NAME: string;
    CIVITOUR_DB_PROD_DB_NAME: string;
    NODE_ENV: 'production' | 'development' | 'test';
  }
}
