/**
 * Profile Styles Module
 * CSS classes for profile components
 */

const ProfileStyles = `
/* Profile Card Component */
.profile-card-component {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  padding: 40px;
  border-radius: 12px;
  display: flex;
  gap: 30px;
  align-items: center;
  color: white;
  margin-bottom: 30px;
}

.profile-card-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgb(233, 157, 17);
  flex-shrink: 0;
  background: white;
}

.profile-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-card-info h2 {
  margin: 0 0 10px 0;
  font-size: 32px;
  font-weight: 700;
}

.profile-card-email {
  margin: 5px 0;
  opacity: 0.9;
  font-size: 16px;
}

.profile-card-member {
  font-size: 13px;
  opacity: 0.7;
  margin-top: 10px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: linear-gradient(135deg, rgba(233, 157, 17, 0.1) 0%, rgba(230, 126, 34, 0.05) 100%);
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid rgb(233, 157, 17);
  display: flex;
  gap: 15px;
  align-items: center;
}

.stat-icon {
  font-size: 32px;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.stat-label {
  font-size: 13px;
  color: #7f8c8d;
  margin: 0;
}

/* Order Card Component */
.order-card-component {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid rgb(233, 157, 17);
  margin-bottom: 15px;
}

.order-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
}

.order-id {
  font-weight: 600;
  color: #2c3e50;
  font-size: 16px;
}

.order-status {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.order-status.status-pending {
  background: #fff3cd;
  color: #856404;
}

.order-status.status-processing {
  background: #d1ecf1;
  color: #0c5460;
}

.order-status.status-shipped {
  background: #cce5ff;
  color: #004085;
}

.order-status.status-delivered {
  background: #d4edda;
  color: #155724;
}

.order-card-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.order-card-detail {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.order-card-detail .label {
  font-size: 12px;
  color: #7f8c8d;
  font-weight: 600;
}

.order-card-detail .value {
  color: #2c3e50;
  font-weight: 600;
}

/* Address Card Component */
.address-card-component {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid rgb(233, 157, 17);
  position: relative;
}

.address-card-label {
  font-weight: 700;
  color: rgb(233, 157, 17);
  margin-bottom: 10px;
  font-size: 16px;
}

.address-card-street,
.address-card-city {
  color: #2c3e50;
  margin: 8px 0;
  line-height: 1.5;
  font-size: 14px;
}

.address-card-phone {
  color: #7f8c8d;
  font-size: 13px;
  margin-top: 10px;
}

.address-card-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

/* Favorite Card Component */
.favorites-grid-component {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.favorite-card-component {
  background: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.favorite-card-component:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.favorite-card-image {
  width: 100%;
  height: 200px;
  background: white;
  overflow: hidden;
}

.favorite-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-card-info {
  padding: 15px;
}

.favorite-card-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 14px;
}

.favorite-card-price {
  color: rgb(233, 157, 17);
  font-weight: 700;
  margin-bottom: 10px;
}

.favorite-card-actions {
  display: flex;
  gap: 8px;
}

/* Forms */
.profile-form-component,
.address-form-component {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

.form-group input {
  padding: 12px 15px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: rgb(233, 157, 17);
  box-shadow: 0 0 0 3px rgba(233, 157, 17, 0.1);
}

/* Buttons */
.btn {
  padding: 11px 22px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  font-family: inherit;
}

.btn-primary {
  background: linear-gradient(135deg, rgb(233, 157, 17) 0%, #e67e22 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(233, 157, 17, 0.3);
}

.btn-secondary {
  background: #34495e;
  color: white;
}

.btn-secondary:hover {
  background: #2c3e50;
  transform: translateY(-2px);
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background: #c0392b;
  transform: translateY(-2px);
}

.btn-small {
  padding: 8px 12px;
  font-size: 12px;
}

/* Utilities */
.no-data {
  text-align: center;
  padding: 40px 20px;
  color: #7f8c8d;
}

.no-data p {
  font-size: 18px;
  margin-bottom: 20px;
}

/* Notifications */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 6px;
  color: white;
  z-index: 3000;
  animation: slideIn 0.3s ease;
}

.notification-success {
  background: #27ae60;
}

.notification-error {
  background: #e74c3c;
}

.notification-info {
  background: #3498db;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Modal */
.custom-modal {
  display: flex;
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
}

.custom-modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
}

.custom-modal-content h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
}

.custom-modal-body {
  margin-bottom: 20px;
  color: #555;
}

.custom-modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}


`;

// Inject styles into page
function injectProfileStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = ProfileStyles;
  document.head.appendChild(styleElement);
}

// Auto-inject on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectProfileStyles);
} else {
  injectProfileStyles();
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = ProfileStyles;
}
