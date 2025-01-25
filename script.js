const cart = document.querySelector(".cart");
const body = document.body;
cart.addEventListener("click", () => {
  body.classList.add("active");
});
const button = document.querySelector(".close");
button.addEventListener("click", () => {
  body.classList.remove("active");
});
let products = [
  {
    id: 1,
    name: "Jade Vine",
    image: "flower1.jpg",
    price: 400,
    rating: 5,
  },
  {
    id: 2,
    name: "Middlemist’s Red",
    image: "flower2.jpg",
    price: 300,
    rating: 4,
  },
  {
    id: 3,
    name: "Titan Arum",
    image: "flower3.jpg",
    price: 450,
    rating: 3,
  },
  {
    id: 4,
    name: "Plant Tool Kit(set of 3)",
    image: "plant_tool.jpg",
    price: 500,
    rating: 3,
  },
  {
    id: 5,
    name: "Plant Spray Bottle",
    image: "plant_tool2.jpg",
    price: 400,
    rating: 4,
  },
  {
    id: 6,
    name: "Plant Plucker",
    image: "plant_tool3.jpg",
    price: 230,
    rating: 5,
  },
  {
    id: 7,
    name: "Plant Decoration Stand",
    image: "plantdecor1.jpg",
    price: 3600,
    rating: 4,
  },
  {
    id: 8,
    name: "Round Plant Stand",
    image: "plantdecor2.jpg",
    price: 1100,
    rating: 3,
  },
  {
    id: 9,
    name: "LED Plant",
    image: "plantdecor3.jpg",
    price: 1800,
    rating: 4,
  },
];
const product = document.querySelector(".products");
function add_item() {
  products.forEach((items, key) => {
    let rating_star='';
    let item = document.createElement("div");
    item.classList.add("item");
    for(i=1;i<=items.rating;i++){
      rating_star+=`<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
  </svg>`
    }
    item.innerHTML = `
        <img src="${items.image}" class="item_img"/>
        <div class="item_title">${items.name}</div>
        <div class="item_price">₹${items.price}</div>
        <div class="star">${rating_star}</div>
        <button class="item_button" onclick="add_to_cart(${key})">Add to cart</button>
        `;
    product.appendChild(item);
  });
}
add_item();
const cart_product = [];
const cart_body = document.querySelector(".cart_products");

function add_to_cart(key) {
  if (cart_product[key] == null) {
    cart_product[key] = products[key];
    cart_product[key].quantity = 1;
  }
  else{
    cart_product[key].quantity +=1;
  }
  update_cart();
}

let cart_indicator = document.querySelector(".cart_indicator");
let total = document.querySelector(".total");

function update_cart() {
  count=0;
  total_price=0;
  cart_body.innerHTML = "";
  cart_product.forEach((item,id) => {
    const cart_item = document.createElement("div");
    cart_item.classList.add("cart_items");
    cart_item.innerHTML = `
         <img src="${item.image}"/ class="cart_img">
         <div class="cart_item_name">${item.name}</div>
         <div class="cart_price">${item.price*item.quantity}</div>
         <div class="cart_alter_buttons">
            <button class="cart_add_button" onclick="quantityChange(${id},${item.quantity+1})">+</button>
            <span class="cart_count">${item.quantity}</span>
            <button class="cart_minus_button" onclick="quantityChange(${id},${item.quantity-1})">-</button>
         </div>
        `;
    cart_body.appendChild(cart_item);
    total_price+=item.quantity*item.price;
    count=item.quantity+count;
  });
  cart_indicator.innerHTML=count;
  total.innerHTML=`Total:₹${total_price}`;
  
}

function quantityChange(key,quantity){
  if(quantity==0){
    delete cart_product[key];
    update_cart();
  }else{
    cart_product[key].quantity = quantity;
    update_cart();
  }
}
