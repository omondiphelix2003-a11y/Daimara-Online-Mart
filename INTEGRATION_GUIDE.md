# Product Management Integration Guide

## Overview
The add-product.html page is now fully integrated with your e-commerce platform (supermarket.html and second-hand items.html).

## How It Works

### 1. **Data Manager System**
- **File**: `data-manager.js` (created automatically)
- Centralized management of all products and cart data
- Uses browser localStorage for persistence
- All data syncs across pages automatically

### 2. **Adding Products**
When you add a product in `add-product.html`:
1. Select a main category (Supermarket or Second-hand)
2. Select a sub-category (will determine which page it appears on)
3. Upload a product image (stored as base64)
4. Fill in product details (name, price, quantity, description, etc.)
5. Click "Add Product"

**Products will automatically appear on:**
- Supermarket categories: Fresh food, Grocery, Beverage, Cereal, Liquor, Electronics, Furniture, Clothings
- Second-hand categories: Household items, Electronics, Furniture

### 3. **Managing Products**
The add-product.html page provides:
- **Add**: Create new products
- **Edit**: Modify existing products
- **Delete**: Remove products
- **Filter**: View products by category

### 4. **Data Synchronization**
All products added through add-product.html automatically:
- Appear on supermarket.html (for Supermarket items)
- Appear on second-hand items.html (for Second-hand items)
- Can be added to cart from either page
- Persist in localStorage (survives page refresh)

### 5. **File Structure**
```
add-product.html          ← Product management interface
data-manager.js           ← Centralized data manager
supermarket.html          ← Displays Supermarket products
second-hand items.html    ← Displays Second-hand products
cart.html                 ← Shopping cart
home.html                 ← Home page with link to manage products
```

### 6. **How to Access**
1. **From Home Page**: Click "Manage Products" link in navbar
2. **Direct URL**: Open `add-product.html` in your browser
3. Products added will immediately appear on store pages

## Product Data Structure

```javascript
{
  id: "unique_id",
  name: "Product Name",
  category: "Supermarket" or "Second-hand",
  subcategory: "Specific Category",
  price: 1000,
  quantity: 5,
  description: "Product description",
  sku: "SKU123",
  supplier: "Supplier Name",
  image: "base64_encoded_image",
  createdAt: "1/29/2026"
}
```

## Features

### Add Product Form
- Product name (required)
- Category selection (required)
- Sub-category selection (required) - determines where product appears
- Price in Ksh (required)
- Quantity (required)
- Product description (optional)
- SKU/Product code (optional)
- Supplier/Seller name (optional)
- Product image upload (required)

### Product Display
- Grid layout showing all added products
- Filter by category
- Display shows: Image, category badge, sub-category, name, SKU, supplier, quantity, date added, price
- Edit and Delete buttons for each product

### Edit Modal
- Update all product details
- Change product category/sub-category
- Update product image
- Preview current image before saving

## Storage Details

All data is stored in browser localStorage under these keys:
- `ecommerce_products`: Main product database organized by category
- `ecommerce_added_products`: Products added via add-product page
- `ecommerce_cart`: Current shopping cart items
- `ecommerce_user`: Currently logged-in user

## Integration Points

### supermarket.html & second-hand items.html
These pages automatically:
1. Load products from DataManager via `getAllProducts()`
2. Filter products by category when user clicks category link
3. Display all products (both pre-existing and newly added)
4. Allow adding products to cart
5. Refresh product list when page becomes visible

### Data Updates
When you:
- Add a product → Immediately visible on respective store page
- Edit a product → Changes reflect across all pages
- Delete a product → Removed from store and add-product page
- Add to cart → Cart updates across all pages

## Testing the Integration

1. Open `add-product.html`
2. Add a new product to "Supermarket" > "Fresh food"
3. Visit `supermarket.html` → go to "Fresh food" category
4. Your product should appear in the product list
5. You can add it to cart and proceed to checkout

## Notes

- All images are stored as base64 in localStorage (avoid adding too many large images)
- Data persists as long as localStorage is not cleared
- Each product gets a unique ID automatically
- Products are grouped by sub-category on store pages
- Cart functionality works across all pages

## Troubleshooting

**Products not appearing?**
- Check browser console for errors (F12)
- Ensure data-manager.js is loaded
- Clear browser cache and try again

**Images not showing?**
- Ensure image file is selected before submitting
- Check file size (very large images may cause performance issues)

**Data lost after page refresh?**
- localStorage may have been cleared
- Check browser storage settings
