import * as authService from '../services/auth.js';
import { generateOAuthUrl } from '../utils/googleOAuth2.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerController = async (req, res) => {
  await authService.register(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
  });
};

export const verifyController = async (req, res) => {
  const { token } = req.query;
  await authService.verify(token);

  res.json({
    status: 200,
    message: 'Email verified',
  });
};

export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateOAuthUrl();

  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url',
    data: {
      url,
    },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const { code } = req.body;
  const session = await authService.loginOrRegisterWithGoogle(code);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully login with Google OAuth',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const loginController = async (req, res) => {
  const { session, user } = await authService.login(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
};

export const requestResetEmailController = async (req, res) => {
  await authService.requestResetToken(req.body.email);

  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await authService.resetPassword(req.body);

  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};

export const refreshTokenController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  const session = await authService.refreshToken({ refreshToken, sessionId });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await authService.logout(req.cookies.sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};
