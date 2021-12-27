"use strict";
exports.__esModule = true;
exports.rtdb = exports.firestore = void 0;
var admin = require("firebase-admin");
require("dotenv").config();
var serviceAccount = {
    type: "service_account",
    project_id: "game-ppt-online",
    private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
    auth_uri: process.env.FIREBASE_ADMIN_AUTH_URL,
    token_uri: process.env.FIREBASE_ADMIN_TOKEN_URL,
    auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL
};
console.log(serviceAccount);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://game-ppt-online-default-rtdb.firebaseio.com"
});
var firestore = admin.firestore();
exports.firestore = firestore;
var rtdb = admin.database();
exports.rtdb = rtdb;
