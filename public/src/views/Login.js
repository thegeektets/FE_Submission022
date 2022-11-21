import View from "./View.js";

export default class extends View {
  constructor(params) {
    super(params);
    this.setTitle("Login");
  }


  async getHtml() {
    return`<div class="login--form">
            <h1>Freddy's
            Artisanal
            Halloween
            Candy Shop
            </h1>
            <img src="./assets/imgs/logo.svg"/>

            <form>
                <input type="text" placeholder="Username"></input>
                <input type="password" placeholder="Password"></input>
                <button> Login </button>
            </form>

            </div>
        `;
  }
}
