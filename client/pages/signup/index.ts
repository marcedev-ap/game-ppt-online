import { Router } from "@vaadin/router";
import { state } from "../../state";
class SignUpPage extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  listeners() {
    const formEl = this.shadow.querySelector(".customForm");
    formEl.addEventListener("submitForm", (e: any) => {
      state.setUserName(e.detail.value);
      this.connectData();
    });
  }

  connectData() {
    const cs = state.getState();
    if (cs.fsRoomId == "" && cs.rtdbRoomId == "") {
      console.log("signUp");
      state.setUserId((err) => {
        if (err) {
          console.error("There was an error in your username");
        } else {
          state.createRoom((err) => {
            if (err) {
              console.error("There was an error in your userId");
            } else {
              state.accessRoomId((err) => {
                if (err) {
                  console.error("There was an error in your username");
                } else {
                  state.connectToRoom();
                  state.ownerStatus("ON");
                  Router.go("/sharecode");
                }
              });
            }
          });
        }
      });
    } else {
      state.setUserId((err) => {
        if (err) {
          console.error("There was an error in your username");
        } else {
          state.guessStatus("ON");
          Router.go("/gamerules");
        }
      });
    }
  }

  render() {
    const sectionEl = document.createElement("section");
    sectionEl.className = "singup";
    sectionEl.innerHTML = `
  <div class="singup__container">
    <div class="signup__container-title">
        <custom-text tag="h1" size="80px">Piedra, Papel, ó Tijera</custom-text>
    </div>
        <custom-form class="customForm" label="Ingresa tu nombre" id="name" name="name" placeholder="NOMBRE" text="Empezar" ></custom-form>
    <div class="signup__container-hands">
        <hands-el tag="scissors" width="65px" height="125px"></hands-el>
        <hands-el tag="stone" width="65px" height="125px"></hands-el>
        <hands-el tag="paper" width="65px" height="125px"></hands-el>
    </div>
  </div>

  `;
    const style = document.createElement("style");
    style.innerHTML = `
    .singup__container{
        max-width:100%;
        height:100vh;
        padding:0px 26px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-between;
    }

    @media(min-width:376px){
      .singup__container{
        width:100%;
        height:100vh;
        padding:40px 26px 0px 26px;
    }}

    .signup__container-title{
      width:284px;
      height:280px;
      padding-top:20px;
      box-sizing: border-box;
    }

      .signup__container-hands{
        width:273px;
        height:130px;
        display:flex;
        align-items:center;
        justify-content:space-between;
      }
    `;
    this.shadow.appendChild(sectionEl);
    this.shadow.appendChild(style);
    this.listeners();
  }
}
window.customElements.define("x-signup-page", SignUpPage);
