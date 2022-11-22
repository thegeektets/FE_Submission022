document.addEventListener("DOMContentLoaded", () => {
  console.log("document.title", document.title);
  document.querySelector("#app").addEventListener("submit", function (event) {
    event.preventDefault();
    let loginForm = event.target;
    let loginData = new FormData(loginForm);
    let payload = {
      username: loginData.get("username").toString(),
      password: loginData.get("password").toString(),
    };

    console.log("payload", JSON.stringify(payload));

    let loginUrl = "https://freddy.codesubmit.io/login";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", loginUrl, true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onload = function () {
      let jsonResponse = JSON.parse(xhr.response);
      console.log(jsonResponse);

      // do something to response
      if (xhr.status === 200) {
        swal("Login Success!", "user logged in", "success");
        localStorage.setItem('access_token', jsonResponse.access_token);
        localStorage.setItem('refresh_token', jsonResponse.refresh_token);
        history.pushState(null, null, '/dashboard');
        router();
      } else {
        swal("Login Failed!", jsonResponse.msg, "error");
      }
    };
    xhr.send(JSON.stringify(payload));
  });
});
