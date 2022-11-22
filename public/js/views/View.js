export default class {
  constructor(params) {
    this.params = params;
  }

  setTitle(title) {
    document.title = title;
  }

  setNav() {
    return `
    <nav class="nav" id="nav">
        <a href="/"
        <img src="http://localhost/FE_Submission022/public/assets/imgs/logo.svg"/>
        </a>
        <a href="/dashboard" class="nav__link" data-link>Dashboard</a>
        <a href="/orders" class="nav__link" data-link>Orders</a>
        <a href="/logout" class="nav__link" data-link>Logout</a>
    </nav>`;
  }

  async getHtml() {
    return "";
  }
}
