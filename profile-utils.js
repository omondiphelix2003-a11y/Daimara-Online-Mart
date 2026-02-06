/**
 * Profile Utilities Module
 * Helper functions and utilities for profile management
 */

const ProfileUtils = {
  // Validate email format
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate password strength
  getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return {
      score: strength,
      level: strength === 0 ? 'Weak' : strength === 1 ? 'Fair' : strength === 2 ? 'Good' : strength === 3 ? 'Strong' : 'Very Strong'
    };
  },

  // Format currency
  formatCurrency(amount, currency = 'KSH') {
    return `${currency} ${amount.toLocaleString('en-KE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  },

  // Format phone number
  formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '+254-$1-$2-$3');
    }
    return phone;
  },

  // Validate phone number
  isValidPhoneNumber(phone) {
    const phoneRegex = /^(\+254|0)[1-9]\d{8}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  },

  // Generate unique ID
  generateId() {
    return `ID${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  },

  // Get initials from name
  getInitials(name) {
    return name
      .split(' ')
      .map(n => n.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  },

  // Check if user has permission
  hasPermission(user, permission) {
    const permissions = user?.permissions || [];
    return permissions.includes(permission);
  },

  // Calculate discount
  calculateDiscount(originalPrice, discountPercent) {
    return originalPrice - (originalPrice * discountPercent / 100);
  },

  // Calculate tax
  calculateTax(amount, taxRate = 0.16) {
    return amount * taxRate;
  },

  // Calculate total with tax
  calculateTotal(subtotal, taxRate = 0.16, shippingCost = 0) {
    const tax = this.calculateTax(subtotal, taxRate);
    return subtotal + tax + shippingCost;
  },

  // Check if address is valid
  isValidAddress(address) {
    return (
      address.label &&
      address.street &&
      address.city &&
      address.postal &&
      address.phone &&
      this.isValidPhoneNumber(address.phone)
    );
  },

  // Check if user profile is complete
  isProfileComplete(user) {
    return (
      user.name &&
      user.email &&
      user.phone &&
      user.profileImage &&
      this.isValidEmail(user.email) &&
      this.isValidPhoneNumber(user.phone)
    );
  },

  // Get profile completion percentage
  getProfileCompletion(user) {
    let completed = 0;
    const fields = ['name', 'email', 'phone', 'profileImage'];

    fields.forEach(field => {
      if (user[field]) completed++;
    });

    return Math.round((completed / fields.length) * 100);
  },

  // Export user data
  exportUserData(user) {
    const data = {
      user: user,
      addresses: ProfileService.getUserAddresses(),
      orders: ProfileService.getUserOrders(),
      favorites: ProfileService.getFavorites(),
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  },

  // Download user data
  downloadUserData() {
    const user = ProfileService.getLoggedInUser();
    if (!user) {
      alert('Please login first');
      return;
    }

    const data = this.exportUserData(user);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `profile-data-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  },

  // Validate order
  isValidOrder(order) {
    return (
      order.items &&
      order.items.length > 0 &&
      order.total > 0 &&
      order.shippingAddress
    );
  },

  // Calculate order summary
  getOrderSummary(order) {
    return {
      itemCount: order.items?.length || 0,
      subtotal: order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0,
      tax: order.tax || 0,
      shipping: order.shipping || 0,
      total: order.total || 0,
      status: order.status || 'Pending'
    };
  },

  // Get time since date
  getTimeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
  },

  // Sanitize HTML
  sanitizeHTML(html) {
    const temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
  },

  // Debounce function
  debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Deep clone object
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  // Merge objects
  mergeObjects(target, source) {
    return { ...target, ...source };
  },

  // Filter by property
  filterByProperty(array, property, value) {
    return array.filter(item => item[property] === value);
  },

  // Sort by property
  sortByProperty(array, property, ascending = true) {
    return array.sort((a, b) => {
      if (ascending) return a[property] > b[property] ? 1 : -1;
      return a[property] < b[property] ? 1 : -1;
    });
  }
};

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = ProfileUtils;
}
