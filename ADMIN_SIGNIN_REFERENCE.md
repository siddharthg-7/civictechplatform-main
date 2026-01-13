# Admin & Government Sign-In Reference

## 📋 Quick Reference

This document provides quick access to admin and government sign-in information for the Civic Platform.

---

## 👤 Admin Accounts

### Authorized Admin Emails

The following emails are authorized for admin access (configured in `src/constants/adminEmails.js`):

1. **codecrusaders62@gmail.com**
   - Role: `admin`
   - Type: Regular Admin
   - Permissions: Manage complaints, view users, update statuses

2. **siddharthexam21@gmail.com**
   - Role: `admin`
   - Type: Regular Admin
   - Permissions: Manage complaints, view users, update statuses

3. **government@gmail.com**
   - Role: `gov_admin`
   - Type: Government Admin
   - Permissions: Full admin access + resolve complaints to final "Resolved" status
   - **Default Password:** `gdgc@123` (for quick testing)

---

## 🏛️ Government Admin Sign-In

### Quick Login (Recommended)

1. Navigate to: `/admin/login`
2. Click the **"Government Authority Login"** button
3. Credentials will auto-fill:
   - Email: `government@gmail.com`
   - Password: `gdgc@123`
4. Click **"Sign in to Dashboard"**

### First-Time Setup

If the government account doesn't exist yet:

**Method 1: Auto-Create via Login**
1. Go to `/admin/login`
2. Click **"Government Authority Login"**
3. Click **"Sign in to Dashboard"**
4. The app will auto-create the account with role `gov_admin`

**Method 2: Manual Signup**
1. Go to `/admin/signup?role=gov`
2. Form will pre-fill with:
   - Name: "Government Official"
   - Email: "government@gmail.com"
3. Enter password (or use `gdgc@123`)
4. Click **"Create Account"**

---

## 🔐 Role-Based Permissions

### Regular User (`role: "user"`)
- Create and view own complaints
- Participate in community polls
- Propose community projects
- View own dashboard and reports

### Regular Admin (`role: "admin"`)
- View all complaints platform-wide
- Update complaint status (Pending → Under Review → In Progress)
- View all users
- Manage community polls
- **Cannot** mark complaints as "Resolved" (reserved for Government Admin)

### Government Admin (`role: "gov_admin"`)
- All Regular Admin permissions
- **Can** mark complaints as "Resolved" (final status)
- Special "Government Authority" badge in discussions
- **Cannot** participate in community discussions (view-only)
- Official government representative status

---

## 🚀 Access URLs

### User Portal
- **Login:** `/` or `/login`
- **Signup:** `/signup`
- **Dashboard:** `/dashboard`
- **Forgot Password:** `/forgot-password`

### Admin Portal
- **Login:** `/admin/login`
- **Signup:** `/admin/signup`
- **Dashboard:** `/admin/dashboard`
- **Complaints:** `/admin/complaints`
- **Users:** `/admin/users`
- **Polls:** `/admin/polls`
- **Settings:** `/admin/settings`
- **Forgot Password:** `/admin/forgot`

### Government Admin Specific
- **Signup:** `/admin/signup?role=gov`
- **Quick Login:** Use button on `/admin/login`

---

## 🔧 Configuration Files

### Admin Email List
**File:** `src/constants/adminEmails.js`

```javascript
export const ADMIN_EMAILS = [
    "codecrusaders62@gmail.com",
    "siddharthexam21@gmail.com",
    "government@gmail.com"
];
```

**To add a new admin:**
1. Add email to the array
2. Save the file
3. User can now sign up via `/admin/signup`

### Firebase Configuration
**File:** `src/firebase.js`

Contains Firebase project credentials. Update this file when migrating to a new Firebase project.

---

## 🎯 Admin Login Flow

### Regular Admin Login
```
User visits /admin/login
  ↓
Enters email + password
  ↓
System checks if email is in ADMIN_EMAILS array
  ↓
If YES → Authenticate with Firebase
  ↓
Check Firestore for user role
  ↓
If role ≠ "admin" → Update to "admin"
  ↓
Redirect to /admin/dashboard
```

