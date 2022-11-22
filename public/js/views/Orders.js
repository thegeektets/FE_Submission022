import View from "./View.js";

export default class extends View {
  constructor(params) {
    super(params);
    this.setTitle("Posts");
  }

  async getHtml() {
    return `${this.setNav()}
            <h1>Orders</h1>
            <p>You are viewing the posts!</p>
        `;
  }
}