/**
 * SPA App - Esfiha Delivery
 * Vanilla JS logic for loading menu, cart management (localStorage),
 * registration, geolocation, security validation (CredentialsContainer),
 * payment simulation, and WhatsApp order generator.
 */

document.addEventListener('DOMContentLoaded', () => {
  // App State
  const state = {
    products: [],
    meta: {},
    cart: [], // Array of { product, quantity }
    activeFilter: 'todos',
    userData: {
      name: '',
      phone: '',
      email: '',
      address: '',
      coords: null
    },
    securityValidated: false,
    orderId: null
  };

  // LocalStorage keys
  const LS_CART_KEY = 'esfiha_spa_cart';

  // DOM Elements
  const views = {
    menu: document.getElementById('view-menu'),
    cart: document.getElementById('view-cart'),
    checkout: document.getElementById('view-checkout'),
    security: document.getElementById('view-security'),
    payment: document.getElementById('view-payment'),
    confirmation: document.getElementById('view-confirmation')
  };

  const productsGrid = document.getElementById('productsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cartBadge = document.getElementById('cartBadge');
  const stickyCartBar = document.getElementById('stickyCartBar');
  const stickyCartCount = document.getElementById('stickyCartCount');
  const stickyCartTotal = document.getElementById('stickyCartTotal');
  const cartToggleBtn = document.getElementById('cartToggleBtn');

  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartContent = document.getElementById('cartContent');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTotal = document.getElementById('cartTotal');
  const goToCheckoutBtn = document.getElementById('goToCheckoutBtn');

  const checkoutForm = document.getElementById('checkoutForm');
  const geoBtn = document.getElementById('geoBtn');
  const geoStatus = document.getElementById('geoStatus');

  const verifyCredentialsBtn = document.getElementById('verifyCredentialsBtn');
  const skipSecurityBtn = document.getElementById('skipSecurityBtn');
  const securityNotice = document.getElementById('securityNotice');
  const securityNoticeText = document.getElementById('securityNoticeText');

  const paymentTotalAmount = document.getElementById('paymentTotalAmount');
  const payApproveBtn = document.getElementById('payApproveBtn');
  const payDeclineBtn = document.getElementById('payDeclineBtn');

  const orderIdDisplay = document.getElementById('orderIdDisplay');
  const orderSummaryBox = document.getElementById('orderSummaryBox');
  const whatsappLink = document.getElementById('whatsappLink');
  const newOrderBtn = document.getElementById('newOrderBtn');

  // Helper: Format Currency (BRL)
  function formatCurrency(amount) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  }

  // SPA Navigation Helper
  function navigateTo(viewId) {
    Object.keys(views).forEach(id => {
      if (id === viewId || `view-${id}` === viewId) {
        views[id].classList.add('view-active');
      } else {
        views[id].classList.remove('view-active');
      }
    });

    // Toggle Sticky Cart Bar (only visible on menu view if cart is not empty)
    if ((viewId === 'menu' || viewId === 'view-menu') && getCartTotalCount() > 0) {
      stickyCartBar.classList.remove('hidden');
    } else {
      stickyCartBar.classList.add('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Load Menu JSON Data
  async function loadMenuData() {
    try {
      const response = await fetch('./data/cardapio.json');
      if (!response.ok) throw new Error('Falha ao carregar cardápio.');
      const data = await response.json();
      state.products = data.produtos || [];
      state.meta = data.meta || {};
      renderProducts();
    } catch (err) {
      console.error(err);
      productsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--color-danger); padding: 40px;">
          <span class="material-symbols-outlined" style="font-size: 48px;">error</span>
          <p>Não foi possível carregar os produtos do cardápio.</p>
        </div>
      `;
    }
  }

  // Render Product Cards
  function renderProducts() {
    productsGrid.innerHTML = '';

    const filtered = state.products.filter(prod => {
      if (state.activeFilter === 'todos') return true;
      if (state.activeFilter === 'promocao') return prod.promocao === true;
      if (state.activeFilter === 'salgada' || state.activeFilter === 'doce') {
        return prod.tipoSabor === state.activeFilter;
      }
      if (state.activeFilter === 'bebida') return prod.categoria === 'bebida';
      return true;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--color-gray-text); padding: 30px;">
          <p>Nenhum produto encontrado nesta categoria.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(prod => {
      const card = document.createElement('div');
      card.className = `product-card ${!prod.disponivel ? 'unavailable' : ''}`;

      const effectivePrice = prod.promocao && prod.precoPromocional ? prod.precoPromocional : prod.preco;

      let tagsHtml = '';
      if (prod.tags && prod.tags.length > 0) {
        prod.tags.forEach(tag => {
          let label = tag;
          let className = 'badge-tag ';
          if (tag === 'promocao') {
            label = 'Promoção';
            className += 'tag-promocao';
          } else if (tag === 'best-seller') {
            label = 'Mais Vendido';
            className += 'tag-best-seller';
          } else if (tag === 'vegetariana') {
            label = 'Vegetariana';
            className += 'tag-vegetariana';
          }
          tagsHtml += `<span class="${className}">${label}</span> `;
        });
      }

      card.innerHTML = `
        <div class="product-card-top">
          <div class="product-icon-box">
            <span class="material-symbols-outlined">${prod.imagem || 'restaurant'}</span>
          </div>
          <div class="product-info">
            <h3 class="product-title">${prod.nome}</h3>
            <p class="product-desc">${prod.descricao}</p>
            ${tagsHtml}
          </div>
        </div>
        <div class="product-card-bottom">
          <div class="price-box">
            ${prod.promocao ? `<span class="price-original has-discount">${formatCurrency(prod.preco)}</span>` : ''}
            <span class="price-current">${formatCurrency(effectivePrice)}</span>
          </div>
          <button class="add-cart-btn" data-id="${prod.id}" ${!prod.disponivel ? 'disabled' : ''}>
            <span class="material-symbols-outlined">add_shopping_cart</span>
            ${prod.disponivel ? 'Adicionar' : 'Esgotado'}
          </button>
        </div>
      `;

      productsGrid.appendChild(card);
    });

    // Attach Add to Cart Event Listeners
    productsGrid.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = e.currentTarget.getAttribute('data-id');
        addToCart(prodId);
      });
    });
  }

  // Cart Management Functions
  function loadCartFromStorage() {
    try {
      const stored = localStorage.getItem(LS_CART_KEY);
      if (stored) {
        state.cart = JSON.parse(stored);
      }
    } catch (e) {
      state.cart = [];
    }
    updateCartUI();
  }

  function saveCartToStorage() {
    localStorage.setItem(LS_CART_KEY, JSON.stringify(state.cart));
    updateCartUI();
  }

  function addToCart(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product || !product.disponivel) return;

    const existingIndex = state.cart.findIndex(item => item.product.id === productId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += 1;
    } else {
      state.cart.push({ product, quantity: 1 });
    }

    saveCartToStorage();
  }

  function updateQuantity(productId, delta) {
    const existingIndex = state.cart.findIndex(item => item.product.id === productId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += delta;
      if (state.cart[existingIndex].quantity <= 0) {
        state.cart.splice(existingIndex, 1);
      }
    }
    saveCartToStorage();
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.product.id !== productId);
    saveCartToStorage();
  }

  function getCartTotalCount() {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  }

  function getCartTotalPrice() {
    return state.cart.reduce((total, item) => {
      const price = item.product.promocao && item.product.precoPromocional
        ? item.product.precoPromocional
        : item.product.preco;
      return total + (price * item.quantity);
    }, 0);
  }

  function updateCartUI() {
    const count = getCartTotalCount();
    const totalPrice = getCartTotalPrice();

    // Update Header Badge
    cartBadge.textContent = count;

    // Update Sticky Bar
    stickyCartCount.textContent = `${count} ${count === 1 ? 'item' : 'itens'}`;
    stickyCartTotal.textContent = formatCurrency(totalPrice);

    if (views.menu.classList.contains('view-active') && count > 0) {
      stickyCartBar.classList.remove('hidden');
    } else {
      stickyCartBar.classList.add('hidden');
    }

    // Render Cart View Content
    if (count === 0) {
      cartEmptyState.classList.remove('hidden');
      cartContent.classList.add('hidden');
    } else {
      cartEmptyState.classList.add('hidden');
      cartContent.classList.remove('hidden');

      cartItemsList.innerHTML = '';
      state.cart.forEach(item => {
        const prod = item.product;
        const unitPrice = prod.promocao && prod.precoPromocional ? prod.precoPromocional : prod.preco;
        const itemTotal = unitPrice * item.quantity;

        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
          <div class="cart-item-details">
            <div class="cart-item-title">${prod.nome}</div>
            <div class="cart-item-price">${formatCurrency(unitPrice)} un. &bull; <strong>${formatCurrency(itemTotal)}</strong></div>
          </div>
          <div class="cart-item-actions">
            <div class="qty-control">
              <button class="qty-btn minus-btn" data-id="${prod.id}">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn plus-btn" data-id="${prod.id}">+</button>
            </div>
            <button class="remove-btn" data-id="${prod.id}" title="Remover">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>
        `;
        cartItemsList.appendChild(cartItemEl);
      });

      // Quantity & Remove Event Listeners
      cartItemsList.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          updateQuantity(e.currentTarget.getAttribute('data-id'), -1);
        });
      });
      cartItemsList.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          updateQuantity(e.currentTarget.getAttribute('data-id'), 1);
        });
      });
      cartItemsList.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          removeFromCart(e.currentTarget.getAttribute('data-id'));
        });
      });

      cartSubtotal.textContent = formatCurrency(totalPrice);
      cartTotal.textContent = formatCurrency(totalPrice);
    }
  }

  // Geolocation Handler
  geoBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      geoStatus.className = 'geo-status error';
      geoStatus.textContent = 'Geolocalização não é suportada pelo seu navegador.';
      geoStatus.classList.remove('hidden');
      return;
    }

    geoStatus.className = 'geo-status';
    geoStatus.textContent = 'Obtendo sua localização...';
    geoStatus.classList.remove('hidden');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        state.userData.coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        geoStatus.className = 'geo-status success';
        geoStatus.textContent = `Localização capturada com sucesso! (Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)})`;
      },
      (error) => {
        state.userData.coords = null;
        geoStatus.className = 'geo-status error';
        geoStatus.textContent = 'Acesso à localização negado. O cadastro continuará apenas com o endereço digitado.';
      },
      { timeout: 10000 }
    );
  });

  // Filter Buttons Handler
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.activeFilter = e.currentTarget.getAttribute('data-filter');
      renderProducts();
    });
  });

  // Navigation Click Handlers
  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget.getAttribute('data-target');
      navigateTo(target);
    });
  });

  cartToggleBtn.addEventListener('click', () => {
    navigateTo('cart');
  });

  goToCheckoutBtn.addEventListener('click', () => {
    if (getCartTotalCount() > 0) {
      navigateTo('checkout');
    }
  });

  // Registration Form Submission
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    state.userData.name = document.getElementById('userName').value.trim();
    state.userData.phone = document.getElementById('userPhone').value.trim();
    state.userData.email = document.getElementById('userEmail').value.trim();
    state.userData.address = document.getElementById('userAddress').value.trim();

    checkDeviceSecuritySupport();
    navigateTo('security');
  });

  // Security Check (CredentialsContainer / WebAuthn)
  async function checkDeviceSecuritySupport() {
    securityNotice.classList.add('hidden');
    let isAvailable = false;

    if (window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
      try {
        isAvailable = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      } catch (err) {
        isAvailable = false;
      }
    }

    if (!isAvailable) {
      securityNoticeText.textContent = 'Autenticador de plataforma não disponível neste dispositivo/navegador. Você pode prosseguir normalmente.';
      securityNotice.className = 'notice-box warning';
      securityNotice.classList.remove('hidden');
    }
  }

  verifyCredentialsBtn.addEventListener('click', async () => {
    let isAvailable = false;
    if (window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
      try {
        isAvailable = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      } catch (e) {
        isAvailable = false;
      }
    }

    if (isAvailable && window.CredentialsContainer && navigator.credentials) {
      try {
        // Dummy challenge simulation for credential verification check
        const challenge = new Uint8Array(16);
        window.crypto.getRandomValues(challenge);

        // Informative simulation triggering user verification step
        state.securityValidated = true;
        securityNoticeText.textContent = 'Identidade e prova de vida confirmadas com sucesso!';
        securityNotice.className = 'notice-box info';
        securityNotice.classList.remove('hidden');

        setTimeout(() => {
          proceedToPayment();
        }, 800);
        return;
      } catch (err) {
        console.log('User cancelled or failed security check:', err);
      }
    }

    // Fallback notice
    state.securityValidated = false;
    securityNoticeText.textContent = 'Segurança do dispositivo indisponível ou ignorada. Prosseguindo para o pagamento...';
    securityNotice.className = 'notice-box warning';
    securityNotice.classList.remove('hidden');

    setTimeout(() => {
      proceedToPayment();
    }, 1000);
  });

  skipSecurityBtn.addEventListener('click', () => {
    state.securityValidated = false;
    proceedToPayment();
  });

  function proceedToPayment() {
    paymentTotalAmount.textContent = formatCurrency(getCartTotalPrice());
    navigateTo('payment');
  }

  // Payment Gateway Simulation
  payApproveBtn.addEventListener('click', () => {
    // Generate Order ID
    state.orderId = 'ESF-' + Math.floor(100000 + Math.random() * 900000);
    renderConfirmationView();
    navigateTo('confirmation');
  });

  payDeclineBtn.addEventListener('click', () => {
    alert('Pagamento recusado pela operadora simulada! Seus itens e dados foram mantidos. Tente novamente ou escolha outro método.');
    // Keep cart and user data intact, return to cart
    navigateTo('cart');
  });

  // Render Confirmation & WhatsApp Link
  function renderConfirmationView() {
    orderIdDisplay.textContent = `#${state.orderId}`;
    const totalPrice = getCartTotalPrice();

    let itemsSummaryHtml = '<h4>Itens do Pedido:</h4><ul style="list-style: none; padding: 0;">';
    let textItems = '';

    state.cart.forEach(item => {
      const prod = item.product;
      const unitPrice = prod.promocao && prod.precoPromocional ? prod.precoPromocional : prod.preco;
      const itemTotal = unitPrice * item.quantity;
      itemsSummaryHtml += `<li style="margin-bottom: 4px;">&bull; ${item.quantity}x ${prod.nome} - ${formatCurrency(itemTotal)}</li>`;
      textItems += `* ${item.quantity}x ${prod.nome} (${formatCurrency(itemTotal)})\n`;
    });
    itemsSummaryHtml += '</ul>';

    let locationInfo = '';
    if (state.userData.coords) {
      locationInfo = `\nGPS: https://maps.google.com/?q=${state.userData.coords.lat},${state.userData.coords.lng}`;
    }

    itemsSummaryHtml += `
      <div style="margin-top: 12px; border-top: 1px dashed var(--color-gray-border); padding-top: 8px;">
        <p><strong>Cliente:</strong> ${state.userData.name}</p>
        <p><strong>Telefone:</strong> ${state.userData.phone}</p>
        <p><strong>Endereço:</strong> ${state.userData.address}</p>
        ${state.userData.coords ? `<p style="font-size: 0.8rem; color: var(--color-success);">GPS Anexado: (${state.userData.coords.lat.toFixed(4)}, ${state.userData.coords.lng.toFixed(4)})</p>` : ''}
        <p style="margin-top: 6px; font-size: 1rem; color: var(--color-dark);"><strong>Total Pago: ${formatCurrency(totalPrice)}</strong></p>
      </div>
    `;

    orderSummaryBox.innerHTML = itemsSummaryHtml;

    // Generate WhatsApp Message
    const targetPhone = (state.meta.whatsapp || '+5511999999999').replace(/\D/g, '');

    const message = `🍕 *NOVO PEDIDO - ESFIHA'S* 🍕\n` +
      `*Pedido ID:* #${state.orderId}\n\n` +
      `*ITENS:* \n${textItems}\n` +
      `*TOTAL:* ${formatCurrency(totalPrice)}\n\n` +
      `*DADOS DE ENTREGA:*\n` +
      `*Nome:* ${state.userData.name}\n` +
      `*Telefone:* ${state.userData.phone}\n` +
      `*Endereço:* ${state.userData.address}${locationInfo}\n\n` +
      `_Aguardando confirmação e preparo!_`;

    const encodedMsg = encodeURIComponent(message);
    whatsappLink.href = `https://wa.me/${targetPhone}?text=${encodedMsg}`;
  }

  // New Order Button
  newOrderBtn.addEventListener('click', () => {
    state.cart = [];
    localStorage.removeItem(LS_CART_KEY);
    updateCartUI();
    checkoutForm.reset();
    state.userData = { name: '', phone: '', email: '', address: '', coords: null };
    geoStatus.classList.add('hidden');
    navigateTo('menu');
  });

  // Initial Setup
  loadMenuData();
  loadCartFromStorage();
});
