<<<<<<< HEAD
// app.js

// --- Brand text in one place ---
const BRAND = "Auramorph by Interstellers";
const TAGLINE = "Your aura, your morph — try beauty beyond mirrors.";

// --- Utility: LocalStorage cart ---
const CART_KEY = "auramorph_cart";
const USER_KEY = "auramorph_user";

function getCart(){ return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
function setCart(items){ localStorage.setItem(CART_KEY, JSON.stringify(items)); updateCartCount(); }
function updateCartCount(){
  const el = document.getElementById("cart-count");
  if(el){ el.textContent = getCart().reduce((s,i)=>s+i.qty,0); }
}

// --- Utility: add to cart ---
function addToCart(product){
  const cart = getCart();
  const idx = cart.findIndex(i => i.sku === product.sku);
  if(idx >= 0){
    cart[idx].qty = Math.min(cart[idx].qty + 1, product.inventory ?? 99);
  } else {
    cart.push({ sku: product.sku, name: product.name, price: product.price, img: product.img, qty: 1 });
  }
  setCart(cart);
  alert("Added to cart: " + product.name);
}

// --- Product data (from your DOCX) ---
const menProducts = [
  {name:"Charcoal Face Wash", sku:"AM-CFW", barcode:"04001", price:599, strike:749, cog:280, inventory:30, preorder:false,
   img:"./assets/products/boys/charcoal-face-wash.png",
   desc:"Deep-cleansing daily face wash powered by activated charcoal. Detoxifies pores and refreshes oily/acne-prone skin."},
  {name:"Oil-Control Moisturizer", sku:"AM-OCM", barcode:"04002", price:649, strike:799, cog:300, inventory:25, preorder:false,
   img:"./assets/products/boys/oil-control-moisturizer.jpg",
   desc:"Lightweight mattifying moisturizer. Hydrates without shine; controls T-zone greasiness. Non-comedogenic and fast-absorbing."},
  {name:"Beard Oil", sku:"AM-BRD", barcode:"04003", price:699, strike:899, cog:320, inventory:20, preorder:false,
   img:"./assets/products/boys/beard-oil.jpg",
   desc:"Nourishing beard oil. Prevents dryness and beardruff; adds healthy shine. Lightweight and non-greasy."},
  {name:"Hair Styling Gel", sku:"AM-HSG", barcode:"04004", price:499, strike:649, cog:250, inventory:35, preorder:false,
   img:"./assets/products/boys/hair-gel.jpg",
   desc:"Strong-hold sleek styling. Non-sticky, lightweight texture with natural shine; suitable for all hair types."},
  {name:"Tinted Moisturizer", sku:"AM-TMZ", barcode:"04005", price:749, strike:899, cog:350, inventory:18, preorder:false,
   img:"./assets/products/boys/tinted-moisturizer.jpg",
   desc:"Sheer coverage meets skincare. Evens tone while hydrating and protecting for a natural, no-makeup look."},
  {name:"Lip Balm (Non-tinted)", sku:"AM-LBN", barcode:"04006", price:399, strike:499, cog:180, inventory:40, preorder:false,
   img:"./assets/products/boys/lip-balm.jpg",
   desc:"Hydrating lip balm with SPF. Repairs dry lips without shine or tint."},
  {name:"Gentle Face Wash", sku:"AM-GFW", barcode:"04007", price:549, strike:699, cog:260, inventory:28, preorder:false,
   img:"./assets/products/boys/gentle-face-wash.jpg",
   desc:"Mild cleanser for sensitive skin. Removes impurities while maintaining hydration. Soap-free, fragrance-free."},
  {name:"Vitamin C Serum", sku:"AM-VCS", barcode:"04008", price:899, strike:1099, cog:420, inventory:22, preorder:false,
   img:"./assets/products/boys/vitam-C-serum.jpg",
   desc:"20% Vitamin C brightening and repair. Fades dark spots, boosts collagen, protects against environmental damage."},
  {name:"Black Peel-Off Mask", sku:"AM-BPM", barcode:"04009", price:599, strike:749, cog:280, inventory:24, preorder:false,
   img:"./assets/products/boys/black-peeloff-mask.jpg",
   desc:"Activated charcoal peel-off deep pore cleansing. Removes blackheads; leaves smooth, refreshed complexion."},
  {name:"Anti-Dandruff Shampoo", sku:"AM-ADS", barcode:"04010", price:649, strike:799, cog:300, inventory:26, preorder:false,
   img:"./assets/products/boys/Dandruff-free-shampoo.jpg",
   desc:"Scalp-refreshing shampoo with lemon and menthol. Fights dandruff; citrus-scented; dermatologically tested."},
];

const boysContainer = document.getElementById("boys-products");
if (boysContainer) {
  menProducts.forEach(p => {
    boysContainer.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Rs ${p.price}</p>
      </div>
    `;
  });
}

const womenProducts = [
  {name:"Hydrating Face Wash", sku:"AW-HFW", barcode:"05001", price:599, strike:749, cog:280, inventory:40, preorder:false,
   img:"./assets/products/girls/hydrating-face-wash.jpg",
   desc:"Gentle daily cleanser removes dirt and makeup without stripping moisture. Aloe and rose water glow."},
  {name:"Oil-Free Moisturizer", sku:"AW-OFM", barcode:"05002", price:649, strike:799, cog:300, inventory:30, preorder:false,
   img:"./assets/products/girls/oil-free-moisturizer.jpg",
   desc:"Lightweight, non-greasy hydration that leaves skin fresh and matte; ideal for oily/acne-prone."},
  {name:"Tinted Sunscreen SPF 50", sku:"AW-TSS", barcode:"05003", price:799, strike:999, cog:360, inventory:25, preorder:true,
   img:"./assets/products/girls/tinted-sunscreen-spf-50.jpg",
   desc:"Broad-spectrum SPF 50 with natural tint; evens tone while shielding from UV. Lightweight, breathable."},
  {name:"BB Cream", sku:"AW-BBC", barcode:"05004", price:699, strike:849, cog:320, inventory:30, preorder:false,
   img:"./assets/products/girls/bb-cream.jpg",
   desc:"All-in-one balm that hydrates, primes, and provides light coverage. Smooth, radiant finish."},
  {name:"Compact Powder", sku:"AW-CMP", barcode:"05005", price:649, strike:799, cog:300, inventory:30, preorder:false,
   img:"./assets/products/girls/compact-powder.jpg",
   desc:"Matte finish, shine control, sets makeup. Lightweight with buildable coverage."},
  {name:"Liquid Foundation", sku:"AW-LFN", barcode:"05006", price:899, strike:1099, cog:420, inventory:20, preorder:true,
   img:"./assets/products/girls/liquid-foundation.jpg",
   desc:"Flawless coverage, smooth and blendable. Long-lasting with natural finish; multiple tones."},
  {name:"Lip & Cheek Tint", sku:"AW-LCT", barcode:"05007", price:599, strike:749, cog:280, inventory:35, preorder:false,
   img:"./assets/products/girls/lip-and-cheek-tint.jpg",
   desc:"Dual-purpose tint gives a natural flush with buildable intensity. Water-based, dewy."},
  {name:"Matte Lipstick Set", sku:"AW-MLS", barcode:"05008", price:999, strike:1299, cog:480, inventory:15, preorder:true,
   img:"./assets/products/girls/matte-lipstick-set.jpg",
   desc:"Bold matte lipsticks in trendy shades. Long-lasting, smudge-proof, rich pigmentation."},
  {name:"Waterproof Mascara", sku:"AW-WPM", barcode:"05009", price:699, strike:849, cog:320, inventory:25, preorder:false,
   img:"./assets/products/girls/waterproof-mascara.jpg",
   desc:"Volumizing mascara resists water and smudging. Curved brush for lift and length."},
  {name:"Eyeliner Pen", sku:"AW-ELP", barcode:"05010", price:499, strike:649, cog:250, inventory:30, preorder:false,
   img:"./assets/products/girls/eyeliner-pen.jpg",
   desc:"Precision fine tip, smudge-proof, quick-drying. Perfect for winged & graphic looks."},
  {name:"Makeup Remover Wipes", sku:"AW-MRW", barcode:"05011", price:399, strike:499, cog:180, inventory:40, preorder:false,
   img:"./assets/products/girls/makeup-remover-wipes.jpg",
   desc:"Soft wipes gently remove makeup and impurities. Micellar water + aloe; travel-friendly."},
  {name:"Sheet Masks (Pack of 3)", sku:"AW-SMK", barcode:"05012", price:749, strike:899, cog:350, inventory:20, preorder:true,
   img:"./assets/products/girls/sheet-masks-pack-3.jpg",
   desc:"Trio with rose, cucumber, honey extracts. Soothes, brightens, refreshes."},
  {name:"Nourishing Shampoo", sku:"AW-NSH", barcode:"05013", price:649, strike:799, cog:300, inventory:30, preorder:false,
   img:"./assets/products/girls/nourishing-shampoo.jpg",
   desc:"Keratin + argan oil. Gently cleanses while restoring shine and strength."},
  {name:"Deep Repair Hair Mask", sku:"AW-DRM", barcode:"05014", price:799, strike:999, cog:360, inventory:20, preorder:true,
   img:"./assets/products/girls/deep-repair-hair-mask.jpg",
   desc:"Intensive repair for damaged and dry hair. Moisture-rich with spa-like fragrance."},
  {name:"Rose Water Toner", sku:"AW-RWT", barcode:"05015", price:499, strike:649, cog:250, inventory:35, preorder:false,
   img:"./assets/products/girls/rose-water-toner.jpg",
   desc:"Pure rose water. Balances pH, tightens pores, preps skin for hydration. Alcohol-free."}
];
const girlsContainer = document.getElementById("girls-products");
if (girlsContainer) {
  womenProducts.forEach(p => {
    girlsContainer.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Rs ${p.price}</p>
      </div>
    `;
  });
}

// --- Render helpers ---
function productCardHTML(p){
  return `
    <div class="card product-card">
      <img class="product-img" src="${p.img}" alt="${p.name}" onerror="this.src='assets\tryon-sample.jpg'"/>
      <h3>${p.name}</h3>
      <p class="meta">${BRAND}</p>
      <div class="price-row">
        <span class="price">Rs ${p.price}</span>
        <span class="strike">Rs ${p.strike}</span>
      </div>
      <p class="meta"><strong>SKU:</strong> ${p.sku} &nbsp; <strong>Barcode:</strong> ${p.barcode}</p>
      <p class="meta"><strong>COG:</strong> Rs ${p.cog}</p>
      <p class="stock"><strong>Stock:</strong> ${p.inventory} &nbsp; ${p.preorder ? '<span class="preorder">Pre-order available</span>' : ''}</p>
      <p>${p.desc}</p>
      <div style="display:flex;gap:8px">
        <button class="btn primary" onclick='addToCart(${JSON.stringify(p)})'>Add to cart</button>
        <a class="btn outline" href="tryon.html">Try-on</a>
      </div>
    </div>
  `;
}

// --- Page-specific mounts ---
function mountGirls(){
  const grid = document.getElementById("girls-products");
  if(grid){ grid.innerHTML = womenProducts.map(productCardHTML).join(""); }
}
function mountBoys(){
  const grid = document.getElementById("boys-products");
  if(grid){ grid.innerHTML = menProducts.map(productCardHTML).join(""); }
}

// --- Cart rendering ---
function mountCart(){
  const list = document.getElementById("cart-list");
  if(!list) return;
  const cart = getCart();
  if(cart.length === 0){
    list.innerHTML = `<div class="card"><p>Your cart is empty.</p></div>`;
  } else {
    list.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" onerror="this.src='assets\tryon-sample.jpg'"/>
        <div class="grow">
          <h3>${item.name}</h3>
          <p class="meta">SKU: ${item.sku}</p>
          <p class="price">Rs ${item.price}</p>
          <div class="qty">
            <button class="btn outline" onclick="decQty(${idx})">−</button>
            <span>Qty: ${item.qty}</span>
            <button class="btn outline" onclick="incQty(${idx})">+</button>
            <button class="btn" onclick="removeItem(${idx})" style="margin-left:auto;background:#2a1f3f">Remove</button>
          </div>
        </div>
      </div>
    `).join("");
  }
  computeTotals();
}
function incQty(i){
  const cart = getCart(); cart[i].qty++; setCart(cart); mountCart();
}
function decQty(i){
  const cart = getCart(); cart[i].qty = Math.max(1, cart[i].qty-1); setCart(cart); mountCart();
}
function removeItem(i){
  const cart = getCart(); cart.splice(i,1); setCart(cart); mountCart();
}
function computeTotals(){
  const cart = getCart();
  const subtotal = cart.reduce((s,i)=>s + i.price*i.qty, 0);
  const shipping = cart.length ? 199 : 0;
  const total = subtotal + shipping;
  const subEl = document.getElementById("cart-subtotal");
  const shipEl = document.getElementById("cart-shipping");
  const totEl = document.getElementById("cart-total");
  if(subEl) subEl.textContent = subtotal;
  if(shipEl) shipEl.textContent = shipping;
  if(totEl) totEl.textContent = total;
}

// --- Checkout summary ---
function mountCheckout(){
  const sum = document.getElementById("checkout-summary");
  const tot = document.getElementById("checkout-total");
  const form = document.getElementById("checkout-form");
  if(sum){
    const cart = getCart();
    sum.innerHTML = cart.map(i=>`<p>${i.name} × ${i.qty} — Rs ${i.price*i.qty}</p>`).join("");
    const total = cart.reduce((s,i)=>s + i.price*i.qty, 0) + (cart.length?199:0);
    if(tot) tot.textContent = total;
  }
  if(form){
    form.addEventListener("submit", e=>{
      e.preventDefault();
      alert("Payment successful (demo). Thank you!");
      setCart([]); // clear cart after demo payment
      window.location.href = "index.html";
    });
  }
}

// --- Login / Signup (demo) ---
function mountLogin(){
  const login = document.getElementById("login-form");
  const signup = document.getElementById("signup");
  if(login){
    login.addEventListener("submit", e=>{
      e.preventDefault();
      const email = document.getElementById("email").value;
      const pass = document.getElementById("password").value;
      const users = JSON.parse(localStorage.getItem(USER_KEY)||"{}");
      if(users[email] && users[email] === pass){
        alert("Welcome back!");
        localStorage.setItem("auramorph_session", email);
        window.location.href = "index.html";
      } else {
        alert("Invalid credentials. Try Sign up.");
      }
    });
  }
  if(signup){
    signup.addEventListener("click", ()=>{
      const email = document.getElementById("email").value;
      const pass = document.getElementById("password").value;
      if(!email || !pass){ alert("Enter email & password to sign up."); return; }
      const users = JSON.parse(localStorage.getItem(USER_KEY)||"{}");
      users[email] = pass;
      localStorage.setItem(USER_KEY, JSON.stringify(users));
      alert("Account created. You can login now.");
    });
  }
}

// --- Virtual Try-On (canvas overlays) ---
function mountTryOn(){
  const input = document.getElementById("photo-input");
  const canvas = document.getElementById("avatar-canvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const list = document.getElementById("tryon-items");
  const clearBtn = document.getElementById("clear-effects");
  let imgX = 0, imgY = 0, imgW = canvas.width, imgH = canvas.height;
  let blendMode = "soft-light"; // default mode
const blendSelect = document.getElementById("blend-select");
if(blendSelect){
  blendSelect.addEventListener("change", (e)=>{
    blendMode = e.target.value;
  });
}
document.getElementById("signup-form")?.addEventListener("submit", e=>{
  e.preventDefault();
  const pass = document.getElementById("password").value;
  if(pass.length < 8){
    alert("Password must be at least 8 characters!");
    return;
  }
  alert("Signup successful!");
});
function suggestProduct(type){
  let msg="";
  if(type==="dry") msg="Try our Hydrating Serum!";
  if(type==="oily") msg="Matte Foundation suits you!";
  if(type==="combo") msg="Balanced BB Cream is best!";
  document.getElementById("quiz-result").innerText=msg;
}
async function initTryOnAR() {
  const video = document.getElementById("ar-video");
  const canvasStatic = document.getElementById("ar-canvas");
  const canvasLive = document.getElementById("ar-canvas-live");
  const ctxStatic = canvasStatic.getContext("2d");
  const ctxLive = canvasLive.getContext("2d");

  // Camera access
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.classList.remove("hidden");       // show video
      canvasLive.classList.remove("hidden");  // show live canvas
    })
    .catch(err => {
      console.error("Camera error:", err);
    });

  // Load FaceMesh model
  const model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
  );

  async function renderFrame() {
    const predictions = await model.estimateFaces({ input: video });
    ctxLive.drawImage(video, 0, 0, canvasLive.width, canvasLive.height);

    if (predictions.length > 0) {
      predictions[0].scaledMesh.forEach(point => {
        ctxLive.fillStyle = "red";
        ctxLive.fillRect(point[0], point[1], 2, 2);
      });
    }
    requestAnimationFrame(renderFrame);
  }

  renderFrame();
}



  if(!input || !canvas || !ctx || !list) return;

  // --- Draw placeholder ---
  const placeholder = new Image();
  placeholder.src = "assets/tryon-sample.jpg";
  placeholder.onload = ()=> {
    ctx.drawImage(placeholder, 0, 0, canvas.width, canvas.height);
  };

  // --- Upload photo ---
  input.addEventListener("change", ()=> {
  const file = input.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = ()=> {
    const img = new Image();
    img.onload = ()=> {
      const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
      imgW = img.width * ratio;
      imgH = img.height * ratio;
      imgX = (canvas.width - imgW)/2;
      imgY = (canvas.height - imgH)/2;

      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(img, imgX, imgY, imgW, imgH);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

  // --- Region logic ---
  function regionFor(itemName){
  const n = itemName.toLowerCase();

  if(n.includes("lip") && n.includes("cheek")) return { x: 140, y: 180, w: 60, h: 40 }; // lips + cheeks
  if(n.includes("lipstick")) return { x: 140, y: 185, w: 60, h: 25 }; // lips only
  if(n.includes("foundation") || n.includes("bb") || n.includes("compact")) return { x: 80, y: 100, w: 160, h: 180 }; // full face
  if(n.includes("mascara") || n.includes("eyeliner")) return { x: 130, y: 120, w: 80, h: 40 }; // eyes
  if(n.includes("serum") || n.includes("toner") || n.includes("moisturizer")) return { x: 100, y: 110, w: 140, h: 160 }; // skin hydration
  if(n.includes("beard")) return { x: 120, y: 240, w: 100, h: 60 }; // beard region
  if(n.includes("hair") || n.includes("shampoo") || n.includes("mask")) return { x: 100, y: 40, w: 160, h: 80 }; // hair region

  return { x: 90, y: 100, w: 160, h: 180 }; // default face region
}

 function applyEffect(color, region){
  ctx.save();

  ctx.globalAlpha = 0.4;
  ctx.globalCompositeOperation = blendMode;
  ctx.fillStyle = color;

  const adjX = imgX + region.x * (imgW / 320);
  const adjY = imgY + region.y * (imgH / 400);
  const adjW = region.w * (imgW / 320);
  const adjH = region.h * (imgH / 400);

  ctx.fillRect(adjX, adjY, adjW, adjH);

  ctx.restore();
}


  // --- Multiple shades logic ---
  function effectFor(itemName){
    const n = itemName.toLowerCase();
    if(n.includes("lip") && n.includes("cheek")){
      return { colors:["rgba(255,105,180,0.3)","rgba(255,20,147,0.25)","rgba(199,21,133,0.3)"], label:"Lip & Cheek Tint" };
    }
    if(n.includes("lipstick")){
      return { colors:["rgba(220,20,60,0.3)","rgba(255,0,0,0.25)","rgba(128,0,0,0.3)"], label:"Lipstick Shades" };
    }
    if(n.includes("foundation") || n.includes("bb") || n.includes("compact")){
      return { colors:["rgba(255,228,196,0.25)","rgba(210,180,140,0.25)","rgba(160,82,45,0.25)"], label:"Foundation Tones" };
    }
    if(n.includes("mascara") || n.includes("eyeliner")){
      return { colors:["rgba(0,0,0,0.4)","rgba(50,50,50,0.4)","rgba(80,80,80,0.4)"], label:"Eye Definition" };
    }
    if(n.includes("serum") || n.includes("toner") || n.includes("moisturizer")){
      return { colors:["rgba(173,216,230,0.2)","rgba(144,238,144,0.2)","rgba(221,160,221,0.2)"], label:"Hydration Glow" };
    }
    return { colors:["rgba(255,255,255,0.1)","rgba(200,200,200,0.1)"], label:"Subtle Touch" };
  }

  let appliedIndex = {};

  window.applyTry = (name)=>{
    const eff = effectFor(name);
    const region = regionFor(name);

    if(!appliedIndex[name]) appliedIndex[name] = 0;

    const color = eff.colors[appliedIndex[name]];
    applyEffect(color, region);

    appliedIndex[name] = (appliedIndex[name] + 1) % eff.colors.length;
  };

  // --- Cart rendering ---
  const cart = getCart();
  list.innerHTML = cart.length
    ? cart.map(i=> `
      <div class="tryon-item">
        <span>${i.name} × ${i.qty}</span>
        <button class="btn outline" onclick='applyTry("${i.name}")'>Apply</button>
      </div>
    `).join("")
    : `<p class="note">Your cart is empty. Add products to use TryOn.</p>`;

  // --- Clear button ---
  if(clearBtn){
    clearBtn.addEventListener("click", ()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if(input.files && input.files[0]){
        const reader = new FileReader();
        reader.onload = ()=> {
          const img = new Image();
          img.onload = ()=> {
            const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
            const w = img.width * ratio, h = img.height * ratio;
            const x = (canvas.width - w)/2, y = (canvas.height - h)/2;
            ctx.drawImage(img, x, y, w, h);
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(input.files[0]);
      } else {
        ctx.drawImage(placeholder, 0, 0, canvas.width, canvas.height);
      }
    });
  }
}
let wishlist = [];

function addToWishlist(item){
  wishlist.push(item);
  renderWishlist();
}

function renderWishlist(){
  const list = document.getElementById("wishlist");
  if(!list) return;
  list.innerHTML = wishlist.map(i=>`<div class="wishlist-item">${i}</div>`).join("");
}
document.getElementById("contact-form")?.addEventListener("submit", e=>{
  e.preventDefault();
  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const msg = document.getElementById("contact-message").value;

  document.getElementById("contact-result").innerText =
    `Thank you ${name}! We received your message: "${msg}". We'll reply to ${email} soon.`;
});
// -------------------- AR Try-On (MediaPipe FaceMesh via TFJS) --------------------
let arModel = null;

// Load the face mesh model once when needed
async function loadARModel() {
  if (arModel) return arModel;
  arModel = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh, {
      maxFaces: 1,
      shouldLoadIrisModel: false,
      detectionConfidence: 0.9,
      modelUrl: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/'
    }
  );
  return arModel;
}

// Utility: draw image to canvas
function drawImageToCanvas(img, canvas) {
  const ctx = canvas.getContext('2d');
  // Fit image within canvas while preserving aspect ratio
  const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  const x = (canvas.width - w) / 2;
  const y = (canvas.height - h) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y, w, h);
  return { x, y, w, h };
}

// Utility: polygon fill with blend style
function fillPolygon(ctx, points, color, alpha = 0.55, blend = 'multiply') {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.globalCompositeOperation = blend;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

// Map landmark indices for regions (MediaPipe FaceMesh standard)
const LIPS_OUTER = [61, 40, 37, 0, 267, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146]; // approx outer ring
const LIPS_INNER = [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308]; // inner ring
const LEFT_CHEEK = [50, 101, 118, 202, 205, 50]; // coarse cheek polygon (approx)
const RIGHT_CHEEK = [280, 330, 347, 422, 425, 280]; // coarse cheek polygon (approx)
const FACE_FULL = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 152, 176, 149, 175, 4, 10]; // broad face hull (approx)

// Convert normalized landmarks to canvas coords given draw rect
function toCanvasPoints(landmarks, indices, rect) {
  return indices.map(i => ({
    x: rect.x + landmarks[i].x * rect.w,
    y: rect.y + landmarks[i].y * rect.h
  }));
}

