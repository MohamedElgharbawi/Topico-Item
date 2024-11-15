let myCart = document.querySelector(".my-cart");
let bodyofcart = document.querySelector(".my-cart .body");
let final_price = document.getElementsByClassName("final-price")[0];
let final_price2 = document.getElementsByClassName("final-price")[1];
let P = 0;
let bg1 = document.querySelector(".bg");
let bars = document.querySelector(".fa-bars");
let fa_circle_xmark = document.querySelector(".fa-circle-xmark");
let span = document.querySelector("header nav+span");
let nav = document.querySelector("header nav");
let to_Top = document.querySelector(".to-Top");
let btn_Swip = document.querySelectorAll(".btn-Swip");
let arr = [];
let checkBtn = document.querySelector(".checkout");
let shopMoreBtn = document.querySelector(".my-cart button:not(.checkout)");
document.querySelector(".date").append(new Date().getFullYear());
shopMoreBtn.onclick = function () {
    myCart.classList.remove("active");
    bg1.classList.remove("active");
}
document.querySelector(".page").style.marginTop = `${document.querySelector("header").offsetHeight}px`;
window.onscroll =  _ => to_Top.style.display = window.scrollY ? "block" : "none";
btn_Swip.forEach(e => {
    e.style.top = `${e.offsetHeight + document.querySelector(".top-slide").offsetHeight + 17}px`;
})
function addActive() {
    myCart.classList.add("active");
}
function removeActive() {
    myCart.classList.remove("active");
} 
function set_bg_active() {
    bg1.classList.add("active");
}
function remove_bg_active() {
    bg1.classList.remove("active");
}
bars.onclick =  function () {
    nav.style.display = "block";
    span.style.display = "block";
}
fa_circle_xmark.onclick = function () {
    fa_circle_xmark.parentElement.parentElement.style.display = "none";
    span.style.display = "none";
}
span.onclick = function () {
    nav.style.display = "none";
    span.style.display = "none";
}
function removeProducts() {
    let i = document.querySelectorAll(".my-cart .body i");
    i.forEach(product => {
        product.addEventListener("click", () => {
            let imgs = document.querySelectorAll(".product .img-product :first-child");
            for (let i = 0; i < imgs.length; i++) 
                if (imgs[i].src === product.parentElement.firstElementChild.firstElementChild.src) {
                    imgs[i].parentElement.parentElement.children[1].firstElementChild.classList.remove("active");
                    break;
                }
            product.parentElement.remove();
            document.querySelector(".count-items").innerHTML = document.querySelector(".my-cart .body").children.length;
            document.querySelector(".my-cart .head p .Span_Two").innerHTML = `(${document.querySelector(".my-cart .body").children.length} Item In Cart)`;
            P -= Number(product.parentElement.children[1].children[1].innerHTML.slice(1));
            console.log(product.parentElement.children[1].children[1].innerHTML.slice(1));
            final_price.innerHTML = `$${P}`;
            final_price2.innerHTML = `$${P}`;
            addToLocalStorageOrRemove();
            if (!document.querySelectorAll(".my-cart .body i").length) {
                bodyofcart.innerHTML += `<p class="position-absolute text-center no-product"> No Products Selected </p>`;
                window.localStorage.clear();
            }
        });
    });
}
if (!bodyofcart.children.length) bodyofcart.innerHTML = `<p class="position-absolute text-center no-product"> No Products Selected </p>`;
fetch("Ecommerce-Website.json").then(data => data.json()).then(products => {
    let TheProducts = document.getElementById("TheProducts");
    products.forEach(product => {
        let salePercentage = product.old_price ? Math.round((product.old_price - product.price) / product.old_price * 100) : 0;
        let SPAN = `<span class="sale-present position-absolute">%${salePercentage}</span>`;
        let ZERO = `<span class="sale-present position-absolute d-none">%${salePercentage}</span>`;
        let oldPriceHTML = product.old_price ? `<p class="old-price">${product.old_price}</p>` : "";
        let TheProduct = `
                <div class="product position-relative text-center overflow-hidden swiper-slide">
                    ${salePercentage ? SPAN : ZERO}
                    <div class="icons position-absolute d-flex flex-column">
                        <span class="d-flex justify-content-center align-items-center position-relative"><i class="fa-solid fa-cart-plus"></i></span>
                        <span class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-heart"></i></span>
                        <span class="d-flex justify-content-center align-items-center"><i class="fa-solid fa-share"></i></span>
                    </div>
                    <div class="img-product position-relative">
                        <img src="${product.img}" alt="">
                        <img class="img-hover position-absolute" src="${product.img_hover}" alt="">
                    </div>
                    <h3 class="product-name">
                        <a href="#">${product.name}</a>
                    </h3>
                    <div class="stars my-3">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="price d-flex justify-content-center align-items-center">
                        <p class="fw-bold">${product.price}</p>
                        ${oldPriceHTML}
                    </div>
                </div>
                `;
        TheProducts.innerHTML += TheProduct;
    });
    let Elements = TheProducts.children;
    Elements = [...Elements];
    Elements.forEach(Element => {
        let bodyOfCart = document.querySelector(".my-cart .body");
        let count_items = document.querySelector(".count-items");
        Element.children[1].children[0].onclick =  function ()  {
            this.classList.add("active");
            let allImgs = document.querySelectorAll(".my-cart .body img");
            let flag = true;
            for (let i = 0; i < allImgs.length; i++)
                if (allImgs[i].src === Element.children[2].firstElementChild.src) {
                    flag = false;
                    break;
                }
            if (flag) {
                if (document.querySelector(".no-product"))
                    document.querySelector(".no-product").remove();
            P += parseInt(Element.children[5].firstElementChild.innerHTML);
            let count_items = document.querySelector(".count-items"); 
            bodyOfCart.innerHTML += `
                <div class="product d-flex align-items-center">
                    <div class="image"><img src="${Element.children[2].children[0].src}" alt=""></div>
                    <div class="text">
                        <p>${Element.children[3].firstElementChild.innerHTML}</p>
                        <div class="price">$${Element.children[5].firstElementChild.innerHTML}</div>
                    </div>
                    <i class="fa-solid fa-trash"></i>
                </div>
            `;
                console.log(bodyOfCart.childElementCount);
                addToLocalStorageOrRemove();
                final_price.innerHTML = `$${P}`;
                final_price2.innerHTML = `$${P}`;
                count_items.innerHTML = bodyOfCart.children.length;
                document.querySelector(".my-cart .head p .Span_Two").innerHTML = `(${bodyOfCart.children.length} Item In Cart)`;
                removeProducts();
            }    
        };
    });
    if (window.localStorage.getItem("arr")) {
        let a = window.localStorage.getItem("arr").split(",");
        for (let i = 0; i < a.length; i++) {
                for (let j = 0; j < TheProducts.children.length; j++) {
                    if (TheProducts.children[j].children[2].firstElementChild.getAttribute("src") === a[i]) {
                        TheProducts.children[j].children[1].firstElementChild.classList.add("active");
                        break;
                    }
                }
        }
    }
});
var swiper = new Swiper(".sale-sec ", {
    pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true,
    },
    slidesPerView:5,
    spaceBetween:30,
    autoplay: {
        delay: 3000,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl:".swiper-button-prev"
    },
    loop: true,
});
    fetch("Ecommerce-Website.json")
    .then((response) => response.json())
        .then((data) => {
    let theimg = document.querySelector(".image img");
    let parent_of_small_imgs = document.querySelector(".sm-imgs");
    let old_price = document.querySelector(".old-price");
    let new_price = document.querySelector(".new-price");
    function updateSmallImages() {
        parent_of_small_imgs.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
        if (data[i].img !== theimg.getAttribute("src")) {
            let smallImg = document.createElement("img");
            smallImg.src = data[i].img;
            smallImg.alt = `image${i + 1}`;
            parent_of_small_imgs.appendChild(smallImg);
            smallImg.onclick = function () {
                theimg.setAttribute("src", smallImg.getAttribute("src"));
                old_price.textContent = data[i].old_price ? `$${data[i].old_price}` : "";
                new_price.textContent = `$${data[i].price}`;
                updateSmallImages();
            };
        }
        }
    }
    updateSmallImages();
    });
