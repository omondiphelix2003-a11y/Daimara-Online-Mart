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

  if (currentUser && currentUser.email === "omondiphelix2003@gmail.com") {
    // Add Admin Manager link if it doesn't exist
    const adminLink = document.createElement("a");
    adminLink.href = "admin-manager.html";
    adminLink.textContent = "Admin Manager";
    adminLink.style.color = "rgb(233, 157, 17)";
    adminLink.style.fontWeight = "bold";
    adminLink.className = "admin-nav-link";

    if (navCenter) {
      navCenter.appendChild(adminLink);
    } else if (navbarLinks) {
      // For store.html which has a slightly different structure
      navbarLinks.appendChild(adminLink);
    }
  }
});
