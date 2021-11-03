class CustomForm extends HTMLElement {
  shadow: ShadowRoot;
  label: string;
  text: string;
  // switchLabel: string;
  placeholder: string;
  id: string;
  name: string;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.label = this.getAttribute("label");
    this.text = this.getAttribute("text");
    this.name = this.getAttribute("name");
    this.id = this.getAttribute("id");
    // this.switchLabel = this.getAttribute("switchLabel");
    this.placeholder = this.getAttribute("placeholder");
  }
  connectedCallback() {
    this.render();
  }
  listeners() {
    const inputEl = this.shadow.querySelector(".form__input") as any;
    this.shadow.querySelector(".form").addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      let value = target.name.value;
      const event = new CustomEvent("submitForm", {
        detail: { value: value },
      });
      this.dispatchEvent(event);
      inputEl.value = "";
    });
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
        <button class="form__btn">${this.text}</button> 
      </div>
    `;
    const style = document.createElement("style");
    style.innerHTML = `
    .form{
      width:100%;
      height:235px;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:space-between;
    }
    .form__fieldset-container{
      box-sizing: border-box;
      width:100%;
      border:none;
      padding:0px;
      margin:0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .form__label{
      display: block;
      margin-bottom:1px;
      font-size:45px;
    }
    .form__input{
      box-sizing: border-box;
      width:319px;
      height:84px;
      border: 10px solid #182460;
      border-radius: 10px;
      font-size:16px;
    }
    .form__input::placeholder{
      font-size:16px;
      padding:3px;
    }
    .form__btn-container{
      width:322px;
      height:87px;
    }

    .form__btn{
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
    this.shadow.appendChild(formEl);
    this.listeners();
  }
}
customElements.define("custom-form", CustomForm);
