class RulesPage extends HTMLElement {
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
    this.listeners();
  }
}
window.customElements.define("x-rules-page", RulesPage);
