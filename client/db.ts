import firebase from "firebase";

const config = {
  apiKey: process.env.DATABASE_API_KEY,
  authDomain: process.env.DATABASE_AUTHDOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.DATABASE_PROJECT_ID,
};

firebase.initializeApp(config);

const dataBaseRT = firebase.database();
export { dataBaseRT };
