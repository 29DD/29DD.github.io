window.addEventListener("scroll", function () {
  var aTag = document.querySelector(".navbar a");


  if (window.pageYOffset > 0) {
  
    aTag.style.transform = "translateX(-120%)";
  } else {

    aTag.style.transform = "translateX(0)";
  }
});






/*點擊a標籤換banner*/

document.querySelectorAll(".col-md-3 a").forEach(function (element) {
  element.addEventListener("click", function () {
    var classList = this.className.split(" ");
    var src;

    classList.forEach(function (className) {
      switch (className) {
        case "all":
          src = "./img/banner.jpg";
          break;
        case "life":
          src = "./img/life.jpg";
          break;
        case "clothes":
          src = "./img/clothes.jpg";
          break;
        case "tea":
          src = "./img/tea.jpg";
          break;
        case "delicacies":
          src = "./img/delicacies.jpg";
          break;
      }
    });

    if (!src) {
      src = "./img/banner.jpg";
    }

    console.log(src);
    document.querySelector(".banner").style.backgroundImage =
      "url(" + src + ")";
    document.querySelector("footer").style.backgroundImage = "url(" + src + ")";
  });
});

// 檢查當前屏幕寬度是否大於768px
var mediaQuery = window.matchMedia("(max-width: 768px)");

// 定義要刪除sticky-top類別的元素
var element = document.getElementById("remove_sticky");

// 當屏幕寬度大於768px時，刪除sticky-top類別
function handleTabletChange(e) {
  if (e.matches) {
    element.classList.remove("sticky-top");
  } else {
    element.classList.add("sticky-top");
  }
}
// 監聽當前屏幕寬度是否發生變化
mediaQuery.addEventListener("change", handleTabletChange);
// 初次載入時檢查當前屏幕寬度
handleTabletChange(mediaQuery);

// Get the "購買去" button element
let totalPrice = 0;
let productName = "";
const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
console.log(addToCartBtn);
// Add a click event listener to the button
addToCartBtn.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    // Get the product name and price from the card
    productName =
      this.parentNode.parentNode.parentNode.querySelector(
        ".card-title"
      ).innerText;
    const productPrice =
      this.parentNode.parentNode.parentNode.querySelector(
        ".card-body span"
      ).innerText;

    // 將價格加到總金額中
    totalPrice += parseFloat(productPrice.substring(1));
    // 取得 ID 為 totalPrice 的元素
    const totalPriceElement = document.getElementById("totalPrice");
    console.log(totalPriceElement);
    // 計算新的總價格
    let newTotalPrice = totalPrice ;
    // 更新總價格元素的文字內容
    totalPriceElement.innerText ="總金額：" +"$" + newTotalPrice.toFixed(0);

    // Get the table body and rows
    const tableBody = document.querySelector("tbody");
    const rows = tableBody.querySelectorAll("tr");
    let totalQuantity = 0;
    // Loop through the rows to see if the product is already in the table
    let productAlreadyInCart = false;
    rows.forEach((row) => {
      const rowProductName = row
        .querySelector("td:nth-child(2)")
        .getAttribute("data-title");
      if (rowProductName === productName) {
        // If the product is already in the table, increment the quantity and update the total price
        const quantityElement = row.querySelector("td:nth-child(3)");
        const currentQuantity = parseInt(quantityElement.innerText);
        quantityElement.innerText = currentQuantity + 1 + " 件";
        const priceElement = row.querySelector("td:nth-child(4)");
        const currentPrice = parseFloat(priceElement.innerText.substring(1));
        const newPrice = currentPrice; /*parseFloat(productPrice.substring(1))*/
        priceElement.innerText = "$" + newPrice.toFixed(0);
        productAlreadyInCart = true;
         // Increment total quantity
      totalQuantity++;
      }
    });
    if (!productAlreadyInCart) {
      // If the product is not already in the table, create a new row and add it to the table
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
      <td class="align-middle text-center">
        <a href="#removeModal" class="text-muted" data-bs-toggle="modal" data-bs-target="#removeModal" data-title="刪除 ${productName}">
          <i class="fas fa-trash-alt" aria-hidden="true"></i>
        </a>
      </td>
      <td class="align-middle" data-title="${productName}">${productName}</td>
      <td class="align-middle">1 件</td>
      <td class="align-middle text-right" data-price="${productPrice}">${productPrice}</td>
    `;
      tableBody.appendChild(newRow);
    }
    // Update the cart count in the badge
    const cartCount = document.querySelectorAll("tbody tr").length;
    const badgeElement = document.querySelector(".badge");
    badgeElement.innerText++;
  });
});

function updateTotalPrice() {
  // 取得 ID 為 totalPrice 的元素
  const totalPriceElement = document.getElementById("totalPrice");
  // 計算新的總價格
  let newTotalPrice = 0;
  const cartRows = document.querySelectorAll("tbody tr");
  cartRows.forEach((row) => {
    const quantity = parseInt(row.querySelector("td:nth-child(3)").innerText);
    const price = parseFloat(row.querySelector("td:nth-child(4)").getAttribute("data-price").substring(1));
    newTotalPrice += quantity * price;
  });
  // 更新總價格元素的文字內容
  totalPriceElement.innerText = "總金額：" + "$" + newTotalPrice.toFixed(0);
  // 將 totalPrice 變數更新為新的總價格
  totalPrice = newTotalPrice;
}

/* Modal 載入資料*/
var editModal = document.getElementById("editModal");
editModal.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget;
  var title = button.getAttribute("data-title");
  var modalTitle = editModal.querySelector(".modal-title");
  modalTitle.textContent = title;
  console.log(title);
});

/* removeModal */
// var removeModal = document.getElementById("removeModal");


removeModal.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget;
  var title = button.getAttribute("data-title");
  var modalTitle = removeModal.querySelector(".modal-title");
  modalTitle.textContent = title;
  console.log(title);
});



/*點擊確認刪除*/
var confirmButton = document.querySelector(
  "#removeModal .modal-footer button.btn-outline-danger"
);
confirmButton.addEventListener("click", function (event) {
  // Find the <tr> element to remove
  var rowToRemove = document.querySelector(
    `[data-title="${productName}"]`
  ).parentElement;

  rowToRemove.remove();
   // 重新計算總金額
   updateTotalPrice();
});


// 取得確認按鈕元素
const confirmBtn = document.getElementById("confirmBtn");

// 在確認按鈕上新增 click 事件監聽器
confirmBtn.addEventListener("click", function () {
  // 關閉 modal
  const removeModal = document.getElementById("removeModal");
  const modal = bootstrap.Modal.getInstance(removeModal);
  modal.hide();
});


/* Modal 載入資料 end*/





