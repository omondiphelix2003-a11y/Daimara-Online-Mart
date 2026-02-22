# Navigation System Guide

## Overview
The website has been updated to ensure all pages and buttons open in the **same tab by default**. External links (like Google Maps) open in new tabs only when intentionally requested.

---

## Key Changes Made

### 1. **Removed All `<base target="_blank">` Tags**
- **Before**: All links were forced to open in new tabs
- **After**: Links open in the same tab (same-tab navigation)
- **Files Updated**: 22 HTML files across the entire website

### 2. **Fixed Broken Navigation**
- Changed `home.html` references → `index.html`
- Fixed 4 critical broken links in:
  - login.html
  - contact.html
  - checkout.html

### 3. **Added Navigation Helper Script**
- **File**: `navigation-helper.js`
- **Purpose**: Ensures consistent navigation behavior across all pages
- **Benefits**:
  - All internal links open in same tab
  - External links (Google Maps, etc.) open in new tab with security (`rel="noopener noreferrer"`)
  - Better error handling and fallbacks
  - Automatic conversion of button navigation

---

## How to Use Buttons for Navigation

### Method 1: Using Anchor Tags with `href` (Recommended)
```html
<!-- Opens in same tab -->
<a href="cart.html">Go to Cart</a>

<!-- Opens in new tab (external) -->
<a href="https://www.example.com" target="_blank" rel="noopener noreferrer">External Link</a>
```

### Method 2: Using `data-href` Attribute on Buttons
```html
<!-- Same tab navigation -->
<button data-href="checkout.html">Proceed to Checkout</button>

<!-- New tab navigation (external) -->
<button data-href="https://example.com" class="external">Open External</button>
```

### Method 3: Using Buttons with JavaScript
```html
<!-- Using the navigate() function -->
<button onclick="navigate('cart.html')">Go to Cart</button>

<!-- Open in new tab -->
<button onclick="navigate('https://example.com', true)">Open in New Tab</button>
```

### Method 4: Wrapping Buttons in Anchor Tags
```html
<a href="checkout.html">
  <button>Proceed to Checkout</button>
</a>
```

---

## Navigation Functions Available

### `navigate(url, newTab = false)`
Safely navigate to a URL
```javascript
// Same tab
navigate('index.html');

// New tab
navigate('https://example.com', true);
```

### `goBack()`
Go back to previous page
```javascript
<button onclick="goBack()">Back</button>
```

### `goHome()`
Go to home page
```javascript
<button onclick="goHome()">Home</button>
```

---

## Page Navigation Map

### Home Page (index.html)
- **Logo** → index.html (home)
- **Shop Icon** → store.html
- **About** → about.html
- **Contact** → contact.html
- **User Icon** → login.html (or profile.html if logged in)
- **Cart Icon** → cart.html
- **Delivery Cards** → water refilling.html, gas-refill.html, grocery delivery.html
- **Products** → cart.html (Add to Cart)

### Shopping Pages
- **Supermarket** → supermarket.html
- **Second-hand Items** → second-hand items.html
- **Store** → store.html

### Checkout Flow
1. Add items → cart.html
2. Review cart → cart.html (view items)
3. Checkout → checkout.html
4. Payment → mpesa-payment.html (if M-Pesa selected)

### User Account
- **Login** → login.html
- **Profile** → profile.html (after login)
- **Logout** → index.html (redirects to home)

### Admin Pages
- **Admin Manager** → admin-manager.html (visible only for admin users)
- **Marketing Department** → Daimara Department Head – Marketing.html
- **Operator Department** → Daimara-operator.html
- **Delivery Manager** → delivery manager system.html
- **Other Departments** → Various department pages

---

## Special Cases

### Google Maps Links
- **Location**: Checkout page
- **Behavior**: Opens in new tab (external link)
- **Security**: Uses `rel="noopener noreferrer"` for safety

### External Payment Links
- **M-Pesa Payment**: mpesa-payment.html
- **Behavior**: Opens in same tab
- **Navigation**: Returns to previous page after payment

---

## Testing Checklist

✅ All internal links open in same tab
✅ External links open in new tab
✅ Back button works on all pages
✅ Home button works on all pages
✅ Cart navigation from all pages works
✅ Login/Profile navigation works
✅ Checkout flow completes successfully
✅ All delivery service pages load
✅ Product pages display correctly
✅ No broken links or 404 errors

---

## Best Practices for Future Development

1. **For Internal Links**: Use relative paths without `target="_blank"`
   ```html
   <a href="page.html">Link</a>
   ```

2. **For External Links**: Always add target and security attributes
   ```html
   <a href="https://external.com" target="_blank" rel="noopener noreferrer">External</a>
   ```

3. **For Button Navigation**: Wrap in anchor tag or use `navigate()` function
   ```html
   <!-- Good -->
   <a href="page.html"><button>Click</button></a>
   
   <!-- Also good -->
   <button onclick="navigate('page.html')">Click</button>
   ```

4. **Never Use**: `<base target="_blank">` as it affects all links
   ```html
   <!-- BAD - Don't use -->
   <base target="_blank">
   ```

---

## Troubleshooting

### Page Opens in Wrong Tab
- Check if link has unwanted `target="_blank"`
- Verify `navigation-helper.js` is loaded
- Check browser console for errors

### Button Doesn't Navigate
- Ensure button has `onclick` handler or is wrapped in `<a>` tag
- Check `data-href` attribute spelling
- Verify file path is correct

### External Link Opens in Same Tab
- Add `target="_blank"` attribute
- Verify `rel="noopener noreferrer"` is present

---

## Files Modified

- ✅ 22 HTML files - Removed `<base target="_blank">`
- ✅ auth-check.js - Added error handling
- ✅ data-manager.js - Added localStorage check
- ✅ checkout.html - Fixed Google Maps link
- ✅ admin-manager.html - Added security to external links
- ✅ Created: navigation-helper.js
- ✅ Created: 4 CSS files (cart.css, supermarket.css, etc.)

---

**Last Updated**: 2026-02-22
**Version**: 1.0
