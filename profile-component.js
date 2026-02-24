/**
 * Profile Component Module
 * Reusable profile display components
 */

const ProfileComponent = {
  // Display user profile card
  renderProfileCard(container, user) {
    const defaultImage = ProfileService.getDefaultProfilePicture();
    const html = `
      <div class="profile-card-component">
        <div class="profile-card-image">
          <img src="${user.profileImage || defaultImage}" alt="${user.name}">
        </div>
        <div class="profile-card-info">
          <h2>${user.name}</h2>
          <p class="profile-card-email">${user.email}</p>
          <p class="profile-card-member">Member since ${this.getFormattedDate(user.registeredDate)}</p>
        </div>
      </div>
    `;
    container.innerHTML = html;
  },

  // Display user stats
  renderUserStats(container, stats) {
    const html = `
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-icon">📦</span>
          <div class="stat-info">
            <p class="stat-value">${stats.totalOrders}</p>
            <p class="stat-label">Total Orders</p>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">💰</span>
          <div class="stat-info">
            <p class="stat-value">KSH ${stats.totalSpent.toLocaleString()}</p>
            <p class="stat-label">Total Spent</p>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">⭐</span>
          <div class="stat-info">
            <p class="stat-value">${stats.loyaltyPoints}</p>
            <p class="stat-label">Loyalty Points</p>
          </div>
        </div>
      </div>
    `;
    container.innerHTML = html;
  },

  // Display orders list
  renderOrders(container, orders) {
    if (orders.length === 0) {
      container.innerHTML = '<div class="no-data"><p>📦 No orders yet</p></div>';
      return;
    }

    let html = '';
    orders.forEach((order, index) => {
      const orderDate = new Date(order.date || Date.now()).toLocaleDateString();
      const statusClass = `status-${order.status?.toLowerCase() || 'pending'}`;
      html += `
        <div class="order-card-component">
          <div class="order-card-header">
            <div class="order-id">Order #${(index + 1).toString().padStart(4, '0')}</div>
            <span class="order-status ${statusClass}">${order.status || 'Pending'}</span>
          </div>
          <div class="order-card-details">
            <div class="order-card-detail">
              <span class="label">Order Date:</span>
              <span class="value">${orderDate}</span>
            </div>
            <div class="order-card-detail">
              <span class="label">Items:</span>
              <span class="value">${order.items?.length || 0}</span>
            </div>
            <div class="order-card-detail">
              <span class="label">Total:</span>
              <span class="value">KSH ${(order.total || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  },

  // Display addresses
  renderAddresses(container, addresses, onEdit, onDelete) {
    if (addresses.length === 0) {
      container.innerHTML = '<div class="no-data"><p>📍 No addresses added yet</p></div>';
      return;
    }

    let html = '';
    addresses.forEach((address, index) => {
      html += `
        <div class="address-card-component">
          <div class="address-card-label">${address.label}</div>
          <div class="address-card-street">${address.street}</div>
          <div class="address-card-city">${address.city}, ${address.postal}</div>
          <div class="address-card-phone">📞 ${address.phone}</div>
          <div class="address-card-actions">
            <button class="btn btn-small" onclick="if(${onEdit})${onEdit}(${index})">Edit</button>
            <button class="btn btn-small btn-danger" onclick="if(${onDelete})${onDelete}(${index})">Delete</button>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  },

  // Display favorites
  renderFavorites(container, favorites, onAddCart, onRemove) {
    if (favorites.length === 0) {
      container.innerHTML = '<div class="no-data"><p>❤️ No favorite products yet</p></div>';
      return;
    }

    let html = '<div class="favorites-grid-component">';
    favorites.forEach((product, index) => {
      html += `
        <div class="favorite-card-component">
          <div class="favorite-card-image">
            <img src="${product.image || 'placeholder.jpg'}" alt="${product.name}">
          </div>
          <div class="favorite-card-info">
            <div class="favorite-card-name">${product.name}</div>
            <div class="favorite-card-price">KSH ${(product.price || 0).toLocaleString()}</div>
            <div class="favorite-card-actions">
              <button class="btn btn-small" onclick="if(${onAddCart})${onAddCart}(${index})">Cart</button>
              <button class="btn btn-small btn-danger" onclick="if(${onRemove})${onRemove}(${index})">Remove</button>
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  },

  // Display profile form
  renderProfileForm(container, user, onSubmit) {
    const html = `
      <form class="profile-form-component" onsubmit="if(${onSubmit})${onSubmit}(event)">
        <div class="form-group">
          <label>Full Name:</label>
          <input type="text" id="profile-form-name" value="${user.name}" required>
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" id="profile-form-email" value="${user.email}" required>
        </div>
        <div class="form-group">
          <label>Phone:</label>
          <input type="tel" id="profile-form-phone" value="${user.phone || ''}">
        </div>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </form>
    `;
    container.innerHTML = html;
  },

  // Display address form
  renderAddressForm(container, address = null, onSubmit) {
    const defaultValues = address || { label: '', street: '', city: '', postal: '', phone: '' };
    const html = `
      <form class="address-form-component" onsubmit="if(${onSubmit})${onSubmit}(event)">
        <div class="form-group">
          <label>Address Label:</label>
          <input type="text" id="address-label" value="${defaultValues.label}" required>
        </div>
        <div class="form-group">
          <label>Street Address:</label>
          <input type="text" id="address-street" value="${defaultValues.street}" required>
        </div>
        <div class="form-group">
          <label>City:</label>
          <input type="text" id="address-city" value="${defaultValues.city}" required>
        </div>
        <div class="form-group">
          <label>Postal Code:</label>
          <input type="text" id="address-postal" value="${defaultValues.postal}" required>
        </div>
        <div class="form-group">
          <label>Phone:</label>
          <input type="tel" id="address-phone" value="${defaultValues.phone}" required>
        </div>
        <button type="submit" class="btn btn-primary">Save Address</button>
      </form>
    `;
    container.innerHTML = html;
  },

  // Get form data
  getFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return null;
    const formData = new FormData(form);
    return Object.fromEntries(formData);
  },

  // Format date
  getFormattedDate(dateString) {
    if (!dateString) return new Date().toLocaleDateString();
    return new Date(dateString).toLocaleDateString();
  },

  // Show notification
  showNotification(message, type = 'success') {
    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    notif.textContent = message;
    notif.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
      color: white;
      border-radius: 6px;
      z-index: 3000;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
  },

  // Show modal
  showModal(title, content, onConfirm) {
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
      <div class="custom-modal-content">
        <h2>${title}</h2>
        <div class="custom-modal-body">${content}</div>
        <div class="custom-modal-actions">
          <button class="btn btn-primary" onclick="this.closest('.custom-modal').remove(); if(${onConfirm})${onConfirm}()">Confirm</button>
          <button class="btn btn-secondary" onclick="this.closest('.custom-modal').remove()">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
};

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = ProfileComponent;
}
