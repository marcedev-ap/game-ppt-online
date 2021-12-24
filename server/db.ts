import * as admin from "firebase-admin";

// const serviceAccount = {
//   type: "service_account",
//   project_id: "game-ppt-online",
//   private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
//   client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_ADMIN_AUTH_URL,
//   token_uri: process.env.FIREBASE_ADMIN_TOKEN_URL,
//   auth_provider_x509_cert_url:
//     process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
// };

const serviceAccount = {
  type: "service_account",
  project_id: "game-ppt-online",
  private_key_id: "80a34fa8c403a5559c02e029e86580490cffaceb",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSwZz3EJgnGWgT\n3MUneSpY/AOVym/0pgnXrw9FPYnfGAbT8Ub3AxgfxTJebvuGwAWA2TL1RdEdfyJb\ngdJH5yoyl3KjIawk6uZZ+WmfccafH00F65cYMKroVnRlLRIUpo5Z0FjItgx2XI+E\nbJQOBSWnhmyjG0Ghgh+bLBJzZlx7NHqOCKpYV6uqgILGij7w3hxR0g9F1zBBna1N\nwPK6BB5Hhr35RacKJA0EIyb4M9NJAl31KWL15WHNnujznYzFXMj7LPwlJdqY5fZ+\nsP785iMSttfzJCwqGyqvhXD56SWTB+ZVUz7Dn8MzIxHMu4f4M6p673WXoEg+xOSN\n4Z7nrjT/AgMBAAECggEALSYT8auI5MthC+w+AgxHYaOvQu4ImNDfB+j1LQCXYgb8\nI3grGyx7BQdSGH/O+1l0dFtTOs73ksmS+yZu/T9Mv2TJRqAmiAwYR8sR8PnHMnxa\nnDuRdTmryzUGH0yN9IWPtjbXZjv1pH+EsTovZ2d73w0BhdmHcEl3at8Ant8dTbkX\nSLlPN2nw4EotDVuc0Qq9Wmwixsw3uO0VHkvXmo525NQ/hYEny9KxOknKTl3XhCtM\nm/EKrJsgFa+7sEuphhxlnI6ybmwoEPu6xnWzmFvgtgNjLeu9OawdxlidfxD4IaVh\nt4OgNtOfQxtXleu2KGOY9cjJ+1f0jIEl+PGRlKhwDQKBgQDo7DegmBq6VPm4pfh2\nmu9ie+Hzt0/ErsUsyN56aOu7+agGV3/VWPb7FJtcUUK4cp37t9RCIX76EPjPEHK6\nSgswuzPnWGgS4LDouiwKX2GqRqrZqgDtV06KWuqEmgTmgHgTBXTv9YQH+NKoYJ7+\nIqboHH4xH5OoV4Ny/PKm/kX6dQKBgQDnoyxdkd2N0P1jW7fqlf9ihJhVV6TZlmL/\n5ZKUD+NlaGOe2NGaIfbeJpRRG9bJKn3vGqFFvgVnkS6BPRn1czcM+jZP52qdJiw2\n7ZVWiD9ohmPhA5pQAHFNCXtj2e8lmN23MldCvCHf64pIqzSrh35PtHLuWJiqbzKX\nnDqV4VQ7IwKBgQCpS1e7QBLdL/o5vVh0THSF7mjyjWBLIoRp4q3h5vTAMdtwkJR3\nayxInle1p9KI4bX2SUzbrCDwfPl69weMY1jy2H4HPniWj/3FiduMxnrkGmz/u9Lk\nrzqE0UP3kULSjrm3iZXO+3I1oSLsAx5MtL7/ogYOilb2WnVOVI/B1LrkKQKBgHjA\nQzxz8b8gFzdYdMPBdeRxose6bKFRGEK19ndg4PXYOTZxaLKkygB8tAykKo+rqwKe\nKzwkFsUqlcehhorBiQ0m0nFM/fL2F057A8KcPBHNHPwL2MGjuWyjaMNgtJ4w1kPN\n5ldPo4kLTIcdWNOiSmJaex9s6AjQ9tq6AoBnenVpAoGBAJ/v1w/Ssy8tSr2bVXc4\n9hS3KLNIlf0IvYyJYGzVr1phlqBz+w9w2gu+N6YBwgFIElQ/36ufuRYJHseMrrgT\nlgTC3Zj8JxfIbZZIJ6qeipgaUTBWqlF+QTTWBzuJhoFEEeLp7ENO1qma9Tc8JTsj\nH2wBCGVkNIrb+hlQR9+T0VQi\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-zf90p@game-ppt-online.iam.gserviceaccount.com",
  client_id: "103696067665931914430",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zf90p%40game-ppt-online.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://game-ppt-online-default-rtdb.firebaseio.com",
});

const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };
