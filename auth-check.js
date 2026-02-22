/**
 * auth-check.js
 * Handles conditional UI elements based on user authentication status
 */
document.addEventListener("DOMContentLoaded", function() {
  try {
    const currentUser = DataManager && typeof DataManager.getCurrentUser === 'function' ? DataManager.getCurrentUser() : null;
    const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('daimara.project/');
    const navCenter = document.querySelector(".nav-center");
    const navRight = document.querySelector(".nav-right") || document.querySelector(".nav-icons");

    if (currentUser && navRight) {
      const userIconLink = navRight.querySelector("a .fa-user")?.parentElement || navRight.querySelector("a[href*='profile']") || navRight.querySelector("a[href*='login']");
      if (userIconLink) {
        userIconLink.href = "profile.html";
        userIconLink.title = "View Profile";
      }
    }

    if (currentUser && currentUser.email === "omondiphelix2003@gmail.com" && isHomePage && navCenter) {
      const adminLink = document.createElement("a");
      adminLink.href = "admin-manager.html";
      adminLink.innerHTML = '<i class="fa fa-cogs"></i>';
      adminLink.title = "Admin Manager";
      adminLink.style.fontSize = "55px";
      adminLink.style.color = "rgb(233, 157, 17)";
      adminLink.className = "admin-nav-link";
      navCenter.appendChild(adminLink);
    }
  } catch (error) {
    console.warn('Auth check initialization error:', error);
  }
});
