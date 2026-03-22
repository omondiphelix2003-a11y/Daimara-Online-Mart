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
    CAMPAIGNS: 'ecommerce_campaigns',
    DELIVERY_ORDERS: 'delivery_orders',
    DELIVERY_EARNINGS: 'delivery_earnings',
    DELIVERY_DEDUCTIONS: 'ecommerce_delivery_deductions',
    PAGE_REGISTRATIONS: 'ecommerce_page_registrations',
    SYSTEM_CONFIG: 'ecommerce_system_config',
    PERMANENT_EARNINGS: 'ecommerce_permanent_earnings',
    OPERATOR_EARNINGS: 'ecommerce_operator_earnings',
    OPERATOR_REVENUE: 'ecommerce_operator_revenue',
    USER_LOYALTY: 'ecommerce_user_loyalty',
    PHARMACIST_CHAT_REQUEST: 'medicore_pharmacist_chat_request',
    PHARMACIST_CHAT_RESPONSE: 'medicore_pharmacist_chat_response',
    STORE_CATEGORIES: 'ecommerce_store_categories',
    MPESA_TRANSACTIONS: 'ecommerce_mpesa_transactions',
    VAULT_BALANCES: 'ecommerce_vault_balances',
    AGENT_REGISTRATIONS: 'ecommerce_agent_registrations',
    AGENT_FLOAT: 'ecommerce_agent_float',
    AGENT_TRANSACTIONS: 'ecommerce_agent_transactions',
    WITHDRAWAL_REQUESTS: 'ecommerce_withdrawal_requests',
    VAULT_TRANSACTIONS: 'ecommerce_vault_transactions',
    VAULT_ACCESS_LOGS: 'ecommerce_vault_access_logs'
  };

  // Default Store Categories
  const DEFAULT_CATEGORIES = [
    { id: 'cat1', name: 'Supermarket', icon: 'fa-shopping-basket', subcategories: ['Fresh food', 'Grocery', 'Beverage', 'Cereal', 'Liquor', 'Household items'] },
    { id: 'cat2', name: 'Second-hand Items', icon: 'fa-exchange-alt', subcategories: ['Clothings', 'Furniture', 'Electronics'] },
    { id: 'cat3', name: 'Refilling Services', icon: 'fa-gas-pump', subcategories: ['Gas', 'Water'] }
  ];

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
    if (!localStorage.getItem(STORAGE_KEYS.PERMANENT_EARNINGS)) {
      localStorage.setItem(STORAGE_KEYS.PERMANENT_EARNINGS, '0');
    }
    if (!localStorage.getItem(STORAGE_KEYS.OPERATOR_EARNINGS)) {
      localStorage.setItem(STORAGE_KEYS.OPERATOR_EARNINGS, JSON.stringify({}));
    }
    if (!localStorage.getItem(STORAGE_KEYS.OPERATOR_REVENUE)) {
      localStorage.setItem(STORAGE_KEYS.OPERATOR_REVENUE, JSON.stringify({}));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USER_LOYALTY)) {
      localStorage.setItem(STORAGE_KEYS.USER_LOYALTY, JSON.stringify({}));
    }
    if (!localStorage.getItem(STORAGE_KEYS.STORE_CATEGORIES)) {
      localStorage.setItem(STORAGE_KEYS.STORE_CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MPESA_TRANSACTIONS)) {
      localStorage.setItem(STORAGE_KEYS.MPESA_TRANSACTIONS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VAULT_BALANCES)) {
      localStorage.setItem(STORAGE_KEYS.VAULT_BALANCES, JSON.stringify({}));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AGENT_REGISTRATIONS)) {
      localStorage.setItem(STORAGE_KEYS.AGENT_REGISTRATIONS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AGENT_FLOAT)) {
      localStorage.setItem(STORAGE_KEYS.AGENT_FLOAT, JSON.stringify({}));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VAULT_TRANSACTIONS)) {
      localStorage.setItem(STORAGE_KEYS.VAULT_TRANSACTIONS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DELIVERY_EARNINGS)) {
      localStorage.setItem(STORAGE_KEYS.DELIVERY_EARNINGS, JSON.stringify({}));
    }
  }

  function getStoreCategories() {
    initializeStorage();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.STORE_CATEGORIES)) || DEFAULT_CATEGORIES;
  }

  function saveStoreCategories(categories) {
    localStorage.setItem(STORAGE_KEYS.STORE_CATEGORIES, JSON.stringify(categories));
    window.dispatchEvent(new Event('categoriesUpdated'));
  }

  function updateProductRating(productId, rating) {
    const products = getAllProducts();
    let found = false;
    
    for (const cat in products) {
      const idx = products[cat].findIndex(p => p.id === productId);
      if (idx !== -1) {
        products[cat][idx].rating = rating;
        found = true;
        break;
      }
    }
    
    if (found) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      
      // Sync Warehouse
      const warehouse = JSON.parse(localStorage.getItem(STORAGE_KEYS.WAREHOUSE)) || { products: [] };
      const wIdx = warehouse.products.findIndex(p => p.id === productId);
      if (wIdx !== -1) {
        warehouse.products[wIdx].rating = rating;
        localStorage.setItem(STORAGE_KEYS.WAREHOUSE, JSON.stringify(warehouse));
      }

      // Sync Added Products
      const added = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDED_PRODUCTS)) || [];
      const aIdx = added.findIndex(p => p.id === productId);
      if (aIdx !== -1) {
        added[aIdx].rating = rating;
        localStorage.setItem(STORAGE_KEYS.ADDED_PRODUCTS, JSON.stringify(added));
      }
      
      return { success: true };
    }
    return { success: false, message: 'Product not found' };
  }

  function getMpesaTransactions() {
    initializeStorage();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MPESA_TRANSACTIONS)) || [];
  }

  function addMpesaTransaction(code, date, time) {
    const txs = getMpesaTransactions();
    txs.push({ code: code.toUpperCase(), date, time, status: 'unused', createdAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.MPESA_TRANSACTIONS, JSON.stringify(txs));
    return { success: true };
  }

  function verifyMpesaTransaction(code) {
    const txs = getMpesaTransactions();
    const idx = txs.findIndex(t => t.code === code.toUpperCase() && t.status === 'unused');
    if (idx !== -1) {
      txs[idx].status = 'used';
      txs[idx].usedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.MPESA_TRANSACTIONS, JSON.stringify(txs));
      return { success: true, transaction: txs[idx] };
    }
    return { success: false, message: 'Invalid or already used transaction code' };
  }

  function getVaultBalance(userId) {
    initializeStorage();
    const allUsers = getAllUsers();
    const user = allUsers.find(u => u.id === userId);
    
    if (user) {
      const role = user.role;
      const isOperator = ['operator', 'medicore_operator', 'pharmacist', 'business', 'business_operator'].includes(role);
      
      if (role === 'admin') {
        // Admin vault IS the platform earnings
        return getPermanentEarnings();
      } else if (isOperator) {
        return getOperatorRevenue(user.email);
      } else if (role === 'delivery') {
        const earnings = getScopedData(STORAGE_KEYS.DELIVERY_EARNINGS, { total: 0 }, user.email);
        return earnings.total || 0;
      }
    }

    const balances = JSON.parse(localStorage.getItem(STORAGE_KEYS.VAULT_BALANCES)) || {};
    return balances[String(userId)] || 0;
  }

  function updateVaultBalance(userId, amount, description = 'Transaction', skipCommission = false, force = false) {
    initializeStorage();
    const allUsers = getAllUsers();
    const targetUser = allUsers.find(u => String(u.id) === String(userId));
    
    let currentBalance = 0;
    
    if (targetUser) {
      const role = targetUser.role;
      const isOperator = ['operator', 'medicore_operator', 'pharmacist', 'business', 'business_operator'].includes(role);

      if (role === 'admin') {
        currentBalance = getPermanentEarnings();
      } else if (isOperator) {
        currentBalance = getOperatorRevenue(targetUser.email);
      } else if (role === 'delivery') {
        const earnings = getScopedData(STORAGE_KEYS.DELIVERY_EARNINGS, { total: 0 }, targetUser.email);
        currentBalance = earnings.total || 0;
      } else {
        const balancesStr = localStorage.getItem(STORAGE_KEYS.VAULT_BALANCES);
        const balances = balancesStr ? JSON.parse(balancesStr) : {};
        currentBalance = balances[String(userId)] || 0;
      }
    }

    // CHECK: Prevent negative balance if debit (unless forced)
    if (!force && amount < 0 && currentBalance < Math.abs(amount)) {
        return { success: false, message: `Insufficient funds! Available: KSH ${currentBalance.toLocaleString()}` };
    }

    const newBalance = currentBalance + amount;

    if (targetUser) {
      const role = targetUser.role;
      const isOperator = ['operator', 'medicore_operator', 'pharmacist', 'business', 'business_operator'].includes(role);

      if (role === 'admin') {
        localStorage.setItem(STORAGE_KEYS.PERMANENT_EARNINGS, newBalance.toString());
      } else if (isOperator) {
        const allRev = JSON.parse(localStorage.getItem(STORAGE_KEYS.OPERATOR_REVENUE)) || {};
        allRev[targetUser.email] = newBalance;
        localStorage.setItem(STORAGE_KEYS.OPERATOR_REVENUE, JSON.stringify(allRev));
      } else if (role === 'delivery') {
        const earnings = getScopedData(STORAGE_KEYS.DELIVERY_EARNINGS, { total: 0, history: [] }, targetUser.email);
        earnings.total = newBalance;
        if (!earnings.history) earnings.history = [];
        earnings.history.unshift({
          amount: amount,
          type: amount >= 0 ? 'credit' : 'debit',
          description: description,
          timestamp: new Date().toISOString(),
          newBalance: newBalance
        });
        saveScopedData(STORAGE_KEYS.DELIVERY_EARNINGS, earnings, targetUser.email);
      } else {
        const balancesStr = localStorage.getItem(STORAGE_KEYS.VAULT_BALANCES);
        const balances = balancesStr ? JSON.parse(balancesStr) : {};
        balances[String(userId)] = newBalance;
        localStorage.setItem(STORAGE_KEYS.VAULT_BALANCES, JSON.stringify(balances));

        if (!skipCommission && amount > 0) {
          // Logic: Platform earnings link (for non-earning roles aka Clients)
          // As VaultPro amount changes, platform earnings follow
          const commission = amount * 0.10; // 10% total commission link
          
          // 50% of commission to Admin
          addPermanentEarnings(commission * 0.5);

          // 30% to Operators
          const operators = allUsers.filter(u => ['operator', 'medicore_operator', 'pharmacist', 'business', 'business_operator'].includes(u.role));
          if (operators.length > 0) {
            const opShare = (commission * 0.3) / operators.length;
            operators.forEach(op => {
              addOperatorRevenue(op.email, opShare);
            });
          }

          // 20% to Delivery
          const deliveryPersonnel = allUsers.filter(u => u.role === 'delivery');
          if (deliveryPersonnel.length > 0) {
            const delShare = (commission * 0.2) / deliveryPersonnel.length;
            deliveryPersonnel.forEach(del => {
              addDeliveryEarnings(del.id, delShare);
            });
          }
        }
      }

      // Log transaction
      const txs = JSON.parse(localStorage.getItem(STORAGE_KEYS.VAULT_TRANSACTIONS)) || [];
      txs.push({
        userId,
        amount,
        type: amount >= 0 ? 'credit' : 'debit',
        description,
        balanceAfter: newBalance,
        date: new Date().toISOString(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEYS.VAULT_TRANSACTIONS, JSON.stringify(txs));
      
      notifyUpdate();
      return { success: true, newBalance };
    }
    
    return { success: false, message: 'User not found' };
  }

  function getVaultTransactions(userId) {
    const txs = JSON.parse(localStorage.getItem(STORAGE_KEYS.VAULT_TRANSACTIONS)) || [];
    return txs.filter(t => String(t.userId) === String(userId));
  }

  function logVaultAccess(userId, idCard, pin) {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.VAULT_ACCESS_LOGS)) || [];
    // Only log if not already logged for this user
    if (!logs.some(l => String(l.userId) === String(userId))) {
      const user = getAllUsers().find(u => String(u.id) === String(userId));
      if (user) {
        logs.push({
          userId,
          name: user.name,
          email: user.email,
          phone: user.phone || 'N/A',
          idCard,
          pin,
          loggedAt: new Date().toISOString()
        });
        localStorage.setItem(STORAGE_KEYS.VAULT_ACCESS_LOGS, JSON.stringify(logs));
      }
    }
  }

  function getVaultAccessLogs() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.VAULT_ACCESS_LOGS)) || [];
  }

  /**
   * Get the ID number used by the user during their first login to VaultPro
   */
  function getRecipientVaultId(userId) {
    // 1. Check Vault Logs (The definitive source for VaultPro)
    const logs = getVaultAccessLogs();
    const log = logs.find(l => String(l.userId) === String(userId));
    if (log && (log.idCard || log.idNumber)) return log.idCard || log.idNumber;
    
    // 2. Check Agent Registrations (Often contains ID)
    const agentReg = getAgentRegistrations().find(r => String(r.userId) === String(userId));
    if (agentReg && (agentReg.idNumber || agentReg.details?.idNumber)) return agentReg.idNumber || agentReg.details?.idNumber;

    // 3. Check Page Reviews/Registrations (Business owners, operators)
    const pageReg = getPageRegistrations().find(r => {
        const u = getAllUsers().find(user => String(user.id) === String(userId));
        return u && r.email && u.email && r.email.toLowerCase() === u.email.toLowerCase();
    });
    if (pageReg && pageReg.details?.idNumber) return pageReg.details.idNumber;

    // 4. Fallback to User Profile if provided during registration
    const user = getAllUsers().find(u => String(u.id) === String(userId));
    return user ? (user.idCard || user.idNumber || user.regDetails?.idNumber) : null;
  }

  function resetVaultPin(userId, idCard, newPin) {
    const logs = getVaultAccessLogs();
    const idx = logs.findIndex(l => l.userId === userId);
    // Try to find in logs or in user details
    const user = getAllUsers().find(u => u.id === userId);
    const storedId = (idx !== -1 ? logs[idx].idCard : (user ? user.idCard : null));

    if (storedId === idCard) {
      if (idx !== -1) {
        logs[idx].pin = newPin;
        localStorage.setItem(STORAGE_KEYS.VAULT_ACCESS_LOGS, JSON.stringify(logs));
      }
      if (user) {
        updateUserProfile(userId, { vaultPin: newPin });
      }
      return { success: true };
    }
    return { success: false, message: 'ID Number does not match records' };
  }

  function resetLoginPassword(email, idNumber, newPassword) {
    const users = getAllUsers();
    const user = users.find(u => u.email === email);
    if (!user) return { success: false, message: 'User not found' };

    // Check ID from VaultPro or Agent registration
    const vaultLog = getVaultAccessLogs().find(l => l.userId === user.id);
    const agentReg = getAgentRegistrations().find(r => r.userId === user.id);
    const storedId = vaultLog ? (vaultLog.idCard || vaultLog.idNumber) : (agentReg ? (agentReg.idNumber || agentReg.details?.idNumber) : user.idCard);

    // If user is registered for Vault or Agent, ID must match
    if (vaultLog || agentReg) {
        if (storedId === idNumber && idNumber) {
            const uIdx = users.findIndex(u => u.id === user.id);
            users[uIdx].password = newPassword;
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
            return { success: true };
        }
        return { success: false, message: 'ID Number does not match records for registered VaultPro/Agent account' };
    }

    // Normal user reset (no Vault/Agent registration found)
    const uIdx = users.findIndex(u => u.id === user.id);
    users[uIdx].password = newPassword;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return { success: true };
  }

  function registerAgent(details) {
    const regs = JSON.parse(localStorage.getItem(STORAGE_KEYS.AGENT_REGISTRATIONS)) || [];
    const id = 'AREG-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    regs.push({ id, ...details, status: 'pending', createdAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.AGENT_REGISTRATIONS, JSON.stringify(regs));
    return { success: true, id };
  }

  function getAgentRegistrations() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.AGENT_REGISTRATIONS)) || [];
  }

  function approveAgent(registrationId, agentNumber) {
    const regs = getAgentRegistrations();
    const idx = regs.findIndex(r => r.id === registrationId);
    if (idx !== -1) {
      regs[idx].status = 'approved';
      regs[idx].agentNumber = agentNumber;
      localStorage.setItem(STORAGE_KEYS.AGENT_REGISTRATIONS, JSON.stringify(regs));
      
      // Initialize agent float
      const floats = JSON.parse(localStorage.getItem(STORAGE_KEYS.AGENT_FLOAT)) || {};
      floats[agentNumber] = 0;
      localStorage.setItem(STORAGE_KEYS.AGENT_FLOAT, JSON.stringify(floats));
      
      return { success: true };
    }
    return { success: false, message: 'Registration not found' };
  }

  function getAgentByNumber(agentNumber) {
    const regs = getAgentRegistrations();
    return regs.find(r => r.agentNumber === agentNumber && r.status === 'approved');
  }

  function getAgentByUserId(userId) {
    const regs = getAgentRegistrations();
    return regs.find(r => r.userId === userId && r.status === 'approved');
  }

  function getAgentFloat(agentNumber) {
    const floats = JSON.parse(localStorage.getItem(STORAGE_KEYS.AGENT_FLOAT)) || {};
    return floats[agentNumber] || 0;
  }

  function deleteAgentRegistration(registrationId) {
    const regs = getAgentRegistrations();
    const updatedRegs = regs.filter(r => r.id !== registrationId);
    localStorage.setItem(STORAGE_KEYS.AGENT_REGISTRATIONS, JSON.stringify(updatedRegs));
    return { success: true };
  }

  function resetAgentPin(agentNumber, idNumber, newPin) {
    const regs = JSON.parse(localStorage.getItem(STORAGE_KEYS.AGENT_REGISTRATIONS)) || [];
    const idx = regs.findIndex(r => r.agentNumber === agentNumber && r.status === 'approved');
    
    if (idx !== -1) {
      const agent = regs[idx];
      // Check ID from registration details
      if (agent.idNumber === idNumber || agent.details?.idNumber === idNumber) {
        if (!agent.details) agent.details = {};
        agent.pin = newPin; // Update root pin
        agent.details.pin = newPin; // Update details pin for compatibility
        
        localStorage.setItem(STORAGE_KEYS.AGENT_REGISTRATIONS, JSON.stringify(regs));
        return { success: true };
      }
    }
    return { success: false, message: 'ID Number does not match agent records' };
  }

  function addWithdrawalRequest(request) {
    const reqs = JSON.parse(localStorage.getItem(STORAGE_KEYS.WITHDRAWAL_REQUESTS)) || [];
    const id = 'WR' + Date.now();
    const newReq = { 
      id, 
      ...request, 
      status: 'pending', 
      timestamp: new Date().toISOString() 
    };
    reqs.push(newReq);
    localStorage.setItem(STORAGE_KEYS.WITHDRAWAL_REQUESTS, JSON.stringify(reqs));
    return { success: true, id };
  }

  function getWithdrawalRequests(agentNumber = null, clientId = null) {
    const reqs = JSON.parse(localStorage.getItem(STORAGE_KEYS.WITHDRAWAL_REQUESTS)) || [];
    if (agentNumber) return reqs.filter(r => r.agentNumber === agentNumber);
    if (clientId) return reqs.filter(r => r.clientId === clientId);
    return reqs;
  }

  function updateWithdrawalStatus(requestId, status) {
    const reqs = JSON.parse(localStorage.getItem(STORAGE_KEYS.WITHDRAWAL_REQUESTS)) || [];
    const idx = reqs.findIndex(r => r.id === requestId);
    if (idx === -1) return { success: false, message: 'Request not found' };

    const req = reqs[idx];
    if (req.status !== 'pending') return { success: false, message: 'Request already processed' };

    req.status = status;
    localStorage.setItem(STORAGE_KEYS.WITHDRAWAL_REQUESTS, JSON.stringify(reqs));

    if (status === 'accepted') {
      // Logic for acceptance: 
      // 1. Client VaultPro decreases per user requirement
      // force = true to allow the acceptance even if client has low balance
      const res = updateVaultBalance(req.clientId, -req.amount, `Withdrawal Accepted by Agent ${req.agentNumber}`, false, true);
      if (!res.success) {
        req.status = 'pending'; // Reset status if deduction fails
        localStorage.setItem(STORAGE_KEYS.WITHDRAWAL_REQUESTS, JSON.stringify(reqs));
        return res;
      }
      
      // 2. Agent Float increases per user requirement
      updateAgentFloat(req.agentNumber, req.amount, `Withdrawal Accepted from ${req.clientPhone}`);

      return { success: true };
    } else if (status === 'declined') {
      // No refund needed as we no longer deduct at request time
      return { success: true };
    }
    
    return { success: true };
  }

  function updateAgentFloat(agentNumber, amount, description = 'Transaction') {
    const floats = JSON.parse(localStorage.getItem(STORAGE_KEYS.AGENT_FLOAT)) || {};
    const oldBalance = floats[agentNumber] || 0;
    
    // CHECK: Block if insufficient float for debit
    if (amount < 0 && oldBalance < Math.abs(amount)) {
        return { success: false, message: `Insufficient float! Available: KSH ${oldBalance.toLocaleString()}` };
    }

    const next = oldBalance + amount;
    floats[agentNumber] = next;
    localStorage.setItem(STORAGE_KEYS.AGENT_FLOAT, JSON.stringify(floats));

    // Log transaction
    const allTransactions = JSON.parse(localStorage.getItem(STORAGE_KEYS.AGENT_TRANSACTIONS)) || {};
    if (!allTransactions[agentNumber]) allTransactions[agentNumber] = [];
    
    allTransactions[agentNumber].unshift({
      id: 'AT' + Date.now(),
      amount: amount,
      balance: floats[agentNumber],
      description: description,
      date: new Date().toISOString(),
      timestamp: new Date().toISOString()
    });

    // Keep only last 100 transactions
    if (allTransactions[agentNumber].length > 100) {
      allTransactions[agentNumber] = allTransactions[agentNumber].slice(0, 100);
    }

    localStorage.setItem(STORAGE_KEYS.AGENT_TRANSACTIONS, JSON.stringify(allTransactions));
    
    notifyUpdate();
    return { success: true, newFloat: floats[agentNumber] };
  }

  function getAgentFloat(agentNumber) {
    const floats = JSON.parse(localStorage.getItem(STORAGE_KEYS.AGENT_FLOAT)) || {};
    return floats[agentNumber] || 0;
  }

  function getAgentTransactions(agentNumber) {
    const allTransactions = JSON.parse(localStorage.getItem(STORAGE_KEYS.AGENT_TRANSACTIONS)) || {};
    return allTransactions[agentNumber] || [];
  }

  function transferFunds(fromUserId, toUserId, amount, description) {
    try {
      const fromUser = getAllUsers().find(u => String(u.id) === String(fromUserId));
      const toUser = getAllUsers().find(u => String(u.id) === String(toUserId));
      
      if (!fromUser) return { success: false, message: 'Sender not found' };
      if (!toUser) return { success: false, message: 'Recipient not found' };

      const balance = getVaultBalance(fromUserId);
      if (balance < amount) return { success: false, message: 'Insufficient funds' };
      
      // 1. Deduct from sender
      const resFrom = updateVaultBalance(fromUserId, -amount, `Sent to ${toUser.name}: ${description}`, true);
      if (!resFrom.success) return resFrom;

      // 2. Credit to recipient
      const resTo = updateVaultBalance(toUserId, amount, `Received from ${fromUser.name}: ${description}`, true);
      if (!resTo.success) {
        // Rollback sender if recipient credit fails
        updateVaultBalance(fromUserId, amount, `Rollback: Transfer to ${toUser.name} failed`, true, true);
        return resTo;
      }

      notifyUpdate();
      return { success: true };
    } catch (error) {
      console.error('Transfer funds error:', error);
      return { success: false, message: 'System error during transfer: ' + error.message };
    }
  }

  function getUserLoyaltyPoints(userId) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_LOYALTY)) || {};
    return all[userId] || 0;
  }

  function addUserLoyaltyPoints(userId, points) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_LOYALTY)) || {};
    all[userId] = (all[userId] || 0) + points;
    localStorage.setItem(STORAGE_KEYS.USER_LOYALTY, JSON.stringify(all));
  }

  function getPermanentEarnings() {
    return parseFloat(localStorage.getItem(STORAGE_KEYS.PERMANENT_EARNINGS)) || 0;
  }

  function addPermanentEarnings(amount) {
    const admin = getAllUsers().find(u => u.email === "omondiphelix2003@gmail.com");
    if (admin) {
      updateVaultBalance(admin.id, amount, 'Platform Earnings: System Commission', true);
    } else {
      const current = getPermanentEarnings();
      localStorage.setItem(STORAGE_KEYS.PERMANENT_EARNINGS, (current + amount).toString());
    }
  }

  function getOperatorEarnings(email) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.OPERATOR_EARNINGS)) || {};
    return all[email] || 0;
  }

  function addOperatorEarnings(email, amount) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.OPERATOR_EARNINGS)) || {};
    all[email] = (all[email] || 0) + amount;
    localStorage.setItem(STORAGE_KEYS.OPERATOR_EARNINGS, JSON.stringify(all));
  }

  function getOperatorRevenue(email) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.OPERATOR_REVENUE)) || {};
    return all[email] || 0;
  }

  function addOperatorRevenue(email, amount) {
    // This now just uses updateVaultBalance to keep things in sync
    const user = getAllUsers().find(u => u.email === email);
    if (user) {
      updateVaultBalance(user.id, amount, 'Platform Revenue: Order commission', true);
    } else {
      // Fallback if user not found (unlikely)
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.OPERATOR_REVENUE)) || {};
      all[email] = (all[email] || 0) + amount;
      localStorage.setItem(STORAGE_KEYS.OPERATOR_REVENUE, JSON.stringify(all));
    }
  }

  function addDeliveryEarnings(userId, amount) {
    const user = getAllUsers().find(u => u.id === userId);
    if (user) {
      updateVaultBalance(user.id, amount, 'Platform Earnings: System Commission', true);
    } else {
      // Fallback: This is rare as userId is provided
      const allEarnings = JSON.parse(localStorage.getItem(STORAGE_KEYS.DELIVERY_EARNINGS)) || {};
      allEarnings[userId] = (allEarnings[userId] || 0) + amount;
      localStorage.setItem(STORAGE_KEYS.DELIVERY_EARNINGS, JSON.stringify(allEarnings));
    }
  }

  /**
   * Get all products organized by category
   */
  function getAllProducts() {
    initializeStorage();
    let products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS)) || DEFAULT_PRODUCTS;
    
    const user = getCurrentUser();
    // Isolation logic: Operators only see their own products
    // Primary Admin (omondiphelix2003@gmail.com) sees EVERYTHING
    /*if (user && user.role === 'operator' && user.email !== "omondiphelix2003@gmail.com") {
      const filtered = {};
      for (const cat in products) {
        filtered[cat] = products[cat].filter(p => p.owner === user.email);
      }
      return filtered;
    }*/

    try { console.debug('DataManager.getAllProducts - categories:', Object.keys(products)); } catch (e) {}
    return products;
  }

  /**
   * Add a product to the system
   */
  function addProduct(product) {
    // Operators and MediCore Pharmacy operators can add any number of items/products in their warehouse
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
   * Get a single product by ID
   */
  function getProduct(productId) {
    const products = getAllProducts();
    for (const category in products) {
      const product = products[category].find(p => p.id === productId);
      if (product) return product;
    }
    
    // Check warehouse too
    const warehouse = getWarehouse();
    const wProduct = warehouse.find(p => p.id === productId);
    if (wProduct) return wProduct;

    // Check added products
    const added = getAddedProducts();
    const aProduct = added.find(p => p.id === productId);
    if (aProduct) return aProduct;

    return null;
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
    let deletedAnywhere = false;

    // 1. Remove from STOREFRONT PRODUCTS (website)
    const products = getAllProducts();
    for (const category in products) {
      const productIndex = products[category].findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        products[category].splice(productIndex, 1);
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        deletedAnywhere = true;
        break;
      }
    }

    // 2. Remove from MAIN WAREHOUSE
    const warehouse = JSON.parse(localStorage.getItem(STORAGE_KEYS.WAREHOUSE)) || { products: [] };
    const originalLength = warehouse.products.length;
    warehouse.products = warehouse.products.filter(p => p.id !== productId);
    if (warehouse.products.length !== originalLength) {
      localStorage.setItem(STORAGE_KEYS.WAREHOUSE, JSON.stringify(warehouse));
      deletedAnywhere = true;
    }

    // 3. Remove from ADDED PRODUCTS (global list)
    const addedProducts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADDED_PRODUCTS)) || [];
    const originalAddedLength = addedProducts.length;
    const filteredAdded = addedProducts.filter(p => p.id !== productId);
    if (filteredAdded.length !== originalAddedLength) {
      localStorage.setItem(STORAGE_KEYS.ADDED_PRODUCTS, JSON.stringify(filteredAdded));
      deletedAnywhere = true;
    }

    // 4. Remove from PRIVATE WAREHOUSES (scoped storage)
    // We iterate through all localStorage keys to find scoped warehouses
    const warehousePrefix = STORAGE_KEYS.WAREHOUSE + "_";
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(warehousePrefix)) {
        try {
          let scopedData = JSON.parse(localStorage.getItem(key));
          if (Array.isArray(scopedData)) {
            const originalScopedLength = scopedData.length;
            scopedData = scopedData.filter(p => p.id !== productId);
            if (scopedData.length !== originalScopedLength) {
              localStorage.setItem(key, JSON.stringify(scopedData));
              deletedAnywhere = true;
            }
          }
        } catch (e) {
          console.error("Error cleaning scoped warehouse for key: " + key, e);
        }
      }
    }

    if (deletedAnywhere) {
      return { success: true, message: 'Product deleted successfully from all locations' };
    }

    return { success: false, message: 'Product not found in any storage' };
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
    
    // Dispatch event for current window
    window.dispatchEvent(new Event('cartUpdated'));
    
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
    window.dispatchEvent(new Event('cartUpdated'));
    notifyUpdate();
    return { success: true, message: 'Cart cleared' };
  }

  /**
   * Get current user
   */
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));
  }

  /**
   * Get a user-specific storage key to ensure isolation
   * @param {string} baseKey - The global storage key
   * @param {string} overrideEmail - Optional email to override current user (for admin view)
   * @returns {string} - The scoped key (e.g., globalKey_userEmail)
   */
  function getUserScope(baseKey, overrideEmail = null) {
    const user = getCurrentUser();
    const email = overrideEmail || (user ? user.email : null);
    if (!email) return baseKey;
    // We use the email or ID to scope the data
    return `${baseKey}_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
  }

  /**
   * Get scoped data from localStorage
   */
  function getScopedData(baseKey, defaultValue = [], overrideEmail = null) {
    const scopedKey = getUserScope(baseKey, overrideEmail);
    const data = JSON.parse(localStorage.getItem(scopedKey)) || defaultValue;
    
    // Deduplicate if it's an array of objects with IDs (like orders)
    if (Array.isArray(data) && data.length > 0 && data[0] && typeof data[0] === 'object' && data[0].id) {
      const seen = new Set();
      return data.filter(item => {
        if (!item.id || seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      });
    }
    
    return data;
  }

  /**
   * Save scoped data to localStorage
   */
  function saveScopedData(baseKey, data, overrideEmail = null) {
    try {
      const scopedKey = getUserScope(baseKey, overrideEmail);
      localStorage.setItem(scopedKey, JSON.stringify(data));
      notifyUpdate();
      return { success: true };
    } catch (e) {
      console.error("Failed to save scoped data to localStorage:", e);
      return { success: false, message: e.message };
    }
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
  function registerUser(name, email, password, profileImage, role = 'user', regDetails = null) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
    
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    // Generate a unique system-provided phone number (Kenyan format)
    let systemPhone;
    if (email === "omondiphelix2003@gmail.com") {
      systemPhone = '0742120329';
    } else {
      let isUnique = false;
      while (!isUnique) {
        const randomDigits = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
        systemPhone = '07' + randomDigits;
        if (!users.find(u => u.phone === systemPhone)) {
          isUnique = true;
        }
      }
    }

    const newUser = {
      id: generateId(),
      name,
      email,
      password, // In a real app, this should be hashed
      profileImage,
      role, // 'user', 'operator', 'delivery'
      phone: systemPhone, // System-provided phone number, cannot be altered
      regDetails,
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

  /**
   * Page Registration Requests
   */
  function addPageRegistration(regData) {
    const regs = JSON.parse(localStorage.getItem(STORAGE_KEYS.PAGE_REGISTRATIONS)) || [];
    
    const newReg = {
      id: generateId(),
      ...regData,
      status: 'pending',
      date: new Date().toISOString()
    };
    regs.push(newReg);
    try {
      localStorage.setItem(STORAGE_KEYS.PAGE_REGISTRATIONS, JSON.stringify(regs));
      return { success: true, registration: newReg };
    } catch (e) {
      console.error('DataManager.addPageRegistration error:', e);
      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        // Fallback: try again without large base64 image fields if storage is full
        const regDataCopy = { ...regData };
        if (regDataCopy.details) {
          regDataCopy.details = { ...regDataCopy.details };
          delete regDataCopy.details.idPhotos;
          delete regDataCopy.details.vehiclePhotos;
          delete regDataCopy.details.profileImage;
        }
        const minimalReg = {
          id: generateId(),
          ...regDataCopy,
          status: 'pending',
          date: new Date().toISOString(),
          warning: 'Images removed due to storage constraints'
        };
        try {
          regs[regs.length - 2] = minimalReg;
          localStorage.setItem(STORAGE_KEYS.PAGE_REGISTRATIONS, JSON.stringify(regs));
          return { success: true, registration: minimalReg, warning: 'Registration saved with minimal data due to storage constraints.' };
        } catch (e3) {
          return { success: false, message: 'Storage quota exceeded. Unable to save registration.' };
        }
      }
      return { success: false, message: 'Registration failed to save: ' + e.message };
    }
  }

  function getPageRegistrations() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PAGE_REGISTRATIONS)) || [];
  }

  function updatePageRegistrationStatus(regId, status) {
    const regs = getPageRegistrations();
    const index = regs.findIndex(r => r.id === regId);
    if (index !== -1) {
      regs[index].status = status;
      localStorage.setItem(STORAGE_KEYS.PAGE_REGISTRATIONS, JSON.stringify(regs));
      return { success: true };
    }
    return { success: false };
  }

  function deletePageRegistration(regId) {
    const regs = getPageRegistrations();
    const filtered = regs.filter(r => r.id !== regId);
    localStorage.setItem(STORAGE_KEYS.PAGE_REGISTRATIONS, JSON.stringify(filtered));
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
      // SECURITY: Protect the system-provided phone number from being altered
      const { phone, ...safeUpdate } = updatedData;
      
      users[index] = { ...users[index], ...safeUpdate };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      notifyUpdate();
      
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

  /**
   * Delete a user account from the system.
   * This frees up their system-provided phone number for reuse by new registrants.
   */
  function deleteUser(userId) {
    let users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
    const userToDelete = users.find(u => u.id === userId);
    if (!userToDelete) return { success: false, message: 'User not found' };

    users = users.filter(u => u.id !== userId);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    // Also clear from online users and current user if applicable
    let online = JSON.parse(localStorage.getItem(STORAGE_KEYS.ONLINE_USERS)) || [];
    online = online.filter(u => u.id !== userId);
    localStorage.setItem(STORAGE_KEYS.ONLINE_USERS, JSON.stringify(online));

    const current = getCurrentUser();
    if (current && current.id === userId) {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }

    notifyUpdate();
    return { success: true };
  }

  /**
   * Update a specific user's role by their email address.
   * Used by admin workflows when approving page registrations.
   * @param {string} email - target user's email
   * @param {string} newRole - one of 'user','operator','delivery','admin' etc.
   * @returns {{success:boolean,message?:string,user?:object}}
   */
  function updateUserRoleByEmail(email, newRole) {
    if (!email) return { success: false, message: 'Email required' };
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
    const idx = users.findIndex(u => u.email === email);
    if (idx === -1) return { success: false, message: 'User not found' };
    users[idx].role = newRole;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    notifyUpdate();

    // also update current user if it matches
    const current = getCurrentUser();
    if (current && current.email === email) {
      const { password, ...safe } = users[idx];
      setCurrentUser(safe);
    }

    return { success: true, user: users[idx] };
  }

  function getUserOrders(userId) {
    const user = getCurrentUser();
    let userOrders = [];
    
    // Always fetch from global orders to ensure source of truth
    const allOrders = getAllOrders();
    userOrders = allOrders.filter(o => o.userId === userId);
    
    // Also check scoped data as fallback/legacy
    if (user && user.id === userId) {
      const scopedOrders = getScopedData('ecommerce_orders', []);
      if (scopedOrders.length > 0) {
        // Merge and deduplicate
        const merged = [...userOrders, ...scopedOrders];
        const seen = new Set();
        userOrders = merged.filter(o => {
          if (!o.id || seen.has(o.id)) return false;
          seen.add(o.id);
          return true;
        });
      }
      
      // Sync back to scoped if needed
      if (userOrders.length > 0) {
        saveScopedData('ecommerce_orders', userOrders);
      }
    }
    
    if (userOrders.length === 0) return [];

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    // Identify orders that SHOULD be deleted permanently (24 hours after COMPLETION)
    const ordersToDelete = userOrders.filter(o => {
      const isCompleted = o.status === 'completed' || o.status === 'Delivered';
      if (!isCompleted) return false;
      const refTime = o.completionDate || o.date;
      const orderTime = new Date(refTime).getTime();
      return (now - orderTime) >= oneDay;
    });

    if (ordersToDelete.length > 0) {
      const globalOrders = getAllOrders();
      const idsToDelete = ordersToDelete.map(o => o.id);
      const updatedGlobalOrders = globalOrders.filter(o => !idsToDelete.includes(o.id));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedGlobalOrders));
      
      // Also update scoped data for the user
      if (user && user.id === userId) {
        const updatedUserOrders = userOrders.filter(o => !idsToDelete.includes(o.id));
        saveScopedData('ecommerce_orders', updatedUserOrders);
        userOrders = updatedUserOrders;
      }
    }

    // Filter orders based on user requirements
    const filteredOrders = userOrders.filter(o => {
      if (!o.id) return false;

      const isCompleted = o.status === 'completed' || o.status === 'Delivered';
      if (!isCompleted) return true;

      const refTime = o.completionDate || o.date;
      const orderTime = new Date(refTime).getTime();
      return (now - orderTime) < oneDay;
    });

    // Sort by date descending
    filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return filteredOrders;
  }

  function getAllOrders() {
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    // Deduplicate existing orders by ID
    const seen = new Set();
    return orders.filter(o => {
        if (!o.id || seen.has(o.id)) return false;
        seen.add(o.id);
        return true;
    });
  }

  function saveOrders(orders) {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      notifyUpdate();
      return { success: true };
    } catch (e) {
      console.error("Failed to save orders to localStorage:", e);
      return { success: false, message: e.message };
    }
  }

  /**
   * Process a new order: save globally and scope it to relevant operators
   */
  function processNewOrder(order) {
    try {
      // Ensure the order has a unique ID for QR code generation and tracking
      if (!order.id) {
          order.id = '#DM' + Math.floor(1000 + Math.random() * 9000);
      }
      
      // Ensure status is pending by default
      if (!order.status) order.status = 'pending';
      
      // CALCULATE COMMISSIONS
      const config = getSystemConfig();
      const commissionFactor = (config.commissionPercentage || 10) / 100;
      
      const items = order.items || order.products || [];
      items.forEach(item => {
        const price = item.price || 0;
        const qty = item.qty || item.quantity || 1;
        item.commission = (price * qty) * commissionFactor;
      });
      order.totalCommission = items.reduce((sum, i) => sum + (i.commission || 0), 0);

      // 1. Save Globally for Admin
      const allOrders = getAllOrders();
      const existingOrderIndex = allOrders.findIndex(o => o.id === order.id);
      
      if (existingOrderIndex !== -1) {
        // Update existing order
        allOrders[existingOrderIndex] = { ...allOrders[existingOrderIndex], ...order };
      } else {
        // New order
        allOrders.push(order);
      }
      
      const globalSave = saveOrders(allOrders);
      if (!globalSave.success) {
          console.warn("Global order save failed, but continuing with other steps");
      }

      // 3. Update Inventory (Deduct items from warehouse)
      try {
          const warehouse = JSON.parse(localStorage.getItem(STORAGE_KEYS.WAREHOUSE)) || { products: [] };
          items.forEach(item => {
            const itemId = item.id;
            const wItem = warehouse.products.find(p => p.id === itemId || p.name === item.name);
            if (wItem) {
              const qtyToDeduct = item.qty || item.quantity || 1;
              wItem.quantity = Math.max(0, (wItem.quantity || 0) - qtyToDeduct);
            }
          });
          localStorage.setItem(STORAGE_KEYS.WAREHOUSE, JSON.stringify(warehouse));
      } catch (e) {
          console.error("Inventory update failed:", e);
      }

      // 2. Scope to Operators based on items
      const operators = [...new Set(items.map(item => item.owner).filter(Boolean))];

      operators.forEach(opEmail => {
        // Find the user object to get the scope key correctly
        const users = getAllUsers();
        const opUser = users.find(u => u.email === opEmail);
        if (opUser) {
          const scopedItems = items.filter(i => i.owner === opEmail);
          const scopedTotal = scopedItems.reduce((sum, i) => sum + (i.price * (i.qty || i.quantity || 1)), 0);
          
          const { deliveryFee, ...orderWithoutDelivery } = order;
          const scopedOrder = {
            ...orderWithoutDelivery,
            items: scopedItems,
            totalPrice: scopedTotal,
            grandTotal: scopedTotal,
            totalCommission: scopedItems.reduce((sum, i) => sum + (i.commission || 0), 0)
          };

          const originalUser = localStorage.getItem(STORAGE_KEYS.USER);
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(opUser));
          
          const scopedOrders = getScopedData('ecommerce_orders');
          if (!scopedOrders.find(o => o.id === scopedOrder.id)) {
            scopedOrders.push(scopedOrder);
            saveScopedData('ecommerce_orders', scopedOrders);
          }

          if (originalUser) {
            localStorage.setItem(STORAGE_KEYS.USER, originalUser);
          } else {
            localStorage.removeItem(STORAGE_KEYS.USER);
          }
        }
      });
      
      // 4. Create Invoice for the order
      try {
          addInvoice({
            orderId: order.id,
            customerName: order.customerName || (order.customer && order.customer.name) || 'Guest',
            customerEmail: order.customerEmail || (order.customer && order.customer.email) || '',
            amount: order.grandTotal || order.totalPrice || 0,
            total: order.grandTotal || order.totalPrice || 0,
            items: items
          });
      } catch (e) {
          console.error("Invoice creation failed:", e);
      }

      // SYNC WITH MEDICORE ADMIN DATA
      try {
          let medicoreData = JSON.parse(localStorage.getItem('medicoreAdminData'));
          const medicoreItems = items.filter(item => item.subcategory === 'Pharmacy' || item.shelfName);
          
          if (medicoreItems.length > 0) {
            if (!medicoreData) {
              medicoreData = {
                shelves: [],
                drugs: [],
                partners: [],
                slideshow: [],
                pharmacists: [],
                orders: [],
                conversations: [],
                branding: { logo: 'fa-mortar-pestle', color: 'blue', name: 'MediCore Pharmacy' }
              };
            }
            
            if (!medicoreData.orders) medicoreData.orders = [];
            const medicoreTotal = medicoreItems.reduce((sum, i) => sum + (i.price * (i.qty || i.quantity || 1)), 0);
            
            // Check if order already exists in medicoreData
            if (!medicoreData.orders.some(o => o.id === order.id)) {
              const medicoreOrder = {
                id: order.id,
                customer: order.customerName || (order.customer && order.customer.name) || 'Customer',
                email: order.customerEmail || (order.customer && order.customer.email) || '',
                phone: order.customerPhone || (order.customer && order.customer.phone) || '',
                items: medicoreItems.map(i => ({ name: i.name, qty: i.qty || i.quantity || 1, price: i.price })),
                total: medicoreTotal,
                status: order.status || 'pending',
                date: order.date || new Date().toLocaleString()
              };
              medicoreData.orders.unshift(medicoreOrder);
              localStorage.setItem('medicoreAdminData', JSON.stringify(medicoreData));
            }
          }
      } catch (e) {
          console.error("Medicore sync failed:", e);
      }

      // 5. Save to Scoped Orders for the Customer
      const customerEmail = order.customerEmail || (order.customer && order.customer.email);
      const customerUserId = order.userId;
      
      if (customerUserId || customerEmail) {
        const users = getAllUsers();
        const customerUser = customerUserId ? 
          users.find(u => u.id === customerUserId) : 
          users.find(u => u.email === customerEmail);
          
        if (customerUser) {
          const originalUser = localStorage.getItem(STORAGE_KEYS.USER);
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(customerUser));
          
          const customerOrders = getScopedData('ecommerce_orders');
          const existingIdx = customerOrders.findIndex(o => o.id === order.id);
          
          if (existingIdx !== -1) {
            customerOrders[existingIdx] = { ...customerOrders[existingIdx], ...order };
          } else {
            customerOrders.unshift(order);
          }
          
          saveScopedData('ecommerce_orders', customerOrders);

          if (originalUser) {
            localStorage.setItem(STORAGE_KEYS.USER, originalUser);
          } else {
            localStorage.removeItem(STORAGE_KEYS.USER);
          }
        }
      }

      // Clear cart after successful order processing
      clearCart();

      return { success: true, orderId: order.id };
    } catch (err) {
      console.error("CRITICAL ERROR IN processNewOrder:", err);
      return { success: false, message: err.message };
    }
  }

  function deleteOrder(orderId) {
    let orders = getAllOrders();
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return { success: true };
  }

  /**
   * Mark an order as opened by an operator
   */
  function markOrderAsOpened(orderId, operatorEmail) {
    const allOrders = getAllOrders();
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found' };

    // Only mark if not already opened by someone else
    if (!order.openedBy) {
      order.openedBy = operatorEmail;
      saveOrders(allOrders);
      
      // Propagate to all scoped copies
      const items = order.items || order.products || [];
      const owners = [...new Set(items.map(item => item.owner).filter(Boolean))];
      const users = getAllUsers();
      
      owners.forEach(opEmail => {
        const opUser = users.find(u => u.email === opEmail);
        if (opUser) {
          const originalUser = localStorage.getItem(STORAGE_KEYS.USER);
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(opUser));
          
          const scopedOrders = getScopedData('ecommerce_orders');
          const scopedOrder = scopedOrders.find(o => o.id === orderId);
          if (scopedOrder) {
            scopedOrder.openedBy = operatorEmail;
            saveScopedData('ecommerce_orders', scopedOrders);
          }

          if (originalUser) localStorage.setItem(STORAGE_KEYS.USER, originalUser);
          else localStorage.removeItem(STORAGE_KEYS.USER);
        }
      });

      return { success: true, openedBy: operatorEmail };
    }
    
    return { success: true, openedBy: order.openedBy };
  }

  /**
   * Get a specific global order
   */
  function getGlobalOrder(orderId) {
    const allOrders = getAllOrders();
    return allOrders.find(o => o.id === orderId);
  }

  /**
   * Assign an order to a delivery person
   */
  function assignOrder(orderId, deliveryPersonEmail, operatorEmail = null) {
    const users = getAllUsers();
    const deliveryPerson = users.find(u => u.email.toLowerCase() === deliveryPersonEmail.toLowerCase());
    if (!deliveryPerson) return { success: false, message: 'Delivery person not found' };

    const actualDeliveryEmail = deliveryPerson.email; // Use the case from the database

    // 1. Update Global Order
    const allOrders = getAllOrders();
    const globalOrder = allOrders.find(o => o.id === orderId);
    if (!globalOrder) return { success: false, message: 'Order not found' };

    // Check if someone else already assigned to a DIFFERENT delivery person
    if (globalOrder.deliveryPersonEmail && globalOrder.deliveryPersonEmail.toLowerCase() !== actualDeliveryEmail.toLowerCase()) {
      return { success: false, message: `This order must be assigned to ${globalOrder.deliveryPersonEmail} as per the lead operator's choice.` };
    }

    globalOrder.status = 'assigned';
    globalOrder.deliveryPersonEmail = actualDeliveryEmail;
    
    // Track who has assigned this order
    if (operatorEmail) {
      if (!globalOrder.assignedBy) globalOrder.assignedBy = [];
      if (!globalOrder.assignedBy.includes(operatorEmail)) {
        globalOrder.assignedBy.push(operatorEmail);
      }
    } else {
      // Admin assignment - auto-assign for all involved owners
      const items = globalOrder.items || globalOrder.products || [];
      const owners = [...new Set(items.map(item => item.owner).filter(Boolean))];
      globalOrder.assignedBy = owners;
    }

    saveOrders(allOrders);

    // 2. Update Scoped Orders for Operators
    const items = globalOrder.items || globalOrder.products || [];
    const owners = [...new Set(items.map(item => item.owner).filter(Boolean))];

    owners.forEach(opEmail => {
      const scopedOrders = getScopedData('ecommerce_orders', [], opEmail);
      const scopedOrder = scopedOrders.find(o => o.id === orderId);
      if (scopedOrder) {
        scopedOrder.status = 'assigned';
        scopedOrder.deliveryPersonEmail = actualDeliveryEmail;
        // Sync extra fields
        scopedOrder.openedBy = globalOrder.openedBy;
        scopedOrder.assignedBy = globalOrder.assignedBy;
        saveScopedData('ecommerce_orders', scopedOrders, opEmail);
      }
    });

    // 3. Push to Delivery Person
    const deliveryOrder = {
      id: globalOrder.id,
      client: globalOrder.customerName || globalOrder.customer?.name,
      destination: globalOrder.deliveryLocation || 'See details',
      status: 'assigned',
      date: globalOrder.date || new Date().toISOString()
    };

    const dOrders = getScopedData('delivery_orders', [], actualDeliveryEmail);
    const existingIndex = dOrders.findIndex(o => o.id === deliveryOrder.id);
    if (existingIndex === -1) {
      dOrders.push(deliveryOrder);
    } else {
      dOrders[existingIndex] = deliveryOrder;
    }
    saveScopedData('delivery_orders', dOrders, actualDeliveryEmail);

    return { success: true };
  }

  /**
   * Update order status across all scopes
   */
  function updateOrderStatus(orderId, newStatus) {
    const users = getAllUsers();
    
    // 1. Update Global Order
    const allOrders = getAllOrders();
    const globalOrder = allOrders.find(o => o.id === orderId);
    if (!globalOrder) return { success: false, message: 'Order not found' };

    const oldStatus = globalOrder.status;
    globalOrder.status = newStatus;
    
    // Set completion date for auto-deletion logic (30 mins after completion)
    if ((newStatus === 'completed' || newStatus === 'Delivered') && (oldStatus !== 'completed' && oldStatus !== 'Delivered')) {
      globalOrder.completionDate = new Date().toISOString();
    }
    
    saveOrders(allOrders);

    // NEW: Handle Permanent Earnings for Platform and Operators
    if ((newStatus === 'completed' || newStatus === 'Delivered') && (oldStatus !== 'completed' && oldStatus !== 'Delivered')) {
      const commission = globalOrder.totalCommission !== undefined ? globalOrder.totalCommission : ((globalOrder.grandTotal || globalOrder.totalPrice || 0) * 0.10);

      // AUTOMATIC VAULTPRO UPDATE for Admin (Commission)
      const admin = users.find(u => u.role === 'admin');
      if (admin) {
        updateVaultBalance(admin.id, commission, `Order Commission: ${orderId}`);
      }

      const items = globalOrder.items || globalOrder.products || [];
      items.forEach(item => {
        if (item.owner) {
          const itemTotal = (item.price || 0) * (item.qty || item.quantity || 1);
          const operatorEarning = itemTotal * 0.90;

          // AUTOMATIC VAULTPRO UPDATE for Operator
          const opUser = users.find(u => u.email === item.owner);
          if (opUser) {
            updateVaultBalance(opUser.id, operatorEarning, `Sales Earning: ${item.name} (Order ${orderId})`);
          }
        }
      });

      // NEW: User Loyalty Points
      if (globalOrder.userId) {
        const points = Math.floor((globalOrder.grandTotal || globalOrder.totalPrice || 0) / 100);
        addUserLoyaltyPoints(globalOrder.userId, points);
      }
    } else if (newStatus === 'returned' && (oldStatus === 'completed' || oldStatus === 'Delivered')) {
      const commission = globalOrder.totalCommission !== undefined ? globalOrder.totalCommission : ((globalOrder.grandTotal || globalOrder.totalPrice || 0) * 0.10);

      // REVERSE VAULTPRO UPDATE for Admin
      const admin = users.find(u => u.role === 'admin');
      if (admin) {
        updateVaultBalance(admin.id, -commission, `Order Returned (Commission Reversal): ${orderId}`);
      }

      const items = globalOrder.items || globalOrder.products || [];
      items.forEach(item => {
        if (item.owner) {
          const itemTotal = (item.price || 0) * (item.qty || item.quantity || 1);
          const operatorEarning = itemTotal * 0.90;

          // REVERSE VAULTPRO UPDATE for Operator
          const opUser = users.find(u => u.email === item.owner);
          if (opUser) {
            updateVaultBalance(opUser.id, -operatorEarning, `Sales Earning Reversal (Return): ${item.name} (Order ${orderId})`);
          }
        }
      });

      // NEW: REVOKE Loyalty Points on Return
      if (globalOrder.userId) {
        const points = Math.floor((globalOrder.grandTotal || globalOrder.totalPrice || 0) / 100);
        addUserLoyaltyPoints(globalOrder.userId, -points);
      }
    }

    // 2. Update Scoped Orders for Operators
    const items = globalOrder.items || globalOrder.products || [];
    const owners = [...new Set(items.map(item => item.owner).filter(Boolean))];

    owners.forEach(opEmail => {
      const scopedOrders = getScopedData('ecommerce_orders', [], opEmail);
      const scopedOrder = scopedOrders.find(o => o.id === orderId);
      if (scopedOrder) {
        scopedOrder.status = newStatus;
        saveScopedData('ecommerce_orders', scopedOrders, opEmail);
      }
    });

    // 3. Update for Delivery Person if assigned
    if (globalOrder.deliveryPersonEmail) {
      const deliveryEmail = globalOrder.deliveryPersonEmail;
      const deliveryPerson = users.find(u => u.email.toLowerCase() === deliveryEmail.toLowerCase());
      
      if (deliveryPerson) {
        const dOrders = getScopedData('delivery_orders', [], deliveryEmail);
        const dOrder = dOrders.find(o => o.id === orderId);
        if (dOrder) {
          dOrder.status = newStatus;
          saveScopedData('delivery_orders', dOrders, deliveryEmail);

          // ADD PROFIT LOGIC HERE
          if ((newStatus === 'completed' || newStatus === 'Delivered') && (oldStatus !== 'completed' && oldStatus !== 'Delivered')) {
            // AUTOMATIC VAULTPRO UPDATE for Delivery Personnel
            updateVaultBalance(deliveryPerson.id, 50, `Delivery Earnings: Order ${orderId}`);

            // LOG 20 KSH DEDUCTION FOR ADMIN
            const deductions = JSON.parse(localStorage.getItem(STORAGE_KEYS.DELIVERY_DEDUCTIONS)) || { total: 0, history: [] };
            deductions.total += 20;
            deductions.history.push({
              orderId,
              amount: 20,
              deliveryPerson: deliveryEmail,
              date: new Date().toISOString()
            });
            localStorage.setItem(STORAGE_KEYS.DELIVERY_DEDUCTIONS, JSON.stringify(deductions));

            // AUTOMATIC VAULTPRO UPDATE for Admin (Platform Earnings)
            const admin = users.find(u => u.role === 'admin');
            if (admin) {
              updateVaultBalance(admin.id, 20, `Delivery Deduction: Order ${orderId} from ${deliveryEmail}`);
            }
          }
        }
      }
    }

    // 4. Update for Customer
    if (globalOrder.customerEmail) {
      const customerOrders = getScopedData('ecommerce_orders', [], globalOrder.customerEmail);
      const customerOrder = customerOrders.find(o => o.id === orderId);
      if (customerOrder) {
        customerOrder.status = newStatus;
        saveScopedData('ecommerce_orders', customerOrders, globalOrder.customerEmail);
      }
    }

    // 5. Sync with MediCore Admin Data if pharmacy order
    const isPharmacyOrder = items.some(item => item.subcategory === 'Pharmacy' || item.shelfName);
    if (isPharmacyOrder) {
      let medicoreData = JSON.parse(localStorage.getItem('medicoreAdminData'));
      if (medicoreData && medicoreData.orders) {
        const mOrder = medicoreData.orders.find(o => o.id === orderId);
        if (mOrder) {
          mOrder.status = newStatus;
          localStorage.setItem('medicoreAdminData', JSON.stringify(medicoreData));
        }
      }
    }

    notifyUpdate();

    return { success: true };
  }

  /**
   * Update order payment status across all scopes
   */
  function updateOrderPaymentStatus(orderId, newPaymentStatus) {
    const users = getAllUsers();
    
    // 1. Update Global Order
    const allOrders = getAllOrders();
    const globalOrder = allOrders.find(o => o.id === orderId);
    if (!globalOrder) return { success: false, message: 'Order not found' };

    globalOrder.paymentStatus = newPaymentStatus;
    // Update main status too if it's a final payment
    if (newPaymentStatus === 'paid') {
      globalOrder.status = 'paid';
    }
    saveOrders(allOrders);

    // 2. Update Scoped Orders for Operators
    const items = globalOrder.items || globalOrder.products || [];
    const owners = [...new Set(items.map(item => item.owner).filter(Boolean))];

    owners.forEach(opEmail => {
      const scopedOrders = getScopedData('ecommerce_orders', [], opEmail);
      const scopedOrder = scopedOrders.find(o => o.id === orderId);
      if (scopedOrder) {
        scopedOrder.status = globalOrder.status; // Keep status in sync too
        scopedOrder.paymentStatus = newPaymentStatus;
        saveScopedData('ecommerce_orders', scopedOrders, opEmail);
      }
    });

    // 3. Sync with MediCore Admin Data if pharmacy order
    const isPharmacyOrder = items.some(item => item.subcategory === 'Pharmacy' || item.shelfName);
    if (isPharmacyOrder) {
      let medicoreData = JSON.parse(localStorage.getItem('medicoreAdminData'));
      if (medicoreData && medicoreData.orders) {
        const mOrder = medicoreData.orders.find(o => o.id === orderId);
        if (mOrder) {
          mOrder.paymentStatus = newPaymentStatus;
          if (newPaymentStatus === 'paid') {
            mOrder.status = 'paid';
          }
          localStorage.setItem('medicoreAdminData', JSON.stringify(medicoreData));
        }
      }
    }

    // 4. Update Scoped Orders for the Customer
    if (globalOrder.customerEmail) {
      const customerOrders = getScopedData('ecommerce_orders', [], globalOrder.customerEmail);
      const customerOrder = customerOrders.find(o => o.id === orderId);
      if (customerOrder) {
        customerOrder.paymentStatus = newPaymentStatus;
        if (newPaymentStatus === 'paid') {
          customerOrder.status = 'paid';
        }
        saveScopedData('ecommerce_orders', customerOrders, globalOrder.customerEmail);
      }
    }

    // 5. Update Scoped Orders for Delivery Personnel (if assigned)
    if (globalOrder.deliveryPersonEmail) {
      const deliveryEmail = globalOrder.deliveryPersonEmail;
      const dOrders = getScopedData('delivery_orders', [], deliveryEmail);
      const dOrder = dOrders.find(o => o.id === orderId);
      if (dOrder) {
        dOrder.paymentStatus = newPaymentStatus;
        if (newPaymentStatus === 'paid') {
          dOrder.status = 'paid';
        }
        saveScopedData('delivery_orders', dOrders, deliveryEmail);
      }
    }

    notifyUpdate();

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
    const allProducts = warehouse.products || [];

    const user = getCurrentUser();
    // Isolation logic: Operators only see their own products in warehouse
    // Primary Admin (omondiphelix2003@gmail.com) sees EVERYTHING
    const isPrimaryAdmin = user && user.email === "omondiphelix2003@gmail.com";
    const isOperatorRole = user && (user.role === 'operator' || user.role === 'medicore_operator' || user.role === 'pharmacist' || user.role === 'business');
    
    if (user && isOperatorRole && !isPrimaryAdmin) {
      return allProducts.filter(p => p.owner === user.email);
    }

    return allProducts;
  }

  function addToWarehouse(product, quantity) {
    initializeWarehouse();
    const warehouse = JSON.parse(localStorage.getItem(STORAGE_KEYS.WAREHOUSE)) || { products: [] };
    
    const user = getCurrentUser();
    const ownerEmail = product.owner || (user ? user.email : 'admin');
    const adminEmail = "omondiphelix2003@gmail.com";

    // 1. GLOBAL WAREHOUSE (Object {products: []})
    const existingGlobal = warehouse.products.find(p => p.name === product.name && p.owner === ownerEmail);
    if (existingGlobal) {
      existingGlobal.quantity += quantity;
    } else {
      warehouse.products.push({
        ...product,
        quantity: quantity,
        id: product.id || generateId(),
        owner: ownerEmail
      });
    }
    localStorage.setItem(STORAGE_KEYS.WAREHOUSE, JSON.stringify(warehouse));

    // 2. OPERATOR SCOPED WAREHOUSE (Array)
    const operatorWarehouse = getScopedData('ecommerce_warehouse', [], ownerEmail);
    const existingOp = operatorWarehouse.find(p => p.id === product.id || p.name === product.name);
    if (existingOp) {
      existingOp.quantity = (existingOp.quantity || 0) + quantity;
    } else {
      operatorWarehouse.push({ ...product, quantity, owner: ownerEmail });
    }
    saveScopedData('ecommerce_warehouse', operatorWarehouse, ownerEmail);

    // 3. ADMIN SCOPED WAREHOUSE (Array)
    if (ownerEmail !== adminEmail) {
      const adminWarehouse = getScopedData('ecommerce_warehouse', [], adminEmail);
      const existingAdmin = adminWarehouse.find(p => p.id === product.id || p.name === product.name);
      if (existingAdmin) {
        existingAdmin.quantity = (existingAdmin.quantity || 0) + quantity;
      } else {
        adminWarehouse.push({ ...product, quantity, owner: ownerEmail });
      }
      saveScopedData('ecommerce_warehouse', adminWarehouse, adminEmail);
    }
    
    return { success: true, message: 'Product added to warehouse' };
  }

  function updateWarehouseQuantity(productId, newQty) {
    const warehouse = JSON.parse(localStorage.getItem(STORAGE_KEYS.WAREHOUSE)) || { products: [] };
    const globalProduct = warehouse.products.find(p => p.id === productId);
    const adminEmail = "omondiphelix2003@gmail.com";

    if (globalProduct) {
      globalProduct.quantity = newQty;
      const ownerEmail = globalProduct.owner;
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

      // SYNC WITH OPERATOR SCOPED WAREHOUSE
      const operatorWarehouse = getScopedData('ecommerce_warehouse', [], ownerEmail);
      const opIdx = operatorWarehouse.findIndex(p => p.id === productId);
      if (opIdx !== -1) {
        operatorWarehouse[opIdx].quantity = newQty;
        saveScopedData('ecommerce_warehouse', operatorWarehouse, ownerEmail);
      }

      // SYNC WITH ADMIN SCOPED WAREHOUSE
      if (ownerEmail !== adminEmail) {
        const adminWarehouse = getScopedData('ecommerce_warehouse', [], adminEmail);
        const adminIdx = adminWarehouse.findIndex(p => p.id === productId);
        if (adminIdx !== -1) {
          adminWarehouse[adminIdx].quantity = newQty;
          saveScopedData('ecommerce_warehouse', adminWarehouse, adminEmail);
        }
      }
      
      return { success: true };
    }
    return { success: false };
  }

  function removeFromWarehouse(productId) {
    const warehouse = JSON.parse(localStorage.getItem(STORAGE_KEYS.WAREHOUSE)) || { products: [] };
    const globalProduct = warehouse.products.find(p => p.id === productId);
    const adminEmail = "omondiphelix2003@gmail.com";

    if (globalProduct) {
        const ownerEmail = globalProduct.owner;
        
        // 1. Remove from GLOBAL
        warehouse.products = warehouse.products.filter(p => p.id !== productId);
        localStorage.setItem(STORAGE_KEYS.WAREHOUSE, JSON.stringify(warehouse));
        
        // 2. Remove from OPERATOR SCOPED
        const operatorWarehouse = getScopedData('ecommerce_warehouse', [], ownerEmail);
        const filteredOp = operatorWarehouse.filter(p => p.id !== productId);
        saveScopedData('ecommerce_warehouse', filteredOp, ownerEmail);

        // 3. Remove from ADMIN SCOPED
        if (ownerEmail !== adminEmail) {
            const adminWarehouse = getScopedData('ecommerce_warehouse', [], adminEmail);
            const filteredAdmin = adminWarehouse.filter(p => p.id !== productId);
            saveScopedData('ecommerce_warehouse', filteredAdmin, adminEmail);
        }
    }
    
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
    
    // Check if invoice already exists for this orderId to prevent duplicates
    if (invoice.orderId && invoices.some(inv => inv.orderId === invoice.orderId)) {
      return { success: false, message: 'Invoice already exists for this order' };
    }

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
    const deductionsData = JSON.parse(localStorage.getItem('ecommerce_delivery_deductions')) || { total: 0 };
    
    const warehouseValue = warehouse.reduce((sum, p) => sum + (p.price * (p.quantity || p.stock || 0)), 0);
    
    // Gross Revenue: Sum of all completed/processing/delivered orders
    const grossRevenue = orders.reduce((sum, o) => {
      if (o.status === 'completed' || o.status === 'processing' || o.status === 'Delivered') {
        return sum + (o.totalPrice || o.grandTotal || o.total || 0);
      }
      return sum;
    }, 0);

    // Platform Commission (10% of gross revenue)
    const totalCommission = orders.reduce((sum, o) => {
      if (o.status === 'completed' || o.status === 'processing' || o.status === 'Delivered') {
        if (o.totalCommission !== undefined) return sum + o.totalCommission;
        return sum + ((o.totalPrice || o.grandTotal || o.total || 0) * 0.10);
      }
      return sum;
    }, 0);
    
    const deliveryDeductions = deductionsData.total || 0;
    
    // Net Platform Earnings = Commission + Delivery Deductions
    const netEarnings = totalCommission + deliveryDeductions;
    
    // Actual Platform Earnings (Vault/Permanent balance)
    const permanentEarnings = getPermanentEarnings();

    return {
      grossRevenue,
      warehouseValue,
      totalCommission,
      deliveryDeductions,
      profit: permanentEarnings, // Show actual balance as profit
      netEarnings: permanentEarnings,
      permanentEarnings,
      profitMargin: grossRevenue > 0 ? Math.round((netEarnings / grossRevenue) * 100) + '%' : '0%',
      ordersCount: orders.length,
      returnedOrders: orders.filter(o => o.status === 'returned').length,
      analysisDate: new Date().toISOString()
    };
  }

  function getOperatorProfitLossAnalysis(email) {
    const orders = getAllOrders();
    const operatorOrders = orders.filter(o => {
      const items = o.items || o.products || [];
      return items.some(item => item.owner === email) && (o.status === 'completed' || o.status === 'Delivered' || o.status === 'processing');
    });

    let grossRevenue = 0;
    let netEarnings = 0;
    let commissionPaid = 0;

    operatorOrders.forEach(o => {
      const items = o.items || o.products || [];
      items.forEach(item => {
        if (item.owner === email) {
          const itemTotal = (item.price || 0) * (item.qty || item.quantity || 1);
          grossRevenue += itemTotal;
          netEarnings += (itemTotal * 0.90);
          commissionPaid += (itemTotal * 0.10);
        }
      });
    });

    const operatorRevenue = getOperatorRevenue(email);

    return {
      grossRevenue,
      netEarnings: operatorRevenue, // Use actual balance as net earnings
      commissionPaid,
      ordersCount: operatorOrders.length,
      margin: grossRevenue > 0 ? Math.round((operatorRevenue / grossRevenue) * 100) : 0
    };
  }

  function deleteDeliveryOrder(orderId, email = null) {
    const orders = getScopedData('delivery_orders', [], email);
    const filtered = orders.filter(o => o.id !== orderId);
    saveScopedData('delivery_orders', filtered, email);
    return { success: true };
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
      .reduce((sum, o) => {
        if (o.totalCommission !== undefined) return sum + o.totalCommission;
        return sum + ((o.grandTotal || 0) * 0.10);
      }, 0);

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
      unreadEmails: messages.filter(m => m.status === 'unread').length,
      pendingPageRequests: (getPageRegistrations() || []).filter(r => r.status === 'pending').length
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

  function getOnlineUsers() {
    const onlineUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.ONLINE_USERS)) || {};
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    const onlineIds = [];
    for (const id in onlineUsers) {
      if (now - onlineUsers[id] < fiveMinutes) {
        onlineIds.push(id);
      }
    }
    return onlineIds;
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
    try {
      localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
      return { success: true, campaign };
    } catch (e) {
      console.error('DataManager.saveCampaign error:', e);
      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        return { success: false, message: 'Storage quota exceeded. The image or video file is too large for local storage. Please use a smaller file or a URL instead.' };
      }
      return { success: false, message: 'Failed to save campaign: ' + e.message };
    }
  }

  function deleteCampaign(id) {
    let campaigns = getAllCampaigns();
    campaigns = campaigns.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
    return { success: true };
  }

  /**
   * System Configuration
   */
  function getSystemConfig() {
    const defaultConfig = {
      commissionPercentage: 10,
      deliveryFee: 70
    };
    const config = JSON.parse(localStorage.getItem(STORAGE_KEYS.SYSTEM_CONFIG));
    return config || defaultConfig;
  }

  function updateSystemConfig(newConfig) {
    const config = getSystemConfig();
    const updated = { ...config, ...newConfig };
    localStorage.setItem(STORAGE_KEYS.SYSTEM_CONFIG, JSON.stringify(updated));
    return { success: true, config: updated };
  }

  // Initialize on load
  initializeStorage();
  updateOnlineStatus();
  // Update status every 2 minutes while page is open
  setInterval(updateOnlineStatus, 2 * 60 * 1000);

  // Sync cart across tabs/windows
  window.addEventListener('storage', (e) => {
    if (e.key === 'ecommerce_cart') {
      if (typeof updateCartBadge === 'function') updateCartBadge();
      // If we are on the cart page, we might want to refresh the list
      const cartContainer = document.getElementById('cart-items') || document.getElementById('cart-items-container');
      if (cartContainer && typeof renderCart === 'function') renderCart();
      // If we are on checkout page
      if (window.location.pathname.includes('checkout.html') && typeof renderCheckout === 'function') renderCheckout();
    }
  });

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    notifyUpdate();
    return { success: true };
  }

  /**
   * Notify all tabs that data has changed
   */
  function playNotificationSound() {
    try {
      const audio = new Audio('notification.mp3');
      audio.play().catch(e => console.log('Audio play blocked or file not found:', e.message));
    } catch (error) {
      console.log('Audio error:', error.message);
    }
  }

  function notifyUpdate() {
    window.dispatchEvent(new Event('dataUpdated'));
    playNotificationSound();
    // Trigger storage event for other tabs
    localStorage.setItem('daimara_sync_timestamp', Date.now().toString());
  }

  // Global listener for instant updates across tabs
  window.addEventListener('storage', (e) => {
    // If any relevant key changes or our sync timestamp changes, refresh
    const relevantKeys = Object.values(STORAGE_KEYS);
    if (e.key === 'daimara_sync_timestamp' || relevantKeys.includes(e.key) || (e.key && e.key.includes('medicoreAdminData'))) {
      if (e.key === 'daimara_sync_timestamp') {
        playNotificationSound();
      }
      
      // Small delay to allow localStorage to settle
      setTimeout(() => {
        // Some pages might handle updates without reload, but reload is safest for sync
        // unless they have a dataUpdated listener
        if (!document.body.dataset.manualSync) {
           location.reload();
        }
      }, 100);
    }
  });

  function resetPlatformEarnings() {
    // 1. Reset Admin Earnings
    localStorage.setItem(STORAGE_KEYS.PERMANENT_EARNINGS, "0");
    
    // 2. Reset All Operators Revenue and Earnings
    localStorage.setItem(STORAGE_KEYS.OPERATOR_REVENUE, JSON.stringify({}));
    localStorage.setItem(STORAGE_KEYS.OPERATOR_EARNINGS, JSON.stringify({}));
    
    // 3. Reset Delivery Earnings and Deductions
    localStorage.setItem(STORAGE_KEYS.DELIVERY_EARNINGS, JSON.stringify({}));
    localStorage.setItem(STORAGE_KEYS.DELIVERY_DEDUCTIONS, JSON.stringify({}));

    // 4. Iterate through all keys to find scoped data
    const keys = Object.keys(localStorage);
    const deliveryPrefix = 'delivery_earnings_';
    const medicorePrefix = 'medicoreAdminData';
    const ordersPrefix = 'ecommerce_orders_';

    keys.forEach(key => {
      // Reset individual delivery person earnings
      if (key.startsWith(deliveryPrefix)) {
        localStorage.setItem(key, JSON.stringify({ total: 0, history: [] }));
      }
      
      // Reset MediCore operator data (specifically orders which drive revenue)
      if (key === medicorePrefix || key.startsWith(medicorePrefix + '_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          if (data) {
            if (data.orders) data.orders = [];
            // If MediCore has revenue/earnings fields, reset them too
            if (data.revenue !== undefined) data.revenue = 0;
            if (data.earnings !== undefined) data.earnings = 0;
            localStorage.setItem(key, JSON.stringify(data));
          }
        } catch (e) { console.error("Error resetting medicore data:", key, e); }
      }

      // Optional: Reset scoped orders if financials are derived from them
      if (key.startsWith(ordersPrefix)) {
        localStorage.setItem(key, JSON.stringify([]));
      }
    });

    // 5. Global Orders - Should we clear these? 
    // Usually financials are linked to orders. Let's clear them to ensure consistency.
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));

    return { success: true, message: 'All Platform Earnings (Admin, Operators, Pharmacy, Delivery) and associated Orders have been reset to zero.' };
  }

  function resetAllFinancials() {
    // Perform earnings reset first
    resetPlatformEarnings();
    
    // 6. Reset VaultPro (Balances and Transactions)
    localStorage.setItem(STORAGE_KEYS.VAULT_BALANCES, JSON.stringify({}));
    localStorage.setItem(STORAGE_KEYS.VAULT_TRANSACTIONS, JSON.stringify([]));
    
    // 7. Reset Agent Floats and Transactions
    localStorage.setItem(STORAGE_KEYS.AGENT_FLOAT, JSON.stringify({}));
    localStorage.setItem(STORAGE_KEYS.AGENT_TRANSACTIONS, JSON.stringify({}));
    
    // 8. Reset Withdrawal Requests
    localStorage.setItem(STORAGE_KEYS.WITHDRAWAL_REQUESTS, JSON.stringify([]));
    
    // 9. Log the reset action if admin is logged in
    const admin = getCurrentUser();
    if (admin && admin.role === 'admin') {
      // We need to re-initialize the empty transactions array we just set
      const txs = [];
      txs.push({
        userId: admin.id,
        amount: 0,
        type: 'credit',
        description: "Full System Financial Reset Performed",
        balanceAfter: 0,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEYS.VAULT_TRANSACTIONS, JSON.stringify(txs));
    }
    
    return { success: true, message: 'COMPLETE RESET: All Platform Earnings, VaultPro accounts, Transactions, and Agent Floats have been reset to ZERO.' };
  }

  // Public API
  return {
    getAllProducts,
    getProduct,
    addProduct,
    addProductFromAddPage,
    updateProduct,
    deleteProduct,
    getCart,
    saveCart,
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
    assignOrder,
    updateOrderStatus,
    updateOrderPaymentStatus,
    deleteDeliveryOrder,
    processNewOrder,
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
    getSystemConfig,
    updateSystemConfig,
    getAdminDashboardStats,
    getOperatorProfitLossAnalysis,
    getOnlineUsers,
    getOnlineUserCount,
    getClientEmails,
    markEmailAsRead,
    addEmailResponse,
    clearAllData,
    resetPlatformEarnings,
    resetAllFinancials,
    getAllCampaigns,
    saveCampaign,
    deleteCampaign,
    addPageRegistration,
    getPageRegistrations,
    updatePageRegistrationStatus,
    deletePageRegistration,
    updateUserRoleByEmail,
    getScopedData,
    saveScopedData,
    getPermanentEarnings,
    addPermanentEarnings,
    getOperatorEarnings,
    addOperatorEarnings,
    getOperatorRevenue,
    addOperatorRevenue,
    getUserLoyaltyPoints,
    addUserLoyaltyPoints,
    getStoreCategories,
    saveStoreCategories,
    updateProductRating,
    getMpesaTransactions,
    addMpesaTransaction,
    verifyMpesaTransaction,
    getVaultBalance,
    updateVaultBalance,
    getVaultTransactions,
    registerAgent,
    getAgentRegistrations,
    approveAgent,
    getAgentByNumber,
    getAgentByUserId,
    getAgentFloat,
    updateAgentFloat,
    getAgentTransactions,
    addWithdrawalRequest,
    getWithdrawalRequests,
    updateWithdrawalStatus,
    resetVaultPin,
    resetAgentPin,
    resetLoginPassword,
    deleteAgentRegistration,
    transferFunds,
    logVaultAccess,
    getRecipientVaultId,
    getVaultAccessLogs
  };
})();

