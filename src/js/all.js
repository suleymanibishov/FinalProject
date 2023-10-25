
if(localStorage.getItem("basket")==null){
    localStorage.setItem("basket","[]");
    localStorage.setItem("product",'0'); 
}

fetch("../src/json/db.json")
.then(res => res.json())
.then(data => {
    
    let sum=0;
        JSON.parse(localStorage.getItem("basket")).forEach(e=>{
            
        sum+=Number(e.count) * Math.floor(data.products[e.id].price-data.products[e.id].price/100*data.products[e.id].discount);
    })
    document.querySelector("#Cart").innerHTML = `(${sum})$`;

    let products = data.products;
    let basket = JSON.parse(localStorage.getItem("basket"));
    let html = '';
    basket.forEach(e => {
        html+=`
        <div class="card-product-area" style="padding: 10px 10px;">
            <a href=""><img src="${products[e.id].imgs[0]}" height="100" width="100" alt="">                            </a>
            <div class="cart-product-info">
                <a class="a-title-product">${products[e.id].title}</a>                                
                <span>${e.count} x $${e.price}</span>
            </div>
            <div class="close-icon">
                <i class="fa-solid fa-xmark" data-id="${e.id}" onclick="Delete(this)"></i>
            </div>
        </div>
       
        `;
    });
    html+=`
        <div class="total-price-viewcart" style="padding: 10px 10px;">
            <h5>TOTAL:</h5><span class="total-span">${sum}$</span>
        </div>
        <div class="btns-viewcart">
            <a href="./cart.html" class="btn-viewcart">VIEW CART</a>
            <a href="" class="btn-checkout">CHECKOUT</a>
        </div>
    `
    $(".navbar-right .submenu ul").html(html);
})

function Delete(e){
    let basket =[];
    JSON.parse(localStorage.getItem("basket")).forEach(p=>{
        if(p.id!=e.getAttribute("data-id")){
            basket.push(p);
        }

    })
    localStorage.setItem("basket",JSON.stringify(basket))
    e.parentElement.parentElement.remove();

}

//Sidebar slider menu
let sliderMenu = document.querySelector(".desktop-sidebar-slider-menu");

function openNav() {
    sliderMenu.style.width = "86vh";
    sliderMenu.style.right = "0"
}
  
function closeNav() {
    sliderMenu.style.right = "-86vh"
}

 let sub = document.querySelector(".submenu2");
document.querySelector(".header-mb").addEventListener("click",function(){
    sub.style.transform = " translateX(0)";
})
document.querySelector(".header-mb .close-icon").addEventListener("click",function(){
    event.stopPropagation();
    sub.style.transform = "translateX(101%)";

})
document.querySelectorAll(".header-mb li").forEach(e =>{
    e.addEventListener("click",function(){
        if(e.children[1].style.height != "120px"){
            e.children[1].style.height = "120px";
        }else{
            e.children[1].style.height = "0";
        }
    })
})
//scroll top

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    const scrollUpButton = document.getElementById("scrollUpButton");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollUpButton.style.display = "block";
    } else {
        scrollUpButton.style.display = "none";
    }
}

function scrollToTop() {
    const scrollTopDuration = 500; // Duration in milliseconds

    const scrollStep = -window.scrollY / (scrollTopDuration / 15);

    const scrollInterval = setInterval(function () {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 0);
}