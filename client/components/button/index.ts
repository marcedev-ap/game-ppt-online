class CustomButton extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  listeners() {
    this.shadow
      .querySelector(".custom-button")
      .addEventListener("click", (e) => {
        const event = new CustomEvent("clickedButton");
        this.dispatchEvent(event);
      });
  }
  render() {
    const button = document.createElement("button");
    button.classList.add("custom-button");
    button.textContent = this.textContent;
    const style = document.createElement("style");
    style.innerHTML = `
    .custom-button{
      box-sizing:border-box;
      width:100%;
      height:100%;
      color:var(--btn-fontColor);
      background-color:var(--btn-bg);
      margin:0 auto;
      font-family: "Odibee Sans", cursive;
      font-size:45px;
      border:10px solid var(--btn-border);
      border-radius:10px; 
    }
    `;
    this.shadow.appendChild(style);
    this.shadow.appendChild(button);
    this.listeners();
  }
}
customElements.define("custom-button", CustomButton);
