console.log("users: ", JSON.parse(localStorage.getItem('users')))

//get product from localStorage
function getProducts() {
    document.getElementsByClassName('cart-products')[0].innerHTML='';
    try {
        a=JSON.parse(localStorage.getItem('products')).length==0
    }
    catch(err) {
        a=true
    }
    if(a) { 
        document.getElementsByClassName('cart-products')[0].innerHTML+=`
        
        <div class="cart">
        <img class="empty-cart" src="../assets/Cart empty/cart-empty.png" alt="Empty Cart image">
        <p>Your cart is empty</p>
        </div>
        `
    }
    else {
        let total=0;
        document.getElementsByClassName('cart-products')[0].innerHTML+=`
                <div class="cart-headings">
                    <div class="product-detail-heading">Product</div>
                    <div class="product-total-headings">
                        <div class="product-price-heading">Price</div>
                        <div class="product-quantity-heading">Quantity</div>
                        <div class="product-total-heading">Total</div>
                    </div>
                </div>
        ` 
        let products=JSON.parse(localStorage.getItem("products"));
        console.log("data temp: ", products)
        products.forEach(product => {
            total+=parseFloat(product.producttotal);
            document.getElementsByClassName('cart-products')[0].innerHTML+=`
            <div class="cart-product" >
                            <div class="product-detail" onclick="goToDetailProduct('product-detail-page.html','${product.id1}','${product.id2}')">
                                <img src=${product.infor.images[0]} alt="" class="product-image" >
                                <div class="product-item">
                                    <p class="product-name">${product.infor.title}</p>
                                </div>
                            </div>

                            <div class="product-total">
                                <div class="product-price">$${product.infor.price}</div>
                                <div class="cart-add-minus-button">
                                <button class="ti-minus" onclick="decreaseproduct('${product.infor.title}')"></button>
                                <div class="quantity" data-productname="${product.infor.title}">${product.productquan}</div>
                                <button class="ti-plus" onclick="increaseproduct('${product.infor.title}')"></button>
                                </div>
            
                                <div class="product-total-price">$${product.producttotal}</div>

                                <button class="trash-icon" onclick="removeCart('${product.infor.title}')">
                                <img src="../assets/Cart empty/delete.png" alt="trash icon">
                                </button>
                            </div>
            </div>`
        })
        
        document.getElementsByClassName('cart-products')[0].innerHTML+=`
        <div class="cart-sub-total">
                        <div class="sub-total">
                            <div class="sub-total-title">Sub-total</div>
                            <div class="sub-total-price">$${total}</div>
                            <div class="sub-total-note">Tax and shipping will be calculated later</div>
                        </div>

                        <div class="check-out-button" >
                            <button onclick="goTo('billing-detail-page.html')"><span></span>Check-out</button>
                        </div>
        </div>
        `
    }
  
}

//get product every load
window.addEventListener('load', function() {
    getProducts();
});

//remove cart
function removeCart(productt){
    let products=[];
    products=JSON.parse(localStorage.getItem("products"))
    products=products.filter(product=>product.productname!=productt);
    localStorage.setItem('products',JSON.stringify(products))
    getProducts();
    const listItem = JSON.parse(localStorage.getItem('products'));
    var count = listItem ? listItem.length : 0;
    console.log(count);
    document.querySelector('.quantity').innerHTML = count;
}

//increase Product
function increaseproduct(curr) {
    const cartList = JSON.parse(localStorage.getItem("products"));
    const quantityElements = document.getElementsByClassName("quantity");

    for (let i = 0; i < quantityElements.length; i++) {
        const quantityElement = quantityElements[i];
        const productName = quantityElement.dataset.productname;

        if (productName === curr) {
            const currentQuantity = parseInt(quantityElement.textContent);
            const updatedQuantity = currentQuantity + 1;
            quantityElement.textContent = updatedQuantity;

            const productToUpdate = cartList.find(product => product.infor.title === curr);
            productToUpdate.productquan = updatedQuantity;
            productToUpdate.producttotal = updatedQuantity * parseFloat(productToUpdate.infor.price);
        }
    }

    localStorage.setItem("products", JSON.stringify(cartList));
    getProducts();
}

//decrease product
function decreaseproduct(curr) {
    const cartList = JSON.parse(localStorage.getItem("products"));
    const quantityElements = document.getElementsByClassName("quantity");
    for (let i = 0; i < quantityElements.length; i++) {
        const quantityElement = quantityElements[i];
        const productName = quantityElement.dataset.productname;
        if (productName === curr) {
            const currentQuantity = parseInt(quantityElement.textContent);
            const updatedQuantity = currentQuantity - 1;
            console.log("currentQuantity: ", currentQuantity)
            console.log("updatedQuantity: ", updatedQuantity)
            if (updatedQuantity <= 0) {
                removeCart(curr);
            } else {
                quantityElement.textContent = updatedQuantity;

                const productToUpdate = cartList.find(product => product.infor.title === curr);
                productToUpdate.productquan = updatedQuantity;
                productToUpdate.producttotal = updatedQuantity * parseFloat(productToUpdate.infor.price);
            }
        }
    }

    localStorage.setItem("products", JSON.stringify(cartList));
    getProducts();
    
}

checkLogIn();
