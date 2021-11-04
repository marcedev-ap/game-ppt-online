"use strict";
exports.__esModule = true;
var db_1 = require("./db");
var express = require("express");
var nanoid_1 = require("nanoid");
var cors = require("cors");
var randomstring = require("randomstring");
var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
var fsUsersCol = db_1.firestore.collection("users");
var fsRoomsCol = db_1.firestore.collection("rooms");
app.post("/signup", function (req, res) {
    //extraemos la prop userName
    var userName = req.body.userName;
    //Buscamos en la collection de user si el usuario existe.
    fsUsersCol
        .where("userName", "==", userName)
        .get()
        .then(function (userRef) {
        //Si el usuario existe, respondemos con un mensaje y el id de ese usuario.
        if (!userRef.empty) {
            res.status(400).json({
                message: "Username already exist",
                userId: userRef.docs[0].id
            });
        }
        else {
            // add crea un documento en la collection y establece su info
            fsUsersCol
                .add({
                userName: userName
            })
                .then(function (newDocRef) {
                res.status(201).json({
                    //Del parámetro de la función que resuelve la promesa puedo extraer el id del doc
                    //que se creo.
                    userId: newDocRef.id,
                    newUser: true
                });
            });
        }
    });
});
app.post("/createRoom", function (req, res) {
    var userId = req.body.userId;
    var userName = req.body.userName;
    //Busca en la collection de users el userId recibido
    fsUsersCol
        .doc(userId)
        .get()
        .then(function (userRef) {
        //Si existe en la collection un referecia con mi userId
        if (!userRef.exists) {
            res.status(401).json({
                message: "Unauthorized user"
            });
        }
        else {
            //Creo una nueva referencia en la rtdb asignandole un id aleatorio generado por nanoid
            var rtdbRef_1 = db_1.rtdb.ref("/rooms/" + (0, nanoid_1.nanoid)());
            //Establezco sus propiedades y valores
            rtdbRef_1
                .set({
                ownerId: userId,
                ownerName: userName
            })
                .then(function () {
                //Una vez creada la room en la rtdb y resuelta la promesa. Voy a crear el id corto en firestore
                // y dentro de ese doc voy a guardar el id largo de la rtdb
                var fsId = randomstring.generate(6).toUpperCase();
                var fsRef = fsRoomsCol.doc(fsId);
                fsRef
                    .set({
                    rtdbRef: rtdbRef_1.key
                })
                    .then(function () {
                    res.json({
                        fsRoomId: fsId
                    });
                });
            });
        }
    });
});
app.get("/rooms/:fsRoomId", function (req, res) {
    var fsRoomId = req.params.fsRoomId;
    console.log(fsRoomId);
    var userId = req.query.userId;
    console.log(userId);
    fsUsersCol
        .doc(userId.toString())
        .get()
        .then(function (userRef) {
        if (userRef.exists) {
            fsRoomsCol
                .doc(fsRoomId)
                .get()
                .then(function (roomRef) {
                var data = roomRef.data();
                console.log("soy data", data);
                res.json({ rtdbId: data });
            });
        }
        else {
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
app.listen(port, function () {
    console.log("this app currently running on the port", port);
});
