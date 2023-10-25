//price ranger
let min;
let max;
function categoryCondition(handler, handled) {
  let condition = false;
  handled.forEach(i => {

      handler.forEach(j => {
          if (i == j) condition = true;
      })
  })
  return condition
}

fetch("../src/json/db.json")
.then(res => res.json())
.then(data => {
  let html = "";
  min = data.products[0].price;
  max = data.products[0].price;
	data.products.forEach(element =>{

    if(max<element.price){max=element.price;}
    if(min>element.price){min=element.price;}


				html+=`
						<div class="product">
						<div class="img">
							<span class="product-onsale">${element.discount > 0 ? element.discount + "%" : ""}</span>
							<span class="product-new">${element.new?"NEW":""}</span>
							<a class="a-ruler" data-id=${element.id} href="product-single.html"><img src="${element.imgs[0]}" alt="${element.title}"></a>
								<div class="quick-look">
									<div class="quikc-btn" data-id=${element.id}>
										<span>Quick Look</span>
									</div>
								</div>
						</div>
						
						<div class="product-name">${element.title}</div>
						<span class="review-star">
							<ion-icon name="star"></ion-icon>
							<ion-icon name="star"></ion-icon>
							<ion-icon name="star"></ion-icon>
							<ion-icon name="star"></ion-icon>
							<ion-icon name="star"></ion-icon>
                    	</span>
						<div class="price">
						${element.discount>0?`<span class="discount">$${element.price}</span> $${Math.floor(element.price-element.price/100*element.discount)}`:"$"+element.price}
						
						</div>
						<div class="addtocart">
						<a data-id=${element.id} href="">Add to cart</a>
						</div>
						</div>
					`;
		})

	$(".product-list").html(html);

  let colors = [];
  let materials = [];
  
  
  data.products.forEach(product => {
    product.Colors.forEach(c => {
      let clr = colors.find(e => { return e.color == c})
      if(clr == undefined){
        colors.push({
            color:c,       
            count:1
          });
        }
        else{
          clr.count+=1;      
          
        }
      });
      product.Materials.forEach(m => {
        let mtr = materials.find(e => { return e.material == m})
        if(mtr == undefined){
          materials.push({
            material:m,       
            count:1
          });
        }
        else{
          mtr.count+=1;              
        }
      });
  });
  html = "";
  colors.forEach(c=>{
    html+=`<li><a href="">${c.color}</a> <span>(${c.count})</span></li>`
  })
  document.querySelector(".product-list-container .product-by-color ul").innerHTML=html;
  html = "";
  materials.forEach(c=>{
    html+=`<li><a href="">${c.material}</a> <span>(${c.count})</span></li>`
  })
  document.querySelector(".product-list-container .product-by-material ul").innerHTML=html;
  document.querySelector(".product-list-sidebar").querySelectorAll("a").forEach(e=>{
    e.addEventListener("click",function (event){
        event.preventDefault();
        e.classList.toggle("chosen")
        let products = [];
        let clr = [];
        let mtr = [];

        document.querySelectorAll(".product-list-sidebar .product-by-color .chosen").forEach(
          e => {
            clr.push(e.innerHTML);
          }
        )
        document.querySelectorAll(".product-list-sidebar .product-by-material .chosen").forEach(
          e => {
            mtr.push(e.innerHTML);
          }
        )
        data.products.forEach(product => {

          if( categoryCondition(product.Colors, clr) ||  categoryCondition(product.Materials, mtr) ){
            products.push(product)
          }
  
        })
        html=""
        products.forEach(element =>{
          if(max<element.price){max=element.price;}
          if(min>element.price){min=element.price;}
          html+=`
              <div class="product">
              <div class="img">
                <span class="product-onsale">${element.discount > 0 ? element.discount + "%" : ""}</span>
                <span class="product-new">${element.new?"NEW":""}</span>
                <a class="a-ruler" data-id=${element.id} href="product-single.html"><img src="${element.imgs[0]}" alt="${element.title}"></a>
                  <div class="quick-look">
                    <div class="quikc-btn" data-id=${element.id}>
                      <span>Quick Look</span>
                    </div>
                  </div>
              </div>
              
              <div class="product-name">${element.title}</div>
              <span class="review-star">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                        </span>
              <div class="price">
              ${element.discount>0?`<span class="discount">$${element.price}</span> $${Math.floor(element.price-element.price/100*element.discount)}`:"$"+element.price}
              
              </div>
              <div class="addtocart">
              <a data-id=${element.id} href="">Add to cart</a>
              </div>
              </div>
           `;
		    })

	      $(".product-list").html(html);
      })
})
	document.querySelector(".product-list").querySelectorAll("a").forEach(e=>{
        e.addEventListener("click",function (event){
          let m_id=e.getAttribute("data-id");
          if(e.classList[0] != "a-ruler")
          event.preventDefault();
          else{        
            localStorage.setItem("product",m_id);   
          }
        })
    })
	document.querySelectorAll(".quikc-btn").forEach(e=>{
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
            })

        })
    })
    document.querySelectorAll(".addtocart").forEach(ev => {
      ev.addEventListener("click", function (e) {
      let basket =JSON.parse(localStorage.getItem("basket"));
      let m_id=e.target.getAttribute("data-id");
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
  console.log(min,max)
  fromInput.setAttribute("min", min);
  toInput.setAttribute("min", min);
  fromSlider.setAttribute("min", min);
  toSlider.setAttribute("min", min);
  fromInput.setAttribute("max", max);
  toInput.setAttribute("max", max);
  fromSlider.setAttribute("max", max);
  toSlider.setAttribute("max", max);
  fromSlider.setAttribute("value", min);
  toSlider.setAttribute("value", max);
  fromInput.setAttribute("value", min);
  toInput.setAttribute("value", max);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#080808', toSlider);
	
})


function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#080808', controlSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromSlider.value = from;
    }
}
    
function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#080808', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
    }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#080808', toSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromInput.value = from;
  }
}

function controlToSlider(fromSlider, toSlider, toInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#080808', toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
    toSlider.value = from;
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  console.log(from,to);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector('#toSlider');
  if (Number(currentTarget.value) <= 0 ) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');

fillSlider(fromSlider, toSlider, '#C6C6C6', '#080808', toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () =>{ controlFromSlider(fromSlider, toSlider, fromInput);}
toSlider.oninput = () => {controlToSlider(fromSlider, toSlider, toInput);}
