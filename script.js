// ==========================================
// RISA CAFÉ
// ORDERING SYSTEM
// ==========================================


// ==========================================
// CART
// ==========================================

let cart = [];


// ==========================================
// ELEMENTS
// ==========================================

const addButtons =
    document.querySelectorAll(".add-button");

const cartButton =
    document.getElementById("cartButton");

const cartCount =
    document.getElementById("cartCount");

const cartPanel =
    document.getElementById("cartPanel");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const checkoutOverlay =
    document.getElementById("checkoutOverlay");

const closeCheckout =
    document.getElementById("closeCheckout");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const orderForm =
    document.getElementById("orderForm");

const successOverlay =
    document.getElementById("successOverlay");

const doneButton =
    document.getElementById("doneButton");

const orderNumber =
    document.getElementById("orderNumber");


// ==========================================
// ORDER TYPE
// ==========================================

const orderType =
    document.getElementById("orderType");

const addressFields =
    document.getElementById("addressFields");

const address =
    document.getElementById("address");

const city =
    document.getElementById("city");

const pincode =
    document.getElementById("pincode");


// ==========================================
// ADD BUTTONS
// ==========================================

addButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const name =
            button.dataset.name;

        const price =
            Number(button.dataset.price);


        // Check if item already exists

        let existingItem =
            cart.find(function(item) {

                return item.name === name;

            });


        // If item exists, increase quantity

        if (existingItem) {

            existingItem.quantity++;

        }

        // Otherwise add new item

        else {

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }


        // Change Add button into quantity control

        createQuantityControl(
            button,
            name,
            price
        );


        updateCart();

    });

});


// ==========================================
// CREATE QUANTITY CONTROL
// ==========================================

function createQuantityControl(
    addButton,
    name,
    price
) {

    // Find item in cart

    const item =
        cart.find(function(item) {

            return item.name === name;

        });


    if (!item) return;


    // Create quantity container

    const quantityControl =
        document.createElement("div");

    quantityControl.className =
        "menu-quantity-control";


    // Minus button

    const minusButton =
        document.createElement("button");

    minusButton.className =
        "menu-quantity-button";

    minusButton.textContent =
        "−";


    // Quantity number

    const quantityNumber =
        document.createElement("span");

    quantityNumber.className =
        "menu-quantity-number";

    quantityNumber.textContent =
        item.quantity;


    // Plus button

    const plusButton =
        document.createElement("button");

    plusButton.className =
        "menu-quantity-button";

    plusButton.textContent =
        "+";


    // Put everything together

    quantityControl.appendChild(
        minusButton
    );

    quantityControl.appendChild(
        quantityNumber
    );

    quantityControl.appendChild(
        plusButton
    );


    // Hide Add button

    addButton.style.display =
        "none";


    // Put quantity control next to button

    addButton.parentNode.insertBefore(
        quantityControl,
        addButton
    );


    // ==================================
    // PLUS
    // ==================================

    plusButton.addEventListener(
        "click",
        function() {

            item.quantity++;

            quantityNumber.textContent =
                item.quantity;

            updateCart();

        }
    );


    // ==================================
    // MINUS
    // ==================================

    minusButton.addEventListener(
        "click",
        function() {

            item.quantity--;


            // If quantity becomes zero

            if (item.quantity <= 0) {

                // Remove from cart

                const index =
                    cart.indexOf(item);

                if (index !== -1) {

                    cart.splice(index, 1);

                }


                // Remove quantity control

                quantityControl.remove();


                // Show Add button again

                addButton.style.display =
                    "inline-block";


                updateCart();

                return;

            }


            quantityNumber.textContent =
                item.quantity;


            updateCart();

        }
    );

}


// ==========================================
// OPEN CART
// ==========================================

cartButton.addEventListener(
    "click",
    function() {

        cartPanel.classList.add(
            "active"
        );

        cartOverlay.classList.add(
            "active"
        );

    }
);


// ==========================================
// CLOSE CART
// ==========================================

