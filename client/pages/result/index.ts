import { state } from "../../state";
import { Router } from "@vaadin/router";

class ResultPage extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.checkView();
  }

  checkView() {
    const cs = state.getState();
    const { userName } = cs;
    const ownerName = cs.currentGame.owner.userName;
    const ownerMove = cs.currentGame.owner.move;
    const guessName = cs.currentGame.guess.userName;
    const guessMove = cs.currentGame.guess.move;
    const result = state.whoWins(ownerMove, guessMove);
    state.calcScore();

    if (userName === ownerName) {
      this.render(result);
    }

    if (userName === guessName) {
      result === "Perdiste"
        ? this.render("Ganaste")
        : result === "Ganaste"
        ? this.render("Perdiste")
        : this.render(result);
    }
  }

  subscribe() {
    state.subscribe(() => {
      const cs = state.getState();
      const ownerStatus = cs.playerStatus.owner.status;
      const ownerMove = cs.currentGame.owner.move;
      const guessStatus = cs.playerStatus.guess.status;
      const guessMove = cs.currentGame.guess.move;
      if (
        ownerStatus == "AGAIN" &&
        guessStatus == "AGAIN" &&
        ownerMove == "" &&
        guessMove == ""
      ) {
        Router.go("/gamerules");
      }
    });
  }

  listeners() {
    const btnEl = this.shadow.querySelector(".results__btn");
    btnEl.addEventListener("clickedButton", () => {
      const cs = state.getState();
      const { userName } = cs;
      const ownerName = cs.playerStatus.owner.userName;
      const guessName = cs.playerStatus.guess.userName;
      if (userName == ownerName) {
        cs.currentGame.owner.move = "";
        state.setState(cs);
        state.ownerMove();
      }

      if (userName == guessName) {
        cs.currentGame.guess.move = "";
        state.guessMove();
      }
    });
  }

  selectBackGround(result) {
    let background = "";
    result == "Ganaste"
      ? (background = "#888949E5")
      : result == "Perdiste"
      ? (background = "#894949E5")
      : (background = "#F7B563");
    return background;
  }

  render(result) {
    const background = this.selectBackGround(result);
    const cs = state.getState();
    const ownerName = cs.currentGame.owner.userName;
    const guessName = cs.currentGame.guess.userName;
    const ownerScore = cs.score.owner;
    const guessScore = cs.score.guess;

    const resultsPage = document.createElement("section");
    resultsPage.className = "results";
    resultsPage.innerHTML = `
      <div class="results__container">
        <div class="results__container-img">
        <star-el tag="${result}" width="260px" height="260px">${result}</star-el>
        </div>
        <div class="results__container-score">
            <div class="results__container-title">
                <custom-text size="55px">Score</custom-text>
            </div>
            <div class="results__container-results">
                <custom-text size="45px">${ownerName}:${ownerScore}</custom-text>
                  <custom-text size="45px">${guessName}:${guessScore}</custom-text>
            </div>
        </div>
        <div class="results__container-btn">
            <custom-button class="results__btn">Volver a jugar</custom-button>
        </div>
      </div>
      `;
    const style = document.createElement("style");
    style.innerHTML = `
        .results__container{
            width:100%;
            height:100vh;
            padding:35px 20px;
            background-color: ${background};
            display:flex;
            flex-direction:column;
            align-items:center;
        }
        .results__container-img{
            width:255px;
            height:260px;
            margin-bottom:10px;
        }
        .results__container-score{
          width:259px;
          height:217px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:space-evenly;
          margin-bottom:20px;
          border:10px solid #000;
          border-radius:10px;
          background-color: aliceblue;
        }
        .results__container-results{
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .results__container-btn{
          width:322px;
          height:87px;
        }
      `;
    this.shadow.appendChild(resultsPage);
    this.shadow.appendChild(style);
    this.listeners();
    this.subscribe();
  }
}
window.customElements.define("x-result-page", ResultPage);
