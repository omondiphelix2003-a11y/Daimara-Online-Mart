# Admin Manager Setup Guide

## Overview
Your Daimara Online Mart now has a complete admin management system. This guide explains how to set up and use the admin panel.

## Quick Start

### 1. Access Admin Panel
- Navigate to `admin-manager.html` 
- Or click the **🔐 Admin Manager** link in the dropdown menu (appears after login)

### 2. Create Admin User
Currently, any logged-in user can see the admin link, but only admin-designated users can access the admin panel.

**To make a user an admin:**

Open browser Developer Tools (F12) and run:
```javascript
// Get a user by email
const users = DataManager.getAllUsers();
const user = users.find(u => u.email === "user@example.com");
console.log(user);

// Set user as admin
DataManager.setUserAsAdmin(user.id, true);
```

Or use the console shortcut:
```javascript
// Make first user an admin
const users = DataManager.getAllUsers();
if (users.length > 0) {
  DataManager.setUserAsAdmin(users[0].id, true);
  alert("User " + users[0].name + " is now an admin!");
}
```

### 3. Default Admin Email
The system recognizes `admin@daimara.com` as a default admin email. If you create an account with this email, you'll automatically have admin access.

## Admin Dashboard Tabs

### 📊 Dashboard
- **Total Users**: Count of registered users
- **Total Orders**: Number of all orders placed
- **Total Revenue**: Sum of all completed orders
- **Total Profit**: Revenue minus warehouse value and operating costs
- **Warehouse Value**: Total value of products in warehouse
- **Pending Emails**: Unread client emails

**Charts:**
- **Revenue Trend** (7-day line chart)
- **Order Status** (pie chart: pending/processing/completed/cancelled)

### 📦 Orders
- View all orders with filtering by status
- **Statuses**: All, Pending, Processing, Completed, Cancelled
- **View Details**: Click any order to see full details, items, and customer info
- **Update Status**: Change order status directly from the interface
- **Status Workflow**: pending → processing → completed → cancelled

### 🏪 Warehouse
- **Add Products**: Add inventory items with quantities
- **Manage Stock**: Update quantities or remove products
- **Push to Shop**: Move products from warehouse to the live website shop
- **Inventory Tracking**: See all warehouse items and their values

**Key Feature**: Products in warehouse are separate from website products. Once you "Push to Website", they become available for customers to purchase.

### 📄 Invoices
- Automatically generated from orders
- **View Invoice**: See formatted invoice with all details
- **Print Invoice**: Print to PDF or paper for customer delivery
- **Customer Information**: Name, email, phone, address all included

### 📧 Emails
- **Client Messages**: Receive and view emails from logged-in customers
- **Read/Unread Status**: Track which emails you've read
- **Admin Notes**: Add responses and notes to emails
- **Email Organization**: See sender info, subject, message, and date

### 💰 Profits & Losses
- **Total Revenue**: Sum of all completed orders
- **Warehouse Value**: Total inventory value (at 40% cost)
- **Operating Costs**: 10% of revenue
- **Net Profit**: Revenue - Warehouse Value - Operating Costs
- **Profit Margin**: Profit percentage
- **Detailed Analysis**: Breakdown of all financial metrics

### 👥 Signups
- **User Registrations**: List of all registered users
- **User Details**: View profile, email, registration date
- **User Count**: Track growth of your customer base

## Features Explained

### Warehouse Management
The warehouse is a separate inventory system:
1. **Add Products**: New products are added to warehouse storage
2. **Manage Quantities**: Update stock levels as products arrive/leave
3. **Push to Website**: Transfer products from warehouse to the live shop
4. **Separate from Shop**: Website products and warehouse products are independent

**Workflow:**
```
Supplier sends products
    ↓
Add to Warehouse
    ↓
Update quantities as needed
    ↓
Push to Website when ready to sell
    ↓
Customer purchases from website
    ↓
Order appears in Orders tab
    ↓
Update order status
    ↓
Generate Invoice
```

### Order Management
Orders come from customer purchases on the website:
1. New orders appear as **Pending**
2. Update to **Processing** when picking items
3. Update to **Completed** when shipped
4. Update to **Cancelled** if customer requests

### Invoice System
Invoices are automatically created from orders:
- **Auto-generated**: One invoice per order
- **Complete Details**: Customer info, items, totals, tax, shipping
- **Printable**: Print directly to PDF or paper
- **Professional Format**: Ready for customer delivery

### Profit Analysis
Financial metrics are calculated as follows:
```
Total Revenue = Sum of all completed order totals
Warehouse Value = Sum of (product price × quantity) for all warehouse items
Operating Costs = 10% of Total Revenue
Net Profit = Total Revenue - Warehouse Value - Operating Costs
Profit Margin = (Net Profit / Total Revenue) × 100%
```

## Data Storage
All admin data is stored in browser LocalStorage:
- **Warehouse**: Stored separately from website products
- **Invoices**: Generated from orders automatically
- **Emails**: Stored with timestamps and read status
- **Profit Data**: Calculated from orders and warehouse in real-time

⚠️ **Note**: LocalStorage clears with browser data. For production, integrate with a backend database.

## Removed/Disabled Features
- **add-product.html**: Now redirects to admin-manager.html
- All product management is consolidated in the admin panel warehouse

## Security Notes
- Admin panel requires login
- Only admin-designated users can access
- Consider setting `admin@daimara.com` as a default admin account
- In production, add proper authentication and role-based access control

## Troubleshooting

### "You do not have permission to access the admin panel"
**Solution**: Make yourself an admin using the developer console (see section 2 above)

### Admin link doesn't appear in dropdown
**Solution**: Make sure you're logged in. The admin link appears in the profile dropdown after login.

### Warehouse products don't appear on website
**Solution**: Click "Push to Website" button in the warehouse tab to transfer products.

### Charts not showing
**Solution**: Make sure Chart.js library is loaded. Check browser console for errors.

## Next Steps
1. Create an admin account and log in
2. Add products to the warehouse
3. Push products to the website shop
4. Create test orders and manage them
5. Generate invoices
6. View profit analysis

## Support
For issues or features requests, review the code comments in:
- [admin-manager.html](admin-manager.html)
- [admin-manager.js](admin-manager.js)
- [admin-manager.css](admin-manager.css)
- [data-manager.js](data-manager.js)

---

**Admin System Status**: ✅ Fully Functional
**Last Updated**: Current Session
**Version**: 1.0