function closeCartPanel() {

    cartPanel.classList.remove(
        "active"
    );

    cartOverlay.classList.remove(
        "active"
    );

}


closeCart.addEventListener(
    "click",
    closeCartPanel
);


cartOverlay.addEventListener(
    "click",
    closeCartPanel
);


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {


    // Calculate total quantity

    let totalItems = 0;


    cart.forEach(function(item) {

        totalItems += item.quantity;

    });


    cartCount.textContent =
        totalItems;


    // Clear cart display

    cartItems.innerHTML = "";


    // ==================================
    // EMPTY CART
    // ==================================

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    ☕
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add something delicious
                    from our menu.
                </p>

            </div>

        `;


        cartTotal.textContent =
            "₹0";


        checkoutTotal.textContent =
            "₹0";


        checkoutButton.disabled =
            true;


        return;

    }


    checkoutButton.disabled =
        false;


    // ==================================
    // CART ITEMS
    // ==================================

    let total = 0;


    cart.forEach(function(item, index) {


        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-top">

                <span class="cart-item-name">
                    ${item.name}
                </span>

                <span class="cart-item-price">
                    ₹${itemTotal}
                </span>

            </div>


            <div class="cart-item-bottom">


                <div class="quantity-controls">

                    <button
                        class="quantity-button"
                        onclick="decreaseQuantity(${index})">

                        −

                    </button>


                    <span class="quantity">
                        ${item.quantity}
                    </span>


                    <button
                        class="quantity-button"
                        onclick="increaseQuantity(${index})">

                        +

                    </button>

                </div>


                <button
                    class="remove-button"
                    onclick="removeItem(${index})">

                    Remove

                </button>


            </div>

        `;


        cartItems.appendChild(
            cartItem
        );

    });


    cartTotal.textContent =
        "₹" + total;


    checkoutTotal.textContent =
        "₹" + total;

}


// ==========================================
// CART PLUS
// ==========================================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


// ==========================================
// CART MINUS
// ==========================================

function decreaseQuantity(index) {

    cart[index].quantity--;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// ==========================================
// REMOVE ITEM
// ==========================================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// ==========================================
// OPEN CHECKOUT
// ==========================================

checkoutButton.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            return;

        }


        checkoutOverlay.classList.add(
            "active"
        );


        checkoutTotal.textContent =
            cartTotal.textContent;

    }
);


// ==========================================
// CLOSE CHECKOUT
// ==========================================

closeCheckout.addEventListener(
    "click",
    function() {

        checkoutOverlay.classList.remove(
            "active"
        );

    }
);


// ==========================================
// TAKEAWAY / DINE-IN
// ==========================================

orderType.addEventListener(
    "change",
    function() {


        if (orderType.value === "Takeaway") {

            addressFields.style.display =
                "block";

            address.required =
                true;

            city.required =
                true;

            pincode.required =
                true;

        }

        else {

            addressFields.style.display =
                "none";

            address.required =
                false;

            city.required =
                false;

            pincode.required =
                false;

        }

    }
);


// ==========================================
// PLACE ORDER
// ==========================================

orderForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // Generate order number

        const randomNumber =
            Math.floor(
                1000 +
                Math.random() * 9000
            );


        orderNumber.textContent =
            "RISA" + randomNumber;


        // Close checkout

        checkoutOverlay.classList.remove(
            "active"
        );


        // Close cart

        closeCartPanel();


        // Show success

        successOverlay.classList.add(
            "active"
        );


        // Clear cart

        cart = [];

        updateCart();


        // Clear form

        orderForm.reset();


        // Show address fields again

        addressFields.style.display =
            "block";

    }
);


// ==========================================
// DONE
// ==========================================

doneButton.addEventListener(
    "click",
    function() {

        successOverlay.classList.remove(
            "active"
        );

    }
);


// ==========================================
// INITIALIZE
// ==========================================

addressFields.style.display =
    "block";


updateCart();