if (localStorage.getItem("basket") == null) {
    localStorage.setItem("basket", "[]");
    localStorage.setItem("product", 'm_id');
} else {
    fetch("../src/json/db.json")
        .then(res => res.json())
        .then(data => {

            let sum = 0;
            JSON.parse(localStorage.getItem("basket")).forEach(e => {

                sum += Number(e.count) * Math.floor(data.products[e.id].price - data.products[e.id].price / 100 * data.products[e.id].discount);
            })
            document.querySelector("#Cart").innerHTML = `(${sum})$`;
        })
}
$(".tab-list").on("click", ".tab", function (e) {
    e.preventDefault();

    $(".tab").removeClass("active");
    $(".tab-content").removeClass("show");
    $(this).addClass("active");
    $($(this).attr("href")).addClass("show");
});

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

        let product = data.products[localStorage.getItem("product")];
        let html = ""
        product.imgs.forEach(element => {
            html += `
		
			<img src="${element}"
                            alt="${product.title}">
		`
        });
        $(".product-single-img-area-sidebar").html(html);
        $(".product-single-img-area-center").html(`<img src="${product.imgs[0]}"
	alt="${product.title}">`);
        $(".prod-info h1").html(product.title);
        $(".prod-info .price").html(`${product.discount>0?`<span class="discount">$${product.price}</span> $${Math.floor(product.price-product.price/100*product.discount)}`:"$"+product.price}`);
        $(".prod-info .sku").html(`SKU: <span>${product.stoc}</span>`);
        html = "";
        product.categorys.forEach(element => {
            html += element + ' ';
        })
        html = html.trimEnd().replace(' ', ', ')
        $(".prod-info .category").html(`Category: <span>${html}</span>`);
        html = "";
        product.tags.forEach(element => {
            html += element + ' ';
        })
        html = html.trimEnd().replace(' ', ', ')
        $(".prod-info .tags").html(`tags: <span>${html}</span>`);

        html = "";
        let count = 0;
        data.products.forEach(element => {
            if (element.categorys != product.categorys && count++ < 4) {
                if (categoryCondition(element.categorys, product.categorys)) {
                    html += `
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
                }
            }
        })

        $(".products").html(html);
        document.querySelector(".related-products").querySelectorAll("a").forEach(e => {
            e.addEventListener("click", function (event) {
                let m_id = e.getAttribute("data-id");
                if (e.classList[0] != "a-ruler")
                    event.preventDefault();
                else {
                    localStorage.setItem("product", m_id);
                }
            })
        })
        document.querySelectorAll(".quikc-btn").forEach(e => {
            e.addEventListener("click", function (event) {
                let m_id = e.getAttribute("data-id");
                let popUp = document.querySelector(".popUp");
                popUp.style.display = "flex";
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
                popUp.querySelector("input").addEventListener("input", function (e) {
                    if (e.target.value > data.products[m_id].stoc) {
                        e.target.value = data.products[m_id].stoc
                        alert(`MAX stock Limit: ${data.products[m_id].stoc}`)
                    }
                })
                popUp.querySelector(".add-to-cart-btn").addEventListener("click", function (e) {
                    let basket = JSON.parse(localStorage.getItem("basket"));
                    let ex = basket.find(p => p.id == m_id);

                    if (ex) {
                        ex.count = Number(ex.count) + Number(popUp.querySelector("input").value);
                    } else {

                        basket.push({
                            id: m_id,
                            price: data.products[m_id].price,
                            count: Number(popUp.querySelector("input").value)
                        })
                    }
                    let sum = 0;
                    basket.forEach(e => {
                        sum += Number(e.count) * Math.floor(data.products[e.id].price - data.products[e.id].price / 100 * data.products[e.id].discount);
                    })
                    document.querySelector("#Cart").innerHTML = `(${sum})$`;
                    localStorage.setItem("basket", JSON.stringify(basket))
                })

            })
        })
        document.querySelector("input").addEventListener("input", function (e) {
            if (e.target.value > product.stoc) {
                e.target.value = product.stoc
                alert(`MAX stock Limit: ${product.stoc}`)
            }
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
                    price:Number(data.products[m_id].price),
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
        document.querySelector(".product-single .add-to-cart-btn").addEventListener("click", function (e) {
            let basket =JSON.parse(localStorage.getItem("basket"));
            let m_id=localStorage.getItem("product");
            let ex = basket.find(p=>p.id==m_id);

            if(ex){
                ex.count+=Number(document.querySelector(".product-single input").value);
            }
            else{

                basket.push({
                    id:m_id,
                    price:Number(data.products[m_id].price),
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