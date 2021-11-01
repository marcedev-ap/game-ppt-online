class CustomForm extends HTMLElement {
  shadow: ShadowRoot;
  label: string;
  text: string;
  switchLabel: string;
  placeholder: string;
  id: string;
  name: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.label = this.getAttribute("label");
    this.text = this.getAttribute("text");
    this.switchLabel = this.getAttribute("switchLabel");
    this.placeholder = this.getAttribute("placeholder");
  }
  connectedCallback() {
    this.render();
  }
  listeners() {
    // this.shadow
    //   .querySelector(".custom-button")
    //   .addEventListener("click", (e) => {
    //     const event = new CustomEvent("clickedButton");
    //     this.dispatchEvent(event);
    //   });
  }
  render() {
    const formEl = document.createElement("form");
    formEl.className = "form";
    formEl.innerHTML = `
      <fieldset class="form__fieldset-container">
        <label class="form__label" for="${this.id}">${this.label}</label>
        <input class="form__input" type="text" id="${this.id}" name="${this.name}" placeholder="${this.placeholder}" autofocus>
      </fieldset>
      <div class="form__btn-container">
        <custom-button class="btn__enter-room">${this.text}</custom-button> 
      </div>
    `;
    const style = document.createElement("style");
    style.innerHTML = `
    .form{
      width:100%;
      height:242px;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:space-between;
    }
    .form__fieldset-container{

    }
    .form__label{}
    .form__input{}
    .form__btn-container{
      width:322px;
      height:87px;
    }
    `;
    this.shadow.appendChild(style);
    this.shadow.appendChild(formEl);
    this.listeners();
  }
}
customElements.define("custom-form", CustomForm);
