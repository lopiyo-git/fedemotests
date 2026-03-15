import { sign } from "node:crypto";

// config/urlPatterns.js
export const urlPatterns = {
    homeUrl: /\/$/,
    loginUrl: /login/,
    signupUrl: /signup/,
    deleteAccountURL: /delete_account/,
    accountCreatedURL: /account_created/,
};