// ------------- Static image flow -------------
(function setupStaticAR() {
  const fileInput = document.getElementById('ar-file');
  const canvas = document.getElementById('ar-canvas');
  if (!fileInput || !canvas) return;

  let currentRect = null;
  let currentLandmarks = null;

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = async () => {
      currentRect = drawImageToCanvas(img, canvas);
      const model = await loadARModel();
      const predictions = await model.estimateFaces({ input: img });
      currentLandmarks = predictions[0]?.scaledMesh;
    };
    img.src = URL.createObjectURL(file);
  });

  // Apply buttons for static image
  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!currentLandmarks || !currentRect) return;
      const action = btn.getAttribute('data-action');
      const color = btn.getAttribute('data-color');

      const ctx = canvas.getContext('2d');

      if (action === 'lipstick') {
        // Outer lips: multiply for color, inner lips: soft-light for shine
        const lipOuter = toCanvasPoints(currentLandmarks, LIPS_OUTER, currentRect);
        const lipInner = toCanvasPoints(currentLandmarks, LIPS_INNER, currentRect);
        fillPolygon(ctx, lipOuter, color, 0.6, 'multiply');
        fillPolygon(ctx, lipInner, '#ffffff', 0.12, 'soft-light');
      }
      if (action === 'blush') {
        const cheekL = toCanvasPoints(currentLandmarks, LEFT_CHEEK, currentRect);
        const cheekR = toCanvasPoints(currentLandmarks, RIGHT_CHEEK, currentRect);
        fillPolygon(ctx, cheekL, color, 0.28, 'soft-light');
        fillPolygon(ctx, cheekR, color, 0.28, 'soft-light');
      }
      if (action === 'foundation') {
        const faceHull = toCanvasPoints(currentLandmarks, FACE_FULL, currentRect);
        fillPolygon(ctx, faceHull, color, 0.20, 'soft-light');
      }
    });
  });
})();

