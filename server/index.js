"use strict";
exports.__esModule = true;
var db_1 = require("./db");
var express = require("express");
var nanoid_1 = require("nanoid");
var cors = require("cors");
var randomstring = require("randomstring");
var path = require("path");
require("dotenv").config();
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
    var playerStatus = req.body.playerStatus;
    var currentGame = req.body.currentGame;
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
                ownerName: userName,
                playerStatus: playerStatus,
                currentGame: currentGame
            })
                .then(function () {
                //Una vez creada la room en la rtdb y resuelta la promesa. Voy a crear el id corto en firestore
                // y dentro de ese doc voy a guardar el id largo de la rtdb
                var fsId = randomstring.generate(6).toUpperCase();
                var fsRef = fsRoomsCol.doc(fsId);
                fsRef
                    .set({
                    rtdbRef: rtdbRef_1.key,
                    history: []
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
//Endpoint para invitados
app.get("/guess/:fsRoomId", function (req, res) {
    var fsRoomId = req.params.fsRoomId;
    fsRoomsCol
        .doc(fsRoomId)
        .get()
        .then(function (roomRef) {
        var data = roomRef.data();
        res.json({ rtdbId: data.rtdbRef, history: data.history });
    });
});
// Endpoint para usuarios validos que crearon una room
app.get("/rooms/:fsRoomId", function (req, res) {
    var fsRoomId = req.params.fsRoomId;
    var userId = req.query.userId;
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
                res.json({
                    rtdbId: data.rtdbRef,
                    history: data.history
                });
            });
        }
        else {
            res.status(401).json({ message: "Your ID was not found" });
        }
    });
});
//Devuelvo el estado de la sala entero
app.get("/status/:rtdbRoomId", function (req, res) {
    var rtdbRoomId = req.params.rtdbRoomId;
    var rtdbRef = db_1.rtdb.ref("/rooms/" + rtdbRoomId).child("/playerStatus");
    rtdbRef.get().then(function (snapshot) {
        res.send(snapshot.val());
    });
});
app.patch("/status/guess-connect", function (req, res) {
    var rtdbRoomId = req.body.rtdbRoomId;
    var userName = req.body.userName;
    var userStatus = req.body.userStatus;
    var rtdbRef = db_1.rtdb
        .ref("/rooms/" + rtdbRoomId)
        .child("/playerStatus")
        .child("/guess");
    rtdbRef.update({ status: userStatus, userName: userName }, function (error) {
        if (error) {
            res.json({ message: "Write Data failed" });
        }
        else {
            res.json({ message: "Data saved successfully!" });
        }
    });
});
app.patch("/status/owner-connect", function (req, res) {
    var rtdbRoomId = req.body.rtdbRoomId;
    var userStatus = req.body.userStatus;
    var rtdbRef = db_1.rtdb
        .ref("/rooms/" + rtdbRoomId)
        .child("/playerStatus")
        .child("/owner");
    rtdbRef.update({ status: userStatus }, function (error) {
        if (error) {
            res.json({ message: "Write Data failed" });
        }
        else {
            res.json({ message: "Data saved successfully!" });
        }
    });
});
app.patch("/move/owner", function (req, res) {
    var rtdbRoomId = req.body.rtdbRoomId;
    var userName = req.body.userName;
    var move = req.body.move;
    var rtdbRef = db_1.rtdb
        .ref("/rooms/" + rtdbRoomId)
        .child("/currentGame")
        .child("/owner");
    rtdbRef.update({ userName: userName, move: move }, function (error) {
        if (error) {
            res.json({ message: "Write Data failed" });
        }
        else {
            res.json({ message: "Data saved successfully!" });
        }
    });
});
app.patch("/move/guess", function (req, res) {
    var rtdbRoomId = req.body.rtdbRoomId;
    var userName = req.body.userName;
    var move = req.body.move;
    var rtdbRef = db_1.rtdb
        .ref("/rooms/" + rtdbRoomId)
        .child("/currentGame")
        .child("/guess");
    rtdbRef.update({ userName: userName, move: move }, function (error) {
        if (error) {
            res.json({ message: "Write Data failed" });
        }
        else {
            res.json({ message: "Data saved successfully!" });
        }
    });
});
app.patch("/push-history", function (req, res) {
    var fsRoomId = req.body.fsRoomId;
    var history = req.body.history;
    var refRoom = fsRoomsCol.doc(fsRoomId);
    refRoom.get().then(function (docRef) {
        if (!docRef.exists) {
            res.status(404).json({ message: "Document not found" });
        }
        else {
            refRoom
                .update({
                history: history
            })
                .then(function () {
                res.json({ message: "Your data was saved successfully" });
            });
        }
    });
});
app.use(express.static("dist"));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.listen(port, function () {
    console.log("this app currently running on the port", port);
});
