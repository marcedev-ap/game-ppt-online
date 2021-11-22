import { state } from "../../state";
import { Router } from "@vaadin/router";

class WaitRoomPage extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  subscribe() {
    state.subscribe(() => {
      const cs = state.getState();
      const ownerStatus = cs.playerStatus.owner.status;
      const guessStatus = cs.playerStatus.guess.status;
      if (ownerStatus === "READY" && guessStatus === "READY") {
        Router.go("/game");
      }
    });
  }

  waittingFor() {
    const messageEl = this.shadow.querySelector(".wait-room__text-container");
    const cs = state.getState();
    const ownerStatus = cs.playerStatus.owner.status;
    const ownerName = cs.playerStatus.owner.userName;
    const guessName = cs.playerStatus.guess.userName;
    const guessStatus = cs.playerStatus.guess.status;

    if (ownerStatus !== "READY") {
      messageEl.innerHTML = `
      <custom-text tag="h3" size="45px">Esperando a que ${ownerName} presione ¡Jugar!...</custom-text>
      `;
    }

    if (guessStatus !== "READY") {
      messageEl.innerHTML = `
      <custom-text tag="h3" size="45px">Esperando a que ${guessName} presione ¡Jugar!...</custom-text>
      `;
    }
    this.subscribe();
  }

  render() {
    const cs = state.getState();
    const { fsRoomId } = cs;
    const ownerName = cs.playerStatus.owner.userName;
    const ownerScore = cs.score.owner;
    const guessName = cs.playerStatus.guess.userName;
    const guessScore = cs.score.guess;
    const sectionEl = document.createElement("section");
    sectionEl.className = "wait-room";
    sectionEl.innerHTML = `
  <div class="wait-room__container">
    <div class="wait-room__header-container">
      <div class="wait-room__players-container">
        <custom-text tag="h3" size="24px">${ownerName}: ${ownerScore}</custom-text>
        <custom-text tag="h3" size="24px">${guessName}: ${guessScore}</custom-text>
      </div> 
      <div class="wait-room__room-container">
        <custom-text tag="h3" size="30px">Sala</custom-text>
        <custom-text size="24px">${fsRoomId}</custom-text>
      </div>
    </div>

    <div class="wait-room__text-container">
          
    </div>

    <div class="wait-room__container-hands">
        <hands-el tag="scissors" width="65px" height="125px"></hands-el>
        <hands-el tag="stone" width="65px" height="125px"></hands-el>
        <hands-el tag="paper" width="65px" height="125px"></hands-el>
    </div>
  </div>

  `;
    const style = document.createElement("style");
    style.innerHTML = `
    .wait-room__container{
        max-width:100%;
        height:100vh;
        padding:0px 26px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-between;
    }

    @media(min-width:376px){
      .wait-room__container{
        width:100%;
        padding:0px;
    }}

    .wait-room__header-container{
      width:100%;
      padding-top:20px;
      display:flex;
      align-items:center;
      justify-content:space-between;
    }

    @media(min-width:376px){
      .wait-room__header-container{
        width:375px;
      }}

    .wait-room__room-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      height:100px;
    }

    .wait-room__players-container{
      height:100px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .wait-room__text-container{
      height: 250px;
      flex-direction: column;
      display: flex;
      justify-content: space-around;
    }

    .wait-room__container-btn{
      width:322px;
      height:87px;
    }
    .wait-room__container-hands{
      width:273px;
      height:130px;
      display:flex;
      align-items:center;
      justify-content:space-between;
    }
    `;
    this.shadow.appendChild(sectionEl);
    this.shadow.appendChild(style);
    this.waittingFor();
  }
}
window.customElements.define("x-waitroom-page", WaitRoomPage);
