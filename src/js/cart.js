fetch("../src/json/db.json")
.then(res => res.json())
.then(data => {
    let products = data.products;
    if(JSON.parse(localStorage.getItem("basket")).length<1){
        document.querySelector(".empty-cart").style.display = "flex";
        document.querySelector(".cart-body").style.display = "none";
    }
    else{
        let basket = JSON.parse(localStorage.getItem("basket"));
        let html = '';
        basket.forEach(e => {
            html+=`<div style="display: flex;width: 100%;">
            <div class="added-products-side-container added-products-side-container-left">
                <i class="fa-solid fa-xmark" data-id="${e.id}" onclick="Delete(this)" ></i>
                <img class="added-product-img" src="${products[e.id].imgs[0]}" alt="">
                <a href="" class="added-product-name">${products[e.id].title}</a>
            </div>
            <div class="added-products-side-container added-products-side-container-right">
                <span class="added-product-price" data-price = "${e.price}">${e.price}$</span>
                <div class="quantity">
                    <span class="quantity-title">Quantity</span>
                    <input data-id="${e.id}" type="number" value="${e.count}" min="1">
                </div>
                <span class="added-product-price-subtotal">${e.price * e.count}$</span>
            </div>
            </div>
            `;
        });
        $(".added-product").html(html);
        let sum=0;
        basket.forEach(e=>{
            sum+=Number(e.count) * Math.floor(data.products[e.id].price-data.products[e.id].price/100*data.products[e.id].discount);
        })
        document.querySelector(".total-proceed-price").innerHTML = `(${sum})$`;
        document.querySelectorAll("input").forEach(inp =>{
            inp.addEventListener("change",function(e){
    
                let m_id=e.target.getAttribute("data-id");
                let ex = basket.find(p=>p.id==m_id);
    
                ex.count = Number(inp.value);
    
                sum=0;
                basket.forEach(ev=>{
                    sum+=Number(ev.count) * Math.floor(data.products[ev.id].price-data.products[ev.id].price/100*data.products[ev.id].discount);
                })
                document.querySelector("#Cart").innerHTML = `(${sum})$`;
                this.parentElement.parentElement.querySelector(".added-product-price-subtotal")
                .innerHTML = `${Number(this.parentElement.parentElement.querySelector(".added-product-price").getAttribute("data-price")) * Number(inp.value)}$`;
                localStorage.setItem("basket",JSON.stringify(basket))
                document.querySelector(".total-proceed-price").innerHTML = `(${sum})$`;
            })
        })
    }
    

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
    if(JSON.parse(localStorage.getItem("basket")).length<1){
        document.querySelector(".empty-cart").style.display = "flex";
        document.querySelector(".cart-body").style.display = "none";
    }
}