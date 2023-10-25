
fetch("../src/json/db.json")
.then(res => res.json())
.then(data => {
    let html =''
    data.products.forEach(product =>{
      html+=  `
      <div class="product">
        <div class="img">
            <span class="product-onsale">${product.discount > 0 ? product.discount + "%" : ""}</span>
            <span class="product-new">${product.new?"NEW":""}</span>
            <a class="a-ruler" data-id=${product.id} href="product-single.html"><img src="${product.imgs[0]}" alt="${product.title}"></a>
                <div class="quick-look">
                    <div class="quikc-btn" data-id=${product.id}>
                        <span>Quick Look</span>
                    </div>
                </div>
        </div>
        
        <div class="product-name">${product.title}</div>
        <div class="price">
        ${product.discount>0?`<span class="discount">$${product.price}</span> $${Math.floor(product.price-product.price/100*product.discount)}`:"$"+product.price}
        
        </div>
        <div class="addtocart">
        <a data-id=${product.id} href="">Add to cart</a>
        </div>
        </div>
        `
    })
    document.querySelector(".index-product-area .products ").innerHTML=html;

    let categorys = new Set();

    data.products.forEach(product => {
        product.categorys.forEach(category => {
            categorys.add(category);
        });
    });
    html = `<a href="" class="active">ALL</a>`
    categorys.forEach(c=>{
        html+=`<a href="">${c}</a>`
    })
    document.querySelector(".index-product-area .prod-category").innerHTML=html;

    document.querySelector(".index-product-area").querySelectorAll(".quikc-btn").forEach(e=>{
        e.addEventListener("click",function (event){
            let m_id=e.getAttribute("data-id");
            let popUp = document.querySelector(".popUp");
            popUp.style.display="flex";
            popUp.innerHTML = `
            <div class="all-screen"></div>
            <div class="product-card">
                <a href=""><i class="fa-solid fa-xmark"></i></a>
                <div class="prod-image">
                    <img src="${data.products[m_id].imgs[0]}"
                        alt="${data.products[m_id].title}">
                </div>
                <div class="prod-info">
                    <h1>${data.products[m_id].title}</h1>
                    <div class="price">
                    <div class="price">
                    ${data.products[m_id].discount>0?`<span class="discount">$${data.products[m_id].price}</span> $${Math.floor(data.products[m_id].price-data.products[m_id].price/100*data.products[m_id].discount)}`:"$"+data.products[m_id].price}
                    
                    </div>
                    </div>
                    <div class="rating">
                        ★ ★ ★ ★ ☆
                    </div>
                    <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget
                        euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus.
                        Vestibulum ultricies aliquam convallis.</p>
                    <div class="action-buttons">
                        <div class="action-input">
                            <span>Quantity</span>
                            <input type="number" value="1" min = "1"">
                        </div>
                        <button class = "add-to-cart-btn" >ADD TO CART</button>
                    </div>
                    <button class="wishlist"><i class="fa-regular fa-heart"></i> ADD TO WISHLIST</button>
                </div>
            </div>
            
            
            `
            popUp.querySelector("input").addEventListener("input",function(e){
                if(e.target.value>data.products[m_id].stoc){
                    e.target.value = data.products[m_id].stoc
                    alert(`MAX stock Limit: ${data.products[m_id].stoc}`)
                }
            })
            popUp.querySelector(".add-to-cart-btn").addEventListener("click",function(e){
            let basket =JSON.parse(localStorage.getItem("basket"));
            let ex = basket.find(p=>p.id==m_id);

            if(ex){
                ex.count = Number(ex.count) + Number(popUp.querySelector("input").value);
            }
            else{

                basket.push({
                    id:m_id,
                    price:data.products[m_id].price,
                    count:Number(popUp.querySelector("input").value)
                })
            }
            let sum=0;
            basket.forEach(e=>{
                sum+=Number(e.count) * Math.floor(data.products[e.id].price-data.products[e.id].price/100*data.products[e.id].discount);
            })
            document.querySelector("#Cart").innerHTML = `(${sum})$`;
            localStorage.setItem("basket",JSON.stringify(basket))
            let products = data.products;

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

        })
    })
    let a_category = document.querySelector(".index-product-area .prod-category").querySelectorAll("a");
    a_category.forEach(e=>{
        e.addEventListener("click",function (event){
            a_category.forEach(a=>{a.classList.remove("active")});
            e.classList.add("active");
            html = ''
            data.products.forEach(product =>{
                if(e.innerText != "ALL"){
                    if(product.categorys.some(ct => {
                        return ct == e.innerHTML;
                    })){
                        html+=  `
                        <div class="product">
                          <div class="img">
                              <span class="product-onsale">${product.discount > 0 ? product.discount + "%" : ""}</span>
                              <span class="product-new">${product.new?"NEW":""}</span>
                              <a class="a-ruler" data-id=${product.id} href="product-single.html"><img src="${product.imgs[0]}" alt="${product.title}"></a>
                                  <div class="quick-look">
                                      <div class="quikc-btn" data-id=${product.id}>
                                          <span>Quick Look</span>
                                      </div>
                                  </div>
                          </div>
                          
                          <div class="product-name">${product.title}</div>
                          <div class="price">
                          ${product.discount>0?`<span class="discount">$${product.price}</span> $${Math.floor(product.price-product.price/100*product.discount)}`:"$"+product.price}
                          
                          </div>
                          <div class="addtocart">
                          <a data-id=${product.id} href="">Add to cart</a>
                          </div>
                          </div>
                          `
                    }
                }
                else{
                    html+=  `
                    <div class="product">
                    <div class="img">
                        <span class="product-onsale">${product.discount > 0 ? product.discount + "%" : ""}</span>
                        <span class="product-new">${product.new?"NEW":""}</span>
                        <a class="a-ruler" data-id=${product.id} href="product-single.html"><img src="${product.imgs[0]}" alt="${product.title}"></a>
                            <div class="quick-look">
                                <div class="quikc-btn" data-id=${product.id}>
                                    <span>Quick Look</span>
                                </div>
                            </div>
                    </div>
                    
                    <div class="product-name">${product.title}</div>
                    <div class="price">
                    ${product.discount>0?`<span class="discount">$${product.price}</span> $${Math.floor(product.price-product.price/100*product.discount)}`:"$"+product.price}
                    
                    </div>
                    <div class="addtocart">
                    <a data-id=${product.id} href="">Add to cart</a>
                    </div>
                    </div>
                  `
                }
                
              })
              document.querySelector(".index-product-area .products ").innerHTML=html;

        })
    })
    document.querySelector(".index-product-area").querySelectorAll("a").forEach(e=>{
        e.addEventListener("click",function (event){
            let m_id=e.getAttribute("data-id");
            if(e.classList[0] != "a-ruler")
            event.preventDefault();
            else{        
                localStorage.setItem("product",m_id);   
            }
        })
    })
    document.querySelector(".index-product-area .products").querySelectorAll("a").forEach(e=>{
        
        e.addEventListener("click",function (ev){
            let basket =JSON.parse(localStorage.getItem("basket"));
            let m_id=ev.target.getAttribute("data-id");
            let ex = basket.find(p=>p.id==m_id);

            if(ex){
                ex.count+=1;
            }
            else{

                basket.push({
                    id:m_id,
                    price:data.products[m_id].price,
                    count:1
                })
            }
            let sum=0;
            basket.forEach(e=>{
                sum+=Number(e.count) * Math.floor(data.products[e.id].price-data.products[e.id].price/100*data.products[e.id].discount);
            })
            document.querySelector("#Cart").innerHTML = `(${sum})$`;
            localStorage.setItem("basket",JSON.stringify(basket))
            

        })
    })
})


   
let imgNum = 1;
let autoSlideInterval; 
const slider = document.getElementById("slider"); 

function startAutoSlide() {
    autoSlideInterval = setInterval(right, 3000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function right() {
    if (imgNum != 3) {
        imgNum += 1;
        changeImg(imgNum, -1);
    } else {
        imgNum = 1;
        changeImg(imgNum, +2);
    }
}


document.getElementById(`img1`).style.display = "flex";
document.getElementById(`circle1`).parentElement.classList.add('active')
function changeImg(value, count) {
    let old_ =document.getElementById(`img${value + count}`);
    let new_=document.getElementById(`img${value}`);
    old_.style.display = "none";
    new_.style.display = "flex";

    
    let oldCircl =document.getElementById(`circle${value + count}`).parentElement;
    let newCircl=document.getElementById(`circle${value}`).parentElement;
    
    oldCircl.classList.remove('active');
    newCircl.classList.add('active');

    // old_.querySelector('.img-div').querySelector('div').style.transform =old_s;
    // old_s=new_.querySelector('.img-div').querySelector('div').style.transform;
    // new_.querySelector('.img-div').querySelector('div').style.transform = "translate(0,0)";
    


}    

startAutoSlide();


slider.addEventListener("mouseover", stopAutoSlide);
slider.addEventListener("mouseout", startAutoSlide);