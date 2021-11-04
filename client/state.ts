const API_BASE_URL = "https://ppt-online.herokuapp.com";
import { dataBaseRT } from "./db";

const state = {
  data: {
    userName: "",
    userId: "",
    rtdbRoomId: "",
    fsRoomId: "",
    playerStatus: { playerOne: "", playerTwo: "" },
    currentGame: { playerOneMove: "", playerTwoMove: "" },
  },
  listeners: [],
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("State", this.data);
  },

  setUserName(name: string) {
    const cs = this.getState();
    cs.userName = name;
    this.setState(cs);
  },

  setUserId(callback) {
    const cs = this.getState();
    const userName = cs.userName;
    if (userName == "") {
      window.alert(
        "Excuse Me, could you introcude your surname please? Thanks!"
      );
    } else {
      fetch(API_BASE_URL + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName }),
      })
        .then((res) => res.json())
        .then((res) => {
          cs.userId = res.userId;
          state.setState(cs);
          callback();
        })
        .catch((err) => {
          console.error("Hubo un problema con la petición FETCH", err);
          callback(true);
        });
    }
  },

  createRoom(callback) {
    const cs = this.getState();
    const { userId, userName } = cs;
    fetch(API_BASE_URL + "/createRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        userName,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        cs.fsRoomId = response.fsRoomId;
        this.setState(cs);
        callback();
      })
      .catch((err) => {
        console.error("Hubo un problema con la petición FETCH", err);
        callback(true);
      });
  },

  accessRoomId(callback) {
    const cs = this.getState();
    const { fsRoomId } = cs;
    const { userId } = cs;
    fetch(API_BASE_URL + "/rooms/" + fsRoomId + "?userId=" + userId)
      .then((res) => res.json())
      .then((data) => {
        cs.rtdbRoomId = data.rtdbId.rtdbRef;
        this.setState(cs);
        callback();
      })
      .catch((err) => {
        console.error("Hubo un problema con la petición FETCH", err);
        callback(true);
      });
  },

  //SEGUIR ACA!
  connectToRoom() {
    const cs = this.getState();
    const { rtdbRoomId } = cs;
    const rtdbRef = dataBaseRT.ref("/rooms/" + rtdbRoomId);
    rtdbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  },

  subscribe(callback: (any) => { any }) {
    this.listeners.push(callback);
  },
};

export { state };
