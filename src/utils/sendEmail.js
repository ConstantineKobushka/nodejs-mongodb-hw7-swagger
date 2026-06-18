import nodemailer from 'nodemailer';

import { getEnvVar } from './getEnvVar.js';

import { SMTP, UKR_NET_SMTP } from '../constants/index.js';

const verifyEmailConfig = {
  host: getEnvVar(UKR_NET_SMTP.UKR_NET_HOST),
  port: getEnvVar(UKR_NET_SMTP.UKR_NET_PORT), // 25, 465, 887, 2525
  secure: true,
  auth: {
    user: getEnvVar(UKR_NET_SMTP.UKR_NET_EMAIL),
    pass: getEnvVar(UKR_NET_SMTP.UKR_NET_PASSWORD),
  },
};

const verifyEmailTransport = nodemailer.createTransport(verifyEmailConfig);

export const sendEmailToVerify = data => {
  return verifyEmailTransport.sendMail({
    ...data,
    from: getEnvVar(UKR_NET_SMTP.UKR_NET_EMAIL),
  });
};

const resetEmailConfig = {
  host: getEnvVar(SMTP.SMTP_HOST),
  port: Number(getEnvVar(SMTP.SMTP_PORT)),
  auth: {
    user: getEnvVar(SMTP.SMTP_USER),
    pass: getEnvVar(SMTP.SMTP_PASSWORD),
  },
};

const resetEmailTransport = nodemailer.createTransport(resetEmailConfig);

export const sendEmailToReset = data => {
  return resetEmailTransport.sendMail({
    ...data,
    from: getEnvVar(SMTP.SMTP_FROM),
  });
};
