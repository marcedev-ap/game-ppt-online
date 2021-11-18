import { state } from "../../state";

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
    console.log("ESTOY EN RESULTS!!!");

    const cs = state.getState();
    const { userName } = cs;
    const ownerName = cs.currentGame.owner.userName;
    const ownerMove = cs.currentGame.owner.move;
    const guessName = cs.currentGame.guess.userName;
    const guessMove = cs.currentGame.guess.move;
    const result = state.whoWins(ownerMove, guessMove);

    console.log("Soy el resultado", result);

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

  listeners() {}

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
            <custom-button class="button">Volver a jugar</custom-button>
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
  }
}
window.customElements.define("x-result-page", ResultPage);
