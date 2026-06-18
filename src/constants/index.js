import path from 'node:path';

export const TEMPLATES_DIR = path.resolve('src', 'templates');

export const TEMP_UPLOAD_DIR = path.resolve('temp');
export const UPLOADS_DIR = path.resolve('uploads');

export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');

export const UKR_NET_SMTP = {
  UKR_NET_EMAIL: 'UKR_NET_EMAIL',
  UKR_NET_PASSWORD: 'UKR_NET_PASSWORD',
  UKR_NET_HOST: 'UKR_NET_HOST',
  UKR_NET_PORT: 'UKR_NET_PORT',
};

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};