// ------------- Live camera flow -------------
(function setupLiveAR() {
  const startBtn = document.getElementById('ar-start');
  const video = document.getElementById('ar-video');
  const canvas = document.getElementById('ar-canvas-live');
  if (!startBtn || !video || !canvas) return;

  let running = false;
  let model = null;
  let currentEffect = null; // { type, color }

  // select live effect
  document.querySelectorAll('[data-action-live]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentEffect = {
        type: btn.getAttribute('data-action-live'),
        color: btn.getAttribute('data-color')
      };
    });
  });

  startBtn.addEventListener('click', async () => {
    if (running) return;
    running = true;

    // Show video/canvas
    video.classList.remove('hidden');
    canvas.classList.remove('hidden');

    // Start camera
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 720, height: 540 } });
    video.srcObject = stream;
    await video.play();

    // Load model
    model = await loadARModel();

    // Render loop
    const ctx = canvas.getContext('2d');

    async function render() {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw video
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Estimate landmarks
      const preds = await model.estimateFaces({ input: video });
      const lm = preds[0]?.scaledMesh;

      if (lm && currentEffect) {
        const rect = { x: 0, y: 0, w: canvas.width, h: canvas.height };
        if (currentEffect.type === 'lipstick') {
          const lipOuter = toCanvasPoints(lm, LIPS_OUTER, rect);
          const lipInner = toCanvasPoints(lm, LIPS_INNER, rect);
          fillPolygon(ctx, lipOuter, currentEffect.color, 0.55, 'multiply');
          fillPolygon(ctx, lipInner, '#ffffff', 0.10, 'soft-light');
        }
        if (currentEffect.type === 'blush') {
          const cheekL = toCanvasPoints(lm, LEFT_CHEEK, rect);
          const cheekR = toCanvasPoints(lm, RIGHT_CHEEK, rect);
          fillPolygon(ctx, cheekL, currentEffect.color, 0.25, 'soft-light');
          fillPolygon(ctx, cheekR, currentEffect.color, 0.25, 'soft-light');
        }
        if (currentEffect.type === 'foundation') {
          const faceHull = toCanvasPoints(lm, FACE_FULL, rect);
          fillPolygon(ctx, faceHull, currentEffect.color, 0.18, 'soft-light');
        }
      }

      requestAnimationFrame(render);
    }
    render();
  });
})();
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("return-form");
  const message = document.getElementById("return-message");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const orderId = data.get("orderId");
      const productName = data.get("productName");
      const reason = data.get("reason");
      const email = data.get("email");

      // You can send this data to backend or email service
      console.log("Return Request:", { orderId, productName, reason, email });

      message.textContent = "Your return request has been submitted successfully!";
      form.reset();
    });
  }
});

// --- Boot by page ---
document.addEventListener("DOMContentLoaded", ()=>{
  updateCartCount();
  mountGirls();
  mountBoys();
  mountCart();
  mountCheckout();
  mountLogin();
  mountTryOn();
});
=======
// app.js

