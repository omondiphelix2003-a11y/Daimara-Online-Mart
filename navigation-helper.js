/**
 * navigation-helper.js
 * Ensures all navigation happens in same tab unless explicitly requested for new tab
 * Handles button clicks and link navigation
 */

document.addEventListener('DOMContentLoaded', function() {
  try {
    // Convert all links to same-tab navigation unless they explicitly request new tab
    const allLinks = document.querySelectorAll('a[href]');
    allLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Check if this is an internal link that should stay in same tab
      if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('javascript:')) {
        // Remove any unintentional target="_blank"
        if (link.target === '_blank' && !link.hasAttribute('data-external')) {
          link.target = '_self';
        }
      }
      
      // Handle external links properly
      if (href && (href.startsWith('http') || href.startsWith('//'))) {
        if (!link.getAttribute('rel')?.includes('noopener')) {
          link.setAttribute('rel', 'noopener noreferrer');
        }
      }
    });

    // Ensure all buttons have proper navigation
    const allButtons = document.querySelectorAll('button:not([type="submit"])');
    allButtons.forEach(button => {
      // If button has onclick but no href, that's fine (handled by onclick)
      // If button should be a link, add data attribute to convert it
      if (button.hasAttribute('data-href')) {
        const dataHref = button.getAttribute('data-href');
        button.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (dataHref.startsWith('http') || dataHref.startsWith('//')) {
            window.open(dataHref, '_blank', 'noopener,noreferrer');
          } else {
            window.location.href = dataHref;
          }
        });
      }
    });

    // Handle delivery card buttons
    const deliveryButtons = document.querySelectorAll('.delivery-card button, .delivery button');
    deliveryButtons.forEach(button => {
      if (!button.onclick) {
        const link = button.closest('a');
        if (link) {
          button.addEventListener('click', function(e) {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href) {
              window.location.href = href;
            }
          });
        }
      }
    });

    // Verify cart functionality
    const cartButtons = document.querySelectorAll('[data-cart], .add-to-cart, .add-cart');
    cartButtons.forEach(btn => {
      if (btn.tagName === 'A') {
        // Make sure links with cart functionality don't navigate
        btn.addEventListener('click', function(e) {
          if (!btn.hasAttribute('href') || btn.getAttribute('href') === '#') {
            e.preventDefault();
          }
        });
      }
    });

  } catch (error) {
    console.warn('Navigation helper initialization error:', error);
  }
});

/**
 * Safe navigation function for button clicks
 * @param {string} url - The URL to navigate to
 * @param {boolean} newTab - Whether to open in new tab (default: false)
 */
function navigate(url, newTab = false) {
  try {
    if (!url) {
      console.warn('Navigation: No URL provided');
      return;
    }

    if (newTab) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  } catch (error) {
    console.error('Navigation error:', error);
  }
}

/**
 * Go back to previous page
 */
function goBack() {
  window.history.back();
}

/**
 * Go to home page
 */
function goHome() {
  navigate('index.html');
}
