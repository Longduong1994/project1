// check login so sánh tài khoản và mật khẩu

function checkLogin() {
  // Lấy thông tin người dùng nhập vào
  let username = document.getElementsByName("user")[0].value;
  let password = document.getElementsByName("password")[0].value;

  // Lấy danh sách tài khoản từ localStorage
  let storedUsers = JSON.parse(localStorage.getItem("user")) || [];

  // Tìm kiếm tài khoản phù hợp
  let matchedUser = storedUsers.find(function (user) {
    return user.username === username && user.password === password;
  });

  // Kiểm tra tài khoản phù hợp có phải là admin hay không
  if (
    matchedUser &&
    matchedUser.username === "LongDuong" &&
    matchedUser.password === "Longduong12"
  ) {
    alert("Xin chào Admin!!");
    window.location.href = "admin.html";
  } else if (matchedUser) {
    localStorage.setItem("currentUser", JSON.stringify(matchedUser));
    alert("Đăng nhập thành công ");
    window.location.href = 'home.html';
  } else {
    alert("Tài khoản hoặc mật khẩu không đúng!");
  }

  if (localStorage.getItem("currentUser")) {
    // Nếu có currentUser trong local
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    document.getElementById("login-user").style.display = "none";
  } else {
    // Nếu không có currentUser trong local
    console.log("Vui lòng đăng nhập để sử dụng các chức năng của trang web.");
  }
}

// add sự kiện đăng nhập

let loginButton = document.getElementById("btn-login");

loginButton.addEventListener("click", function (event) {
  event.preventDefault();
  checkLogin();
});
