# Quick Reference - Add-Product Integration

## Files Created/Modified

| File | Status | Purpose |
|------|--------|---------|
| `data-manager.js` | ✅ CREATED | Core data management system |
| `add-product.html` | ✅ UPDATED | Product management interface |
| `index.html` | ✅ UPDATED | Added "Manage Products" link |
| `supermarket.html` | ✅ READY | Displays products via DataManager |
| `second-hand items.html` | ✅ READY | Displays products via DataManager |

## DataManager API Methods

```javascript
// Get all products by category
DataManager.getAllProducts() → Object

// Add product from add-product page
DataManager.addProductFromAddPage(product) → {success, message}

// Update existing product
DataManager.updateProduct(id, data) → {success, message}

// Delete product
DataManager.deleteProduct(id) → {success, message}

// Cart operations
DataManager.getCart() → Array
DataManager.addToCart(product) → {success, message}
DataManager.removeFromCart(id) → {success, message}
DataManager.updateCartQuantity(id, qty) → {success, message}
DataManager.clearCart() → {success, message}

// User operations
DataManager.getCurrentUser() → Object|null
DataManager.setCurrentUser(user) → {success}
DataManager.logout() → {success}

// Utility
DataManager.getAddedProducts() → Array
DataManager.clearAllData() → {success}
```

## Product Object Structure

```javascript
{
  id: "abc123def",              // Unique identifier (auto-generated)
  name: "Product Name",         // Product name
  category: "Supermarket",      // Main category
  subcategory: "Fresh food",    // Sub-category (determines page)
  price: 500,                   // Price in Ksh
  quantity: 10,                 // Stock quantity
  description: "...",           // Product description
  sku: "SKU-001",              // SKU/Product code
  supplier: "Supplier Name",    // Supplier name
  image: "data:image/...",     // Base64 encoded image
  createdAt: "1/29/2026"       // Creation date
}
```

## Sub-Category Mapping

### Supermarket (appears on supermarket.html)
- Fresh food
- Grocery
- Beverage
- Cereal
- Liquor
- Electronics
- Furniture
- Clothings

### Second-hand (appears on second-hand items.html)
- Household items
- Electronics
- Furniture

## localStorage Keys

```javascript
// Main product database
localStorage.getItem('ecommerce_products')
// Returns: {categoryName: [products...]}

// Products added via add-product page
localStorage.getItem('ecommerce_added_products')
// Returns: [product...]

// Shopping cart items
localStorage.getItem('ecommerce_cart')
// Returns: [cartItem...]

// Current user
localStorage.getItem('ecommerce_user')
// Returns: {user...}
```

## Common Operations

### Add a Product Programmatically
```javascript
const product = {
  name: "Rice 5kg",
  category: "Supermarket",
  subcategory: "Grocery",
  price: 300,
  quantity: 50,
  description: "High quality rice",
  image: "data:image/..." // Base64
};

const result = DataManager.addProductFromAddPage(product);
if (result.success) {
  console.log("Product added!");
}
```

### Get All Products in Category
```javascript
const allProducts = DataManager.getAllProducts();
const groceryItems = allProducts['Grocery']; // Get specific category
```

### Update Product
```javascript
DataManager.updateProduct('product-id', {
  price: 350,
  quantity: 45
});
```

### Delete Product
```javascript
DataManager.deleteProduct('product-id');
```

## Integration Workflow

```
User opens add-product.html
         ↓
User fills form and uploads image
         ↓
Form submission handler converts image to base64
         ↓
DataManager.addProductFromAddPage() is called
         ↓
Product saved to localStorage (both products & added_products)
         ↓
Success message shown
         ↓
User navigates to supermarket.html or second-hand items.html
         ↓
Page loads products via DataManager.getAllProducts()
         ↓
Product appears in correct category ✓
```

## Page Navigation

```
index.html
  ├─ "Manage Products" → add-product.html
  ├─ "Shop" → store.html
  ├─ "About" → about.html
  └─ "Contact" → contact.html

add-product.html
  └─ Shows all products
    └─ Can add, edit, delete products
    └─ Products auto-sync to store pages

supermarket.html
  └─ Displays "Supermarket" category products
    └─ Can view, add to cart

second-hand items.html
  └─ Displays "Second-hand" category products
    └─ Can view, add to cart

cart.html
  └─ Shows cart items from any page
```

## Success Indicators

✅ When you add a product:
- Green success message appears
- Product shows in add-product.html product list
- Visits supermarket/second-hand page shows it in category
- Can add to cart and purchase

✅ When you edit a product:
- Changes save and display immediately
- Appears on store pages with updates
- Cart reflects price/details if in cart

✅ When you delete a product:
- Disappears from add-product.html
- No longer appears on store pages
- Removed from cart if there

## Browser Console Commands (for debugging)

```javascript
// Check all products
DataManager.getAllProducts()

// Check cart
DataManager.getCart()

// Check added products
DataManager.getAddedProducts()

// Clear all data (CAUTION!)
DataManager.clearAllData()

// Check localStorage directly
localStorage.getItem('ecommerce_products')
localStorage.getItem('ecommerce_cart')
```

## Performance Notes

- Images stored as base64 (consider file size)
- localStorage has ~5-10MB limit
- More than 100 products may slow down page
- Clear old products periodically if needed

---

**For complete documentation**: See `INTEGRATION_GUIDE.md`
**For setup status**: See `SETUP_COMPLETE.md`