function addToLocalStorageOrRemove() {
    let A = document.querySelector(".body");
    A = [...A.children];
    let arr = [];
    for (let i = 0; i < A.length; i++) {
        let img = A[i].querySelector("img");
        let src = img.getAttribute("src");
        let absoluteUrl = new URL(src, window.location.href);
        let relativeUrl = absoluteUrl.pathname.slice(13).substr(0 , 10) + " " +absoluteUrl.pathname.slice(13).substr(13) ;
        arr.push(relativeUrl);
    }
    window.localStorage.setItem("arr", arr);
}
checkBtn.onclick = function () {
    window.open("https://mohamedelgharbawi.github.io/Topico-Checkout/", "_self"); 
    myCart.classList.remove("active");
}
if (window.localStorage.getItem("arr")) {
    let a = window.localStorage.getItem("arr").split(",");
    bodyofcart.innerHTML = "";
    for (let i = 0; i < a.length; i++) {
        fetch("Ecommerce-Website.json").then(data => data.json()).then(data => {
            for (let j = 0; j < data.length; j++) {
                if (a[i] === data[j].img) {
                    bodyofcart.innerHTML += 
                                    `<div class="product d-flex align-items-center">
                                            <div class="image"><img src="${a[i]}" alt="image${i + 1}"></div>
                                            <div class="text">
                                                <p>${data[j].name}</p>
                                                <div class="price">$${data[j].price}</div>
                                            </div>
                                            <i class="fa-solid fa-trash"></i>
                                    </div>`;        
                    P += data[j].price;
                    break;
                }
            }
            final_price.innerHTML = `$${P}`;
            final_price2.innerHTML = `$${P}`;
            document.querySelector("span.count-items").innerHTML = bodyofcart.children.length;
            document.querySelector(".Span_Two").innerHTML = `(${bodyofcart.children.length} Item In Cart)`;
            removeProducts();
        })
    }
}