// Variables globales
let menuItems = [
    {
        id: 1,
        name: 'Clásica MairaBurger',
        description: 'Carne de res jugosa, lechuga, tomate, cebolla, queso y nuestra salsa especial',
        price: 12000,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'hamburgers',
        ingredients: ['Carne de res', 'Lechuga', 'Tomate', 'Cebolla', 'Queso', 'Salsa especial']
    },
    {
        id: 2,
        name: 'BBQ Deluxe',
        description: 'Carne a la parrilla, bacon ahumado, cebolla caramelizada y salsa BBQ',
        price: 10500,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'hamburgers',
        ingredients: ['Carne a la parrilla', 'Bacon', 'Cebolla caramelizada', 'Salsa BBQ']
    },
    // {
    //     id: 3,
    //     name: 'Pollo Crispy',
    //     description: 'Pechuga de pollo empanizada, lechuga, tomate y mayonesa de ajo',
    //     price: 9000,
    //     image: 'https://images.pexels.com/photos/2792026/pexels-photo-2792026.jpeg?auto=compress&cs=tinysrgb&w=800',
    //     category: 'hamburgers',
    //     ingredients: ['Pollo empanizado', 'Lechuga', 'Tomate', 'Mayonesa de ajo']
    // },
    {
        id: 4,
        name: 'Veggie Burger',
        description: 'Hamburguesa de lentejas y quinoa, aguacate, tomate y salsa verde',
        price: 8000,
        image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'hamburgers',
        ingredients: ['Hamburguesa vegetal', 'Aguacate', 'Tomate', 'Salsa verde']
    },
    {
        id: 5,
        name: 'Coca-Cola',
        description: 'Refresco clásico 350ml',
        price: 2500,
        image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'drinks'
    },
    {
        id: 6,
        name: 'Jugo Natural',
        description: 'Jugo de frutas naturales',
        price: 3000,
        image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'drinks'
    },
    {
        id: 7,
        name: 'Papas Fritas',
        description: 'Papas crujientes ',
        price: 4000,
        image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'sides'
    },
    // {
    //     id: 8,
    //     name: 'Aros de Cebolla',
    //     description: 'Aros de cebolla empanizados y fritos',
    //     price: 4500,
    //     image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
    //     category: 'sides'
    // }
];

let cart = [];
let currentUser = null;
let currentCategory = 'all';
let isAuthMode = 'login'; // 'login' o 'register'
let deferredPrompt = null; // Evento para mostrar instalación PWA

// Ingredientes adicionales disponibles
const availableExtras = [
    { name: 'Bacon extra', price: 2000 },
    { name: 'Queso extra', price: 1500 },
    { name: 'Aguacate', price: 1000 },
    { name: 'Pepinillos', price: 500 },
    { name: 'Jalapeños', price: 500 },
    { name: 'Cebolla caramelizada', price: 1000 }
];

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    renderMenu();
});

function initializeApp() {
    // Mostrar splash screen por 3 segundos
    setTimeout(() => {
        const splashScreen = document.getElementById('splash-screen');
        splashScreen.classList.remove('active');
    }, 3000);

    // Configurar hora mínima para el selector de tiempo
    const deliveryTimeInput = document.getElementById('delivery-time');
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // Mínimo 30 minutos desde ahora
    deliveryTimeInput.min = now.toISOString().slice(0, 16);
}

