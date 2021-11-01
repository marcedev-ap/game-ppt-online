import { firestore, rtdb } from "./db";
import * as express from "express";
import { nanoid } from "nanoid";
import * as cors from "cors";
import * as randomstring from "randomstring";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const fsUsersCol = firestore.collection("users");
const fsRoomsCol = firestore.collection("rooms");

app.post("/signup", (req, res) => {
  //extraemos la prop userName
  const { userName } = req.body;
  //Buscamos en la collection de user si el usuario existe.
  fsUsersCol
    .where("userName", "==", userName)
    .get()
    .then((userRef) => {
      //Si el usuario existe, respondemos con un mensaje y el id de ese usuario.
      if (!userRef.empty) {
        res.status(400).json({
          message: "Username already exist",
          userId: userRef.docs[0].id,
        });
      } else {
        // add crea un documento en la collection y establece su info
        fsUsersCol
          .add({
            userName,
          })
          .then((newDocRef) => {
            res.status(201).json({
              //Del parámetro de la función que resuelve la promesa puedo extraer el id del doc
              //que se creo.
              userId: newDocRef.id,
              newUser: true,
            });
          });
      }
    });
});

app.post("/createRoom", (req, res) => {
  const { userId } = req.body;
  const { userName } = req.body;

  //Busca en la collection de users el userId recibido
  fsUsersCol
    .doc(userId)
    .get()
    .then((userRef) => {
      //Si existe en la collection un referecia con mi userId
      if (!userRef.exists) {
        res.status(401).json({
          message: "Unauthorized user",
        });
      } else {
        //Creo una nueva referencia en la rtdb asignandole un id aleatorio generado por nanoid
        const rtdbRef = rtdb.ref("/rooms/" + nanoid());
        //Establezco sus propiedades y valores
        rtdbRef
          .set({
            ownerId: userId,
            ownerName: userName,
          })
          .then(() => {
            //Una vez creada la room en la rtdb y resuelta la promesa. Voy a crear el id corto en firestore
            // y dentro de ese doc voy a guardar el id largo de la rtdb
            const fsId = randomstring.generate(6).toUpperCase();
            const fsRef = fsRoomsCol.doc(fsId);
            fsRef
              .set({
                rtdbRef: rtdbRef.key,
              })
              .then(() => {
                res.json({
                  fsRoomId: fsId,
                });
              });
          });
      }
    });
});

app.get("/rooms/:roomId", (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.query;
  fsUsersCol
    .doc(userId.toString())
    .get()
    .then((userRef) => {
      if (userRef.exists) {
        fsRoomsCol
          .doc(roomId)
          .get()
          .then((roomRef) => {
            const data = roomRef.data();
            res.json({ rtdbId: data.rtdbRef });
          });
      } else {
        res.status(401).json({ message: "Your ID was not found" });
      }
    });
});

// app.post("/room-score", (req, res) => {
//   const { userId } = req.body;
//   const { fsRoomId } = req.body;
// });

app.use(express.static("dist"));

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port, () => {
  console.log("this app currently running on the port", port);
});
