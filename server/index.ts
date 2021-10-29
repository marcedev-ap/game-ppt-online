import { firestore, rtdb } from "./db";
import * as express from "express";
import { nanoid } from "nanoid";
import * as randomstring from "randomstring";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const fsUsersCol = firestore.collection("users");
const fsRoomsCol = firestore.collection("rooms");

app.post("/signup", (req, res) => {
  const { userName } = req.body;
  fsUsersCol
    .where("userName", "==", userName)
    .get()
    .then((userRef) => {
      if (!userRef.empty) {
        res.status(400).json({
          message: "Username already exist",
          userId: userRef.docs[0].id,
        });
      } else {
        fsUsersCol
          .add({
            userName,
          })
          .then((newDocRef) => {
            res.status(201).json({
              userId: newDocRef.id,
              newUser: true,
            });
          });
      }
    });
});

// app.post("/createRoom", (req, res) => {
//   const { userId } = req.body;
//   const { userName } = req.body;

//   if (!userId) {
//     res.status(400).json({
//       message: "bad request. You do not have an userId",
//     });
//   } else {
//     // const fsRoomId = randomstring.generate(4);
//     // const rtdbRef =
//     // rtdbRef.set({});
//     const rtdbRef = rtdb.ref("/rooms/" + nanoid());
//     rtdbRef
//       .set({
//         ownerId: userId,
//         ownerName: userName,
//       })
//       .then(() => {
//         res.json({
//           rtdbRef: rtdbRef.key,
//         });
//       });
//   }
// });

app.listen(port, () => {
  console.log("this app currently running on the port", port);
});