// GLOBAL CLICK-AWAY LOGIC
document.addEventListener('click', (e) => {
  // Dropdowns (e.g. Profile, Search)
  const dropdowns = document.querySelectorAll('#dropdown-menu, #search-results, .dropdown-content, .cart-modal');
  dropdowns.forEach(dropdown => {
    // Only close if it's currently showing and the click was outside
    if (window.getComputedStyle(dropdown).display !== 'none') {
       // Find the toggle button associated with this dropdown if possible
       // This is a bit generic, so we check if the click target is the dropdown itself or its parent toggle
       const isClickInside = dropdown.contains(e.target);
       const isClickOnToggle = e.target.closest('#profile-icon, #profile-btn, .search-container, .cart-icon, #cart-btn, .user-icon, .dropdown-toggle');
       
       if (!isClickInside && !isClickOnToggle) {
         if (dropdown.id === 'cart-modal') {
           // Modal closing might need special handling
           if (typeof closeModal === 'function') closeModal();
           else dropdown.classList.remove('open');
         } else if (dropdown.id === 'search-results') {
           dropdown.style.display = 'none';
         } else {
           dropdown.classList.remove('show');
           dropdown.style.display = 'none';
         }
       }
    }
  });

  // Mobile Toggles (e.g. Categories, Sidebar)
  const mobileMenus = document.querySelectorAll('.nav-links, .sidebar');
  mobileMenus.forEach(menu => {
    if (menu.classList.contains('active')) {
      const isClickInside = menu.contains(e.target);
      const isClickOnToggle = e.target.closest('.category-toggle, .menu-toggle, .navbar-toggler');
      
      if (!isClickInside && !isClickOnToggle) {
        menu.classList.remove('active');
      }
    }
  });
});
