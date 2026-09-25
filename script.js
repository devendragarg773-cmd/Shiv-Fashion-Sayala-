/* =========================================================
   SHIV FASHION SAYALA
   COMPLETE FIXED JAVASCRIPT
========================================================= */

"use strict";

/* =========================================================
   DEFAULT PRODUCTS
========================================================= */

const defaultProducts = [
  {
    id: 1,
    name: "Premium Black Shirt",
    category: "Shirts",
    sizes: ["M", "L", "XL", "XXL"],
    quantity: 20,
    price: 999,
    oldPrice: 1499,
    description: "Premium black casual shirt with a modern comfortable fit.",
    images: [],
    rating: 4.8,
    out: false
  },
  {
    id: 2,
    name: "Classic Oversized T-Shirt",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    quantity: 25,
    price: 799,
    oldPrice: 1199,
    description: "Premium oversized T-shirt made for everyday style.",
    images: [],
    rating: 4.7,
    out: false
  },
  {
    id: 3,
    name: "Relaxed Fit Jeans",
    category: "Jeans",
    sizes: ["30", "32", "34", "36", "38"],
    quantity: 15,
    price: 1599,
    oldPrice: 2299,
    description: "Comfortable relaxed fit jeans with premium finishing.",
    images: [],
    rating: 4.9,
    out: false
  },
  {
    id: 4,
    name: "Premium Hoodie",
    category: "Hoodies",
    sizes: ["M", "L", "XL", "XXL"],
    quantity: 12,
    price: 1499,
    oldPrice: 2199,
    description: "Warm premium hoodie with stylish modern design.",
    images: [],
    rating: 4.8,
    out: false
  },
  {
    id: 5,
    name: "Comfort Lower",
    category: "Lowers",
    sizes: ["M", "L", "XL", "XXL"],
    quantity: 18,
    price: 899,
    oldPrice: 1299,
    description: "Comfortable lower suitable for casual and daily wear.",
    images: [],
    rating: 4.6,
    out: false
  },
  {
    id: 6,
    name: "Premium Denim Jacket",
    category: "Jackets",
    sizes: ["M", "L", "XL"],
    quantity: 10,
    price: 1799,
    oldPrice: 2499,
    description: "Premium denim jacket with a stylish streetwear look.",
    images: [],
    rating: 4.9,
    out: false
  },
  {
    id: 7,
    name: "Sporty Tracksuit",
    category: "Tracksuits",
    sizes: ["M", "L", "XL", "XXL"],
    quantity: 14,
    price: 1899,
    oldPrice: 2799,
    description: "Comfortable tracksuit for sports and casual outings.",
    images: [],
    rating: 4.7,
    out: false
  },
  {
    id: 8,
    name: "Casual Shorts",
    category: "Shorts",
    sizes: ["M", "L", "XL"],
    quantity: 22,
    price: 599,
    oldPrice: 899,
    description: "Lightweight casual shorts for everyday comfort.",
    images: [],
    rating: 4.5,
    out: false
  },
  {
    id: 9,
    name: "Premium Fashion Cap",
    category: "Accessories",
    sizes: ["Free Size"],
    quantity: 30,
    price: 399,
    oldPrice: 599,
    description: "Stylish premium cap for a complete fashion look.",
    images: [],
    rating: 4.6,
    out: false
  }
];

/* =========================================================
   DEFAULT BANNERS
========================================================= */

const defaultBanners = [
  {
    id: 1,
    title: "Premium Fashion Collection",
    text: "Discover your new style today.",
    image: ""
  },
  {
    id: 2,
    title: "Men's & Boys Fashion",
    text: "Premium style. Premium comfort.",
    image: ""
  }
];

/* =========================================================
   SAFE LOCAL STORAGE
========================================================= */

function getStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return fallback;
    }

    return JSON.parse(data) ?? fallback;
  } catch (error) {
    console.warn("Storage error:", key, error);
    return fallback;
  }
}

/* =========================================================
   DATA
========================================================= */

let products = getStorage(
  "shiv_products",
  defaultProducts
);

let banners = getStorage(
  "shiv_banners",
  defaultBanners
);

let cart = getStorage(
  "shiv_cart",
  []
);

let wishlist = getStorage(
  "shiv_wishlist",
  []
);

let customers = getStorage(
  "shiv_customers",
  []
);

let complaints = getStorage(
  "shiv_complaints",
  []
);

let orders = getStorage(
  "shiv_orders",
  []
);

let reviews = getStorage(
  "shiv_reviews",
  []
);

let aboutShop =
  localStorage.getItem("shiv_about") ||
  `Welcome to Shiv Fashion Sayala.

We provide premium Men's & Boys fashion including Shirts, T-Shirts, Jeans, Lowers, Shorts, Jackets, Tracksuits and Hoodies.

Our goal is to provide stylish products with great comfort and quality.`;

let helpline =
  localStorage.getItem("shiv_helpline") ||
  "📞 Helpline: Please contact our store support.";

let editingProductId = null;
let editingBannerId = null;
let toastTimer = null;

/* =========================================================
   SAVE ALL DATA
========================================================= */

function saveAllData() {
  try {
    localStorage.setItem(
      "shiv_products",
      JSON.stringify(products)
    );

    localStorage.setItem(
      "shiv_banners",
      JSON.stringify(banners)
    );

    localStorage.setItem(
      "shiv_cart",
      JSON.stringify(cart)
    );

    localStorage.setItem(
      "shiv_wishlist",
      JSON.stringify(wishlist)
    );

    localStorage.setItem(
      "shiv_customers",
      JSON.stringify(customers)
    );

    localStorage.setItem(
      "shiv_complaints",
      JSON.stringify(complaints)
    );

    localStorage.setItem(
      "shiv_orders",
      JSON.stringify(orders)
    );

    localStorage.setItem(
      "shiv_reviews",
      JSON.stringify(reviews)
    );

    localStorage.setItem(
      "shiv_about",
      aboutShop
    );

    localStorage.setItem(
      "shiv_helpline",
      helpline
    );
  } catch (error) {
    console.error("Save error:", error);
    showToast("Data save nahi ho paya.");
  }
}

/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {
    renderProducts(products);
    renderBanners();
    updateCartCount();
    renderCart();
    renderWishlist();
    setupSearch();
  }
);

/* =========================================================
   PRODUCT IMAGE
========================================================= */

