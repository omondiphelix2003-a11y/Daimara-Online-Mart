/**
 * auth-check.js
 * Handles conditional UI elements based on user authentication status
 */
document.addEventListener("DOMContentLoaded", function() {
  const currentUser = DataManager.getCurrentUser();
  const navCenter = document.querySelector(".nav-center");
  const navbarLinks = document.querySelector(".navbar div:nth-child(2)"); // For store.html style
  const navRight = document.querySelector(".nav-right") || document.querySelector(".nav-icons");

  // Handle User Icon redirection to Profile
  const userIconLink = document.querySelector(".fa-user")?.parentElement;
  if (currentUser && userIconLink) {
    userIconLink.href = "profile.html";
    userIconLink.title = "View Profile";
  }

  // Helper: check if the logged in email has an operator page registration
  function hasOperatorRegistration(email) {
    if (!email || typeof DataManager === 'undefined' || !DataManager.getPageRegistrations) return false;
    const regs = DataManager.getPageRegistrations();
    return regs.some(r => r.type === 'operator' && r.email === email && r.status === 'approved');
  }

  function hasMedicoreRegistration(email) {
    if (!email || typeof DataManager === 'undefined' || !DataManager.getPageRegistrations) return false;
    const regs = DataManager.getPageRegistrations();
    return regs.some(r => r.type === 'medicore' && r.email === email && r.status === 'approved');
  }

  // Handle Dashboard Icons for Different Roles
  if (currentUser && navRight) {
    const knownOperator = currentUser.role === 'operator' || hasOperatorRegistration(currentUser.email);
    const knownMedicore = currentUser.role === 'medicore_operator' || hasMedicoreRegistration(currentUser.email);
    const knownDelivery = currentUser.role === 'delivery';
    const isAdmin = currentUser.role === 'admin' || currentUser.email === "omondiphelix2003@gmail.com";

    const addDashboardIcon = (href, title, iconClass) => {
      const link = document.createElement("a");
      link.href = href;
      link.title = title;
      link.innerHTML = `<i class="fas ${iconClass}"></i>`;
      link.className = "dashboard-nav-link";
      link.style.marginLeft = "10px";
      navRight.insertBefore(link, navRight.firstChild);
    };

    if (isAdmin) {
      addDashboardIcon("admin-manager.html", "Admin Dashboard", "fa-user-shield");
    }
    if (knownMedicore) {
      addDashboardIcon("medicore panel(for operators).html", "MediCore Operator Dashboard", "fa-hand-holding-medical");
    }
    if (knownOperator) {
      addDashboardIcon("Operator's Dashboard-for businesses.html", "Operator Dashboard", "fa-briefcase");
    }
    if (knownDelivery) {
      addDashboardIcon("Delivery services.html", "Delivery Dashboard", "fa-truck");
    }
  }

  // Global Cart Badge Update
  updateGlobalCartBadges();

  // Listen for cart updates in current window
  window.addEventListener('cartUpdated', updateGlobalCartBadges);
  
  // Listen for cart updates from other tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'ecommerce_cart') updateGlobalCartBadges();
  });
});

function updateGlobalCartBadges() {
  if (typeof DataManager === 'undefined') return;
  const cartItems = DataManager.getCart();
  const totalQty = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
  
  const badges = document.querySelectorAll('#cartBadge, #bottomCartBadge, .cart-badge');
  badges.forEach(badge => {
    if (totalQty > 0) {
      badge.innerText = totalQty;
      badge.style.display = 'block';
    } else {
      badge.style.display = 'none';
    }
  });
}

// Global click handler to close dropdowns/toggles
document.addEventListener('click', (e) => {
    // Nav links toggle
    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && (!navToggle || !navToggle.contains(e.target))) {
            navLinks.classList.remove('active');
        }
    }

    // Generic dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-content, .dropdown-menu');
    dropdowns.forEach(dd => {
        if (dd.style.display === 'block' || dd.classList.contains('show')) {
            const parent = dd.parentElement;
            if (!parent.contains(e.target)) {
                dd.style.display = 'none';
                dd.classList.remove('show');
            }
        }
    });
});

// Export for use in other scripts
window.updateGlobalCartBadges = updateGlobalCartBadges;
window.updateCartBadge = updateGlobalCartBadges; // alias for compatibility
