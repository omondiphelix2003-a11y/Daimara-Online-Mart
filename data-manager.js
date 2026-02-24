/**
 * DataManager - Centralized data management for the e-commerce platform
 * Handles products, cart, and user data with localStorage persistence
 */

const DataManager = (() => {
  const STORAGE_KEYS = {
    PRODUCTS: 'ecommerce_products',
    CART: 'ecommerce_cart',
    USER: 'ecommerce_user',
    USERS: 'ecommerce_all_users',
    ADDED_PRODUCTS: 'ecommerce_added_products',
    ADDRESSES: 'ecommerce_addresses',
    ORDERS: 'ecommerce_orders',
    FAVORITES: 'ecommerce_favorites',
    MESSAGES: 'ecommerce_messages',
    WAREHOUSE: 'ecommerce_warehouse',
    INVOICES: 'ecommerce_invoices',
    ONLINE_USERS: 'ecommerce_online_users',
    CAMPAIGNS: 'ecommerce_campaigns'
  };

  // Initialize default products from both supermarket and second-hand categories
  const DEFAULT_PRODUCTS = {
    'Fresh food': [
      { id: 'f1', name: 'Fresh Tomatoes', price: 150, image: 'https://picsum.photos/300/200?tomatoes', subcategory: 'Fresh food', description: 'Fresh farm tomatoes' },
      { id: 'f2', name: 'Green Cabbage', price: 80, image: 'https://picsum.photos/300/200?cabbage', subcategory: 'Fresh food', description: 'Large fresh cabbage' }
    ],
    'Grocery': [
      { id: 'g1', name: 'Cooking Oil 2L', price: 650, image: 'https://picsum.photos/300/200?oil', subcategory: 'Grocery', description: 'Pure vegetable cooking oil' },
      { id: 'g2', name: 'Wheat Flour 2kg', price: 200, image: 'https://picsum.photos/300/200?flour', subcategory: 'Grocery', description: 'Premium all-purpose flour' }
    ],
    'Beverage': [
      { id: 'b1', name: 'Milk 1L', price: 100, image: 'https://picsum.photos/300/200?milk', subcategory: 'Beverage', description: 'Fresh whole milk' },
      { id: 'b2', name: 'Fruit Juice', price: 180, image: 'https://picsum.photos/300/200?juice', subcategory: 'Beverage', description: '100% natural fruit juice' }
    ],
    'Cereal': [
      { id: 'c1', name: 'Rice 5kg', price: 850, image: 'https://picsum.photos/300/200?rice', subcategory: 'Cereal', description: 'Long grain aromatic rice' },
      { id: 'c2', name: 'Maize Flour 2kg', price: 150, image: 'https://picsum.photos/300/200?maize', subcategory: 'Cereal', description: 'Grade 1 sifted maize flour' }
    ],
    'Liquor': [
      { id: 'l1', name: 'Local Beer', price: 250, image: 'https://picsum.photos/300/200?beer', subcategory: 'Liquor', description: 'Chilled local beer' }
    ],
    'Electronics': [
      { id: 'e1', name: 'Smart TV 32"', price: 15000, image: 'https://picsum.photos/300/200?tv', subcategory: 'Electronics', description: 'HD LED Smart TV' },
      { id: 'e2', name: 'Used Laptop', price: 25000, image: 'https://picsum.photos/300/200?laptop', subcategory: 'Electronics', description: 'Reliable used business laptop' },
      { id: 'e3', name: 'Smartphone', price: 12000, image: 'https://picsum.photos/300/200?phone', subcategory: 'Electronics', description: 'Slightly used Android smartphone' }
    ],
    'Furniture': [
      { id: 'fu1', name: 'Office Chair', price: 4500, image: 'https://picsum.photos/300/200?chair', subcategory: 'Furniture', description: 'Ergonomic office chair' },
      { id: 'fu2', name: 'Coffee Table', price: 3000, image: 'https://picsum.photos/300/200?table', subcategory: 'Furniture', description: 'Wooden coffee table for living room' },
      { id: 'fu3', name: 'Bookshelf', price: 5500, image: 'https://picsum.photos/300/200?bookshelf', subcategory: 'Furniture', description: 'Sturdy 4-tier bookshelf' }
    ],
    'Clothings': [
      { id: 'cl1', name: 'Cotton T-Shirt', price: 800, image: 'https://picsum.photos/300/200?tshirt', subcategory: 'Clothings', description: '100% cotton premium t-shirt' },
      { id: 'cl2', name: 'Denim Jeans', price: 1500, image: 'https://picsum.photos/300/200?jeans', subcategory: 'Clothings', description: 'Classic blue denim jeans' }
    ],
    'Household items': [
      { id: 'h1', name: 'Liquid Detergent', price: 400, image: 'https://picsum.photos/300/200?detergent', subcategory: 'Household items', description: 'Powerful cleaning detergent' },
      { id: 'h2', name: 'Electric Kettle', price: 1200, image: 'https://picsum.photos/300/200?kettle', subcategory: 'Household items', description: 'Fast boiling 1.7L kettle' },
      { id: 'h3', name: 'Iron Box', price: 1800, image: 'https://picsum.photos/300/200?iron', subcategory: 'Household items', description: 'Steam iron for easy pressing' }
    ],
    'Water': [
      { id: 'w1', name: 'Mineral Water – 20L', price: 250, image: 'https://picsum.photos/300/200?water20l', subcategory: 'Water', description: 'Purified mineral water in a 20L bottle' },
      { id: 'w2', name: 'Mineral Water – 10L', price: 150, image: 'https://picsum.photos/300/200?water10l', subcategory: 'Water', description: 'Fresh drinking water in a 10L bottle' },
      { id: 'w3', name: 'Drinking Water – 5L', price: 80, image: 'https://picsum.photos/300/200?water5l', subcategory: 'Water', description: 'Portable 5L drinking water' }
    ],
    'Gas': [
      { id: 'g6', name: 'Pro Gas – 6 KG', price: 900, image: 'progas.jfif', subcategory: 'Gas', description: 'Standard 6kg gas refill' },
      { id: 'g13', name: 'Total Gas – 13 KG', price: 1800, image: 'total.jfif', subcategory: 'Gas', description: 'Medium 13kg gas refill' },
      { id: 'g50', name: 'Lake Gas – 50 KG', price: 6500, image: 'lake gas.jpg', subcategory: 'Gas', description: 'Large 50kg industrial gas refill' }
    ]
  };

  /**
   * Initialize storage with default products
   */
  function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CART)) {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADDED_PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.ADDED_PRODUCTS, JSON.stringify([]));
    }
  }

  /**
   * Get all products organized by category
   */
  function getAllProducts() {
    initializeStorage();
    let products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || DEFAULT_PRODUCTS;
    
    // Note: addProductFromAddPage() already adds to ecommerce_products, so no merge needed here
    try { console.debug('DataManager.getAllProducts - categories:', Object.keys(products)); } catch (e) {}
    return products;
  }

  /**
   * Add a product to the system
   */
  function addProduct(product) {
    if (!product || !product.subcategory) {
      return { success: false, message: 'Invalid product data' };
    }

    const products = getAllProducts();
    const category = product.subcategory;

    if (!products[category]) {
      products[category] = [];
    }

    // Ensure product has unique ID
    if (!product.id) {
      product.id = generateId();
    }

    products[category].push(product);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

    // SYNC WITH WAREHOUSE - Ensure every added product is in warehouse
    addToWarehouse(product, product.quantity || 10);

    try { console.debug('DataManager.addProduct - added to', category, 'id=', product.id); } catch (e) {}

    return { success: true, message: 'Product added successfully' };
  }

  /**
   * Add products from add-product page to added products storage
   */
  function addProductFromAddPage(product) {
    // Ensure product has ID
    if (!product.id) {
      product.id = generateId();
    }

    try { console.debug('DataManager.addProductFromAddPage - adding id=', product.id, 'subcategory=', product.subcategory); } catch (e) {}
    return addProduct(product);
  }

  /**
   * Update a product
   */
  function updateProduct(productId, updatedData) {
    const products = getAllProducts();
    
    for (const category in products) {
      const productIndex = products[category].findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        products[category][productIndex] = {
          ...products[category][productIndex],
          ...updatedData
        };
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        
        try { console.debug('DataManager.updateProduct - updated', productId); } catch (e) {}

        // SYNC WITH WAREHOUSE
        const warehouse = JSON.parse(localStorage.getItem(STORAGE_KEYS.WAREHOUSE)) || { products: [] };
        const wIndex = warehouse.products.findIndex(p => p.id === productId);
        if (wIndex !== -1) {
          warehouse.products[wIndex] = {
            ...warehouse.products[wIndex],
            ...updatedData
          };
          localStorage.setItem(STORAGE_KEYS.WAREHOUSE, JSON.stringify(warehouse));
        }

        // Update in added products as well
        const addedProducts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDED_PRODUCTS)) || [];
        const addedIndex = addedProducts.findIndex(p => p.id === productId);
        if (addedIndex !== -1) {
          addedProducts[addedIndex] = {
            ...addedProducts[addedIndex],
            ...updatedData
          };
          localStorage.setItem(STORAGE_KEYS.ADDED_PRODUCTS, JSON.stringify(addedProducts));
        }
        
        return { success: true, message: 'Product updated successfully' };
      }
    }
    
    return { success: false, message: 'Product not found' };
  }

  /**
   * Delete a product
   */
  function deleteProduct(productId) {
    const products = getAllProducts();
    let deleted = false;

    for (const category in products) {
      const productIndex = products[category].findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        products[category].splice(productIndex, 1);
        deleted = true;
        break;
      }
    }

    if (deleted) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      
      // Remove from added products as well
      const addedProducts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDED_PRODUCTS)) || [];
      const addedIndex = addedProducts.findIndex(p => p.id === productId);
      if (addedIndex !== -1) {
        addedProducts.splice(addedIndex, 1);
        localStorage.setItem(STORAGE_KEYS.ADDED_PRODUCTS, JSON.stringify(addedProducts));
      }
      
      return { success: true, message: 'Product deleted successfully' };
    }

    return { success: false, message: 'Product not found' };
  }

  /**
   * Get cart items
   */
  function getCart() {
    initializeStorage();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || [];
  }

  /**
   * Add item to cart
   */
  function addToCart(productOrId) {
    if (!productOrId) {
      return { success: false, message: 'Invalid product' };
    }

    let product;
    if (typeof productOrId === 'string') {
      // Find product by ID
      const products = getAllProducts();
      for (const cat in products) {
        const p = products[cat].find(i => i.id === productOrId);
        if (p) {
          product = p;
          break;
        }
      }
    } else {
      product = productOrId;
    }

    if (!product || !product.id) {
      return { success: false, message: 'Product not found' };
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.qty = (existingItem.qty || 1) + 1;
    } else {
      cart.push({
        ...product,
        qty: 1
      });
    }

    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    return { success: true, message: 'Item added to cart', product };
  }

  /**
   * Remove item from cart
   */
  function removeFromCart(productId) {
    const cart = getCart();
    const index = cart.findIndex(item => item.id === productId);

    if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      return { success: true, message: 'Item removed from cart' };
    }

    return { success: false, message: 'Item not found in cart' };
  }

  /**
   * Update cart item quantity
   */
  function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
      item.qty = Math.max(0, quantity);
      if (item.qty === 0) {
        return removeFromCart(productId);
      }
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      return { success: true, message: 'Quantity updated' };
    }

    return { success: false, message: 'Item not found in cart' };
  }

  /**
   * Clear cart
   */
  function clearCart() {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    return { success: true, message: 'Cart cleared' };
  }

  /**
   * Get current user
   */
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));
  }

  /**
   * Set current user
   */
  function setCurrentUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      return { success: true };
    }
    return { success: false };
  }

  /**
   * Register a new user
   */
  function registerUser(name, email, password, profileImage) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
    
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: generateId(),
      name,
      email,
      password, // In a real app, this should be hashed
      profileImage,
      registeredDate: new Date().toISOString(), // Consistent with admin-manager.html
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    return { success: true, user: newUser };
  }

  function getAllUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
  }

  function deleteUser(userId) {
    let users = getAllUsers();
    users = users.filter(u => u.id !== userId);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return { success: true };
  }

  /**
   * Login user
   */
  function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, message: 'Invalid email or password' };
  }

  /**
   * Logout user
   */
  function logout() {
    localStorage.removeItem(STORAGE_KEYS.USER);
    return { success: true };
  }

  function logoutUser() {
    return logout();
  }

  /**
   * User Profile, Orders, Addresses, Favorites
   */
  function updateUserProfile(userId, updatedData) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedData };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      
      // If updating current user, update current user storage too
      const currentUser = getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        const { password, ...safeUser } = users[index];
        setCurrentUser(safeUser);
      }
      return { success: true, user: users[index] };
    }
    return { success: false, message: 'User not found' };
  }

  function getUserOrders(userId) {
    const allOrders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    const userOrders = allOrders.filter(o => o.userId === userId);
    if (userOrders.length === 0) return [];

    // Sort by date descending to get the current (latest) one
    userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const latestOrder = userOrders[0];
    const orderTime = new Date(latestOrder.date).getTime();
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    // Only return if it's within the last 24 hours
    if (now - orderTime < twentyFourHours) {
      return [latestOrder];
    }
    
    return [];
  }

  function getAllOrders() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
  }

  function saveOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return { success: true };
  }

  function deleteOrder(orderId) {
    let orders = getAllOrders();
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return { success: true };
  }

  function deleteInvoice(invoiceId) {
    let invoices = getInvoices();
    invoices = invoices.filter(i => i.id !== invoiceId);
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
    return { success: true };
  }

  function getUserAddresses(userId) {
    const allAddresses = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDRESSES)) || [];
    return allAddresses.filter(a => a.userId === userId);
  }

  function addAddress(userId, address) {
    const allAddresses = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDRESSES)) || [];
    const newAddress = { ...address, id: generateId(), userId };
    allAddresses.push(newAddress);
    localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(allAddresses));
    return { success: true, address: newAddress };
  }

  function deleteAddress(userId, addressId) {
    let allAddresses = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDRESSES)) || [];
    allAddresses = allAddresses.filter(a => !(a.userId === userId && a.id === addressId));
    localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(allAddresses));
    return { success: true };
  }

  function getFavorites(userId) {
    const allFavorites = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES)) || [];
    return allFavorites.filter(f => f.userId === userId);
  }

  function removeFromFavorites(userId, productId) {
    let allFavorites = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES)) || [];
    allFavorites = allFavorites.filter(f => !(f.userId === userId && f.id === productId));
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(allFavorites));
    return { success: true };
  }

  /**
   * Messaging system
   */
  function saveMessage(messageData) {
    const allMessages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES)) || [];
    const newMessage = {
      ...messageData,
      id: generateId(),
      timestamp: new Date().toISOString(),
      status: 'unread'
    };
    allMessages.push(newMessage);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(allMessages));
    return { success: true, message: newMessage };
  }

  function getAllMessages() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES)) || [];
  }

  function deleteMessage(messageId) {
    let allMessages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES)) || [];
    allMessages = allMessages.filter(m => m.id !== messageId);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(allMessages));
    return { success: true };
  }

  function markMessageAsRead(messageId) {
    const allMessages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES)) || [];
    const message = allMessages.find(m => m.id === messageId);
    if (message) {
      message.status = 'read';
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(allMessages));
      return { success: true };
    }
    return { success: false };
  }

  /**
   * Admin & Warehouse Management
   */
  function initializeWarehouse() {
    if (!localStorage.getItem(STORAGE_KEYS.WAREHOUSE)) {
      localStorage.setItem(STORAGE_KEYS.WAREHOUSE, JSON.stringify({ products: [] }));
    }
  }

  function getWarehouse() {
    initializeWarehouse();
    const warehouse = JSON.parse(localStorage.getItem(STORAGE_KEYS.WAREHOUSE)) || { products: [] };
    return warehouse.products || [];
  }

  function addToWarehouse(product, quantity) {
    initializeWarehouse();
    const warehouse = JSON.parse(localStorage.getItem(STORAGE_KEYS.WAREHOUSE)) || { products: [] };
    
    const existingProduct = warehouse.products.find(p => p.name === product.name);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      warehouse.products.push({
        ...product,
        quantity: quantity,
        id: product.id || generateId()
      });
    }
    
    localStorage.setItem(STORAGE_KEYS.WAREHOUSE, JSON.stringify(warehouse));
    return { success: true, message: 'Product added to warehouse' };
  }

  function updateWarehouseQuantity(productId, newQty) {
    const warehouse = JSON.parse(localStorage.getItem(STORAGE_KEYS.WAREHOUSE)) || { products: [] };
    const product = warehouse.products.find(p => p.id === productId);
    if (product) {
      product.quantity = newQty;
      localStorage.setItem(STORAGE_KEYS.WAREHOUSE, JSON.stringify(warehouse));
      
      // SYNC WITH STOREFRONT PRODUCTS
      const products = getAllProducts();
      for (const category in products) {
        const productIndex = products[category].findIndex(p => p.id === productId);
        if (productIndex !== -1) {
          products[category][productIndex].quantity = newQty;
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
          break;
        }
      }
      
      return { success: true };
    }
    return { success: false };
  }

  function removeFromWarehouse(productId) {
    const warehouse = JSON.parse(localStorage.getItem(STORAGE_KEYS.WAREHOUSE)) || { products: [] };
    warehouse.products = warehouse.products.filter(p => p.id !== productId);
    localStorage.setItem(STORAGE_KEYS.WAREHOUSE, JSON.stringify(warehouse));
    return { success: true };
  }

  function pushWarehouseToWebsite(warehouseProductId) {
    const warehouse = JSON.parse(localStorage.getItem(STORAGE_KEYS.WAREHOUSE)) || { products: [] };
    const wProduct = warehouse.products.find(p => p.id === warehouseProductId);
    
    if (!wProduct) return { success: false, message: 'Warehouse product not found' };

    const { quantity, ...productData } = wProduct;
    const result = addProduct(productData);
    
    if (result.success) {
      // Mark as pushed or remove? Usually just keep it in warehouse too.
      return { success: true, message: 'Product pushed to website' };
    }
    return result;
  }

  function getInvoices() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.INVOICES)) || [];
  }

  function addInvoice(invoice) {
    const invoices = getInvoices();
    const newInvoice = {
      ...invoice,
      id: invoice.id || ('INV-' + Date.now()),
      createdDate: new Date().toISOString()
    };
    invoices.push(newInvoice);
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
    return { success: true, invoice: newInvoice };
  }

  function getProfitLossAnalysis() {
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    const warehouse = getWarehouse();
    
    // Only count completed orders in revenue
    const totalRevenue = orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + (o.grandTotal || o.totalPrice || 0), 0);
      
    const warehouseValue = warehouse.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const operatingCosts = totalRevenue * 0.15; // Simulated 15% operating cost
    const profit = totalRevenue - operatingCosts;
    const margin = totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) + '%' : '0%';

    return {
      totalRevenue,
      warehouseValue,
      operatingCosts,
      profit,
      profitMargin: margin,
      ordersCount: orders.length,
      returnedOrders: orders.filter(o => o.status === 'returned').length,
      analysisDate: new Date().toISOString()
    };
  }

  function getAdminDashboardStats() {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    const messages = getAllMessages();
    const warehouse = getWarehouse();
    const analysis = getProfitLossAnalysis();

    const today = new Date().toLocaleDateString();
    const newUsersToday = users.filter(u => new Date(u.createdAt).toLocaleDateString() === today).length;
    const todaysRevenue = orders
      .filter(o => new Date(o.date).toLocaleDateString() === today)
      .reduce((sum, o) => sum + (o.grandTotal || 0), 0);

    return {
      totalUsers: users.length,
      newUsersToday,
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      totalRevenue: analysis.totalRevenue,
      todaysRevenue,
      profit: analysis.profit,
      profitMargin: analysis.profitMargin,
      warehouseProducts: warehouse.length,
      warehouseValue: analysis.warehouseValue,
      totalEmails: messages.length,
      unreadEmails: messages.filter(m => m.status === 'unread').length
    };
  }

  function getClientEmails() {
    return getAllMessages().map(m => ({
      id: m.id,
      subject: m.subject || 'Customer Message',
      userId: m.userId || 'Guest',
      email: m.email || '',
      message: m.message,
      status: m.status,
      receivedDate: m.timestamp,
      adminNotes: m.adminNotes
    }));
  }

  function markEmailAsRead(emailId) {
    return markMessageAsRead(emailId);
  }

  function addEmailResponse(emailId, response) {
    const allMessages = getAllMessages();
    const message = allMessages.find(m => m.id === emailId);
    if (message) {
      message.adminNotes = response;
      message.status = 'read';
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(allMessages));
      return { success: true };
    }
    return { success: false };
  }

  /**
   * Generate unique ID
   */
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Get added products (from add-product page)
   */
  function getAddedProducts() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDED_PRODUCTS)) || [];
  }

  /**
   * Clear all data (for testing)
   */
  function clearAllData() {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.ADDED_PRODUCTS);
    return { success: true };
  }

  /**
   * Update online status for current user
   */
  function updateOnlineStatus() {
    const user = getCurrentUser();
    const onlineUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.ONLINE_USERS)) || {};
    const sessionId = user ? user.id : 'anon_' + (sessionStorage.getItem('anon_id') || generateId());
    
    if (!user && !sessionStorage.getItem('anon_id')) {
      sessionStorage.setItem('anon_id', sessionId);
    }

    onlineUsers[sessionId] = Date.now();
    localStorage.setItem(STORAGE_KEYS.ONLINE_USERS, JSON.stringify(onlineUsers));
  }

  /**
   * Get number of online users (active in last 5 minutes)
   */
  function getOnlineUserCount() {
    const onlineUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.ONLINE_USERS)) || {};
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    let count = 0;
    for (const id in onlineUsers) {
      if (now - onlineUsers[id] < fiveMinutes) {
        count++;
      } else {
        // Clean up old entries
        delete onlineUsers[id];
      }
    }
    localStorage.setItem(STORAGE_KEYS.ONLINE_USERS, JSON.stringify(onlineUsers));
    return count;
  }

  /**
   * Campaigns Management
   */
  function getAllCampaigns() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CAMPAIGNS)) || [];
  }

  function saveCampaign(campaign) {
    const campaigns = getAllCampaigns();
    if (campaign.id) {
      const index = campaigns.findIndex(c => c.id === campaign.id);
      if (index !== -1) {
        campaigns[index] = { ...campaigns[index], ...campaign, updatedAt: new Date().toISOString() };
      } else {
        campaigns.push(campaign);
      }
    } else {
      campaign.id = 'CAMP' + Date.now();
      campaign.createdAt = new Date().toISOString();
      campaigns.push(campaign);
    }
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
    return { success: true, campaign };
  }

  function deleteCampaign(id) {
    let campaigns = getAllCampaigns();
    campaigns = campaigns.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
    return { success: true };
  }

  // Initialize on load
  initializeStorage();
  updateOnlineStatus();
  // Update status every 2 minutes while page is open
  setInterval(updateOnlineStatus, 2 * 60 * 1000);

  // Public API
  return {
    getAllProducts,
    addProduct,
    addProductFromAddPage,
    updateProduct,
    deleteProduct,
    getCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCurrentUser,
    setCurrentUser,
    registerUser,
    loginUser,
    logout,
    logoutUser,
    updateUserProfile,
    getUserOrders,
    getAllOrders,
    saveOrders,
    deleteOrder,
    getUserAddresses,
    addAddress,
    deleteAddress,
    getFavorites,
    removeFromFavorites,
    saveMessage,
    getAllMessages,
    deleteMessage,
    markMessageAsRead,
    getAddedProducts,
    getAllUsers,
    deleteUser,
    initializeWarehouse,
    getWarehouse,
    addToWarehouse,
    updateWarehouseQuantity,
    removeFromWarehouse,
    pushWarehouseToWebsite,
    getInvoices,
    addInvoice,
    deleteInvoice,
    getProfitLossAnalysis,
    getAdminDashboardStats,
    getOnlineUserCount,
    getClientEmails,
    markEmailAsRead,
    addEmailResponse,
    clearAllData,
    getAllCampaigns,
    saveCampaign,
    deleteCampaign
  };
})();
