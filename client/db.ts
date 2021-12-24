import firebase from "firebase";
require("dotenv").config();

const config = {
  apiKey: "E2vfv8Ml9nqVurcgNwTzYZd14Ds9ARLx3UqusxNV",
  authDomain: "game-ppt-online.firebaseapp.com",
  databaseURL: "https://game-ppt-online-default-rtdb.firebaseio.com",
  projectId: "game-ppt-online",
};

firebase.initializeApp(config);

const dataBaseRT = firebase.database();
export { dataBaseRT };
