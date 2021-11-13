import { Router } from "@vaadin/router";

class GuessErrorPage extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  listeners() {
    const btnReturnMenu = this.shadow.querySelector(".btn__return-menu");
    btnReturnMenu.addEventListener("clickedButton", () => {
      Router.go("/welcome");
    });
  }
  render() {
    const sectionEl = document.createElement("section");
    sectionEl.className = "guess-status-error";
    sectionEl.innerHTML = `
  <div class="guess-status-error__container">
    <div class="guess-status-error__title-container">
        <custom-text tag="h1" size="80px">Piedra, Papel, ó Tijera</custom-text>
    </div>

    <div class="guess-status-error__text-container">
        <custom-text tag="h3" size="30px">Lo sentimos. Se cumplió el tiempo de espera y tú invitado no ingreso a la sala.</custom-text> 
    </div>

    <div class="guess-status-error__btn-container">
        <custom-button class="btn__return-menu">Menú de inicio</custom-button>
    </div>

    <div class="guess-status-error__container-hands">
        <hands-el tag="scissors" width="65px" height="125px"></hands-el>
        <hands-el tag="stone" width="65px" height="125px"></hands-el>
        <hands-el tag="paper" width="65px" height="125px"></hands-el>
    </div>
  </div>

  `;
    const style = document.createElement("style");
    style.innerHTML = `
    .guess-status-error__container{
        max-width:100%;
        height:100vh;
        padding:0px 26px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-between;
    }

    @media(min-width:376px){
      .guess-status-error__container{
        width:100%;
        height:100vh;
        padding:40px 26px 0px 26px;
    }}

    .guess-status-error__title-container{
      width:284px;
      height:280px;
      padding-top:20px;
    }

    .guess-status-error__text-container{
      height: 150px;
    }
    
    .guess-status-error__btn-container{
        width:322px;| 
        height:87px;
      }

      .guess-status-error__container-hands{
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

window.customElements.define("x-guesserror-page", GuessErrorPage);
