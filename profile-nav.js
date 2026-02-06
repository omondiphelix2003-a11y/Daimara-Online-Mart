// Shared profile functions across all pages
function updateProfileNav() {
  const loggedInUser = DataManager.getCurrentUser();
  const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('daimara.project/');
  
  // Update profile icon in navbar if it exists
  const profileIcon = document.getElementById("profile-icon");
  const loginBtn = document.getElementById("login-btn");
  
  // LOGIN BUTTON: Show ONLY on home page
  if (loginBtn) {
    if (isHomePage) {
      // Show login button on home page
      loginBtn.style.display = "inline-block";
    } else {
      // Hide login button on all other pages
      loginBtn.style.display = "none";
    }
  }
  
  // PROFILE ICON: Show only on home page when logged in
  if (profileIcon) {
    if (loggedInUser && isHomePage) {
      // User is logged in on home page - show profile icon
      profileIcon.style.display = "inline-block";
      
      // Update profile picture if available
      if (loggedInUser.profileImage) {
        profileIcon.innerHTML = `<img src="${loggedInUser.profileImage}" alt="Profile" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover; cursor: pointer;">`;
      } else {
        profileIcon.innerHTML = `<span style="font-size: 20px; color: rgb(233, 157, 17);">👤</span>`;
      }
    } else {
      // Hide profile icon on all other pages and when not logged in
      profileIcon.style.display = "none";
    }
  }
}

// Logout function available globally
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    DataManager.logoutUser();
    alert("You have been logged out");
    window.location.href = "index.html";
  }
}

// Initialize profile nav when page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function() {
    setTimeout(updateProfileNav, 100);
  });
} else {
  setTimeout(updateProfileNav, 100);
}

// Also update on storage changes (when logged in from another tab)
window.addEventListener("storage", function() {
  updateProfileNav();
});
