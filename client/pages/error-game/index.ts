import { state } from "../../state";
import { Router } from "@vaadin/router";

class ErrorGamePage extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    state.ownerStatus("");
    state.guessStatus("");
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
    sectionEl.className = "error-game";
    sectionEl.innerHTML = `
  <div class="error-game__container">
    <div class="error-game__title-container">
        <custom-text tag="h1" size="80px">Piedra, Papel, ó Tijera</custom-text>
    </div>

    <div class="error-game__text-container">
        <custom-text tag="h3" size="30px">Lo sentimos. Tu rival no jugo dentro del tiempo estipualdo, por  favor volve a ingresar</custom-text> 
    </div>

    <div class="error-game__btn-container">
        <custom-button class="btn__return-menu">Menú de inicio</custom-button>
    </div>

    <div class="error-game__container-hands">
        <hands-el tag="scissors" width="65px" height="125px"></hands-el>
        <hands-el tag="stone" width="65px" height="125px"></hands-el>
        <hands-el tag="paper" width="65px" height="125px"></hands-el>
    </div>
  </div>

  `;
    const style = document.createElement("style");
    style.innerHTML = `
    .error-game__container{
        max-width:100%;
        height:100vh;
        padding:0px 26px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-between;
    }

    
    @media(min-width:376px){
      .error-game__container{
        width:100%;
        height:100vh;
        padding:0px;
    }}

    .error-game__title-container{
      width:284px;
      height:280px;
      padding-top:20px;
    }
    
    .error-game__text-container{
      height: 150px;
    }

    @media(min-width:376px){
      .error-game__text-container{
        width: 300px;
      }
  }
    
    .error-game__btn-container{
        width:322px;| 
        height:87px;
      }

      .error-game__container-hands{
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

window.customElements.define("x-errorgame-page", ErrorGamePage);