function setupEventListeners() {
    // Header y navegación
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const installBtn = document.getElementById('install-btn');
    const installCtaBtn = document.getElementById('install-cta-btn');
    
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling para enlaces internos
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Botones de autenticación
    document.getElementById('login-btn').addEventListener('click', () => openAuthModal('login'));
    document.getElementById('register-btn').addEventListener('click', () => openAuthModal('register'));

    // Carrito
    document.getElementById('cart-btn').addEventListener('click', openCartModal);

    // Modales
    setupModalEventListeners();

    // Categorías del menú
    setupCategoryFilters();

    // Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', handleNewsletterSubscription);

    // Botón Instalar App (solo visible cuando esté disponible)
    const handleInstallClick = async (btn) => {
            try {
                if (!deferredPrompt) return;
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    showNotification('Instalación aceptada. ¡Gracias!', 'success');
                } else {
                    showNotification('Instalación cancelada.', 'info');
                }
                deferredPrompt = null;
                if (btn) btn.style.display = 'none';
            } catch (e) {
                console.log('Instalación no disponible:', e);
            }
    };

    // Botón del header
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (!deferredPrompt) {
                showNotification('Si usas iPhone, abre en Safari y pulsa “Compartir > Añadir a pantalla de inicio”.', 'info');
                return;
            }
            await handleInstallClick(installBtn);
        });
    }

    // Botón CTA en la sección principal
    if (installCtaBtn) {
        installCtaBtn.addEventListener('click', async () => {
            if (!deferredPrompt) {
                showNotification('Si usas iPhone, abre en Safari y pulsa “Compartir > Añadir a pantalla de inicio”.', 'info');
                return;
            }
            await handleInstallClick(installCtaBtn);
        });
    }
}

function setupModalEventListeners() {
    // Auth Modal
    const authModal = document.getElementById('auth-modal');
    const authCloseBtn = document.getElementById('auth-close-btn');
    const authForm = document.getElementById('auth-form');
    const authSwitchLink = document.getElementById('auth-switch-link');

    authCloseBtn.addEventListener('click', () => closeModal(authModal));
    authForm.addEventListener('submit', handleAuth);
    authSwitchLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchAuthMode();
    });

    // Cart Modal
    const cartModal = document.getElementById('cart-modal');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const checkoutBtn = document.getElementById('checkout-btn');

    cartCloseBtn.addEventListener('click', () => closeModal(cartModal));
    checkoutBtn.addEventListener('click', handleCheckout);

    // Customize Modal
    const customizeModal = document.getElementById('customize-modal');
    const customizeCloseBtn = document.getElementById('customize-close-btn');

    customizeCloseBtn.addEventListener('click', () => closeModal(customizeModal));

    // Cerrar modales al hacer clic en el fondo
    [authModal, cartModal, customizeModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
}

function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            btn.classList.add('active');
            
            currentCategory = btn.getAttribute('data-category');
            renderMenu();
        });
    });
}

function openAuthModal(mode) {
    isAuthMode = mode;
    const authModal = document.getElementById('auth-modal');
    const authModalTitle = document.getElementById('auth-modal-title');
    const authSubmit = document.getElementById('auth-submit');
    const authSwitchLink = document.getElementById('auth-switch-link');
    const authNameGroup = document.getElementById('auth-name-group');

    if (mode === 'login') {
        authModalTitle.textContent = 'Iniciar Sesión';
        authSubmit.textContent = 'Iniciar Sesión';
        authSwitchLink.textContent = 'Regístrate aquí';
        authNameGroup.style.display = 'none';
    } else {
        authModalTitle.textContent = 'Registrarse';
        authSubmit.textContent = 'Registrarse';
        authSwitchLink.textContent = 'Inicia sesión aquí';
        authNameGroup.style.display = 'block';
    }

    openModal(authModal);
}

function switchAuthMode() {
    isAuthMode = isAuthMode === 'login' ? 'register' : 'login';
    openAuthModal(isAuthMode);
}

function openCartModal() {
    const cartModal = document.getElementById('cart-modal');
    renderCartItems();
    openModal(cartModal);
}

