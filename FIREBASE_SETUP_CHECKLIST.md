# Firebase Setup Checklist

Use this checklist to ensure your new Firebase database is properly configured.

## ✅ Pre-Migration Checklist

- [ ] **Backup old data** (if migrating from an existing Firebase project)
- [ ] **Create new Firebase project** in Firebase Console
- [ ] **Note down new Firebase credentials** from Project Settings

## ✅ Firebase Console Configuration

### Authentication Setup
- [ ] Go to **Authentication** → **Sign-in method**
- [ ] Enable **Email/Password** authentication
- [ ] (Optional) Enable **Email link (passwordless sign-in)**

### Firestore Database Setup
- [ ] Go to **Firestore Database**
- [ ] Click **Create database**
- [ ] Select **Test mode** (for development) or **Production mode** (for production)
- [ ] Choose your preferred **location**
- [ ] Click **Enable**

### Security Rules (Firestore)
- [ ] Go to **Firestore Database** → **Rules** tab
- [ ] Copy rules from `FIREBASE_MIGRATION_GUIDE.md`
- [ ] Paste into the rules editor
- [ ] Click **Publish**

### Storage Setup (Optional)
- [ ] Go to **Storage**
- [ ] Click **Get started**
- [ ] Choose **Test mode** or **Production mode**
- [ ] Click **Next** and **Done**

## ✅ Application Configuration

### Update Firebase Config
- [ ] Open `src/firebase.js`
- [ ] Replace `firebaseConfig` object with new credentials
- [ ] Save the file

### Verify Admin Emails
- [ ] Open `src/constants/adminEmails.js`
- [ ] Verify the admin emails are correct:
  - [ ] codecrusaders62@gmail.com
  - [ ] siddharthexam21@gmail.com
  - [ ] government@gmail.com
- [ ] Add/remove emails as needed
- [ ] Save the file

## ✅ Account Creation

### Create Regular Admin Accounts
- [ ] Navigate to `/admin/signup` in your browser
- [ ] Sign up with `codecrusaders62@gmail.com`
- [ ] Sign up with `siddharthexam21@gmail.com`

### Create Government Admin Account
**Option 1: Auto-create via Login**
- [ ] Navigate to `/admin/login`
- [ ] Click **"Government Authority Login"** button
- [ ] Click **"Sign in to Dashboard"**
- [ ] Account will be auto-created

**Option 2: Manual Signup**
- [ ] Navigate to `/admin/signup?role=gov`
- [ ] Email will be pre-filled as `government@gmail.com`
- [ ] Enter password (or use `gdgc@123`)
- [ ] Click **"Create Account"**

### Create Test User Account
- [ ] Navigate to `/signup`
- [ ] Create a test user account
- [ ] Verify you can log in
- [ ] Check Firestore for the user document

## ✅ Testing & Verification

### Test User Flow
- [ ] Sign up as a regular user
- [ ] Log in successfully
- [ ] Access user dashboard
- [ ] Create a test complaint
- [ ] Verify complaint appears in Firestore `complaints` collection

### Test Admin Flow
- [ ] Log in as regular admin (codecrusaders62@gmail.com or siddharthexam21@gmail.com)
- [ ] Access admin dashboard
- [ ] View complaints list
- [ ] Update a complaint status
- [ ] Verify changes reflect in real-time

### Test Government Admin Flow
- [ ] Log in as government admin (government@gmail.com)
- [ ] Access admin dashboard
- [ ] Verify role is `gov_admin` in Firestore
- [ ] Test resolving a complaint to "Resolved" status
- [ ] Verify government-specific permissions work

### Test Real-time Features
- [ ] Open app in two browser windows
- [ ] Make a change in one window (e.g., update complaint)
- [ ] Verify change appears in other window without refresh
- [ ] Test with different user roles

### Test Community Features
- [ ] Create a community poll as a user
- [ ] Vote on a poll
- [ ] Propose a project
- [ ] Verify all data is stored in Firestore

## ✅ Firestore Collections Verification

Check that these collections exist and have proper structure:

### users Collection
- [ ] Collection exists in Firestore
- [ ] Documents have required fields: `uid`, `name`, `email`, `role`, `createdAt`
- [ ] Admin users have `role: "admin"` or `role: "gov_admin"`
- [ ] Regular users have `role: "user"`

### complaints Collection
- [ ] Collection exists in Firestore
- [ ] Documents have required fields: `userId`, `userName`, `category`, `location`, `description`, `status`, `createdAt`
- [ ] Status values are: "Pending", "Under Review", "In Progress", or "Resolved"

### polls Collection
- [ ] Collection exists in Firestore
- [ ] Documents have required fields: `title`, `description`, `createdBy`, `createdAt`, `votes`

### projects Collection
- [ ] Collection exists in Firestore
- [ ] Documents have required fields: `title`, `description`, `proposedBy`, `proposedByName`, `createdAt`, `status`

## ✅ Security & Permissions

### Firestore Rules
- [ ] Rules are published in Firestore
- [ ] Authenticated users can read all collections
- [ ] Users can only update their own data
- [ ] Admins can update complaints and projects
- [ ] Test that unauthenticated users cannot access data

### Authentication Rules
- [ ] Only authorized emails can access admin portal
- [ ] Regular users cannot access `/admin/*` routes
- [ ] Admin login validates against `ADMIN_EMAILS` array

## ✅ Production Readiness (Optional)

### Environment Variables
- [ ] Create `.env` file with Firebase credentials
- [ ] Update `src/firebase.js` to use environment variables
- [ ] Add `.env` to `.gitignore`
- [ ] Document environment variables in README

### Security Hardening
- [ ] Switch Firestore from Test mode to Production mode
- [ ] Update security rules for production
- [ ] Enable Firebase App Check (optional)
- [ ] Set up Firebase monitoring and alerts

### Performance
- [ ] Test app with realistic data volume
- [ ] Verify real-time listeners are properly cleaned up
- [ ] Check for memory leaks in long-running sessions
- [ ] Optimize Firestore queries if needed

## 🚨 Common Issues & Solutions

### Issue: "Permission denied" errors
**Solution:**
- [ ] Check Firestore security rules
- [ ] Verify user is authenticated
- [ ] Ensure user has correct role in Firestore

### Issue: Admin login fails
**Solution:**
- [ ] Verify email is in `src/constants/adminEmails.js`
- [ ] Check that account exists in Firebase Authentication
- [ ] Try creating account via `/admin/signup`

### Issue: Real-time updates not working
**Solution:**
- [ ] Check browser console for errors
- [ ] Verify Firestore listeners are set up correctly
- [ ] Check network tab for WebSocket connections

### Issue: Government admin can't resolve complaints
**Solution:**
- [ ] Verify role is `gov_admin` in Firestore `users` collection
- [ ] Check that email is exactly `government@gmail.com`
- [ ] Log out and log back in to refresh role

## 📊 Success Criteria

Your Firebase migration is complete when:

- [x] All admin emails can log in successfully
- [x] Government admin has special `gov_admin` role
- [x] Users can create accounts and log in
- [x] Complaints can be created and updated
- [x] Real-time updates work across all features
- [x] All Firestore collections have proper data
- [x] Security rules are properly configured
- [x] No console errors during normal usage

## 📝 Notes

**Date Migrated:** _______________

**Firebase Project ID:** _______________

**Issues Encountered:**
- 
- 
- 

**Additional Configuration:**
- 
- 
- 

---

**Need Help?** See `FIREBASE_MIGRATION_GUIDE.md` for detailed instructions.
