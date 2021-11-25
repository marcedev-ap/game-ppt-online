import { state } from "../../state";
import { Router } from "@vaadin/router";
class GamePage extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  subscribe() {
    const temp = setTimeout(() => {
      Router.go("/errorgame");
    }, 4 * 1000);

    state.subscribe(() => {
      const cs = state.getState();
      const ownerStatus = cs.playerStatus.owner.status;
      const guessStatus = cs.playerStatus.guess.status;
      const ownerMove = cs.currentGame.owner.move;
      const guessMove = cs.currentGame.guess.move;

      if (
        ownerMove !== "" &&
        guessMove !== "" &&
        ownerStatus == "READY" &&
        guessStatus == "READY"
      ) {
        clearTimeout(temp);
        Router.go("/play");
      }
    });
  }

  listeners() {
    const cs = state.getState();
    const ownerName = cs.playerStatus.owner.userName;
    const guessName = cs.playerStatus.guess.userName;
    const { userName } = cs;
    const containerHands = this.shadow.querySelector(".game__hands-container");
    const handsEls = containerHands.querySelectorAll("hands-el");

    for (const hand of handsEls) {
      hand.addEventListener("change", (e: any) => {
        if (userName === ownerName) {
          (cs.currentGame.owner.userName = ownerName),
            (cs.currentGame.owner.move = e.detail.myPlay),
            hand.classList.add("move");
          state.setState(cs);
          state.ownerMove();
        }

        if (userName === guessName) {
          (cs.currentGame.guess.userName = guessName),
            (cs.currentGame.guess.move = e.detail.myPlay),
            hand.classList.add("move");
          state.setState(cs);
          state.guessMove();
        }
      });
    }
  }

  render() {
    const gamePage = document.createElement("section");
    gamePage.className = "game";
    gamePage.innerHTML = `
    <div class="game__container">
      <div class="game__guess-container"></div>
      <div class="game__countdown-container">
        <custom-countdown count="3"></custom-countdown>
      </div>
      <div class="game__hands-container">
        <hands-el class="opacity-hands" tag="scissors" width="90px" height="200px"></hands-el>
        <hands-el class="opacity-hands" tag="stone" width="90px" height="200px"></hands-el>
        <hands-el class="opacity-hands" tag="paper" width="90px" height="200px"></hands-el>
      </div>
    </div>
    `;
    const style = document.createElement("style");
    style.innerHTML = `
    .game{
      max-width:375px;
      height:100vh;
    }

    @media(min-width:376px){
    .game{
      max-width:100%;
      height:100vh;
    }
  }
    .game__container{
      width:100%;
      height:100%;
      display:flex;
      flex-direction:column;
      align-items:center;
      position:relative;
    }

    .game__container--justify{
      justify-content:space-around;
    }
  
    .game__countdown-container{
      margin-top:20px;
    }

    .game__hands-container{
      width:375px;
      height:200px;
      display:flex;
      align-items:center;
      justify-content:space-around;
      position:absolute;
      bottom:0px;
    }

    .opacity-hands{
      opacity:0.7;
    }

    .move{
      transform:translateY(-30px) scaleY(1.3);
      opacity:1;
    }

    .animation{
      transform: translateY(-50px) scaleY(1.5);
      position:absolute;
      bottom:0px;
      left:150px; 
    }  

    .game__guess-container{
      width:375px;
      position:absolute;
      top:0;
    }

    .guess-hand{
      transform:rotateX(180deg) scaleY(1.5) translateY(-30px);
      position:absolute;
      left:150px; 
    }

    .game__container-return-title{
      max-width:300px;
    }
    `;

    this.shadow.appendChild(gamePage);
    this.shadow.appendChild(style);
    this.listeners();
    this.subscribe();
  }
}
window.customElements.define("x-game-page", GamePage);
