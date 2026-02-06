/**
 * Profile Service Module
 * Handles all profile-related operations and data management
 */

const ProfileService = {
  // Get logged-in user
  getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
  },

  // Set logged-in user
  setLoggedInUser(user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  },

  // Check if user is logged in
  isLoggedIn() {
    return this.getLoggedInUser() !== null;
  },

  // Get user addresses
  getUserAddresses() {
    return JSON.parse(localStorage.getItem("userAddresses")) || [];
  },

  // Save user addresses
  setUserAddresses(addresses) {
    localStorage.setItem("userAddresses", JSON.stringify(addresses));
  },

  // Add new address
  addAddress(address) {
    const addresses = this.getUserAddresses();
    addresses.push(address);
    this.setUserAddresses(addresses);
    return address;
  },

  // Update address
  updateAddress(index, address) {
    const addresses = this.getUserAddresses();
    if (index >= 0 && index < addresses.length) {
      addresses[index] = address;
      this.setUserAddresses(addresses);
      return true;
    }
    return false;
  },

  // Delete address
  deleteAddress(index) {
    const addresses = this.getUserAddresses();
    if (index >= 0 && index < addresses.length) {
      addresses.splice(index, 1);
      this.setUserAddresses(addresses);
      return true;
    }
    return false;
  },

  // Get user orders
  getUserOrders() {
    return JSON.parse(localStorage.getItem("userOrders")) || [];
  },

  // Save user orders
  setUserOrders(orders) {
    localStorage.setItem("userOrders", JSON.stringify(orders));
  },

  // Add new order
  addOrder(order) {
    const orders = this.getUserOrders();
    order.date = new Date().toISOString();
    order.status = order.status || "Pending";
    orders.push(order);
    this.setUserOrders(orders);
    return order;
  },

  // Update order status
  updateOrderStatus(index, status) {
    const orders = this.getUserOrders();
    if (index >= 0 && index < orders.length) {
      orders[index].status = status;
      this.setUserOrders(orders);
      return true;
    }
    return false;
  },

  // Get favorite products
  getFavorites() {
    return JSON.parse(localStorage.getItem("favoriteProducts")) || [];
  },

  // Save favorite products
  setFavorites(favorites) {
    localStorage.setItem("favoriteProducts", JSON.stringify(favorites));
  },

  // Add to favorites
  addToFavorites(product) {
    const favorites = this.getFavorites();
    if (!favorites.some(p => p.id === product.id)) {
      favorites.push(product);
      this.setFavorites(favorites);
      return true;
    }
    return false;
  },

  // Remove from favorites
  removeFromFavorites(productId) {
    let favorites = this.getFavorites();
    favorites = favorites.filter(p => p.id !== productId);
    this.setFavorites(favorites);
    return true;
  },

  // Check if product is favorite
  isFavorite(productId) {
    const favorites = this.getFavorites();
    return favorites.some(p => p.id === productId);
  },

  // Update user profile
  updateProfile(updates) {
    let user = this.getLoggedInUser();
    if (user) {
      user = { ...user, ...updates };
      this.setLoggedInUser(user);
      return user;
    }
    return null;
  },

  // Change password
  changePassword(newPassword) {
    let user = this.getLoggedInUser();
    if (user) {
      user.password = newPassword;
      this.setLoggedInUser(user);
      return true;
    }
    return false;
  },

  // Save user preferences
  savePreferences(preferences) {
    let user = this.getLoggedInUser();
    if (user) {
      user.preferences = { ...user.preferences, ...preferences };
      this.setLoggedInUser(user);
      return true;
    }
    return false;
  },

  // Get user preferences
  getPreferences() {
    const user = this.getLoggedInUser();
    return user?.preferences || {
      emailNotifications: true,
      marketingEmails: true,
      twoFactorAuth: false
    };
  },

  // Calculate loyalty points
  getLoyaltyPoints() {
    const orders = this.getUserOrders();
    const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    return Math.floor(totalSpent / 100) * 10;
  },

  // Calculate total spent
  getTotalSpent() {
    const orders = this.getUserOrders();
    return orders.reduce((sum, order) => sum + (order.total || 0), 0);
  },

  // Logout user
  logout() {
    localStorage.removeItem("loggedInUser");
    return true;
  },

  // Get user profile picture
  getProfilePicture() {
    const user = this.getLoggedInUser();
    return user?.profileImage || this.getDefaultProfilePicture();
  },

  // Get default profile picture
  getDefaultProfilePicture() {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='40' r='30' fill='%23e99d11'/%3E%3Cellipse cx='50' cy='80' rx='40' ry='30' fill='%23e99d11'/%3E%3C/svg%3E";
  },

  // Get user stats
  getUserStats() {
    const orders = this.getUserOrders();
    const totalSpent = this.getTotalSpent();
    return {
      totalOrders: orders.length,
      totalSpent: totalSpent,
      loyaltyPoints: this.getLoyaltyPoints(),
      accountAge: this.getAccountAge()
    };
  },

  // Get account age in days
  getAccountAge() {
    const user = this.getLoggedInUser();
    if (user?.registeredDate) {
      const regDate = new Date(user.registeredDate);
      const today = new Date();
      const diffTime = Math.abs(today - regDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  }
};

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = ProfileService;
}