// --- Brand text in one place ---
const BRAND = "Auramorph by Interstellers";
const TAGLINE = "Your aura, your morph — try beauty beyond mirrors.";

// --- Utility: LocalStorage cart ---
const CART_KEY = "auramorph_cart";
const USER_KEY = "auramorph_user";

function getCart(){ return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
function setCart(items){ localStorage.setItem(CART_KEY, JSON.stringify(items)); updateCartCount(); }
function updateCartCount(){
  const el = document.getElementById("cart-count");
  if(el){ el.textContent = getCart().reduce((s,i)=>s+i.qty,0); }
}

// --- Utility: add to cart ---
function addToCart(product){
  const cart = getCart();
  const idx = cart.findIndex(i => i.sku === product.sku);
  if(idx >= 0){
    cart[idx].qty = Math.min(cart[idx].qty + 1, product.inventory ?? 99);
  } else {
    cart.push({ sku: product.sku, name: product.name, price: product.price, img: product.img, qty: 1 });
  }
  setCart(cart);
  alert("Added to cart: " + product.name);
}

// --- Product data (from your DOCX) ---
const menProducts = [
  {name:"Charcoal Face Wash", sku:"AM-CFW", barcode:"04001", price:599, strike:749, cog:280, inventory:30, preorder:false,
   img:"assets/products/boys/charcoal-face-wash.png",
   desc:"Deep-cleansing daily face wash powered by activated charcoal. Detoxifies pores and refreshes oily/acne-prone skin."},
  {name:"Oil-Control Moisturizer", sku:"AM-OCM", barcode:"04002", price:649, strike:799, cog:300, inventory:25, preorder:false,
   img:"assets/products/boys/oil-control-moisturizer.jpg",
   desc:"Lightweight mattifying moisturizer. Hydrates without shine; controls T-zone greasiness. Non-comedogenic and fast-absorbing."},
  {name:"Beard Oil", sku:"AM-BRD", barcode:"04003", price:699, strike:899, cog:320, inventory:20, preorder:false,
   img:"assets/products/boys/beard-oil.jpg",
   desc:"Nourishing beard oil. Prevents dryness and beardruff; adds healthy shine. Lightweight and non-greasy."},
  {name:"Hair Styling Gel", sku:"AM-HSG", barcode:"04004", price:499, strike:649, cog:250, inventory:35, preorder:false,
   img:"assets/products/boys/hair-gel.jpg",
   desc:"Strong-hold sleek styling. Non-sticky, lightweight texture with natural shine; suitable for all hair types."},
  {name:"Tinted Moisturizer", sku:"AM-TMZ", barcode:"04005", price:749, strike:899, cog:350, inventory:18, preorder:false,
   img:"assets/products/boys/tinted-moisturizer.jpg",
   desc:"Sheer coverage meets skincare. Evens tone while hydrating and protecting for a natural, no-makeup look."},
  {name:"Lip Balm (Non-tinted)", sku:"AM-LBN", barcode:"04006", price:399, strike:499, cog:180, inventory:40, preorder:false,
   img:"assets/products/boys/lip-balm.jpg",
   desc:"Hydrating lip balm with SPF. Repairs dry lips without shine or tint."},
  {name:"Gentle Face Wash", sku:"AM-GFW", barcode:"04007", price:549, strike:699, cog:260, inventory:28, preorder:false,
   img:"assets/products/boys/gentle-face-wash.jpg",
   desc:"Mild cleanser for sensitive skin. Removes impurities while maintaining hydration. Soap-free, fragrance-free."},
  {name:"Vitamin C Serum", sku:"AM-VCS", barcode:"04008", price:899, strike:1099, cog:420, inventory:22, preorder:false,
   img:"assets/products/boys/vitam-C-serum.jpg",
   desc:"20% Vitamin C brightening and repair. Fades dark spots, boosts collagen, protects against environmental damage."},
  {name:"Black Peel-Off Mask", sku:"AM-BPM", barcode:"04009", price:599, strike:749, cog:280, inventory:24, preorder:false,
   img:"assets/products/boys/black-peeloff-mask.jpg",
   desc:"Activated charcoal peel-off deep pore cleansing. Removes blackheads; leaves smooth, refreshed complexion."},
  {name:"Anti-Dandruff Shampoo", sku:"AM-ADS", barcode:"04010", price:649, strike:799, cog:300, inventory:26, preorder:false,
   img:"assets/products/boys/Dandruff-free-shampoo.jpg",
   desc:"Scalp-refreshing shampoo with lemon and menthol. Fights dandruff; citrus-scented; dermatologically tested."},
];

const boysContainer = document.getElementById("boys-products");
if (boysContainer) {
  menProducts.forEach(p => {
    boysContainer.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Rs ${p.price}</p>
      </div>
    `;
  });
}

const womenProducts = [
  {name:"Hydrating Face Wash", sku:"AW-HFW", barcode:"05001", price:599, strike:749, cog:280, inventory:40, preorder:false,
   img:"assets/products/girls/hydrating-face-wash.jpg",
   desc:"Gentle daily cleanser removes dirt and makeup without stripping moisture. Aloe and rose water glow."},
  {name:"Oil-Free Moisturizer", sku:"AW-OFM", barcode:"05002", price:649, strike:799, cog:300, inventory:30, preorder:false,
   img:"assets/products/girls/oil-free-moisturizer.jpg",
   desc:"Lightweight, non-greasy hydration that leaves skin fresh and matte; ideal for oily/acne-prone."},
  {name:"Tinted Sunscreen SPF 50", sku:"AW-TSS", barcode:"05003", price:799, strike:999, cog:360, inventory:25, preorder:true,
   img:"assets/products/girls/tinted-sunscreen-spf-50.jpg",
   desc:"Broad-spectrum SPF 50 with natural tint; evens tone while shielding from UV. Lightweight, breathable."},
  {name:"BB Cream", sku:"AW-BBC", barcode:"05004", price:699, strike:849, cog:320, inventory:30, preorder:false,
   img:"assets/products/girls/bb-cream.jpg",
   desc:"All-in-one balm that hydrates, primes, and provides light coverage. Smooth, radiant finish."},
  {name:"Compact Powder", sku:"AW-CMP", barcode:"05005", price:649, strike:799, cog:300, inventory:30, preorder:false,
   img:"assets/products/girls/compact-powder.jpg",
   desc:"Matte finish, shine control, sets makeup. Lightweight with buildable coverage."},
  {name:"Liquid Foundation", sku:"AW-LFN", barcode:"05006", price:899, strike:1099, cog:420, inventory:20, preorder:true,
   img:"assets/products/girls/liquid-foundation.jpg",
   desc:"Flawless coverage, smooth and blendable. Long-lasting with natural finish; multiple tones."},
  {name:"Lip & Cheek Tint", sku:"AW-LCT", barcode:"05007", price:599, strike:749, cog:280, inventory:35, preorder:false,
   img:"assets/products/girls/lip-and-cheek-tint.jpg",
   desc:"Dual-purpose tint gives a natural flush with buildable intensity. Water-based, dewy."},
  {name:"Matte Lipstick Set", sku:"AW-MLS", barcode:"05008", price:999, strike:1299, cog:480, inventory:15, preorder:true,
   img:"assets/products/girls/matte-lipstick-set.jpg",
   desc:"Bold matte lipsticks in trendy shades. Long-lasting, smudge-proof, rich pigmentation."},
  {name:"Waterproof Mascara", sku:"AW-WPM", barcode:"05009", price:699, strike:849, cog:320, inventory:25, preorder:false,
   img:"assets/products/girls/waterproof-mascara.jpg",
   desc:"Volumizing mascara resists water and smudging. Curved brush for lift and length."},
  {name:"Eyeliner Pen", sku:"AW-ELP", barcode:"05010", price:499, strike:649, cog:250, inventory:30, preorder:false,
   img:"assets/products/girls/eyeliner-pen.jpg",
   desc:"Precision fine tip, smudge-proof, quick-drying. Perfect for winged & graphic looks."},
  {name:"Makeup Remover Wipes", sku:"AW-MRW", barcode:"05011", price:399, strike:499, cog:180, inventory:40, preorder:false,
   img:"assets/products/girls/makeup-remover-wipes.jpg",
   desc:"Soft wipes gently remove makeup and impurities. Micellar water + aloe; travel-friendly."},
  {name:"Sheet Masks (Pack of 3)", sku:"AW-SMK", barcode:"05012", price:749, strike:899, cog:350, inventory:20, preorder:true,
   img:"assets/products/girls/sheet-masks-pack-3.jpg",
   desc:"Trio with rose, cucumber, honey extracts. Soothes, brightens, refreshes."},
  {name:"Nourishing Shampoo", sku:"AW-NSH", barcode:"05013", price:649, strike:799, cog:300, inventory:30, preorder:false,
   img:"assets/products/girls/nourishing-shampoo.jpg",
   desc:"Keratin + argan oil. Gently cleanses while restoring shine and strength."},
  {name:"Deep Repair Hair Mask", sku:"AW-DRM", barcode:"05014", price:799, strike:999, cog:360, inventory:20, preorder:true,
   img:"assets/products/girls/deep-repair-hair-mask.jpg",
   desc:"Intensive repair for damaged and dry hair. Moisture-rich with spa-like fragrance."},
  {name:"Rose Water Toner", sku:"AW-RWT", barcode:"05015", price:499, strike:649, cog:250, inventory:35, preorder:false,
   img:"assets/products/girls/rose-water-toner.jpg",
   desc:"Pure rose water. Balances pH, tightens pores, preps skin for hydration. Alcohol-free."}
];
const girlsContainer = document.getElementById("girls-products");
if (girlsContainer) {
  womenProducts.forEach(p => {
    girlsContainer.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Rs ${p.price}</p>
      </div>
    `;
  });
}

// --- Render helpers ---
function productCardHTML(p){
  return `
    <div class="card product-card">
      <img class="product-img" src="${p.img}" alt="${p.name}" onerror="this.src='assets\tryon-sample.jpg'"/>
      <h3>${p.name}</h3>
      <p class="meta">${BRAND}</p>
      <div class="price-row">
        <span class="price">Rs ${p.price}</span>
        <span class="strike">Rs ${p.strike}</span>
      </div>
      <p class="meta"><strong>SKU:</strong> ${p.sku} &nbsp; <strong>Barcode:</strong> ${p.barcode}</p>
      <p class="meta"><strong>COG:</strong> Rs ${p.cog}</p>
      <p class="stock"><strong>Stock:</strong> ${p.inventory} &nbsp; ${p.preorder ? '<span class="preorder">Pre-order available</span>' : ''}</p>
      <p>${p.desc}</p>
      <div style="display:flex;gap:8px">
        <button class="btn primary" onclick='addToCart(${JSON.stringify(p)})'>Add to cart</button>
        <a class="btn outline" href="tryon.html">Try-on</a>
      </div>
    </div>
  `;
}

// --- Page-specific mounts ---
function mountGirls(){
  const grid = document.getElementById("girls-products");
  if(grid){ grid.innerHTML = womenProducts.map(productCardHTML).join(""); }
}
function mountBoys(){
  const grid = document.getElementById("boys-products");
  if(grid){ grid.innerHTML = menProducts.map(productCardHTML).join(""); }
}

// --- Cart rendering ---
function mountCart(){
  const list = document.getElementById("cart-list");
  if(!list) return;
  const cart = getCart();
  if(cart.length === 0){
    list.innerHTML = `<div class="card"><p>Your cart is empty.</p></div>`;
  } else {
    list.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" onerror="this.src='assets\tryon-sample.jpg'"/>
        <div class="grow">
          <h3>${item.name}</h3>
          <p class="meta">SKU: ${item.sku}</p>
          <p class="price">Rs ${item.price}</p>
          <div class="qty">
            <button class="btn outline" onclick="decQty(${idx})">−</button>
            <span>Qty: ${item.qty}</span>
            <button class="btn outline" onclick="incQty(${idx})">+</button>
            <button class="btn" onclick="removeItem(${idx})" style="margin-left:auto;background:#2a1f3f">Remove</button>
          </div>
        </div>
      </div>
    `).join("");
  }
  computeTotals();
}
function incQty(i){
  const cart = getCart(); cart[i].qty++; setCart(cart); mountCart();
}
function decQty(i){
  const cart = getCart(); cart[i].qty = Math.max(1, cart[i].qty-1); setCart(cart); mountCart();
}
function removeItem(i){
  const cart = getCart(); cart.splice(i,1); setCart(cart); mountCart();
}
function computeTotals(){
  const cart = getCart();
  const subtotal = cart.reduce((s,i)=>s + i.price*i.qty, 0);
  const shipping = cart.length ? 199 : 0;
  const total = subtotal + shipping;
  const subEl = document.getElementById("cart-subtotal");
  const shipEl = document.getElementById("cart-shipping");
  const totEl = document.getElementById("cart-total");
  if(subEl) subEl.textContent = subtotal;
  if(shipEl) shipEl.textContent = shipping;
  if(totEl) totEl.textContent = total;
}

// --- Checkout summary ---
function mountCheckout(){
  const sum = document.getElementById("checkout-summary");
  const tot = document.getElementById("checkout-total");
  const form = document.getElementById("checkout-form");
  if(sum){
    const cart = getCart();
    sum.innerHTML = cart.map(i=>`<p>${i.name} × ${i.qty} — Rs ${i.price*i.qty}</p>`).join("");
    const total = cart.reduce((s,i)=>s + i.price*i.qty, 0) + (cart.length?199:0);
    if(tot) tot.textContent = total;
  }
  if(form){
    form.addEventListener("submit", e=>{
      e.preventDefault();
      alert("Payment successful (demo). Thank you!");
      setCart([]); // clear cart after demo payment
      window.location.href = "index.html";
    });
  }
}

// --- Login / Signup (demo) ---
function mountLogin(){
  const login = document.getElementById("login-form");
  const signup = document.getElementById("signup");
  if(login){
    login.addEventListener("submit", e=>{
      e.preventDefault();
      const email = document.getElementById("email").value;
      const pass = document.getElementById("password").value;
      const users = JSON.parse(localStorage.getItem(USER_KEY)||"{}");
      if(users[email] && users[email] === pass){
        alert("Welcome back!");
        localStorage.setItem("auramorph_session", email);
        window.location.href = "index.html";
      } else {
        alert("Invalid credentials. Try Sign up.");
      }
    });
  }
  if(signup){
    signup.addEventListener("click", ()=>{
      const email = document.getElementById("email").value;
      const pass = document.getElementById("password").value;
      if(!email || !pass){ alert("Enter email & password to sign up."); return; }
      const users = JSON.parse(localStorage.getItem(USER_KEY)||"{}");
      users[email] = pass;
      localStorage.setItem(USER_KEY, JSON.stringify(users));
      alert("Account created. You can login now.");
    });
  }
}

// --- Virtual Try-On (canvas overlays) ---
function mountTryOn(){
  const input = document.getElementById("photo-input");
  const canvas = document.getElementById("avatar-canvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const list = document.getElementById("tryon-items");
  const clearBtn = document.getElementById("clear-effects");
  let imgX = 0, imgY = 0, imgW = canvas.width, imgH = canvas.height;
  let blendMode = "soft-light"; // default mode
const blendSelect = document.getElementById("blend-select");
if(blendSelect){
  blendSelect.addEventListener("change", (e)=>{
    blendMode = e.target.value;
  });
}
document.getElementById("signup-form")?.addEventListener("submit", e=>{
  e.preventDefault();
  const pass = document.getElementById("password").value;
  if(pass.length < 8){
    alert("Password must be at least 8 characters!");
    return;
  }
  alert("Signup successful!");
});
function suggestProduct(type){
  let msg="";
  if(type==="dry") msg="Try our Hydrating Serum!";
  if(type==="oily") msg="Matte Foundation suits you!";
  if(type==="combo") msg="Balanced BB Cream is best!";
  document.getElementById("quiz-result").innerText=msg;
}
async function initTryOnAR() {
  const video = document.getElementById("ar-video");
  const canvasStatic = document.getElementById("ar-canvas");
  const canvasLive = document.getElementById("ar-canvas-live");
  const ctxStatic = canvasStatic.getContext("2d");
  const ctxLive = canvasLive.getContext("2d");

  // Camera access
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.classList.remove("hidden");       // show video
      canvasLive.classList.remove("hidden");  // show live canvas
    })
    .catch(err => {
      console.error("Camera error:", err);
    });

  // Load FaceMesh model
  const model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
  );

  async function renderFrame() {
    const predictions = await model.estimateFaces({ input: video });
    ctxLive.drawImage(video, 0, 0, canvasLive.width, canvasLive.height);

    if (predictions.length > 0) {
      predictions[0].scaledMesh.forEach(point => {
        ctxLive.fillStyle = "red";
        ctxLive.fillRect(point[0], point[1], 2, 2);
      });
    }
    requestAnimationFrame(renderFrame);
  }

  renderFrame();
}



  if(!input || !canvas || !ctx || !list) return;

  // --- Draw placeholder ---
  const placeholder = new Image();
  placeholder.src = "assets/tryon-sample.jpg";
  placeholder.onload = ()=> {
    ctx.drawImage(placeholder, 0, 0, canvas.width, canvas.height);
  };

  // --- Upload photo ---
  input.addEventListener("change", ()=> {
  const file = input.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = ()=> {
    const img = new Image();
    img.onload = ()=> {
      const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
      imgW = img.width * ratio;
      imgH = img.height * ratio;
      imgX = (canvas.width - imgW)/2;
      imgY = (canvas.height - imgH)/2;

      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(img, imgX, imgY, imgW, imgH);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

  // --- Region logic ---
  function regionFor(itemName){
  const n = itemName.toLowerCase();

  if(n.includes("lip") && n.includes("cheek")) return { x: 140, y: 180, w: 60, h: 40 }; // lips + cheeks
  if(n.includes("lipstick")) return { x: 140, y: 185, w: 60, h: 25 }; // lips only
  if(n.includes("foundation") || n.includes("bb") || n.includes("compact")) return { x: 80, y: 100, w: 160, h: 180 }; // full face
  if(n.includes("mascara") || n.includes("eyeliner")) return { x: 130, y: 120, w: 80, h: 40 }; // eyes
  if(n.includes("serum") || n.includes("toner") || n.includes("moisturizer")) return { x: 100, y: 110, w: 140, h: 160 }; // skin hydration
  if(n.includes("beard")) return { x: 120, y: 240, w: 100, h: 60 }; // beard region
  if(n.includes("hair") || n.includes("shampoo") || n.includes("mask")) return { x: 100, y: 40, w: 160, h: 80 }; // hair region

  return { x: 90, y: 100, w: 160, h: 180 }; // default face region
}

 function applyEffect(color, region){
  ctx.save();

  ctx.globalAlpha = 0.4;
  ctx.globalCompositeOperation = blendMode;
  ctx.fillStyle = color;

  const adjX = imgX + region.x * (imgW / 320);
  const adjY = imgY + region.y * (imgH / 400);
  const adjW = region.w * (imgW / 320);
  const adjH = region.h * (imgH / 400);

  ctx.fillRect(adjX, adjY, adjW, adjH);

  ctx.restore();
}


  // --- Multiple shades logic ---
  function effectFor(itemName){
    const n = itemName.toLowerCase();
    if(n.includes("lip") && n.includes("cheek")){
      return { colors:["rgba(255,105,180,0.3)","rgba(255,20,147,0.25)","rgba(199,21,133,0.3)"], label:"Lip & Cheek Tint" };
    }
    if(n.includes("lipstick")){
      return { colors:["rgba(220,20,60,0.3)","rgba(255,0,0,0.25)","rgba(128,0,0,0.3)"], label:"Lipstick Shades" };
    }
    if(n.includes("foundation") || n.includes("bb") || n.includes("compact")){
      return { colors:["rgba(255,228,196,0.25)","rgba(210,180,140,0.25)","rgba(160,82,45,0.25)"], label:"Foundation Tones" };
    }
    if(n.includes("mascara") || n.includes("eyeliner")){
      return { colors:["rgba(0,0,0,0.4)","rgba(50,50,50,0.4)","rgba(80,80,80,0.4)"], label:"Eye Definition" };
    }
    if(n.includes("serum") || n.includes("toner") || n.includes("moisturizer")){
      return { colors:["rgba(173,216,230,0.2)","rgba(144,238,144,0.2)","rgba(221,160,221,0.2)"], label:"Hydration Glow" };
    }
    return { colors:["rgba(255,255,255,0.1)","rgba(200,200,200,0.1)"], label:"Subtle Touch" };
  }

  let appliedIndex = {};

  window.applyTry = (name)=>{
    const eff = effectFor(name);
    const region = regionFor(name);

    if(!appliedIndex[name]) appliedIndex[name] = 0;

    const color = eff.colors[appliedIndex[name]];
    applyEffect(color, region);

    appliedIndex[name] = (appliedIndex[name] + 1) % eff.colors.length;
  };

  // --- Cart rendering ---
  const cart = getCart();
  list.innerHTML = cart.length
    ? cart.map(i=> `
      <div class="tryon-item">
        <span>${i.name} × ${i.qty}</span>
        <button class="btn outline" onclick='applyTry("${i.name}")'>Apply</button>
      </div>
    `).join("")
    : `<p class="note">Your cart is empty. Add products to use TryOn.</p>`;

  // --- Clear button ---
  if(clearBtn){
    clearBtn.addEventListener("click", ()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if(input.files && input.files[0]){
        const reader = new FileReader();
        reader.onload = ()=> {
          const img = new Image();
          img.onload = ()=> {
            const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
            const w = img.width * ratio, h = img.height * ratio;
            const x = (canvas.width - w)/2, y = (canvas.height - h)/2;
            ctx.drawImage(img, x, y, w, h);
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(input.files[0]);
      } else {
        ctx.drawImage(placeholder, 0, 0, canvas.width, canvas.height);
      }
    });
  }
}
let wishlist = [];

function addToWishlist(item){
  wishlist.push(item);
  renderWishlist();
}

function renderWishlist(){
  const list = document.getElementById("wishlist");
  if(!list) return;
  list.innerHTML = wishlist.map(i=>`<div class="wishlist-item">${i}</div>`).join("");
}
document.getElementById("contact-form")?.addEventListener("submit", e=>{
  e.preventDefault();
  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const msg = document.getElementById("contact-message").value;

  document.getElementById("contact-result").innerText =
    `Thank you ${name}! We received your message: "${msg}". We'll reply to ${email} soon.`;
});
// -------------------- AR Try-On (MediaPipe FaceMesh via TFJS) --------------------
let arModel = null;

// Load the face mesh model once when needed
async function loadARModel() {
  if (arModel) return arModel;
  arModel = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh, {
      maxFaces: 1,
      shouldLoadIrisModel: false,
      detectionConfidence: 0.9,
      modelUrl: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/'
    }
  );
  return arModel;
}

