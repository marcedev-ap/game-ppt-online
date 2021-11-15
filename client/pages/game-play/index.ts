import { state } from "../../state";
import { Router } from "@vaadin/router";
class PlayPage extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.subscribe();
  }

  subscribe() {
    const cs = state.getState();
    const ownerName = cs.currentGame.owner.userName;
    const ownerMove = cs.currentGame.owner.move;
    const guessName = cs.currentGame.guess.userName;
    const guessMove = cs.currentGame.guess.move;
    const { userName } = cs;

    state.subscribe(() => {
      if (ownerMove !== "" && guessMove !== "") {
        if (userName === ownerName) {
          this.render(ownerMove, guessMove);
        } else {
          this.render(guessMove, ownerMove);
        }
      }
    });
  }

  render(localMove, remoteMove) {
    const gamePage = document.createElement("section");
    gamePage.className = "game";
    gamePage.innerHTML = `
    <div class="game__container">
      <div class="game__guess-container">
      <hands-el class="guess-hand" tag="${remoteMove}" width="90px" height="200px"></hands-el>
      </div>
      <div class="game__hands-container">
      <hands-el class="animation" tag="${localMove}" width="90px" height="200px"></hands-el>
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
  }
}
window.customElements.define("x-play-page", PlayPage);