### Government Admin Login
```
User visits /admin/login
  ↓
Clicks "Government Authority Login" button
  ↓
Email auto-fills: government@gmail.com
Password auto-fills: gdgc@123
  ↓
User clicks "Sign in to Dashboard"
  ↓
System checks if email is in ADMIN_EMAILS array
  ↓
Authenticate with Firebase
  ↓
Check Firestore for user role
  ↓
If role ≠ "gov_admin" → Update to "gov_admin"
  ↓
If user doesn't exist → Create with role "gov_admin"
  ↓
Redirect to /admin/dashboard
```

---

## 🛡️ Security Features

### Email Validation
- Admin login checks email against `ADMIN_EMAILS` array
- Non-authorized emails cannot access admin portal
- Error message: "Access denied. These credentials are not authorized for admin access."

### Role Auto-Assignment
- Admin login automatically assigns correct role
- `government@gmail.com` → `gov_admin`
- Other admin emails → `admin`
- Regular users → `user`

### Account Healing
- If admin account exists but has wrong role, it's auto-corrected on login
- If admin account doesn't exist in Firestore, it's auto-created on login
- Ensures consistency between Firebase Auth and Firestore

---

## 📊 Firestore User Document Structure

### Regular User
```javascript
{
  uid: "firebase_user_id",
  name: "User Name",
  email: "user@example.com",
  phone: "1234567890",
  role: "user",
  createdAt: "2026-01-13T10:00:00.000Z"
}
```

### Regular Admin
```javascript
{
  uid: "firebase_user_id",
  name: "Admin User",
  email: "codecrusaders62@gmail.com",
  role: "admin",
  createdAt: "2026-01-13T10:00:00.000Z"
}
```

### Government Admin
```javascript
{
  uid: "firebase_user_id",
  name: "Government Authority",
  email: "government@gmail.com",
  role: "gov_admin",
  createdAt: "2026-01-13T10:00:00.000Z"
}
```

---

## 🧪 Testing Admin Access

### Test Regular Admin
1. Navigate to `/admin/login`
2. Enter email: `codecrusaders62@gmail.com`
3. Enter password: (your password)
4. Click "Sign in to Dashboard"
5. Verify redirect to `/admin/dashboard`
6. Check Firestore: `users/{uid}/role` should be `"admin"`

### Test Government Admin
1. Navigate to `/admin/login`
2. Click "Government Authority Login"
3. Click "Sign in to Dashboard"
4. Verify redirect to `/admin/dashboard`
5. Check Firestore: `users/{uid}/role` should be `"gov_admin"`
6. Try resolving a complaint (should work)

---

## 🐛 Troubleshooting

### "Access denied" error
**Cause:** Email not in `ADMIN_EMAILS` array  
**Solution:** Add email to `src/constants/adminEmails.js`

### "User not found" error
**Cause:** Account doesn't exist in Firebase Auth  
**Solution:** Create account via `/admin/signup` or Firebase Console

### Role not correct in Firestore
**Cause:** Role wasn't assigned properly  
**Solution:** Log out and log back in (role will auto-correct)

### Government admin can't resolve complaints
**Cause:** Role is not `gov_admin`  
**Solution:** 
1. Check Firestore `users/{uid}/role`
2. If incorrect, manually update to `"gov_admin"`
3. Or log out and use the "Government Authority Login" button

### Password forgotten
**Solution:**
1. Use "Forgot password?" link on login page
2. Or reset in Firebase Console (Authentication → Users → Reset password)

---

## 📞 Support

For issues with admin access:
1. Check Firebase Console → Authentication → Users
2. Verify email exists and is verified
3. Check Firestore → users collection → verify role
4. Check browser console for error messages
5. See `FIREBASE_MIGRATION_GUIDE.md` for detailed setup

---

**Last Updated:** January 13, 2026  
**Version:** 1.0