// Utility: draw image to canvas
function drawImageToCanvas(img, canvas) {
  const ctx = canvas.getContext('2d');
  // Fit image within canvas while preserving aspect ratio
  const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  const x = (canvas.width - w) / 2;
  const y = (canvas.height - h) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y, w, h);
  return { x, y, w, h };
}

// Utility: polygon fill with blend style
function fillPolygon(ctx, points, color, alpha = 0.55, blend = 'multiply') {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.globalCompositeOperation = blend;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

// Map landmark indices for regions (MediaPipe FaceMesh standard)
const LIPS_OUTER = [61, 40, 37, 0, 267, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146]; // approx outer ring
const LIPS_INNER = [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308]; // inner ring
const LEFT_CHEEK = [50, 101, 118, 202, 205, 50]; // coarse cheek polygon (approx)
const RIGHT_CHEEK = [280, 330, 347, 422, 425, 280]; // coarse cheek polygon (approx)
const FACE_FULL = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 152, 176, 149, 175, 4, 10]; // broad face hull (approx)

// Convert normalized landmarks to canvas coords given draw rect
function toCanvasPoints(landmarks, indices, rect) {
  return indices.map(i => ({
    x: rect.x + landmarks[i].x * rect.w,
    y: rect.y + landmarks[i].y * rect.h
  }));
}

