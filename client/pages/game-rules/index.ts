import { state } from "../../state";
import { Router } from "@vaadin/router";

class RulesPage extends HTMLElement {
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
      ownerStatus == "READY" && guessStatus === "READY"
        ? Router.go("/game")
        : Router.go("/waitroom");
    });
  }

  listeners() {
    const btnRules = this.shadow.querySelector(".btn__rules");
    const cs = state.getState();
    const { userName } = cs;
    const ownerName = cs.playerStatus.owner.userName;
    btnRules.addEventListener("clickedButton", () => {
      userName === ownerName
        ? state.ownerStatus("READY")
        : state.guessStatus("READY");
      this.subscribe();
    });
  }

  render() {
    const cs = state.getState();
    const { fsRoomId } = cs;
    const guessName = cs.playerStatus.guess.userName;
    const ownerName = cs.playerStatus.owner.userName;
    const sectionEl = document.createElement("section");
    sectionEl.className = "game-rules";
    sectionEl.innerHTML = `
  <div class="game-rules__container">
    <div class="game-rules__header-container">
      <div class="game-rules__players-container">
        <custom-text tag="h3" size="24px">${ownerName}</custom-text>
        <custom-text tag="h3" size="24px">${guessName}</custom-text>
      </div> 
      <div class="game-rules__room-container">
        <custom-text tag="h3" size="30px">Sala</custom-text>
        <custom-text size="24px">${fsRoomId}</custom-text>
      </div>
    </div>

    <div class="game-rules__text-container">
          <custom-text tag="h3" size="45px">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</custom-text>
    </div>

    <div class="game-rules__container-btn">
          <custom-button class="btn__rules">¡Jugar!</custom-button>
    </div>

    <div class="game-rules__container-hands">
        <hands-el tag="scissors" width="65px" height="125px"></hands-el>
        <hands-el tag="stone" width="65px" height="125px"></hands-el>
        <hands-el tag="paper" width="65px" height="125px"></hands-el>
    </div>
  </div>

  `;
    const style = document.createElement("style");
    style.innerHTML = `
    .game-rules__container{
        max-width:100%;
        height:100vh;
        padding:0px 26px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-between;
    }

    @media(min-width:376px){
      .game-rules__container{
        width:100%;
        height:100vh;
        padding:40px 26px 0px 26px;
    }}

    .game-rules__header-container{
      width:100%;
      padding-top:20px;
      display:flex;
      align-items:center;
      justify-content:space-between;
    }

    .game-rules__room-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      height:100px;
    }

    .game-rules__players-container{
      height:100px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .game-rules__text-container{
      height: 250px;
      flex-direction: column;
      display: flex;
      justify-content: space-around;
    }

    .game-rules__container-btn{
      width:322px;
      height:87px;
    }
    .game-rules__container-hands{
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
window.customElements.define("x-rules-page", RulesPage);
