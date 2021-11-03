import { json } from "stream/consumers";

const API_URL = "http://localhost:3000";
const state = {
  data: {
    userName: "",
    userId: "",
    rtdbRoomId: "",
    fsRoomId: "",
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
      fetch(API_URL + "/signup", {
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
    fetch(API_URL + "/createRoom", {
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
    fetch(API_URL + "/romms/" + fsRoomId + "?userId=" + userId)
      .then((res) => res.json())
      .then((response) => {
        cs.rtdbRoomId = response.rtdbId.rtdbRef;
        this.setState(cs);
        callback();
      })
      .catch((err) => {
        console.error("Hubo un problema con la petición FETCH", err);
        callback(true);
      });
  },

  // connectToRoom(){

  // },

  subscribe(callback: (any) => { any }) {
    this.listeners.push(callback);
  },
};

export { state };
