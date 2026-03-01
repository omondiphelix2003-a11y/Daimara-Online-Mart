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

  // Handle Dashboard Icons for Different Roles
  if (currentUser && navRight) {
    let dashboardLink = null;
    
    if (currentUser.role === 'admin' || currentUser.email === "omondiphelix2003@gmail.com") {
      dashboardLink = document.createElement("a");
      dashboardLink.href = "admin-manager.html";
      dashboardLink.title = "Admin Dashboard";
      dashboardLink.innerHTML = '<i class="fas fa-user-shield"></i>';
    } else if (currentUser.role === 'operator') {
      dashboardLink = document.createElement("a");
      dashboardLink.href = "Operator's Dashboard-for businesses.html";
      dashboardLink.title = "Operator Dashboard";
      dashboardLink.innerHTML = '<i class="fas fa-briefcase"></i>';
    } else if (currentUser.role === 'delivery') {
      dashboardLink = document.createElement("a");
      dashboardLink.href = "Delivery services.html";
      dashboardLink.title = "Delivery Dashboard";
      dashboardLink.innerHTML = '<i class="fas fa-truck"></i>';
    }

    if (dashboardLink) {
      dashboardLink.className = "dashboard-nav-link";
      dashboardLink.style.marginLeft = "10px";
      // Insert as first child of navRight/navIcons to maintain order
      navRight.insertBefore(dashboardLink, navRight.firstChild);
    }
  }

  // Global Cart Badge Update
  updateGlobalCartBadges();
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