function getProductImage(product) {
  if (
    product &&
    Array.isArray(product.images) &&
    product.images.length > 0 &&
    product.images[0]
  ) {
    return product.images[0];
  }

  return "";
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function createProductCard(product) {
  const image = getProductImage(product);

  const isWishlisted =
    wishlist.includes(Number(product.id));

  const stockText =
    Number(product.quantity) > 0 && !product.out
      ? `${product.quantity} available`
      : "Out of Stock";

  return `
    <article
      class="product-card"
      onclick="showProduct(${Number(product.id)})"
    >

      ${
        product.out || Number(product.quantity) <= 0
          ? `
            <div class="out-of-stock">
              OUT OF STOCK
            </div>
          `
          : ""
      }

      <div class="product-image">
        ${
          image
            ? `
              <img
                src="${image}"
                alt="${escapeHTML(product.name)}"
              >
            `
            : `
              <div class="product-image-placeholder">
                👕
              </div>
            `
        }
      </div>

      <div class="product-info">

        <div class="product-category">
          ${escapeHTML(product.category || "Fashion")}
        </div>

        <h3 class="product-name">
          ${escapeHTML(product.name)}
        </h3>

        <p class="product-description">
          ${escapeHTML(product.description || "")}
        </p>

        <div class="product-price">

          <span class="current-price">
            ₹${Number(product.price || 0).toLocaleString("en-IN")}
          </span>

          ${
            product.oldPrice
              ? `
                <span class="old-price">
                  ₹${Number(product.oldPrice).toLocaleString("en-IN")}
                </span>
              `
              : ""
          }

        </div>

        <small
          style="
            color:#788493;
            display:block;
            margin-top:5px;
          "
        >
          ${stockText}
        </small>

        <div
          class="product-actions"
          onclick="event.stopPropagation()"
        >

          <button
            type="button"
            onclick="toggleWishlist(${Number(product.id)})"
            class="wishlist-button"
            title="Wishlist"
          >
            ${isWishlisted ? "♥" : "♡"}
          </button>

          <button
            type="button"
            onclick="addToCart(${Number(product.id)})"
            ${product.out || Number(product.quantity) <= 0 ? "disabled" : ""}
          >
            ${
              product.out || Number(product.quantity) <= 0
                ? "Unavailable"
                : "Add To Cart"
            }
          </button>

        </div>

      </div>

    </article>
  `;
}

/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(list) {
  const grid =
    document.getElementById("productGrid");

  const noProducts =
    document.getElementById("noProducts");

  if (!grid) return;

  grid.innerHTML = "";

  if (!Array.isArray(list) || list.length === 0) {
    if (noProducts) {
      noProducts.classList.remove("hidden");
    }

    return;
  }

  if (noProducts) {
    noProducts.classList.add("hidden");
  }

  list.forEach(function (product) {
    grid.innerHTML += createProductCard(product);
  });
}

/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {
  const input =
    document.getElementById("searchInput");

  if (!input) return;

  input.addEventListener(
    "input",
    function () {
      const value =
        input.value
          .trim()
          .toLowerCase();

      if (!value) {
        renderProducts(products);

        const title =
          document.getElementById(
            "productSectionTitle"
          );

        if (title) {
          title.textContent =
            "Featured Products";
        }

        return;
      }

      const result =
        products.filter(function (product) {
          return (
            String(product.name || "")
              .toLowerCase()
              .includes(value) ||

            String(product.category || "")
              .toLowerCase()
              .includes(value) ||

            String(product.description || "")
              .toLowerCase()
              .includes(value)
          );
        });

      renderProducts(result);

      const title =
        document.getElementById(
          "productSectionTitle"
        );

      if (title) {
        title.textContent =
          `Search Results (${result.length})`;
      }

      scrollToProducts();
    }
  );
}

function searchProducts() {
  const input =
    document.getElementById("searchInput");

  if (input) {
    input.dispatchEvent(
      new Event("input")
    );
  }
}

/* =========================================================
   CATEGORY
========================================================= */

function showCategory(category) {
  closeAllPanels();
  showHome();

  let result;

  if (
    !category ||
    String(category).toLowerCase() === "all"
  ) {
    result = products;

    const title =
      document.getElementById(
        "productSectionTitle"
      );

    if (title) {
      title.textContent = "All Products";
    }
  } else {
    const wantedCategory =
      String(category).toLowerCase();

    result = products.filter(function (product) {
      return (
        String(product.category || "")
          .toLowerCase() === wantedCategory
      );
    });

    const title =
      document.getElementById(
        "productSectionTitle"
      );

    if (title) {
      title.textContent = category;
    }
  }

  renderProducts(result);
  scrollToProducts();
}

/* =========================================================
   HOME
========================================================= */

function showHome() {
  const home =
    document.getElementById("homePage");

  const productPage =
    document.getElementById("productPage");

  if (home) {
    home.classList.remove("hidden");
  }

  if (productPage) {
    productPage.classList.add("hidden");
  }
}

/* =========================================================
   PRODUCT DETAIL
========================================================= */

function showProduct(id) {
  const product =
    products.find(function (item) {
      return (
        Number(item.id) === Number(id)
      );
    });

  if (!product) return;

  const home =
    document.getElementById("homePage");

  const page =
    document.getElementById("productPage");

  const detail =
    document.getElementById("productDetail");

  if (!detail) return;

  if (home) {
    home.classList.add("hidden");
  }

  if (page) {
    page.classList.remove("hidden");
  }

  const images =
    Array.isArray(product.images) &&
    product.images.length
      ? product.images
      : [""];

  let imageHTML = "";

  images.forEach(function (image) {
    imageHTML += `
      <div
        style="
          aspect-ratio:1;
          background:#09111d;
          border-radius:15px;
          overflow:hidden;
          border:1px solid rgba(212,175,55,.2);
        "
      >

        ${
          image
            ? `
              <img
                src="${image}"
                alt="${escapeHTML(product.name)}"
                style="
                  width:100%;
                  height:100%;
                  object-fit:cover;
                "
              >
            `
            : `
              <div
                style="
                  width:100%;
                  height:100%;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  font-size:70px;
                "
              >
                👕
              </div>
            `
        }

      </div>
    `;
  });

  const sizes =
    Array.isArray(product.sizes)
      ? product.sizes
      : [];

  let sizeHTML = "";

  sizes.forEach(function (size, index) {
    sizeHTML += `
      <button
        type="button"
        class="${index === 0 ? "active" : ""}"
        onclick="selectSize(this)"
      >
        ${escapeHTML(size)}
      </button>
    `;
  });

  detail.innerHTML = `
    <div class="product-detail">

      <div class="product-detail-images">
        ${imageHTML}
      </div>

      <div class="product-detail-content">

        <span class="gold-label">
          ${escapeHTML(product.category || "Fashion")}
        </span>

        <h1>
          ${escapeHTML(product.name)}
        </h1>

        <div
          style="
            color:#f5d76e;
            margin:10px 0;
          "
        >
          ⭐ ${product.rating || "4.5"} / 5
        </div>

        <p
          style="
            color:#8994a3;
            line-height:1.8;
          "
        >
          ${escapeHTML(product.description || "")}
        </p>

        <div class="detail-price">
          ₹${Number(product.price || 0).toLocaleString("en-IN")}

          ${
            product.oldPrice
              ? `
                <span
                  style="
                    color:#667080;
                    font-size:16px;
                    text-decoration:line-through;
                    margin-left:10px;
                  "
                >
                  ₹${Number(product.oldPrice).toLocaleString("en-IN")}
                </span>
              `
              : ""
          }
        </div>

        <p
          style="
            color:#8994a3;
            margin-bottom:8px;
          "
        >
          Available Sizes
        </p>

        <div class="size-buttons">
          ${
            sizeHTML ||
            "<span>No size information</span>"
          }
        </div>

        <p
          style="
            color:#8994a3;
            margin-bottom:20px;
          "
        >
          ${
            product.out ||
            Number(product.quantity) <= 0
              ? "Currently unavailable"
              : `${product.quantity} pieces available`
          }
        </p>

        <div
          style="
            display:flex;
            gap:10px;
            flex-wrap:wrap;
          "
        >

          <button
            type="button"
            class="primary-button"
            onclick="addToCart(${Number(product.id)})"
            ${
              product.out ||
              Number(product.quantity) <= 0
                ? "disabled"
                : ""
            }
          >
            🛒 Add To Cart
          </button>

          <button
            type="button"
            class="primary-button"
            onclick="toggleWishlist(${Number(product.id)})"
          >
            ${
              wishlist.includes(Number(product.id))
                ? "♥ Wishlisted"
                : "♡ Wishlist"
            }
          </button>

        </div>

      </div>

    </div>
  `;

  renderRelatedProducts(product);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =========================================================
   SIZE SELECT
========================================================= */

function selectSize(button) {
  document
    .querySelectorAll(".size-buttons button")
    .forEach(function (btn) {
      btn.classList.remove("active");
    });

  if (button) {
    button.classList.add("active");
  }
}

/* =========================================================
   RELATED PRODUCTS
========================================================= */

function renderRelatedProducts(current) {
  const container =
    document.getElementById(
      "relatedProducts"
    );

  if (!container) return;

  const related =
    products
      .filter(function (product) {
        return (
          Number(product.id) !==
            Number(current.id) &&
          String(product.category || "") ===
            String(current.category || "")
        );
      })
      .slice(0, 4);

  const fallback =
    products
      .filter(function (product) {
        return (
          Number(product.id) !==
          Number(current.id)
        );
      })
      .slice(0, 4);

  const finalProducts =
    related.length >= 2
      ? related
      : fallback;

  container.innerHTML =
    finalProducts
      .map(createProductCard)
      .join("");
}

/* =========================================================
   GO HOME
========================================================= */

function goHome() {
  showHome();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =========================================================
   SCROLL PRODUCTS
========================================================= */

function scrollToProducts() {
  const section =
    document.getElementById(
      "productsSection"
    );

  if (section) {
    section.scrollIntoView({
      behavior: "smooth"
    });
  }
}

/* =========================================================
   CART
========================================================= */

function addToCart(id) {
  const product =
    products.find(function (item) {
      return (
        Number(item.id) === Number(id)
      );
    });

  if (!product) return;

  if (
    product.out ||
    Number(product.quantity) <= 0
  ) {
    showToast(
      "Product is out of stock."
    );
    return;
  }

  let existing =
    cart.find(function (item) {
      return (
        Number(item.id) === Number(id)
      );
    });

  if (existing) {
    if (
      Number(existing.quantity) >=
      Number(product.quantity)
    ) {
      showToast(
        "Available quantity reached."
      );
      return;
    }

    existing.quantity++;
  } else {
    cart.push({
      id: Number(product.id),
      quantity: 1
    });
  }

  saveAllData();
  updateCartCount();
  renderCart();

  showToast(
    `${product.name} added to cart`
  );
}

function removeFromCart(id) {
  cart =
    cart.filter(function (item) {
      return (
        Number(item.id) !== Number(id)
      );
    });

  saveAllData();
  updateCartCount();
  renderCart();
}

function changeCartQuantity(id, amount) {
  const cartItem =
    cart.find(function (item) {
      return (
        Number(item.id) === Number(id)
      );
    });

  const product =
    products.find(function (item) {
      return (
        Number(item.id) === Number(id)
      );
    });

  if (!cartItem || !product) return;

  cartItem.quantity =
    Number(cartItem.quantity) +
    Number(amount);

  if (cartItem.quantity <= 0) {
    removeFromCart(id);
    return;
  }

  if (
    cartItem.quantity >
    Number(product.quantity)
  ) {
    cartItem.quantity =
      Number(product.quantity);

    showToast(
      "Maximum available quantity reached."
    );
  }

  saveAllData();
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const count =
    cart.reduce(function (total, item) {
      return (
        total +
        Number(item.quantity || 0)
      );
    }, 0);

  const element =
    document.getElementById(
      "cartCount"
    );

  if (element) {
    element.textContent = count;
  }
}

/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {
  const container =
    document.getElementById(
      "cartItems"
    );

  const totalElement =
    document.getElementById(
      "cartTotal"
    );

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div
        style="
          text-align:center;
          padding:50px 10px;
          color:#7d8998;
        "
      >
        <div
          style="
            font-size:50px;
            margin-bottom:15px;
          "
        >
          🛒
        </div>

        <h3 style="color:white;">
          Your cart is empty
        </h3>

        <p>
          Add products to continue shopping.
        </p>
      </div>
    `;

    if (totalElement) {
      totalElement.textContent = "₹0";
    }

    return;
  }

  let total = 0;

  container.innerHTML = "";

  cart.forEach(function (item) {
    const product =
      products.find(function (product) {
        return (
          Number(product.id) ===
          Number(item.id)
        );
      });

    if (!product) return;

    const subtotal =
      Number(product.price || 0) *
      Number(item.quantity || 0);

    total += subtotal;

    const image =
      getProductImage(product);

    container.innerHTML += `
      <div class="cart-item">

        ${
          image
            ? `
              <img
                src="${image}"
                alt=""
              >
            `
            : `
              <div
                style="
                  width:65px;
                  height:65px;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  background:#0c1624;
                  border-radius:8px;
                  font-size:25px;
                "
              >
                👕
              </div>
            `
        }

        <div class="cart-item-info">

          <strong>
            ${escapeHTML(product.name)}
          </strong>

          <small>
            ₹${Number(product.price || 0).toLocaleString("en-IN")}
          </small>

          <div
            style="
              display:flex;
              align-items:center;
              gap:8px;
              margin-top:8px;
            "
          >

            <button
              onclick="changeCartQuantity(${Number(product.id)}, -1)"
              style="
                border:1px solid #765f20;
                background:transparent;
                color:#f5d76e;
                width:25px;
                height:25px;
                border-radius:5px;
              "
            >
              −
            </button>

            <span>
              ${Number(item.quantity)}
            </span>

            <button
              onclick="changeCartQuantity(${Number(product.id)}, 1)"
              style="
                border:1px solid #765f20;
                background:transparent;
                color:#f5d76e;
                width:25px;
                height:25px;
                border-radius:5px;
              "
            >
              +
            </button>

            <button
              onclick="removeFromCart(${Number(product.id)})"
              style="
                margin-left:auto;
                border:0;
                background:transparent;
                color:#e77;
              "
            >
              ✕
            </button>

          </div>

        </div>

      </div>
    `;
  });

  if (totalElement) {
    totalElement.textContent =
      `₹${total.toLocaleString("en-IN")}`;
  }
}

/* =========================================================
   CART PANEL
========================================================= */

function openCart() {
  closeAllPanels();
  renderCart();

  document
    .getElementById("cartPanel")
    ?.classList.remove("hidden");
}

function closeCart() {
  document
    .getElementById("cartPanel")
    ?.classList.add("hidden");
}

/* =========================================================
   CHECKOUT
========================================================= */

function checkout() {
  if (cart.length === 0) {
    showToast(
      "Your cart is empty."
    );
    return;
  }

  if (!customers.length) {
    openLogin();

    showToast(
      "Please login before checkout."
    );

    return;
  }

  const customer =
    customers[customers.length - 1];

  const orderItems =
    cart
      .map(function (item) {
        const product =
          products.find(function (product) {
            return (
              Number(product.id) ===
              Number(item.id)
            );
          });

        if (!product) return null;

        return {
          productId: product.id,
          name: product.name,
          price: Number(product.price),
          quantity: Number(item.quantity)
        };
      })
      .filter(Boolean);

  const total =
    orderItems.reduce(function (
      sum,
      item
    ) {
      return (
        sum +
        Number(item.price) *
          Number(item.quantity)
      );
    }, 0);

  const order = {
    id:
      "ORD" +
      Date.now(),

    customerId:
      customer.id,

    customerName:
      customer.name,

    phone:
      customer.phone,

    email:
      customer.email,

    items:
      orderItems,

    total:
      total,

    status:
      "Pending",

    date:
      new Date().toLocaleString(
        "en-IN"
      )
  };

  orders.push(order);

  cart = [];

  saveAllData();
  updateCartCount();
  renderCart();

  showToast(
    `Order ${order.id} created successfully!`
  );
}

/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(id) {
  const numberId = Number(id);

  const index =
    wishlist.findIndex(function (item) {
      return Number(item) === numberId;
    });

  if (index >= 0) {
    wishlist.splice(index, 1);

    showToast(
      "Removed from wishlist"
    );
  } else {
    wishlist.push(numberId);

    showToast(
      "Added to wishlist ❤️"
    );
  }

  saveAllData();
  renderProducts(products);
  renderWishlist();

  if (
    document.getElementById(
      "productPage"
    ) &&
    !document
      .getElementById("productPage")
      .classList.contains("hidden")
  ) {
    showProduct(numberId);
  }
}

function renderWishlist() {
  const container =
    document.getElementById(
      "wishlistItems"
    );

  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div
        style="
          text-align:center;
          padding:50px 10px;
          color:#7d8998;
        "
      >
        <div
          style="
            font-size:50px;
          "
        >
          ♡
        </div>

        <p>
          Your wishlist is empty.
        </p>
      </div>
    `;

    return;
  }

  container.innerHTML = "";

  wishlist.forEach(function (id) {
    const product =
      products.find(function (product) {
        return (
          Number(product.id) ===
          Number(id)
        );
      });

    if (!product) return;

    const image =
      getProductImage(product);

    container.innerHTML += `
      <div class="cart-item">

        ${
          image
            ? `
              <img
                src="${image}"
                alt=""
              >
            `
            : `
              <div
                style="
                  width:65px;
                  height:65px;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  background:#0c1624;
                  border-radius:8px;
                "
              >
                👕
              </div>
            `
        }

        <div class="cart-item-info">

          <strong>
            ${escapeHTML(product.name)}
          </strong>

          <small>
            ₹${Number(product.price || 0).toLocaleString("en-IN")}
          </small>

          <div
            style="
              margin-top:8px;
              display:flex;
              gap:7px;
            "
          >

            <button
              onclick="addToCart(${Number(product.id)})"
              style="
                border:1px solid #d4af37;
                background:transparent;
                color:#f5d76e;
                padding:6px 9px;
                border-radius:6px;
              "
            >
              Add Cart
            </button>

            <button
              onclick="toggleWishlist(${Number(product.id)})"
              style="
                border:0;
                background:transparent;
                color:#e88;
              "
            >
              Remove
            </button>

          </div>

        </div>

      </div>
    `;
  });
}

function openWishlist() {
  closeAllPanels();
  renderWishlist();

  document
    .getElementById("wishlistPanel")
    ?.classList.remove("hidden");
}

function closeWishlist() {
  document
    .getElementById("wishlistPanel")
    ?.classList.add("hidden");
}

/* =========================================================
   SETTINGS
========================================================= */

function openSettings() {
  closeAllPanels();

  document
    .getElementById("settingsPanel")
    ?.classList.remove("hidden");
}

function closeSettings() {
  document
    .getElementById("settingsPanel")
    ?.classList.add("hidden");
}

/* =========================================================
   OWNER ACCESS
========================================================= */

function openOwnerAccess() {
  closeSettings();

  const pin =
    prompt("Enter Owner PIN:");

  if (pin !== "1234") {
    showToast("Wrong Owner PIN");
    return;
  }

  document
    .getElementById("ownerPanel")
    ?.classList.remove("hidden");
}

function closeOwnerAccess() {
  document
    .getElementById("ownerPanel")
    ?.classList.add("hidden");
}

/* =========================================================
   OWNER PRODUCTS
========================================================= */

function openOwnerProducts() {
  closeOwnerAccess();

  renderOwnerProducts();

  document
    .getElementById("ownerProductPanel")
    ?.classList.remove("hidden");
}

function renderOwnerProducts() {
  const container =
    document.getElementById(
      "ownerProductList"
    );

  if (!container) return;

  if (!products.length) {
    container.innerHTML = `
      <p style="color:#8994a3;">
        No products available.
      </p>
    `;

    return;
  }

  container.innerHTML = "";

  products.forEach(function (product) {
    const image =
      getProductImage(product);

    container.innerHTML += `
      <div class="owner-list-item">

        ${
          image
            ? `
              <img
                src="${image}"
                alt=""
              >
            `
            : `
              <div
                style="
                  width:75px;
                  height:75px;
                  background:#0b1625;
                  border-radius:10px;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  font-size:30px;
                "
              >
                👕
              </div>
            `
        }

        <div class="owner-list-content">

          <strong>
            ${escapeHTML(product.name)}
          </strong>

          <small>
            ${escapeHTML(product.category || "")}
            • ₹${Number(product.price || 0)}
            • Qty: ${Number(product.quantity || 0)}
          </small>

          <small
            style="
              display:block;
              margin-top:5px;
              color:${product.out ? "#e88" : "#8dbb8d"};
            "
          >
            ${
              product.out
                ? "OUT OF STOCK"
                : "AVAILABLE"
            }
          </small>

        </div>

        <div class="owner-list-actions">

          <button
            onclick="editProduct(${Number(product.id)})"
          >
            Edit
          </button>

          <button
            onclick="deleteProduct(${Number(product.id)})"
          >
            Delete
          </button>

          <button
            onclick="toggleProductStock(${Number(product.id)})"
          >
            ${
              product.out
                ? "In Stock"
                : "Out"
            }
          </button>

        </div>

      </div>
    `;
  });
}

/* =========================================================
   PRODUCT FORM
========================================================= */

function openProductForm(product = null) {
  editingProductId =
    product
      ? Number(product.id)
      : null;

  document
    .getElementById("productFormPanel")
    ?.classList.remove("hidden");

  const title =
    document.getElementById(
      "productFormTitle"
    );

  if (title) {
    title.textContent =
      product
        ? "Edit Product"
        : "Add Product";
  }

  if (!product) {
    document
      .getElementById("productForm")
      ?.reset();

    const preview =
      document.getElementById(
        "productImagePreview"
      );

    if (preview) {
      preview.innerHTML = "";
    }

    return;
  }

  const fields = {
    productName: product.name || "",
    productCategory: product.category || "",
    productSizes: Array.isArray(product.sizes)
      ? product.sizes.join(", ")
      : "",
    productQuantity: product.quantity || 0,
    productPrice: product.price || 0,
    productOldPrice: product.oldPrice || "",
    productDescription: product.description || ""
  };

  Object.keys(fields).forEach(function (id) {
    const element =
      document.getElementById(id);

    if (element) {
      element.value =
        fields[id];
    }
  });

  const preview =
    document.getElementById(
      "productImagePreview"
    );

  if (!preview) return;

  preview.innerHTML = "";

  if (Array.isArray(product.images)) {
    product.images.forEach(function (image) {
      if (!image) return;

      preview.innerHTML += `
        <img
          src="${image}"
          alt=""
        >
      `;
    });
  }
}

function closeProductForm() {
  document
    .getElementById("productFormPanel")
    ?.classList.add("hidden");

  editingProductId = null;
}

function editProduct(id) {
  const product =
    products.find(function (item) {
      return (
        Number(item.id) === Number(id)
      );
    });

  if (product) {
    openProductForm(product);
  }
}

/* =========================================================
   READ IMAGES
========================================================= */

function filesToDataURLs(files) {
  return Promise.all(
    Array.from(files).map(function (file) {
      return new Promise(
        function (resolve, reject) {
          const reader =
            new FileReader();

          reader.onload =
            function () {
              resolve(reader.result);
            };

          reader.onerror =
            reject;

          reader.readAsDataURL(file);
        }
      );
    })
  );
}

/* =========================================================
   SAVE PRODUCT
========================================================= */

async function saveProduct(event) {
  if (event) {
    event.preventDefault();
  }

  const getValue = function (id) {
    const element =
      document.getElementById(id);

    return element
      ? element.value
      : "";
  };

  const name =
    getValue("productName").trim();

  const category =
    getValue("productCategory");

  const sizes =
    getValue("productSizes")
      .split(",")
      .map(function (size) {
        return size.trim();
      })
      .filter(Boolean);

  const quantity =
    Number(
      getValue("productQuantity")
    ) || 0;

  const price =
    Number(
      getValue("productPrice")
    ) || 0;

  const oldPrice =
    Number(
      getValue("productOldPrice")
    ) || 0;

  const description =
    getValue("productDescription")
      .trim();

  if (!name) {
    showToast("Product name required.");
    return;
  }

  if (!category) {
    showToast("Category select karo.");
    return;
  }

  if (price <= 0) {
    showToast("Valid price enter karo.");
    return;
  }

  const imageInput =
    document.getElementById(
      "productImages"
    );

  let images = [];

  if (
    imageInput &&
    imageInput.files &&
    imageInput.files.length > 0
  ) {
    try {
      images =
        await filesToDataURLs(
          imageInput.files
        );
    } catch (error) {
      console.error(error);
      showToast(
        "Image upload failed."
      );
      return;
    }
  }

  if (editingProductId !== null) {
    const product =
      products.find(function (item) {
        return (
          Number(item.id) ===
          Number(editingProductId)
        );
      });

    if (!product) return;

    product.name = name;
    product.category = category;
    product.sizes = sizes;
    product.quantity = quantity;
    product.price = price;
    product.oldPrice = oldPrice;
    product.description = description;

    if (images.length > 0) {
      product.images = images;
    }

    if (quantity <= 0) {
      product.out = true;
    }

    showToast(
      "Product updated successfully!"
    );
  } else {
    products.push({
      id: Date.now(),
      name: name,
      category: category,
      sizes: sizes,
      quantity: quantity,
      price: price,
      oldPrice: oldPrice,
      description: description,
      images: images,
      rating: 5,
      out: quantity <= 0
    });

    showToast(
      "Product added successfully!"
    );
  }

  saveAllData();
  closeProductForm();
  renderProducts(products);
  renderOwnerProducts();
}

/* =========================================================
   DELETE PRODUCT
========================================================= */

function deleteProduct(id) {
  const product =
    products.find(function (item) {
      return (
        Number(item.id) === Number(id)
      );
    });

  if (!product) return;

  const confirmDelete =
    confirm(
      `Delete "${product.name}"?`
    );

  if (!confirmDelete) return;

  products =
    products.filter(function (item) {
      return (
        Number(item.id) !== Number(id)
      );
    });

  wishlist =
    wishlist.filter(function (item) {
      return (
        Number(item) !== Number(id)
      );
    });

  cart =
    cart.filter(function (item) {
      return (
        Number(item.id) !== Number(id)
      );
    });

  saveAllData();

  renderProducts(products);
  renderOwnerProducts();
  updateCartCount();
  renderCart();
  renderWishlist();

  showToast(
    "Product deleted."
  );
}

/* =========================================================
   STOCK
========================================================= */

function toggleProductStock(id) {
  const product =
    products.find(function (item) {
      return (
        Number(item.id) === Number(id)
      );
    });

  if (!product) return;

  product.out =
    !product.out;

  saveAllData();

  renderProducts(products);
  renderOwnerProducts();

  showToast(
    product.out
      ? "Product marked Out of Stock."
      : "Product is back in stock."
  );
}

/* =========================================================
   BANNERS
========================================================= */

function renderBanners() {
  const hero =
    document.getElementById(
      "heroSection"
    );

  if (!hero) return;

  if (
    !Array.isArray(banners) ||
    banners.length === 0
  ) {
    return;
  }

  const banner =
    banners[0];

  if (banner.image) {
    hero.style.backgroundImage = `
      linear-gradient(
        90deg,
        rgba(3,6,10,.95),
        rgba(3,8,16,.55)
      ),
      url("${banner.image}")
    `;

    hero.style.backgroundSize =
      "cover";

    hero.style.backgroundPosition =
      "center";
  }

  const content =
    hero.querySelector(
      ".hero-content"
    );

  if (!content) return;

  content.innerHTML = `
    <p class="hero-small-title">
      MEN'S & BOYS
    </p>

    <h2>
      ${escapeHTML(banner.title || "")}
    </h2>

    <p class="hero-description">
      ${escapeHTML(banner.text || "")}
    </p>

    <button
      type="button"
      onclick="scrollToProducts()"
      class="primary-button"
    >
      SHOP NOW →
    </button>
  `;
}

function openOwnerBanners() {
  closeOwnerAccess();

  renderBannerList();

  document
    .getElementById("bannerPanel")
    ?.classList.remove("hidden");
}

function renderBannerList() {
  const container =
    document.getElementById(
      "bannerList"
    );

  if (!container) return;

  if (!banners.length) {
    container.innerHTML = `
      <p style="color:#8994a3;">
        No banners available.
      </p>
    `;

    return;
  }

  container.innerHTML = "";

  banners.forEach(function (banner) {
    container.innerHTML += `
      <div class="owner-list-item">

        ${
          banner.image
            ? `
              <img
                src="${banner.image}"
                alt=""
              >
            `
            : `
              <div
                style="
                  width:75px;
                  height:75px;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  background:#0b1625;
                  border-radius:10px;
                  font-size:30px;
                "
              >
                🖼️
              </div>
            `
        }

        <div class="owner-list-content">

          <strong>
            ${escapeHTML(banner.title || "")}
          </strong>

          <small>
            ${escapeHTML(banner.text || "")}
          </small>

        </div>

        <div class="owner-list-actions">

          <button
            onclick="editBanner(${Number(banner.id)})"
          >
            Edit
          </button>

          <button
            onclick="deleteBanner(${Number(banner.id)})"
          >
            Delete
          </button>

        </div>

      </div>
    `;
  });
}

function openBannerForm(banner = null) {
  editingBannerId =
    banner
      ? Number(banner.id)
      : null;

  document
    .getElementById("bannerFormPanel")
    ?.classList.remove("hidden");

  const title =
    document.getElementById(
      "bannerFormTitle"
    );

  if (title) {
    title.textContent =
      banner
        ? "Edit Banner"
        : "Add Banner";
  }

  if (!banner) {
    document
      .getElementById("bannerForm")
      ?.reset();

    const preview =
      document.getElementById(
        "bannerImagePreview"
      );

    if (preview) {
      preview.innerHTML = "";
    }

    return;
  }

  const bannerTitle =
    document.getElementById(
      "bannerTitle"
    );

  const bannerText =
    document.getElementById(
      "bannerText"
    );

  if (bannerTitle) {
    bannerTitle.value =
      banner.title || "";
  }

  if (bannerText) {
    bannerText.value =
      banner.text || "";
  }

  const preview =
    document.getElementById(
      "bannerImagePreview"
    );

  if (preview) {
    preview.innerHTML =
      banner.image
        ? `<img src="${banner.image}" alt="">`
        : "";
  }
}

function closeBannerForm() {
  document
    .getElementById("bannerFormPanel")
    ?.classList.add("hidden");

  editingBannerId = null;
}

function editBanner(id) {
  const banner =
    banners.find(function (item) {
      return (
        Number(item.id) === Number(id)
      );
    });

  if (banner) {
    openBannerForm(banner);
  }
}

async function saveBanner(event) {
  if (event) {
    event.preventDefault();
  }

  const titleElement =
    document.getElementById(
      "bannerTitle"
    );

  const textElement =
    document.getElementById(
      "bannerText"
    );

  const imageInput =
    document.getElementById(
      "bannerImage"
    );

  const title =
    titleElement
      ? titleElement.value.trim()
      : "";

  const text =
    textElement
      ? textElement.value.trim()
      : "";

  let image = "";

  if (
    imageInput &&
    imageInput.files &&
    imageInput.files.length
  ) {
    try {
      const images =
        await filesToDataURLs([
          imageInput.files[0]
        ]);

      image = images[0];
    } catch (error) {
      showToast(
        "Banner image failed."
      );
      return;
    }
  }

  if (editingBannerId !== null) {
    const banner =
      banners.find(function (item) {
        return (
          Number(item.id) ===
          Number(editingBannerId)
        );
      });

    if (!banner) return;

    banner.title = title;
    banner.text = text;

    if (image) {
      banner.image = image;
    }

    showToast(
      "Banner updated successfully!"
    );
  } else {
    banners.push({
      id: Date.now(),
      title: title,
      text: text,
      image: image
    });

    showToast(
      "Banner added successfully!"
    );
  }

  saveAllData();
  closeBannerForm();
  renderBannerList();
  renderBanners();
}

function deleteBanner(id) {
  if (
    !confirm(
      "Delete this banner?"
    )
  ) {
    return;
  }

  banners =
    banners.filter(function (banner) {
      return (
        Number(banner.id) !== Number(id)
      );
    });

  saveAllData();
  renderBannerList();
  renderBanners();

  showToast(
    "Banner deleted."
  );
}

/* =========================================================
   CUSTOMERS
========================================================= */

function openCustomers() {
  closeOwnerAccess();

  renderCustomers();

  document
    .getElementById("customersPanel")
    ?.classList.remove("hidden");
}

function renderCustomers() {
  const container =
    document.getElementById(
      "customerList"
    );

  if (!container) return;

  if (!customers.length) {
    container.innerHTML = `
      <div
        style="
          padding:40px;
          text-align:center;
          color:#7e8998;
        "
      >
        👥

        <p style="margin-top:10px;">
          No customers registered yet.
        </p>
      </div>
    `;

    return;
  }

  container.innerHTML = "";

  customers.forEach(function (customer) {
    container.innerHTML += `
      <div class="owner-list-item">

        <div
          style="
            width:55px;
            height:55px;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#101d2e;
            color:#f5d76e;
            font-size:23px;
          "
        >
          👤
        </div>

        <div class="owner-list-content">

          <strong>
            ${escapeHTML(customer.name || "")}
          </strong>

          <small>
            📧 ${escapeHTML(customer.email || "")}
          </small>

          <small
            style="
              display:block;
              margin-top:4px;
            "
          >
            📱 ${escapeHTML(customer.phone || "")}
          </small>

        </div>

      </div>
    `;
  });
}

/* =========================================================
   LOGIN
========================================================= */

function openLogin() {
  closeAllPanels();

  document
    .getElementById("loginPanel")
    ?.classList.remove("hidden");
}

function closeLogin() {
  document
    .getElementById("loginPanel")
    ?.classList.add("hidden");
}

function customerLogin(event) {
  if (event) {
    event.preventDefault();
  }

  const getValue = function (id) {
    const element =
      document.getElementById(id);

    return element
      ? element.value.trim()
      : "";
  };

  const name =
    getValue("loginName");

  const email =
    getValue("loginEmail");

  const phone =
    getValue("loginPhone");

  if (!name || !email || !phone) {
    showToast(
      "Please fill all details."
    );
    return;
  }

  const existing =
    customers.find(function (customer) {
      return (
        customer.email === email ||
        customer.phone === phone
      );
    });

  if (existing) {
    existing.name = name;
  } else {
    customers.push({
      id: Date.now(),
      name: name,
      email: email,
      phone: phone,
      date: new Date().toLocaleString(
        "en-IN"
      )
    });
  }

  saveAllData();
  closeLogin();

  showToast(
    `Welcome ${name}!`
  );
}

/* =========================================================
   COMPLAINT BOX
========================================================= */

function openComplaintBox() {
  closeAllPanels();

  document
    .getElementById("complaintBox")
    ?.classList.remove("hidden");
}

function closeComplaintBox() {
  document
    .getElementById("complaintBox")
    ?.classList.add("hidden");
}

async function submitComplaint(event) {
  if (event) {
    event.preventDefault();
  }

  const getValue = function (id) {
    const element =
      document.getElementById(id);

    return element
      ? element.value.trim()
      : "";
  };

  const name =
    getValue("complaintName");

  const text =
    getValue("complaintText");

  const mediaInput =
    document.getElementById(
      "complaintMedia"
    );

  if (!name || !text) {
    showToast(
      "Name aur complaint likho."
    );
    return;
  }

  let media = "";

  if (
    mediaInput &&
    mediaInput.files &&
    mediaInput.files.length
  ) {
    try {
      const files =
        await filesToDataURLs([
          mediaInput.files[0]
        ]);

      media = files[0];
    } catch (error) {
      showToast(
        "Media upload failed."
      );
      return;
    }
  }

  complaints.push({
    id: Date.now(),
    name: name,
    text: text,
    media: media,
    status: "Pending",
    date: new Date().toLocaleString(
      "en-IN"
    )
  });

  saveAllData();

  document
    .getElementById("complaintBox")
    ?.classList.add("hidden");

  showToast(
    "Complaint submitted successfully."
  );
}

/* =========================================================
   OWNER COMPLAINTS
========================================================= */

function openOwnerComplaints() {
  closeOwnerAccess();

  renderComplaints();

  document
    .getElementById("complaintsPanel")
    ?.classList.remove("hidden");
}

function renderComplaints() {
  const container =
    document.getElementById(
      "complaintList"
    );

  if (!container) return;

  if (!complaints.length) {
    container.innerHTML = `
      <div
        style="
          padding:40px;
          text-align:center;
          color:#7e8998;
        "
      >
        📝

        <p style="margin-top:10px;">
          No complaints yet.
        </p>
      </div>
    `;

    return;
  }

  container.innerHTML = "";

  complaints.forEach(function (complaint) {
    container.innerHTML += `
      <div
        class="owner-list-item"
        style="align-items:flex-start;"
      >

        <div class="owner-list-content">

          <strong>
            ${escapeHTML(complaint.name || "")}
          </strong>

          <small>
            ${escapeHTML(complaint.date || "")}
          </small>

          <p
            style="
              margin-top:12px;
              color:#c0c8d2;
              line-height:1.6;
            "
          >
            ${escapeHTML(complaint.text || "")}
          </p>

          ${
            complaint.media
              ? `
                <a
                  href="${complaint.media}"
                  target="_blank"
                  style="
                    color:#f5d76e;
                    display:inline-block;
                    margin-top:10px;
                  "
                >
                  View Attachment
                </a>
              `
              : ""
          }

        </div>

        <button
          onclick="deleteComplaint(${Number(complaint.id)})"
          style="
            border:1px solid #633;
            background:transparent;
            color:#e88;
            padding:8px;
            border-radius:7px;
          "
        >
          Delete
        </button>

      </div>
    `;
  });
}

function deleteComplaint(id) {
  if (
    !confirm(
      "Delete this complaint?"
    )
  ) {
    return;
  }

  complaints =
    complaints.filter(function (complaint) {
      return (
        Number(complaint.id) !==
        Number(id)
      );
    });

  saveAllData();
  renderComplaints();

  showToast(
    "Complaint deleted."
  );
}

/* =========================================================
   ORDERS
========================================================= */

function openOwnerOrders() {
  closeOwnerAccess();

  renderOrders();

  document
    .getElementById("ordersPanel")
    ?.classList.remove("hidden");
}

function renderOrders() {
  const container =
    document.getElementById(
      "orderList"
    );

  if (!container) return;

  if (!orders.length) {
    container.innerHTML = `
      <div
        style="
          padding:40px;
          text-align:center;
          color:#7e8998;
        "
      >
        🛍️

        <p style="margin-top:10px;">
          No orders yet.
        </p>
      </div>
    `;

    return;
  }

  container.innerHTML = "";

  orders.forEach(function (order) {
    const items =
      Array.isArray(order.items)
        ? order.items
            .map(function (item) {
              return `
                ${escapeHTML(item.name || "")}
                × ${Number(item.quantity || 0)}
              `;
            })
            .join("<br>")
        : "No items";

    container.innerHTML += `
      <div
        class="owner-list-item"
        style="align-items:flex-start;"
      >

        <div class="owner-list-content">

          <strong>
            ${escapeHTML(order.id || "")}
          </strong>

          <small>
            ${escapeHTML(order.customerName || "")}
            • ${escapeHTML(order.phone || "")}
          </small>

          <p
            style="
              margin-top:10px;
              color:#a4afbd;
              line-height:1.6;
            "
          >
            ${items}
          </p>

          <strong
            style="
              display:block;
              color:#f5d76e;
              margin-top:8px;
            "
          >
            Total:
            ₹${Number(order.total || 0).toLocaleString("en-IN")}
          </strong>

          <small
            style="
              display:block;
              margin-top:7px;
            "
          >
            ${escapeHTML(order.date || "")}
          </small>

        </div>

        <select
          onchange="updateOrderStatus('${escapeHTML(order.id || "")}', this.value)"
          style="
            background:#0b1420;
            color:#fff;
            border:1px solid #765f20;
            border-radius:7px;
            padding:7px;
          "
        >

          <option
            value="Pending"
            ${order.status === "Pending" ? "selected" : ""}
          >
            Pending
          </option>

          <option
            value="Confirmed"
            ${order.status === "Confirmed" ? "selected" : ""}
          >
            Confirmed
          </option>

          <option
            value="Shipped"
            ${order.status === "Shipped" ? "selected" : ""}
          >
            Shipped
          </option>

          <option
            value="Delivered"
            ${order.status === "Delivered" ? "selected" : ""}
          >
            Delivered
          </option>

          <option
            value="Cancelled"
            ${order.status === "Cancelled" ? "selected" : ""}
          >
            Cancelled
          </option>

        </select>

      </div>
    `;
  });
}

function updateOrderStatus(
  orderId,
  status
) {
  const order =
    orders.find(function (item) {
      return (
        String(item.id) ===
        String(orderId)
      );
    });

  if (!order) return;

  order.status = status;

  saveAllData();

  showToast(
    "Order status updated."
  );
}

/* =========================================================
   ABOUT SHOP
========================================================= */

function openAboutShop() {
  closeAllPanels();

  const content =
    document.getElementById(
      "aboutContent"
    );

  if (content) {
    content.innerHTML =
      formatText(aboutShop);
  }

  document
    .getElementById("aboutPanel")
    ?.classList.remove("hidden");
}

function closeAboutShop() {
  document
    .getElementById("aboutPanel")
    ?.classList.add("hidden");
}

function editAboutShop() {
  closeOwnerAccess();

  const newText =
    prompt(
      "Enter About Shop information:",
      aboutShop
    );

  if (
    newText === null ||
    !newText.trim()
  ) {
    return;
  }

  aboutShop =
    newText.trim();

  saveAllData();

  showToast(
    "About Shop updated."
  );
}

/* =========================================================
   HELPLINE
========================================================= */

function openHelpline() {
  closeAllPanels();

  const content =
    document.getElementById(
      "helplineContent"
    );

  if (content) {
    content.innerHTML = `
      <p
        style="
          color:#c1cad5;
          line-height:1.8;
          white-space:pre-line;
        "
      >
        ${escapeHTML(helpline)}
      </p>

      <a
        href="tel:${extractPhone(helpline)}"
        class="primary-button"
        style="
          display:inline-block;
          text-decoration:none;
          margin-top:20px;
        "
      >
        📞 Call Now
      </a>
    `;
  }

  document
    .getElementById("helplinePanel")
    ?.classList.remove("hidden");
}

function closeHelpline() {
  document
    .getElementById("helplinePanel")
    ?.classList.add("hidden");
}

function editHelpline() {
  closeOwnerAccess();

  const newText =
    prompt(
      "Enter Helpline Number / Details:",
      helpline
    );

  if (
    newText === null ||
    !newText.trim()
  ) {
    return;
  }

  helpline =
    newText.trim();

  saveAllData();

  showToast(
    "Helpline updated."
  );
}

/* =========================================================
   REVIEWS
========================================================= */

function openReviews() {
  closeAllPanels();

  renderPublicReviews();

  document
    .getElementById("reviewPanel")
    ?.classList.remove("hidden");
}

function closeReviews() {
  document
    .getElementById("reviewPanel")
    ?.classList.add("hidden");
}

function renderPublicReviews() {
  const container =
    document.getElementById(
      "reviewList"
    );

  if (!container) return;

  if (!reviews.length) {
    container.innerHTML = `
      <p
        style="
          color:#7e8998;
          margin-bottom:20px;
        "
      >
        No reviews yet.
      </p>

      <button
        class="primary-button"
        onclick="writeReview()"
      >
        ⭐ Write Review
      </button>
    `;

    return;
  }

  container.innerHTML = "";

  reviews.forEach(function (review) {
    const rating =
      Math.max(
        1,
        Math.min(
          5,
          Number(review.rating) || 1
        )
      );

    container.innerHTML += `
      <div
        style="
          padding:15px;
          border:1px solid rgba(255,255,255,.07);
          border-radius:12px;
          margin-bottom:10px;
          background:rgba(255,255,255,.03);
        "
      >

        <strong>
          ${escapeHTML(review.name || "")}
        </strong>

        <div
          style="
            color:#f5d76e;
            margin:5px 0;
          "
        >
          ${"★".repeat(rating)}
          ${"☆".repeat(5 - rating)}
        </div>

        <p
          style="
            color:#9aa5b4;
            line-height:1.6;
          "
        >
          ${escapeHTML(review.text || "")}
        </p>

      </div>
    `;
  });

  container.innerHTML += `
    <button
      class="primary-button"
      onclick="writeReview()"
    >
      ⭐ Write Review
    </button>
  `;
}

function writeReview() {
  const customer =
    customers[customers.length - 1];

  if (!customer) {
    closeReviews();
    openLogin();

    showToast(
      "Please login first."
    );

    return;
  }

  const orderId =
    prompt(
      "Enter your delivered Order ID:"
    );

  if (!orderId) return;

  const order =
    orders.find(function (item) {
      return (
        String(item.id) ===
          String(orderId) &&
        item.customerId ===
          customer.id
      );
    });

  if (!order) {
    showToast(
      "Valid order not found."
    );
    return;
  }

  if (
    order.status !==
    "Delivered"
  ) {
    showToast(
      "Review can be submitted after delivery."
    );
    return;
  }

  const alreadyReviewed =
    reviews.some(function (review) {
      return (
        String(review.orderId) ===
        String(orderId)
      );
    });

  if (alreadyReviewed) {
    showToast(
      "You already reviewed this order."
    );
    return;
  }

  const rating =
    Number(
      prompt(
        "Give rating 1 to 5:"
      )
    );

  if (
    rating < 1 ||
    rating > 5 ||
    Number.isNaN(rating)
  ) {
    showToast(
      "Please enter rating from 1 to 5."
    );
    return;
  }

  const text =
    prompt(
      "Write your review:"
    );

  if (!text || !text.trim()) return;

  reviews.push({
    id: Date.now(),
    orderId: orderId,
    name: customer.name,
    rating: rating,
    text: text.trim(),
    date: new Date().toLocaleString(
      "en-IN"
    )
  });

  saveAllData();
  renderPublicReviews();

  showToast(
    "Thank you for your review!"
  );
}

/* =========================================================
   OWNER REVIEWS
========================================================= */

function openOwnerReviews() {
  closeOwnerAccess();

  renderPublicReviews();

  document
    .getElementById("reviewPanel")
    ?.classList.remove("hidden");
}

/* =========================================================
   OFFERS
========================================================= */

function showOffers() {
  showHome();

  const offerProducts =
    products.filter(function (product) {
      return (
        Number(product.oldPrice || 0) >
        Number(product.price || 0)
      );
    });

  const title =
    document.getElementById(
      "productSectionTitle"
    );

  if (title) {
    title.textContent =
      "🔥 Special Offers";
  }

  renderProducts(
    offerProducts
  );

  scrollToProducts();
}

/* =========================================================
   MANAGEMENT CLOSE
========================================================= */

function closeManagementPanel(id) {
  document
    .getElementById(id)
    ?.classList.add("hidden");
}

/* =========================================================
   CLOSE ALL PANELS
========================================================= */

function closeAllPanels() {
  const ids = [
    "settingsPanel",
    "cartPanel",
    "wishlistPanel",
    "loginPanel",
    "complaintBox",
    "aboutPanel",
    "helplinePanel",
    "reviewPanel"
  ];

  ids.forEach(function (id) {
    document
      .getElementById(id)
      ?.classList.add("hidden");
  });
}

/* =========================================================
   TOAST
========================================================= */

function showToast(message) {
  const toast =
    document.getElementById(
      "toast"
    );

  const text =
    document.getElementById(
      "toastMessage"
    );

  if (!toast || !text) {
    console.log(message);
    return;
  }

  text.textContent =
    message;

  toast.classList.remove(
    "hidden"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(function () {
      toast.classList.add(
        "hidden"
      );
    }, 2800);
}

/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );
}

/* =========================================================
   FORMAT TEXT
========================================================= */

function formatText(text) {
  return escapeHTML(text)
    .replace(
      /\n/g,
      "<br>"
    );
}

/* =========================================================
   PHONE
========================================================= */

function extractPhone(text) {
  const match =
    String(text).match(
      /[+]?[0-9][0-9\s-]{8,}/
    );

  if (!match) {
    return "";
  }

  return match[0].replace(
    /[\s-]/g,
    ""
  );
}

/* =========================================================
   IMAGE PREVIEW
========================================================= */

document.addEventListener(
  "change",
  async function (event) {

    if (
      event.target.id ===
      "productImages"
    ) {
      const preview =
        document.getElementById(
          "productImagePreview"
        );

      if (!preview) return;

      preview.innerHTML = "";

      if (
        !event.target.files ||
        !event.target.files.length
      ) {
        return;
      }

      try {
        const images =
          await filesToDataURLs(
            event.target.files
          );

        images.forEach(function (image) {
          preview.innerHTML += `
            <img
              src="${image}"
              alt="Preview"
            >
          `;
        });
      } catch (error) {
        console.error(error);
        showToast(
          "Image preview failed."
        );
      }
    }

    if (
      event.target.id ===
      "bannerImage"
    ) {
      const preview =
        document.getElementById(
          "bannerImagePreview"
        );

      if (!preview) return;

      preview.innerHTML = "";

      if (
        !event.target.files ||
        !event.target.files.length
      ) {
        return;
      }

      try {
        const images =
          await filesToDataURLs([
            event.target.files[0]
          ]);

        preview.innerHTML = `
          <img
            src="${images[0]}"
            alt="Banner Preview"
          >
        `;
      } catch (error) {
        console.error(error);
        showToast(
          "Banner preview failed."
        );
      }
    }
  }
);

/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Escape") {
      closeAllPanels();
      closeOwnerAccess();

      [
        "ownerProductPanel",
        "productFormPanel",
        "bannerPanel",
        "bannerFormPanel",
        "customersPanel",
        "complaintsPanel",
        "ordersPanel"
      ].forEach(function (id) {
        document
          .getElementById(id)
          ?.classList.add("hidden");
      });
    }

    if (
      event.ctrlKey &&
      event.key.toLowerCase() === "k"
    ) {
      event.preventDefault();

      document
        .getElementById("searchInput")
        ?.focus();
    }
  }
);