// ------------- Static image flow -------------
(function setupStaticAR() {
  const fileInput = document.getElementById('ar-file');
  const canvas = document.getElementById('ar-canvas');
  if (!fileInput || !canvas) return;

  let currentRect = null;
  let currentLandmarks = null;

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = async () => {
      currentRect = drawImageToCanvas(img, canvas);
      const model = await loadARModel();
      const predictions = await model.estimateFaces({ input: img });
      currentLandmarks = predictions[0]?.scaledMesh;
    };
    img.src = URL.createObjectURL(file);
  });

  // Apply buttons for static image
  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!currentLandmarks || !currentRect) return;
      const action = btn.getAttribute('data-action');
      const color = btn.getAttribute('data-color');

      const ctx = canvas.getContext('2d');

      if (action === 'lipstick') {
        // Outer lips: multiply for color, inner lips: soft-light for shine
        const lipOuter = toCanvasPoints(currentLandmarks, LIPS_OUTER, currentRect);
        const lipInner = toCanvasPoints(currentLandmarks, LIPS_INNER, currentRect);
        fillPolygon(ctx, lipOuter, color, 0.6, 'multiply');
        fillPolygon(ctx, lipInner, '#ffffff', 0.12, 'soft-light');
      }
      if (action === 'blush') {
        const cheekL = toCanvasPoints(currentLandmarks, LEFT_CHEEK, currentRect);
        const cheekR = toCanvasPoints(currentLandmarks, RIGHT_CHEEK, currentRect);
        fillPolygon(ctx, cheekL, color, 0.28, 'soft-light');
        fillPolygon(ctx, cheekR, color, 0.28, 'soft-light');
      }
      if (action === 'foundation') {
        const faceHull = toCanvasPoints(currentLandmarks, FACE_FULL, currentRect);
        fillPolygon(ctx, faceHull, color, 0.20, 'soft-light');
      }
    });
  });
})();

