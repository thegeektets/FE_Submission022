import View from "./View.js";

export default class extends View {
  constructor(params) {
    super(params);
    this.setTitle("Login");
  }

  async getHtml() {
    return `<div class="login--form">
            <h1>Freddy's
            Artisanal
            Halloween
            Candy Shop
            </h1>
            <img src="./assets/imgs/logo.svg"/>

            <form id="loginForm">
                <input type="text" name="username" placeholder="Username" id="loginUsername"></input>
                <input type="password" name="password"placeholder="Password" id="loginPassword"></input>
                <button type="submit"> Login </button>
            </form>
            </div>
        `;
  }
}
