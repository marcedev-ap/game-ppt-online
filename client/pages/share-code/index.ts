import { state } from "../../state";
import { Router } from "@vaadin/router";
class ShareCodePage extends HTMLElement {
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
      Router.go("/guesserror");
    }, 20 * 1000);

    state.subscribe(() => {
      const cs = state.getState();
      const guessStatus = cs.playerStatus.guess.status;
      const guessUserName = cs.playerStatus.guess.userName;
      const ownerStatus = cs.playerStatus.owner.status;

      if (guessStatus == "ON" && guessUserName !== "" && ownerStatus == "ON") {
        Router.go("/gamerules");
        clearTimeout(temp);
      }
    });
  }

  render() {
    const cs = state.getState();
    const { fsRoomId } = cs;
    const sectionEl = document.createElement("section");
    sectionEl.className = "share-code";
    sectionEl.innerHTML = `
  <div class="share-code__container">
  <div class="share-code__header-container">
          <custom-text tag="h3" size="30px">Sala</custom-text>
          <custom-text size="24px">${fsRoomId}</custom-text>
    </div>

    <div class="share-code__text-container">
          <custom-text tag="h3" size="45px">Compartí el código:</custom-text>
          <custom-text tag="h1" size="75px">${fsRoomId}</custom-text>
          <custom-text tag="h3" size="45px">Con tu contrincante</custom-text>
    </div>

    <div class="share-code__container-hands">
        <hands-el tag="scissors" width="65px" height="125px"></hands-el>
        <hands-el tag="stone" width="65px" height="125px"></hands-el>
        <hands-el tag="paper" width="65px" height="125px"></hands-el>
    </div>
  </div>

  `;
    const style = document.createElement("style");
    style.innerHTML = `
    .share-code__container{
        max-width:100%;
        height:100vh;
        padding:0px 26px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-between;
    }

    @media(min-width:376px){
      .share-code__container{
        width:100%;
        height:100vh;
        padding:40px 26px 0px 26px;
    }}

    .share-code__header-container{
      width:284px;
      height:100px;
      padding-top:20px;
      display:flex;
      flex-direction:column;
      align-items:end;
    }

    .share-code__text-container{
      height: 250px;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
      .share-code__container-hands{
        width:273px;
        height:130px;
        display:flex;
        align-items:center;
        justify-content:space-between;
      }
    `;
    this.shadow.appendChild(sectionEl);
    this.shadow.appendChild(style);
    this.subscribe();
  }
}
window.customElements.define("x-sharecode-page", ShareCodePage);
