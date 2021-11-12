import { Router } from "@vaadin/router";

class AccessErrorPage extends HTMLElement {
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
    sectionEl.className = "acess-error";
    sectionEl.innerHTML = `
  <div class="access-error__container">
    <div class="access-error__title-container">
        <custom-text tag="h1" size="80px">Piedra, Papel, ó Tijera</custom-text>
    </div>

    <div class="access-error__text-container">
        <custom-text tag="h3" size="30px">Lo sentimos. La sala a la que intentas ingresar esta completa.</custom-text> 

    </div>

    <div class="access-error__btn-container">
        <custom-button class="btn__return-menu">Menú de inicio</custom-button>
    </div>

    <div class="access-error__container-hands">
        <hands-el tag="scissors" width="65px" height="125px"></hands-el>
        <hands-el tag="stone" width="65px" height="125px"></hands-el>
        <hands-el tag="paper" width="65px" height="125px"></hands-el>
    </div>
  </div>

  `;
    const style = document.createElement("style");
    style.innerHTML = `
    .access-error__container{
        max-width:100%;
        height:100vh;
        padding:0px 26px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-between;
    }

    @media(min-width:376px){
      .access-error__container{
        width:100%;
        height:100vh;
        padding:40px 26px 0px 26px;
    }}

    .access-error__title-container{
      width:284px;
      height:280px;
      padding-top:20px;
    }

    .access-error__text-container{
      height: 100px;
    }
    
    .access-error__btn-container{
        width:322px;
        height:87px;
      }

      .access-error__container-hands{
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

window.customElements.define("x-accesserror-page", AccessErrorPage);