// ------------- Live camera flow -------------
(function setupLiveAR() {
  const startBtn = document.getElementById('ar-start');
  const video = document.getElementById('ar-video');
  const canvas = document.getElementById('ar-canvas-live');
  if (!startBtn || !video || !canvas) return;

  let running = false;
  let model = null;
  let currentEffect = null; // { type, color }

  // select live effect
  document.querySelectorAll('[data-action-live]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentEffect = {
        type: btn.getAttribute('data-action-live'),
        color: btn.getAttribute('data-color')
      };
    });
  });

  startBtn.addEventListener('click', async () => {
    if (running) return;
    running = true;

    // Show video/canvas
    video.classList.remove('hidden');
    canvas.classList.remove('hidden');

    // Start camera
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 720, height: 540 } });
    video.srcObject = stream;
    await video.play();

    // Load model
    model = await loadARModel();

    // Render loop
    const ctx = canvas.getContext('2d');

    async function render() {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw video
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Estimate landmarks
      const preds = await model.estimateFaces({ input: video });
      const lm = preds[0]?.scaledMesh;

      if (lm && currentEffect) {
        const rect = { x: 0, y: 0, w: canvas.width, h: canvas.height };
        if (currentEffect.type === 'lipstick') {
          const lipOuter = toCanvasPoints(lm, LIPS_OUTER, rect);
          const lipInner = toCanvasPoints(lm, LIPS_INNER, rect);
          fillPolygon(ctx, lipOuter, currentEffect.color, 0.55, 'multiply');
          fillPolygon(ctx, lipInner, '#ffffff', 0.10, 'soft-light');
        }
        if (currentEffect.type === 'blush') {
          const cheekL = toCanvasPoints(lm, LEFT_CHEEK, rect);
          const cheekR = toCanvasPoints(lm, RIGHT_CHEEK, rect);
          fillPolygon(ctx, cheekL, currentEffect.color, 0.25, 'soft-light');
          fillPolygon(ctx, cheekR, currentEffect.color, 0.25, 'soft-light');
        }
        if (currentEffect.type === 'foundation') {
          const faceHull = toCanvasPoints(lm, FACE_FULL, rect);
          fillPolygon(ctx, faceHull, currentEffect.color, 0.18, 'soft-light');
        }
      }

      requestAnimationFrame(render);
    }
    render();
  });
})();
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("return-form");
  const message = document.getElementById("return-message");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const orderId = data.get("orderId");
      const productName = data.get("productName");
      const reason = data.get("reason");
      const email = data.get("email");

      // You can send this data to backend or email service
      console.log("Return Request:", { orderId, productName, reason, email });

      message.textContent = "Your return request has been submitted successfully!";
      form.reset();
    });
  }
});

// --- Boot by page ---
document.addEventListener("DOMContentLoaded", ()=>{
  updateCartCount();
  mountGirls();
  mountBoys();
  mountCart();
  mountCheckout();
  mountLogin();
  mountTryOn();
});


>>>>>>> ea2b3b2b2dec6026c451888d0c9b55870cfed0a0
