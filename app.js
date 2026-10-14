/* ==========================================================================
   GABRU LOOKS - CLIENT APPLICATION LOGIC
   Streetwear E-Commerce Engine (Powerlook.in Replica)
   ========================================================================== */

// 1. Streetwear Product Catalog (16 Distinct Items)
const products = [
  {
    id: 1,
    title: "Acid Wash 'Rebel Soul' Oversized Tee",
    category: "acid-wash",
    fit: "Oversized",
    gsm: 240,
    mrp: 1499,
    price: 899,
    discount: 40,
    rating: 4.9,
    reviews: 218,
    badge: "HOT DROP",
    badgeType: "drop",
    inStock: true,
    colors: ["Charcoal Grey", "Washed Olive"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: 2,
    title: "Heavyweight 240 GSM Blank Raw Tee - Off White",
    category: "oversized-tees",
    fit: "Oversized",
    gsm: 240,
    mrp: 1299,
    price: 799,
    discount: 38,
    rating: 4.8,
    reviews: 145,
    badge: "BESTSELLER",
    badgeType: "discount",
    inStock: true,
    colors: ["Off White", "Raw Ecru"],
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: 3,
    title: "Tactical 8-Pocket Parachute Cargo - Olive Drab",
    category: "parachutes-cargos",
    fit: "Tactical Parachute",
    gsm: 320,
    mrp: 2699,
    price: 1599,
    discount: 41,
    rating: 4.9,
    reviews: 312,
    badge: "VIRAL FIT",
    badgeType: "drop",
    inStock: true,
    colors: ["Olive Drab", "Jet Black"],
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: 4,
    title: "Tokyo Cyber Matrix Heavyweight Graphic Tee",
    category: "oversized-tees",
    fit: "Oversized",
    gsm: 240,
    mrp: 1599,
    price: 949,
    discount: 41,
    rating: 4.8,
    reviews: 98,
    badge: "NEW DROP",
    badgeType: "drop",
    inStock: true,
    colors: ["Pitch Black", "Cyber Green"],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: 5,
    title: "Waffle Knit Textured Boxy Resort Shirt - Sand",
    category: "boxy-shirts",
    fit: "Boxy Resort",
    gsm: 260,
    mrp: 1999,
    price: 1249,
    discount: 38,
    rating: 4.9,
    reviews: 176,
    badge: "TRENDING",
    badgeType: "discount",
    inStock: true,
    colors: ["Sand Dune", "Espresso"],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: 6,
    title: "Wide Leg Distressed Baggy Jeans - Ice Blue",
    category: "parachutes-cargos",
    fit: "Baggy Wide-Leg",
    gsm: 380,
    mrp: 2999,
    price: 1799,
    discount: 40,
    rating: 4.7,
    reviews: 140,
    badge: "40% OFF",
    badgeType: "discount",
    inStock: true,
    colors: ["Ice Blue", "Vintage Wash"],
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: 7,
    title: "Heavyweight 400 GSM French Terry Street Hoodie - Onyx",
    category: "hoodies",
    fit: "Oversized",
    gsm: 400,
    mrp: 3199,
    price: 1899,
    discount: 41,
    rating: 5.0,
    reviews: 242,
    badge: "400 GSM",
    badgeType: "drop",
    inStock: true,
    colors: ["Onyx Black", "Charcoal"],
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: 8,
    title: "Corduroy Boxy Overshirt - Tobacco Brown",
    category: "boxy-shirts",
    fit: "Boxy Resort",
    gsm: 300,
    mrp: 2299,
    price: 1399,
    discount: 39,
    rating: 4.8,
    reviews: 84,
    badge: "AUTUMN DROP",
    badgeType: "drop",
    inStock: true,
    colors: ["Tobacco Brown", "Pine Green"],
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: 9,
    title: "Vintage Acid Wash 'Detroit 93' Graphic Tee",
    category: "acid-wash",
    fit: "Oversized",
    gsm: 240,
    mrp: 1499,
    price: 899,
    discount: 40,
    rating: 4.8,
    reviews: 165,
    badge: "40% OFF",
    badgeType: "discount",
    inStock: true,
    colors: ["Faded Black", "Vintage Slate"],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: 10,
    title: "Tactical Bungee Parachute Pants - Jet Black",
    category: "parachutes-cargos",
    fit: "Tactical Parachute",
    gsm: 310,
    mrp: 2799,
    price: 1649,
    discount: 41,
    rating: 4.9,
    reviews: 204,
    badge: "VIRAL TIKTOK",
    badgeType: "drop",
    inStock: true,
    colors: ["Jet Black", "Steel Grey"],
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: 11,
    title: "Street Resort Boxy Co-Ord Set - Forest Camo",
    category: "hoodies",
    fit: "Boxy Resort",
    gsm: 280,
    mrp: 3499,
    price: 2199,
    discount: 37,
    rating: 4.9,
    reviews: 62,
    badge: "FULL SET",
    badgeType: "drop",
    inStock: true,
    colors: ["Forest Camo", "Desert Taupe"],
    images: [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: 12,
    title: "Retro Cyberpunk Graphic Heavyweight Tee - Off White",
    category: "oversized-tees",
    fit: "Oversized",
    gsm: 240,
    mrp: 1499,
    price: 929,
    discount: 38,
    rating: 4.7,
    reviews: 118,
    badge: "38% OFF",
    badgeType: "discount",
    inStock: true,
    colors: ["Off White", "Sage Green"],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=700&q=80"
    ]
  }
];

// 2. Global State (Cart, Wishlist, Active Filters, Active Coupon)
const state = {
  cart: JSON.parse(localStorage.getItem('gabru_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('gabru_wishlist') || '[]'),
  activeCategory: 'all',
  activeFit: 'all',
  activeSize: 'all',
  sortOrder: 'featured',
  searchQuery: '',
  appliedCoupon: null, // { code: 'GABRU200', type: 'flat', val: 200 }
  activeModalProduct: null,
  activeSelectedSize: 'L'
};

// Available Coupons
const coupons = {
  'GABRU200': { type: 'flat', val: 200, minCart: 999, desc: '₹200 flat off on orders above ₹999' },
  'STREET30': { type: 'percent', val: 30, minCart: 2000, desc: '30% off on orders above ₹2000' },
  'PREPAID10': { type: 'percent', val: 10, minCart: 0, desc: '10% instant discount on prepaid orders' }
};

// 3. Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  updateCartUI();
  updateWishlistUI();
  setupEventListeners();
});

// 4. Render Catalog Grid
function renderCatalog() {
  const grid = document.getElementById('productGrid');
  const countEl = document.getElementById('productCount');
  const emptyState = document.getElementById('emptyState');

  let filtered = products.filter(p => {
    // Category
    if (state.activeCategory !== 'all' && p.category !== state.activeCategory) return false;
    // Fit
    if (state.activeFit !== 'all' && p.fit !== state.activeFit) return false;
    // Search
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      const match = p.title.toLowerCase().includes(q) || 
                    p.category.toLowerCase().includes(q) || 
                    p.fit.toLowerCase().includes(q) ||
                    p.colors.some(c => c.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Sorting
  if (state.sortOrder === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortOrder === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortOrder === 'discount-desc') {
    filtered.sort((a, b) => b.discount - a.discount);
  } else if (state.sortOrder === 'rating-desc') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Update counts
  countEl.textContent = `(${filtered.length} styles)`;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  grid.innerHTML = filtered.map(p => {
    const isWished = state.wishlist.includes(p.id);
    return `
      <div class="product-card" data-id="${p.id}">
        <div class="card-media" onclick="openProductById(${p.id})">
          <img class="card-img-primary" src="${p.images[0]}" alt="${p.title}" loading="lazy">
          <img class="card-img-secondary" src="${p.images[1] || p.images[0]}" alt="${p.title} view 2" loading="lazy">
          
          <span class="card-badge ${p.badgeType === 'drop' ? 'badge-drop' : 'badge-discount'}">${p.badge}</span>
          
          <button class="wishlist-btn-card ${isWished ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${p.id})" title="Add to Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>

          <!-- Quick Size Add Buttons -->
          <div class="card-quick-sizes" onclick="event.stopPropagation()">
            <span style="font-size:0.7rem; color:#a1a1aa; font-weight:700;">QUICK ADD:</span>
            <button class="quick-size-chip" onclick="quickAddToCart(${p.id}, 'S')">S</button>
            <button class="quick-size-chip" onclick="quickAddToCart(${p.id}, 'M')">M</button>
            <button class="quick-size-chip" onclick="quickAddToCart(${p.id}, 'L')">L</button>
            <button class="quick-size-chip" onclick="quickAddToCart(${p.id}, 'XL')">XL</button>
          </div>
        </div>

        <div class="card-content">
          <span class="card-tag">${p.gsm} GSM ${p.fit.toUpperCase()}</span>
          <h3 class="card-title" onclick="openProductById(${p.id})">${p.title}</h3>
          
          <div class="card-rating-row">
            <span class="rating-stars">★★★★★</span>
            <span class="rating-count">${p.rating} (${p.reviews})</span>
          </div>

          <div class="card-price-row">
            <span class="price-current">₹${p.price.toLocaleString('en-IN')}</span>
            <span class="price-mrp">₹${p.mrp.toLocaleString('en-IN')}</span>
            <span class="price-savings">${p.discount}% OFF</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 5. Open Product Detail Modal (PDP)
function openProductById(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  state.activeModalProduct = product;
  state.activeSelectedSize = 'L'; // default

  // Populate fields
  document.getElementById('pdpTitle').textContent = product.title;
  document.getElementById('pdpMainImg').src = product.images[0];
  document.getElementById('pdpDiscountBadge').textContent = `-${product.discount}% OFF`;
  document.getElementById('pdpFitBadge').textContent = `${product.gsm} GSM ${product.fit.toUpperCase()}`;
  document.getElementById('pdpRating').textContent = product.rating;
  document.getElementById('pdpReviews').textContent = `(${product.reviews} reviews)`;
  document.getElementById('pdpCurrentPrice').textContent = `₹${product.price.toLocaleString('en-IN')}`;
  document.getElementById('pdpMrp').textContent = `₹${product.mrp.toLocaleString('en-IN')}`;
  document.getElementById('pdpSavings').textContent = `You Save ₹${(product.mrp - product.price).toLocaleString('en-IN')} (${product.discount}% OFF)`;

  // Thumbnails
  const thumbsWrap = document.getElementById('pdpThumbnails');
  thumbsWrap.innerHTML = product.images.map((img, idx) => `
    <div class="pdp-thumb ${idx === 0 ? 'active' : ''}" onclick="switchPdpThumb(this, '${img}')">
      <img src="${img}" alt="thumbnail">
    </div>
  `).join('');

  // Reset Size options
  document.querySelectorAll('.size-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-size') === 'L');
  });

  // Clear Pincode status
  document.getElementById('pincodeInput').value = '';
  const statusBox = document.getElementById('pincodeStatus');
  statusBox.className = 'pincode-status-box';
  statusBox.textContent = '';

  // Open Modal
  document.getElementById('pdpModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function switchPdpThumb(el, src) {
  document.getElementById('pdpMainImg').src = src;
  document.querySelectorAll('.pdp-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function closePdpModal() {
  document.getElementById('pdpModal').classList.remove('open');
  document.body.style.overflow = '';
}

// 6. Cart Management
function addToCart(product, size = 'L') {
  const existing = state.cart.find(item => item.id === product.id && item.size === size);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      mrp: product.mrp,
      image: product.images[0],
      size: size,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.title}" (Size ${size}) to bag!`);
  openCartDrawer();
}

function quickAddToCart(productId, size) {
  const p = products.find(item => item.id === productId);
  if (p) {
    addToCart(p, size);
  }
}

function updateCartQty(idx, change) {
  if (!state.cart[idx]) return;
  state.cart[idx].quantity += change;
  if (state.cart[idx].quantity <= 0) {
    state.cart.splice(idx, 1);
  }
  saveCart();
  updateCartUI();
}

function removeCartItem(idx) {
  state.cart.splice(idx, 1);
  saveCart();
  updateCartUI();
  showToast('Item removed from your bag');
}

function saveCart() {
  localStorage.setItem('gabru_cart', JSON.stringify(state.cart));
}

function updateCartUI() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCountBadge').textContent = totalCount;
  document.getElementById('drawerCartCount').textContent = `(${totalCount} items)`;

  // Calculations
  const totalMrp = state.cart.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const bagDiscount = totalMrp - subtotal;

  document.getElementById('cartTotalPreview').textContent = `₹${subtotal.toLocaleString('en-IN')}`;

  const container = document.getElementById('cartItemsContainer');

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-view">
        <div class="empty-icon">🛍️</div>
        <h4>YOUR BAG IS EMPTY</h4>
        <p>Grab the freshest oversized tees and tactical cargos from Drop 05.</p>
        <button class="btn btn-primary" onclick="closeCartDrawer()">EXPLORE COLLECTION</button>
      </div>
    `;
    document.getElementById('cartDrawerFooter').classList.add('hidden');
    document.getElementById('shippingProgressLabel').textContent = 'Add ₹1,499 more to unlock FREE Express Shipping!';
    document.getElementById('shippingProgressFill').style.width = '0%';
    return;
  }

  document.getElementById('cartDrawerFooter').classList.remove('hidden');

  container.innerHTML = state.cart.map((item, idx) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" class="cart-item-img">
      <div class="cart-item-info">
        <button class="remove-item-btn" onclick="removeCartItem(${idx})">&times;</button>
        <h4 class="cart-item-title">${item.title}</h4>
        <span class="cart-item-variant">Size: <strong>${item.size}</strong></span>
        
        <div class="cart-item-price-row">
          <div class="item-qty-control">
            <button class="qty-btn" onclick="updateCartQty(${idx}, -1)">-</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQty(${idx}, 1)">+</button>
          </div>
          <span class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Shipping Free Progress (Threshold ₹1499)
  const freeThreshold = 1499;
  const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
  const shippingBarLabel = document.getElementById('shippingProgressLabel');
  const shippingFill = document.getElementById('shippingProgressFill');

  if (subtotal >= freeThreshold) {
    shippingBarLabel.textContent = '🎉 Congratulations! You have unlocked FREE Express Shipping!';
    shippingFill.style.width = '100%';
  } else {
    const diff = freeThreshold - subtotal;
    shippingBarLabel.textContent = `Add ₹${diff.toLocaleString('en-IN')} more to unlock FREE Express Shipping!`;
    shippingFill.style.width = `${progressPercent}%`;
  }

  // Calculate Coupon
  let couponDiscount = 0;
  const couponRow = document.getElementById('summaryCouponRow');
  if (state.appliedCoupon) {
    if (state.appliedCoupon.type === 'flat') {
      couponDiscount = state.appliedCoupon.val;
    } else {
      couponDiscount = Math.round((subtotal * state.appliedCoupon.val) / 100);
    }
    couponRow.style.display = 'flex';
    document.getElementById('appliedCouponName').textContent = state.appliedCoupon.code;
    document.getElementById('summaryCouponDiscount').textContent = `-₹${couponDiscount.toLocaleString('en-IN')}`;
  } else {
    couponRow.style.display = 'none';
  }

  const shippingFee = subtotal >= freeThreshold ? 0 : 99;
  const finalPayable = Math.max(0, subtotal - couponDiscount + shippingFee);

  document.getElementById('summaryTotalMrp').textContent = `₹${totalMrp.toLocaleString('en-IN')}`;
  document.getElementById('summaryBagDiscount').textContent = `-₹${bagDiscount.toLocaleString('en-IN')}`;
  document.getElementById('summaryShipping').textContent = shippingFee === 0 ? 'FREE' : '₹99';
  document.getElementById('summaryFinalAmount').textContent = `₹${finalPayable.toLocaleString('en-IN')}`;
  document.getElementById('checkoutFinalAmount').textContent = `₹${finalPayable.toLocaleString('en-IN')}`;
}

// 7. Coupon System
function applyCoupon(code) {
  const upper = code.trim().toUpperCase();
  const feedback = document.getElementById('couponFeedback');
  const coupon = coupons[upper];

  if (!coupon) {
    feedback.className = 'coupon-feedback error';
    feedback.textContent = 'Invalid promo code. Try GABRU200 or STREET30';
    return;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (subtotal < coupon.minCart) {
    feedback.className = 'coupon-feedback error';
    feedback.textContent = `Code ${upper} is only valid on orders above ₹${coupon.minCart}`;
    return;
  }

  state.appliedCoupon = { code: upper, ...coupon };
  feedback.className = 'coupon-feedback success';
  feedback.textContent = `🎉 Coupon ${upper} applied! Saved ${coupon.desc}`;
  updateCartUI();
  showToast(`Coupon ${upper} applied successfully!`);
}

// 8. Wishlist
function toggleWishlist(id) {
  const idx = state.wishlist.indexOf(id);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast('Removed from wishlist');
  } else {
    state.wishlist.push(id);
    showToast('Saved to your wishlist! ❤️');
  }
  localStorage.setItem('gabru_wishlist', JSON.stringify(state.wishlist));
  updateWishlistUI();
  renderCatalog();
}

function updateWishlistUI() {
  document.getElementById('wishlistCountBadge').textContent = state.wishlist.length;
}

// 9. Pincode Verification (Indian Couriers Logistics Simulation)
function verifyPincode(pin) {
  const statusBox = document.getElementById('pincodeStatus');
  if (!/^\d{6}$/.test(pin)) {
    statusBox.className = 'pincode-status-box error';
    statusBox.textContent = '❌ Please enter a valid 6-digit Indian postal pincode.';
    return;
  }

  statusBox.className = 'pincode-status-box';
  statusBox.textContent = 'Checking courier serviceability with Shiprocket / Delhivery...';
  statusBox.style.display = 'block';

  setTimeout(() => {
    // Generate realistic delivery timeline
    const days = pin.startsWith('1') || pin.startsWith('4') ? '2 - 3 Business Days' : '3 - 5 Business Days';
    statusBox.className = 'pincode-status-box success';
    statusBox.innerHTML = `
      ✓ <strong>Serviceable!</strong> Delivery estimated in <strong>${days}</strong>.<br>
      ✓ <strong>Cash on Delivery (COD)</strong> & Prepaid express courier available.
    `;
  }, 400);
}

// 10. Drawers & Modals
function openCartDrawer() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('backdrop').classList.remove('open');
  document.body.style.overflow = '';
}

function openMobileDrawer() {
  document.getElementById('mobileDrawer').classList.add('open');
  document.getElementById('backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
  document.getElementById('mobileDrawer').classList.remove('open');
  document.getElementById('backdrop').classList.remove('open');
  document.body.style.overflow = '';
}

// 11. Checkout Flow
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your bag is empty!');
    return;
  }
  closeCartDrawer();
  document.getElementById('checkoutModal').classList.add('open');
  goToCheckoutStep(1);
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal').classList.remove('open');
  document.body.style.overflow = '';
}

function goToCheckoutStep(step) {
  document.getElementById('checkoutStep1').classList.add('hidden');
  document.getElementById('checkoutStep2').classList.add('hidden');
  document.getElementById('checkoutStep3').classList.add('hidden');

  document.getElementById('stepIndicator1').classList.toggle('active', step >= 1);
  document.getElementById('stepIndicator2').classList.toggle('active', step >= 2);
  document.getElementById('stepIndicator3').classList.toggle('active', step >= 3);

  document.getElementById(`checkoutStep${step}`).classList.remove('hidden');
}

function completeOrder() {
  const orderId = 'GABRU-' + Math.floor(10000 + Math.random() * 90000);
  document.getElementById('confirmedOrderId').textContent = orderId;
  
  // Clear cart
  state.cart = [];
  state.appliedCoupon = null;
  saveCart();
  updateCartUI();

  goToCheckoutStep(3);
  showToast('🎉 Order placed successfully!');
}

// 12. Toast Feedback
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>⚡</span><span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// 13. Category Filtering
function filterByCategory(cat) {
  state.activeCategory = cat;
  
  // Highlight Desktop nav
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-category') === cat);
  });

  // Highlight Category Carousel
  document.querySelectorAll('.category-card').forEach(card => {
    card.classList.toggle('active', card.getAttribute('data-category') === cat);
  });

  const titles = {
    'all': 'ALL RECENT DROPS',
    'oversized-tees': 'OVERSIZED T-SHIRTS (240+ GSM)',
    'parachutes-cargos': 'PARACHUTE PANTS & CARGOS',
    'boxy-shirts': 'BOXY RESORT & CUBAN SHIRTS',
    'acid-wash': 'VINTAGE ACID WASH DROPS',
    'hoodies': 'HEAVYWEIGHT HOODIES & CO-ORDS'
  };
  document.getElementById('catalogTitle').textContent = titles[cat] || 'STREETWEAR DROPS';

  renderCatalog();
}

// 14. Event Listeners Setup
function setupEventListeners() {
  // Navigation Links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.getAttribute('data-category');
      if (cat) {
        e.preventDefault();
        filterByCategory(cat);
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Mobile Nav Links
  document.querySelectorAll('.mobile-nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.getAttribute('data-category');
      if (cat) {
        e.preventDefault();
        filterByCategory(cat);
        closeMobileDrawer();
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Category Carousel Cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-category');
      filterByCategory(cat);
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Category Scroll Buttons
  const catGrid = document.getElementById('categoryGrid');
  document.getElementById('catScrollLeft').addEventListener('click', () => {
    catGrid.scrollBy({ left: -260, behavior: 'smooth' });
  });
  document.getElementById('catScrollRight').addEventListener('click', () => {
    catGrid.scrollBy({ left: 260, behavior: 'smooth' });
  });

  // Filters
  document.getElementById('fitFilter').addEventListener('change', (e) => {
    state.activeFit = e.target.value;
    renderCatalog();
  });

  document.getElementById('sortOrder').addEventListener('change', (e) => {
    state.sortOrder = e.target.value;
    renderCatalog();
  });

  document.getElementById('resetFiltersBtn').addEventListener('click', () => {
    state.activeCategory = 'all';
    state.activeFit = 'all';
    state.searchQuery = '';
    document.getElementById('fitFilter').value = 'all';
    document.getElementById('sortOrder').value = 'featured';
    document.getElementById('liveSearchInput').value = '';
    filterByCategory('all');
  });

  // Search Toggle
  const searchDropdown = document.getElementById('searchDropdown');
  const searchInput = document.getElementById('liveSearchInput');
  document.getElementById('searchTriggerBtn').addEventListener('click', () => {
    searchDropdown.classList.toggle('open');
    if (searchDropdown.classList.contains('open')) {
      searchInput.focus();
    }
  });

  // Keyboard shortcut '/'
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchDropdown.classList.add('open');
      searchInput.focus();
    }
    if (e.key === 'Escape') {
      searchDropdown.classList.remove('open');
      closePdpModal();
      closeCartDrawer();
      closeCheckoutModal();
      document.getElementById('sizeChartModal').classList.remove('open');
    }
  });

  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderCatalog();
  });

  document.getElementById('clearSearchBtn').addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    renderCatalog();
    searchDropdown.classList.remove('open');
  });

  document.querySelectorAll('.quick-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      searchInput.value = tag.getAttribute('data-tag');
      state.searchQuery = tag.getAttribute('data-tag');
      renderCatalog();
    });
  });

  // Drawer Triggers
  document.getElementById('cartTriggerBtn').addEventListener('click', openCartDrawer);
  document.getElementById('closeCartDrawerBtn').addEventListener('click', closeCartDrawer);
  document.getElementById('mobileMenuBtn').addEventListener('click', openMobileDrawer);
  document.getElementById('closeMobileDrawerBtn').addEventListener('click', closeMobileDrawer);
  document.getElementById('backdrop').addEventListener('click', () => {
    closeCartDrawer();
    closeMobileDrawer();
  });

  // Modal Closures
  document.getElementById('closePdpModalBtn').addEventListener('click', closePdpModal);
  document.getElementById('closeCheckoutModalBtn').addEventListener('click', closeCheckoutModal);

  // Size Picker in PDP
  document.querySelectorAll('.size-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeSelectedSize = btn.getAttribute('data-size');
    });
  });

  // Size Chart Modal
  document.getElementById('sizeChartBtn').addEventListener('click', () => {
    document.getElementById('sizeChartModal').classList.add('open');
  });
  document.getElementById('closeSizeChartBtn').addEventListener('click', () => {
    document.getElementById('sizeChartModal').classList.remove('open');
  });

  // Pincode Checker
  document.getElementById('checkPincodeBtn').addEventListener('click', () => {
    const pin = document.getElementById('pincodeInput').value.trim();
    verifyPincode(pin);
  });

  // PDP Add to Cart
  document.getElementById('pdpAddToCartBtn').addEventListener('click', () => {
    if (state.activeModalProduct) {
      addToCart(state.activeModalProduct, state.activeSelectedSize);
      closePdpModal();
    }
  });

  // PDP Instant Buy
  document.getElementById('pdpInstantBuyBtn').addEventListener('click', () => {
    if (state.activeModalProduct) {
      addToCart(state.activeModalProduct, state.activeSelectedSize);
      closePdpModal();
      openCheckoutModal();
    }
  });

  // Coupon buttons
  document.getElementById('applyCouponBtn').addEventListener('click', () => {
    const code = document.getElementById('couponCodeInput').value;
    applyCoupon(code);
  });

  document.querySelectorAll('.coupon-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const code = tag.getAttribute('data-code');
      document.getElementById('couponCodeInput').value = code;
      applyCoupon(code);
    });
  });

  // Checkout Triggers
  document.getElementById('proceedToCheckoutBtn').addEventListener('click', openCheckoutModal);
  document.getElementById('confirmPlaceOrderBtn').addEventListener('click', completeOrder);
  document.getElementById('continueShoppingAfterOrderBtn').addEventListener('click', closeCheckoutModal);

  // Hero CTAs
  document.getElementById('heroLookbookBtn').addEventListener('click', () => {
    document.getElementById('lookbook').scrollIntoView({ behavior: 'smooth' });
  });
}

function handleNewsletter() {
  const email = document.getElementById('newsletterEmail').value;
  if (email) {
    showToast('🎉 VIP Code "GABRU150" unlocked! Check your inbox.');
    document.getElementById('newsletterEmail').value = '';
  }
}
