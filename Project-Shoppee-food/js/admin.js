
// Hàm chuyển đổi file ảnh sang dạng base64
function convertImageToBase64(image) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// Hàm render bảng sản phẩm
function renderProductTable() {
  const productTable = document.querySelector("#product-list-admin tbody");
  // Xóa toàn bộ nội dung bảng cũ
  productTable.innerHTML = "";

  // Lấy ra danh sách sản phẩm từ localStorage
  const productList = JSON.parse(localStorage.getItem("productList")) || [];

  for (let i = 0; i < productList.length; i++) {
    const product = productList[i];

    // Tạo HTML cho từng sản phẩm trong bảng
    const productHtml = `
      <tr>
        <td class="id">${product.id}</td>
        <td class="td-img"><img src="${product.image}" alt="${product.name}"></td>
        <td>${product.name}</td>
        <td>${product.classify}</td>
        <td><span>${product.price}</span><sup>đ</sup></td>
        <td><span>${product.discounts}</span><sup>%</sup></td>
        <td>${product.rating}<i class="bi bi-star-fill" style="color:red"></i></td>
        <td>${product.description}</td>
        <td>
          <button type="button" id="edit-btn-${product.id}" class="edit-btn">Sửa</button>
          <button type="button" id="delete-btn-${product.id}" class="delete-btn">Xóa</button>
        </td>
      </tr>
    `;

    // Thêm HTML sản phẩm vào bảng
    productTable.innerHTML += productHtml;
  }
}

// Render bảng sản phẩm khi tải trang
renderProductTable();

// Hàm thêm sản phẩm
async function addProduct() {
  const productList = JSON.parse(localStorage.getItem("productList")) || [];

  // Lấy giá trị của các trường dữ liệu từ form
  const name = document.querySelector("#product-name").value;
  const classify = document.querySelector("#product-classify").value;
  const price = document.querySelector("#product-price").value;
  const description = document.querySelector("#product-description").value;
  const discounts = document.querySelector("#product-discounts").value;
  const rating = document.querySelector("#product-rating").value;
  const imageInput = document.querySelector("#image");
  const image = await convertImageToBase64(imageInput.files[0]);
  let id = productList.length + 1;
  console.log(name)
  console.log(discounts)
  // Tạo một đối tượng mới chứa thông tin sản phẩm
  const newProduct = {
    id: id,
    name,
    classify,
    price,
    description,
    rating,
    discounts,
    image,
  };

  // Thêm sản phẩm mới vào danh sách
  productList.push(newProduct);

  // Lưu lại danh sách sản phẩm vào localStorage
  localStorage.setItem("productList", JSON.stringify(productList));

  // Hiển thị thông báo thành công
  alert("Thêm sản phẩm thành công!");
  document.querySelector("#image").value = "";
  document.querySelector("#product-name").value = "";
  document.querySelector("#product-classify").value = "";
  document.querySelector("#product-price").value = "";
  document.querySelector("#product-discounts").value = "";
  document.querySelector("#product-rating").value = "";
  document.querySelector("#product-description").value = "";
  // Reset form
  // productForm.reset();

  // Hiển thị danh sách sản phẩm
  renderProductTable();
}

// Thêm sự kiện click cho nút Thêm sản phẩm
let addBtn = document.querySelector("#add-btn");
addBtn.addEventListener("click", addProduct);

// Hàm sửa sản phẩm
const tbody = document.querySelector(".tbody-product");
let updateIndex = -1;

tbody.addEventListener("click", async function (e) {
  const productList = JSON.parse(localStorage.getItem("productList")) || [];
  if (e.target.classList.contains("edit-btn")) {
    const row = e.target.closest("tr");
    const id = row.querySelector(".id").textContent;

    let findIndex = -1;
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].id === Number(id)) {
        findIndex = i;
        break; // Thoát khỏi vòng lặp khi tìm thấy sản phẩm
      }
    }

    if (findIndex > -1) {
      updateIndex = findIndex;
      const td = e.target.parentElement.parentElement;
      const product = productList[updateIndex];

      td.innerHTML = `
        <td class="id">${product.id}</td>
        <td class="td-img"><input type="file" id="image" name="image" accept="image/*" required></td>
        <td><input type="text" id="product-name" name="product-name" value="${product.name}" required></td>
        <td><input type="text" id="product-classify" name="product-classify" value="${product.classify}" required></td>
        <td><input type="number" id="product-price" name="product-price" value="${product.price}" required></td>
        <td><input type="number" id="product-discounts" name="product-discounts" value="${product.discounts}" required></td>
        <td><input type="number" id="product-rating" name="product-rating" value="${product.rating}" required></td>
        <td><textarea id="product-description" name="product-description" rows="5" required>${product.description}</textarea></td>
        <td>
          <button type="button" class="change-btn">Cập nhật</button>
          <button type="button" class="cancel-btn">Quay lại</button>
        </td>
      `;
    }
  } else if (e.target.classList.contains("change-btn")) {
    const td = e.target.parentElement.parentElement;
    const img = td.querySelector("#image").files[0];
    const image = await convertImageToBase64(img);
    const name = td.querySelector("#product-name").value;
    const classify = td.querySelector("#product-classify").value;
    const price = td.querySelector("#product-price").value;
    const discounts = td.querySelector("#product-discounts").value;
    const rating = td.querySelector("#product-rating").value;
    const description = td.querySelector("#product-description").value;

    productList[updateIndex] = {
      ...productList[updateIndex],
      image,
      name,
      classify,
      price,
      discounts,
      rating,
      description,
    };

    localStorage.setItem("productList", JSON.stringify(productList));
    renderProductTable();
  } else if (e.target.classList.contains("cancel-btn")) {
    renderProductTable();
  }

  // Hàm xóa sản phẩm
  if (e.target.classList.contains("delete-btn")) {
    const row = e.target.closest("tr");
    const id = row.querySelector(".id").textContent;
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].id === Number(id)) {
        findIndex = i;
        break;
      }
    }
    if (findIndex > -1) {
      productList.splice(findIndex, 1);
      localStorage.setItem("productList", JSON.stringify(productList));

      // Giảm giá trị của id trên local storage
      let deletedCount = 0;
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].id > Number(id)) {
          productList[i].id--;
          deletedCount++;
          console.log(productList[i].id);
        }
      }
      localStorage.setItem("productList", JSON.stringify(productList));

      // Render lại bảng sản phẩm
      renderProductTable();
    }
    deleteProduct(id);
  }
});

//hàm render thông tin khách hàng
let user = JSON.parse(localStorage.getItem("user"));
let listUser = JSON.parse(localStorage.getItem("listUser"));
let info = document.getElementById("tbody-user")

function renderUserInformation(){
info.innerHTML = "";
for(let i = 0; i < listUser.length;i++){
  info.innerHTML += `
  <tr>
  <td>${listUser[i].id}</td>
  <td class = "image"><img src="${listUser[i].img}"></td>
  <td>${listUser[i].fullName}</td>
  <td>${listUser[i].dateOfBirth}</td>
  <td>${listUser[i].gender}</td>
  <td>${listUser[i].phoneNumber}</td>
  <td>${listUser[i].address}</td>
  <td>${listUser[i].feedBack}</td>
  <td></td>
</tr> 
  `
}
}
renderUserInformation()