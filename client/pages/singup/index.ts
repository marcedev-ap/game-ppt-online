class SingUpPage extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  listeners() {}
  render() {
    const sectionEl = document.createElement("section");
    sectionEl.className = "welcome";
    sectionEl.innerHTML = `
  <div class="welcome__container">
   <custom-form label="Tu Nombre" id="name" switchLabel="true" placeholder="Ingrese su nombre" text="Empezar" ></custom-form>
  </div>
  `;
    // const style = document.createElement("style");
    // style.innerHTML = `
    // .welcome__container{
    //     max-width:100%;
    //     height:100vh;
    //     padding:0px 26px;
    //     display:flex;
    //     flex-direction:column;
    //     align-items:center;
    //     justify-content:space-between;
    // }
    // @media(min-width:376px){
    //   .welcome__container{
    //     width:100%;
    //     height:100vh;
    //     padding:40px 26px 0px 26px;
    // }}

    // .welcome__container-title{
    //   width:284px;
    //   height:280px;
    //   padding-top:20px;
    // }

    // .welcome__container-btns{
    //     height:195px;
    //     display:flex;
    //     flex-direction:column;
    //     justify-content:space-between;
    //   }

    //   .welcome__container-btn{
    //     width:322px;
    //     height:87px;
    //   }
    //   .welcome__container-hands{
    //     width:273px;
    //     height:130px;
    //     display:flex;
    //     align-items:center;
    //     justify-content:space-between;
    //   }
    // `;
    this.shadow.appendChild(sectionEl);
    // this.shadow.appendChild(style);
    this.listeners();
  }
}
window.customElements.define("x-signup-page", SingUpPage);
