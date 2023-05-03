//hàm render thông tin khách hàng khi thanh toán

let currentUser = JSON.parse(localStorage.getItem("currentUser"))
let listUser = JSON.parse(localStorage.getItem("listUser"))
let form = document.querySelector(".form-information")

function renderInformation(){
   
    form.innerHTML = "";
    form.innerHTML = form.innerHTML +
    `
    <label for="name">Họ và tên</label>
		<input type="text" id="name" name="name" value="${listUser[0].fullName}" required>

		<label for="email">Email</label>
		<input type="email" id="email" name="email"value="${currentUser.email}" required>

		<label for="phone">Số điện thoại</label>
		<input type="tel" id="phone" name="phone" value="${listUser[0].phoneNumber}" required>

		<label for="address">Địa chỉ</label>
		<input type="text" id="address" name="address" value="${listUser[0].address}" required>

		<label for="payment">Phương thức thanh toán</label>
		<select id="payment" name="payment">
			<option value="creditcard">Thẻ tín dụng</option>
			<option value="paypal">PayPal</option>
			<option value="cod">Thanh toán khi nhận hàng</option>
		</select>

		<button class= "pay-btn" onclick="handlePayment()">Thanh Toán</button>
    `

}

renderInformation()

//hàm xóa các sản phẩm trong giỏ hàng
function handlePayment(){
    // Lấy giá trị phương thức thanh toán được chọn
    let payment = document.getElementById("payment").value;

    // Lưu thông tin sản phẩm vào local storage
    let currentDate = new Date().toISOString().slice(0, 10); // Lấy ngày hiện tại
    let purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) || [];
    let cartItem = JSON.parse(localStorage.getItem("cartItem"));
  
    console.log(purchasedItems)
    for (let i = 0; i < cartItem.length; i++) {
      let purchasedItem = {
        username:currentUser.username,
        image: cartItem[i].image,
        name: cartItem[i].name,
        price: cartItem[i].price,
        quantity: cartItem[i].quantity,
        date: currentDate,
        payment:payment,
      };
      purchasedItems.push(purchasedItem);
    }

  
    localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  
    // Hiển thị thông báo thanh toán thành công
    alert("Thanh toán thành công");
    localStorage.setItem("cartItem", JSON.stringify([]))
    // Chuyển về trang chủ
    window.location.href = "home.html";
  }
  

// //Hàm tìm kiếm sp


function searchProduct() {
  const input = document.querySelector(".search-box-input");
  const keyword = input.value.toLowerCase().trim();

  const productList = JSON.parse(localStorage.getItem("productList"));

  const foundProducts = productList.filter(
    (product) => product.name.toLowerCase().includes(keyword)
  );

  if (foundProducts.length > 0) {
    localStorage.setItem("foundProducts", JSON.stringify(foundProducts));
    window.location.href = "search.html";
  } else {
    alert("Không tìm thấy sản phẩm!");
  }
}

