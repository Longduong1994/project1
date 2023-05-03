let admin = {
  userName: "LongDuong",
  email: "dglong1994@gmail.com",
  password: "Longduong12",
};

let loginButton = document.getElementById("btn-login");

loginButton.addEventListener("click", function (event) {
  event.preventDefault();
  let adminUserName = document.getElementById("userName").value;
  let adminEmail = document.getElementById("email").value;
  let adminPassword = document.getElementById("password").value;

  if (adminUserName.trim() === "" || adminEmail.trim() === "" || adminPassword.trim() === "") {
    alert("Vui lòng nhập đầy đủ thông tin đăng nhập");
    return;
  }

  if (localStorage.getItem(adminEmail) !== null) {
    let loginInfo = JSON.parse(localStorage.getItem(adminEmail));
    if (loginInfo.count >= 5 && new Date().getTime() - loginInfo.time < 5 * 60 * 1000) {
      alert("Bạn đã nhập sai mật khẩu quá nhiều lần, vui lòng thử lại sau 5 phút.");
      return;
    }
  }

  if (
    adminUserName === admin.userName &&
    adminEmail === admin.email &&
    adminPassword === admin.password
  ) {
    alert("Xin chào admin");
    localStorage.setItem(adminEmail, JSON.stringify({ count: 0, time: 0 }));
    window.location.href = "admin.html";
  } else {
    alert("Tên đăng nhập hoặc mật khẩu không đúng.");
    if (localStorage.getItem(adminEmail) === null) {
      localStorage.setItem(adminEmail, JSON.stringify({ count: 1, time: new Date().getTime() }));
    } else {
      let loginInfo = JSON.parse(localStorage.getItem(adminEmail));
      if (new Date().getTime() - loginInfo.time > 5 * 60 * 1000) {
        localStorage.setItem(adminEmail, JSON.stringify({ count: 1, time: new Date().getTime() }));
      } else {
        loginInfo.count += 1;
        localStorage.setItem(adminEmail, JSON.stringify(loginInfo));
      }
    }
  }
});