/* =========================================================
   MAKE FUNCTIONS GLOBAL
   IMPORTANT FOR HTML onclick=""
========================================================= */

Object.assign(window, {
  saveAllData,
  getProductImage,
  createProductCard,
  renderProducts,
  setupSearch,
  searchProducts,

  showCategory,
  showHome,
  showProduct,
  selectSize,
  renderRelatedProducts,
  goHome,
  scrollToProducts,

  addToCart,
  removeFromCart,
  changeCartQuantity,
  updateCartCount,
  renderCart,
  openCart,
  closeCart,
  checkout,

  toggleWishlist,
  renderWishlist,
  openWishlist,
  closeWishlist,

  openSettings,
  closeSettings,

  openOwnerAccess,
  closeOwnerAccess,
  openOwnerProducts,
  renderOwnerProducts,

  openProductForm,
  closeProductForm,
  editProduct,
  saveProduct,
  deleteProduct,
  toggleProductStock,

  renderBanners,
  openOwnerBanners,
  renderBannerList,
  openBannerForm,
  closeBannerForm,
  editBanner,
  saveBanner,
  deleteBanner,

  openCustomers,
  renderCustomers,

  openLogin,
  closeLogin,
  customerLogin,

  openComplaintBox,
  closeComplaintBox,
  submitComplaint,
  openOwnerComplaints,
  renderComplaints,
  deleteComplaint,

  openOwnerOrders,
  renderOrders,
  updateOrderStatus,

  openAboutShop,
  closeAboutShop,
  editAboutShop,

  openHelpline,
  closeHelpline,
  editHelpline,

  openReviews,
  closeReviews,
  renderPublicReviews,
  writeReview,
  openOwnerReviews,

  showOffers,
  closeManagementPanel,

  showToast,
  escapeHTML,
  formatText,
  extractPhone
});

/* =========================================================
   INITIAL SAVE
========================================================= */

saveAllData();

console.log(
  "🔥 Shiv Fashion Sayala loaded successfully!"
);

console.log(
  "👑 Demo Owner PIN: 1234"
);