function openCustomizeModal(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;

    const customizeModal = document.getElementById('customize-modal');
    const customizeTitle = document.getElementById('customize-title');
    const customizeContent = document.getElementById('customize-content');

    customizeTitle.textContent = `Personalizar ${item.name}`;

    let customizationHTML = `
        <img src="${item.image}" alt="${item.name}" class="customize-item-image">
        
        <div class="ingredients-section">
            <h4>Ingredientes Base</h4>
            <div id="base-ingredients">
                ${item.ingredients ? item.ingredients.map(ingredient => `
                    <div class="ingredient-option">
                        <label class="ingredient-label">
                            <input type="checkbox" class="base-ingredient" value="${ingredient}" checked>
                            ${ingredient}
                        </label>
                    </div>
                `).join('') : ''}
            </div>
        </div>

        <div class="ingredients-section">
            <h4>Ingredientes Adicionales</h4>
            <div id="extra-ingredients">
                ${availableExtras.map(extra => `
                    <div class="ingredient-option">
                        <label class="ingredient-label">
                            <input type="checkbox" class="extra-ingredient" value="${extra.name}" data-price="${extra.price}">
                            ${extra.name}
                        </label>
                        <span class="ingredient-price">+${formatPrice(extra.price)}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="ingredients-section">
            <h4>Cantidad</h4>
            <div class="quantity-selector">
                <button type="button" onclick="changeCustomizeQuantity(-1)">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-display" id="customize-quantity">1</span>
                <button type="button" onclick="changeCustomizeQuantity(1)">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>

        <div class="customize-total">
            <h4>Total: <span id="customize-total-price">${formatPrice(item.price)}</span></h4>
        </div>

        <button class="btn-primary btn-full" onclick="addCustomizedToCart(${item.id})">
            Agregar al Carrito
        </button>
    `;

    customizeContent.innerHTML = customizationHTML;

    // Event listeners para actualizar el precio
    const ingredientCheckboxes = customizeContent.querySelectorAll('input[type="checkbox"]');
    ingredientCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateCustomizePrice);
    });

    openModal(customizeModal);
}

function changeCustomizeQuantity(change) {
    const quantityDisplay = document.getElementById('customize-quantity');
    let currentQuantity = parseInt(quantityDisplay.textContent);
    currentQuantity = Math.max(1, currentQuantity + change);
    quantityDisplay.textContent = currentQuantity;
    updateCustomizePrice();
}

function updateCustomizePrice() {
    const itemId = getCurrentCustomizeItemId(); // Implementar esta función
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;

    const quantity = parseInt(document.getElementById('customize-quantity').textContent);
    const extraIngredients = document.querySelectorAll('.extra-ingredient:checked');
    
    let extraPrice = 0;
    extraIngredients.forEach(ingredient => {
        extraPrice += parseInt(ingredient.getAttribute('data-price'));
    });

    const totalPrice = (item.price + extraPrice) * quantity;
    document.getElementById('customize-total-price').textContent = formatPrice(totalPrice);
}

function addCustomizedToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;

    const quantity = parseInt(document.getElementById('customize-quantity').textContent);
    const baseIngredients = Array.from(document.querySelectorAll('.base-ingredient:checked')).map(cb => cb.value);
    const extraIngredients = Array.from(document.querySelectorAll('.extra-ingredient:checked')).map(cb => cb.value);
    
    const customizations = [...baseIngredients, ...extraIngredients];
    
    // Calcular precio total con extras
    const extras = Array.from(document.querySelectorAll('.extra-ingredient:checked'));
    let extraPrice = 0;
    extras.forEach(extra => {
        extraPrice += parseInt(extra.getAttribute('data-price'));
    });
    
    const customizedItem = {
        ...item,
        price: item.price + extraPrice,
        customizations: customizations,
        originalPrice: item.price,
        extraPrice: extraPrice
    };

    for (let i = 0; i < quantity; i++) {
        addToCart(customizedItem);
    }

    const customizeModal = document.getElementById('customize-modal');
    closeModal(customizeModal);
    
    showNotification('Producto agregado al carrito');
}

function getCurrentCustomizeItemId() {
    // Esta función debería retornar el ID del item que se está customizando
    // Por simplicidad, lo implementaremos de otra manera
    const customizeTitle = document.getElementById('customize-title').textContent;
    const itemName = customizeTitle.replace('Personalizar ', '');
    const item = menuItems.find(item => item.name === itemName);
    return item ? item.id : null;
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function renderMenu() {
    const menuGrid = document.getElementById('menu-grid');
    
    let filteredItems = menuItems;
    if (currentCategory !== 'all') {
        filteredItems = menuItems.filter(item => item.category === currentCategory);
    }

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-content">
                <h3 class="menu-item-name">${item.name}</h3>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-price">${formatPrice(item.price)}</span>
                    <div class="menu-item-actions">
                        ${item.ingredients ? `
                            <button class="btn-secondary btn-small" onclick="openCustomizeModal(${item.id})">
                                Personalizar
                            </button>
                        ` : ''}
                        <button class="btn-primary btn-small" onclick="addToCart({
                            id: ${item.id},
                            name: '${item.name}',
                            price: ${item.price},
                            image: '${item.image}',
                            description: '${item.description}'
                        })">
                            <i class="fas fa-plus"></i> Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(item) {
    // Buscar si el item ya existe en el carrito (con las mismas customizaciones si las tiene)
    let existingItem;
    if (item.customizations) {
        existingItem = cart.find(cartItem => 
            cartItem.id === item.id && 
            JSON.stringify(cartItem.customizations) === JSON.stringify(item.customizations)
        );
    } else {
        existingItem = cart.find(cartItem => 
            cartItem.id === item.id && !cartItem.customizations
        );
    }

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCartCount();
    showNotification('Producto agregado al carrito');
}

function removeFromCart(itemId, customizations = null) {
    if (customizations) {
        cart = cart.filter(item => 
            !(item.id === itemId && JSON.stringify(item.customizations) === JSON.stringify(customizations))
        );
    } else {
        cart = cart.filter(item => !(item.id === itemId && !item.customizations));
    }
    
    updateCartCount();
    renderCartItems();
}

function updateQuantity(itemId, customizations, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId, customizations);
        return;
    }

    const item = customizations 
        ? cart.find(item => item.id === itemId && JSON.stringify(item.customizations) === JSON.stringify(customizations))
        : cart.find(item => item.id === itemId && !item.customizations);
    
    if (item) {
        item.quantity = newQuantity;
        updateCartCount();
        renderCartItems();
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function renderCartItems() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--gray-500);">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        cartTotal.textContent = '0';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                ${item.customizations ? `
                    <div class="cart-item-customizations">
                        ${item.customizations.join(', ')}
                    </div>
                ` : ''}
                <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.customizations ? JSON.stringify(item.customizations) : null}, ${item.quantity - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.customizations ? JSON.stringify(item.customizations) : null}, ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="remove-btn" onclick="removeFromCart(${item.id}, ${item.customizations ? JSON.stringify(item.customizations) : null})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    const total = calculateCartTotal();
    cartTotal.textContent = formatPrice(total, false);
}

function calculateCartTotal() {
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Agregar costo de domicilio si está seleccionado
    const deliveryOption = document.querySelector('input[name="delivery"]:checked');
    if (deliveryOption && deliveryOption.value === 'delivery') {
        total += 3000;
    }
    
    return total;
}

function handleAuth(e) {
    e.preventDefault();
    
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const name = document.getElementById('auth-name').value;

    if (isAuthMode === 'register') {
        // Registro con Firebase
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // Actualizar perfil con el nombre
                    return user.updateProfile({
                        displayName: name
                    });
                })
                .then(() => {
                    currentUser = firebase.auth().currentUser;
                    updateAuthUI();
                    closeModal(document.getElementById('auth-modal'));
                    showNotification('Registro exitoso');
                })
                .catch((error) => {
                    showNotification('Error en el registro: ' + error.message, 'error');
                });
        } else {
            // Fallback sin Firebase
            currentUser = { name: name, email: email };
            updateAuthUI();
            closeModal(document.getElementById('auth-modal'));
            showNotification('Registro exitoso');
        }
    } else {
        // Inicio de sesión con Firebase
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    currentUser = userCredential.user;
                    updateAuthUI();
                    closeModal(document.getElementById('auth-modal'));
                    showNotification('Inicio de sesión exitoso');
                })
                .catch((error) => {
                    showNotification('Error en el inicio de sesión: ' + error.message, 'error');
                });
        } else {
            // Fallback sin Firebase
            currentUser = { name: name || 'Usuario', email: email };
            updateAuthUI();
            closeModal(document.getElementById('auth-modal'));
            showNotification('Inicio de sesión exitoso');
        }
    }
}

function updateAuthUI() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const navAuth = document.querySelector('.nav-auth');

    if (currentUser) {
        navAuth.innerHTML = `
            <span style="color: var(--gray-700); font-weight: 500;">
                Hola, ${currentUser.displayName || currentUser.name || 'Usuario'}
            </span>
            <button class="btn-secondary" onclick="logout()">
                <i class="fas fa-sign-out-alt"></i> Salir
            </button>
        `;
    } else {
        navAuth.innerHTML = `
            <button class="btn-secondary" id="login-btn">Iniciar Sesión</button>
            <button class="btn-primary" id="register-btn">Registrarse</button>
        `;
        
        // Re-agregar event listeners
        document.getElementById('login-btn').addEventListener('click', () => openAuthModal('login'));
        document.getElementById('register-btn').addEventListener('click', () => openAuthModal('register'));
    }
}

function logout() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signOut().then(() => {
            currentUser = null;
            updateAuthUI();
            showNotification('Sesión cerrada');
        });
    } else {
        currentUser = null;
        updateAuthUI();
        showNotification('Sesión cerrada');
    }
}

function handleCheckout(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }

    const deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
    const paymentOption = document.querySelector('input[name="payment"]:checked').value;
    const deliveryTime = document.getElementById('delivery-time').value;

    if (!deliveryTime) {
        showNotification('Por favor selecciona una hora de entrega', 'error');
        return;
    }

    // Crear objeto de pedido
    const order = {
        items: cart,
        delivery: deliveryOption,
        payment: paymentOption,
        deliveryTime: deliveryTime,
        total: calculateCartTotal(),
        user: currentUser,
        timestamp: new Date().toISOString()
    };

    // Aquí se puede integrar con Firebase Firestore para guardar el pedido
    if (typeof firebase !== 'undefined' && firebase.firestore) {
        firebase.firestore().collection('orders').add(order)
            .then((docRef) => {
                showNotification('¡Pedido realizado exitosamente!');
                cart = [];
                updateCartCount();
                closeModal(document.getElementById('cart-modal'));
            })
            .catch((error) => {
                showNotification('Error al procesar el pedido: ' + error.message, 'error');
            });
    } else {
        // Fallback sin Firebase
        console.log('Pedido:', order);
        showNotification('¡Pedido realizado exitosamente!');
        cart = [];
        updateCartCount();
        closeModal(document.getElementById('cart-modal'));
    }
}

function handleNewsletterSubscription(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Aquí se puede integrar con Firebase o un servicio de email
    console.log('Newsletter subscription:', email);
    showNotification('¡Suscripción exitosa!');
    e.target.reset();
}

function formatPrice(price, includeSymbol = true) {
    const formattedPrice = new Intl.NumberFormat('es-CO').format(price);
    return includeSymbol ? `$${formattedPrice}` : formattedPrice;
}

function showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? 'var(--primary-red)' : 'var(--primary-green, #10b981)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Agregar estilos de animación para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Monitorear autenticación de Firebase si está disponible
if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged((user) => {
        currentUser = user;
        updateAuthUI();
    });
}

// Mostrar botón de instalación cuando el navegador dispare beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('install-btn');
    const installCtaBtn = document.getElementById('install-cta-btn');
    if (installBtn) installBtn.style.display = 'inline-flex';
    if (installCtaBtn) installCtaBtn.style.display = 'inline-flex';
});

// Registro del Service Worker (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then((registration) => {
                console.log('Service Worker registrado con alcance:', registration.scope);
            })
            .catch((error) => {
                console.error('Error al registrar el Service Worker:', error);
            });
    });
}

// Notificación cuando la app se instala (PWA)
window.addEventListener('appinstalled', () => {
    try {
        showNotification('Aplicación instalada correctamente', 'success');
    } catch (e) {
        console.log('Aplicación instalada correctamente.');
    }
});
