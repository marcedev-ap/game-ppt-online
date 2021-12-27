import * as admin from "firebase-admin";
import { config } from "./service-account";
require("dotenv").config();

// const cuenta = JSON.stringify(serviceAccount);

// const cuentaParseada = JSON.parse(cuenta);

console.log(config);

admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: "https://game-ppt-online-default-rtdb.firebaseio.com",
});

const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };
