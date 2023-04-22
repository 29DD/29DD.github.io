


/*index JS*/

/*INITIALIZE AOS*/
/*AOS 初始化*/
AOS.init();
/*data-aos*/


if (window.innerWidth < 576) {
  var elements =
    document.getElementsByClassName(
      "data-aos"
    ); /*所有html中有data-aos類別的元素*/
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute("data-aos-anchor-placement", "center-bottom");
  }
}

/*刪除箭頭*/
window.addEventListener("scroll", function () {
  const elements = document.querySelectorAll(".down");
  elements.forEach(function (element) {
    element.style.transition = "opacity 2s";
    element.style.opacity = 0;
    setTimeout(function () {
      element.remove();
    }, 2000);
  });
});



/*src location*/
/*點擊首頁更換商品頁banner*/
document.querySelectorAll(".img_wrap a").forEach(function (element) {
  element.addEventListener("click", function () {
    var id = this.id;
    var src = this.getElementsByTagName("img")[0].src || ""; // 沒有 img 標籤，將 src 設為空字串
    localStorage.setItem("bannerId", id);
    localStorage.setItem("bannerSrc", src);
    window.location.href = "shoppingCart.html";
  });
});

/*index JS end*/
/*shoppingCart*/
/*header bg*/
/*移除header背景色並將商標移出的方法*/
// var containerFluid = document.querySelector(".container-fluid");
// var aTags = containerFluid.querySelectorAll("a");


/*shoppingCart end*/


/*src location*/
/*點擊首頁更換商品頁banner*/
window.onload = function () {
  var src = localStorage.getItem("bannerSrc");
  var id = localStorage.getItem("bannerId");
  var links = document.querySelectorAll("a");

  document.querySelectorAll("div").forEach(function (element) {
    if (element.id.includes(id)) {
      element.classList.add("active");
    }
  });
  links.forEach(function (link) {
    if (link.classList.contains(id)) {
      link.classList.add("active");
    }
  });
  if (id === "all") {
    document.querySelector(".banner").style.backgroundImage =
      "url('./img/banner.jpg')";
     document.querySelector("footer").style.backgroundImage =
      "url('./img/banner.jpg')";
  } else if (src) {
    document.querySelector(".banner").style.backgroundImage =
      "url('" + src + "')";
      document.querySelector("footer").style.backgroundImage =
      "url('" + src + "')";
  }
};



