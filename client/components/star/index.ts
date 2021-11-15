const win = require("url:../../../src/assets/starWin.svg");
const lose = require("url:../../../src/assets/starLose.svg");
const tie = require("url:../../../src/assets/starTie.svg");

class StarComp extends HTMLElement {
  shadow: ShadowRoot;
  tag: string;
  imgURL: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.tag = this.getAttribute("tag");
  }

  connectedCallback() {
    this.selectImage();
    this.render();
  }
  selectImage() {
    this.tag == "Ganaste"
      ? (this.imgURL = win)
      : this.tag == "Perdiste"
      ? (this.imgURL = lose)
      : (this.imgURL = tie);
  }
  render() {
    const rootEl = document.createElement("div");
    rootEl.className = "root";
    const width = this.getAttribute("width") || "80px";
    const height = this.getAttribute("height") || "175px";
    const text = this.textContent;
    rootEl.innerHTML = `
      <img class="star" src="${this.imgURL}" alt="this is a star with a result inside">
      <p class="texto">${text}</p>
      `;
    const style = document.createElement("style");
    style.innerHTML = `
      .root{
        width:${width};
        height:${height};
        position:relative;
      }
      .star{
        width:${width};
        height:${height};
      }
      .texto{
        margin:0px;
        position:absolute;
        top:90px;
        left:70px;
        font-size:55px;
        color:var(--font-color);
      }
      `;
    this.shadow.appendChild(style);
    this.shadow.appendChild(rootEl);
  }
}

customElements.define("star-el", StarComp);
