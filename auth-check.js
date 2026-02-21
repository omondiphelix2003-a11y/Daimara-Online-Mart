/**
 * auth-check.js
 * Handles conditional UI elements based on user authentication status
 */
document.addEventListener("DOMContentLoaded", function() {
  const currentUser = DataManager.getCurrentUser();
  const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('daimara.project/');
  const navCenter = document.querySelector(".nav-center");
  const navbarLinks = document.querySelector(".navbar div:nth-child(2)"); // For Shop.html style
  const navRight = document.querySelector(".nav-right") || document.querySelector(".nav-icons");

  // Handle User Icon redirection to Profile
  const userIconLink = document.querySelector(".fa-user")?.parentElement;
  if (currentUser && userIconLink) {
    userIconLink.href = "profile.html";
    userIconLink.title = "View Profile";
  }

  if (currentUser && currentUser.email === "omondiphelix2003@gmail.com" && isHomePage) {
    // Add Admin Manager icon link only on home page
    const adminLink = document.createElement("a");
    adminLink.href = "admin-manager.html";
    adminLink.innerHTML = '<i class="fa fa-cogs"></i>';
    adminLink.title = "Admin Manager";
    adminLink.style.fontSize = "55px";
    adminLink.style.color = "rgb(233, 157, 17)";
    adminLink.className = "admin-nav-link";

    if (navCenter) {
      navCenter.appendChild(adminLink);
    }
  }
});
