# Firebase Migration Guide

## Overview
This guide helps you configure the Civic Platform application with your new Firebase database.

## Step 1: Update Firebase Configuration

### 1.1 Get Your New Firebase Config
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your new project
3. Go to **Project Settings** (gear icon) → **General**
4. Scroll down to "Your apps" section
5. Click on the web app or create a new web app
6. Copy the `firebaseConfig` object

### 1.2 Update `src/firebase.js`
Replace the existing configuration in `src/firebase.js` with your new credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_NEW_API_KEY",
  authDomain: "YOUR_NEW_AUTH_DOMAIN",
  projectId: "YOUR_NEW_PROJECT_ID",
  storageBucket: "YOUR_NEW_STORAGE_BUCKET",
  messagingSenderId: "YOUR_NEW_MESSAGING_SENDER_ID",
  appId: "YOUR_NEW_APP_ID",
  measurementId: "YOUR_NEW_MEASUREMENT_ID" // Optional
};
```

## Step 2: Configure Firebase Authentication

### 2.1 Enable Email/Password Authentication
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Email/Password**
3. Enable both toggles:
   - ✅ Email/Password
   - ✅ Email link (passwordless sign-in) - Optional
4. Click **Save**

### 2.2 Create Admin Accounts

The application has three types of admin accounts configured in `src/constants/adminEmails.js`:

1. **codecrusaders62@gmail.com** - Regular Admin
2. **siddharthexam21@gmail.com** - Regular Admin
3. **government@gmail.com** - Government Admin (special role)

#### Option A: Auto-create via Signup Flow
1. Navigate to `/admin/signup` in your application
2. Sign up with one of the authorized emails
3. For government account, use: `/admin/signup?role=gov`

#### Option B: Create via Firebase Console
1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Enter email and password
4. Click **Add user**

**Note:** The application will automatically assign the correct role when these emails sign in through the admin login page.

## Step 3: Configure Firestore Database

### 3.1 Create Firestore Database
1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select your preferred location
5. Click **Enable**

### 3.2 Required Collections

The application uses the following Firestore collections:

#### **users** Collection
Stores user profiles and roles.

Document structure:
```javascript
{
  uid: "user_firebase_uid",
  name: "User Name",
  email: "user@example.com",
  role: "user" | "admin" | "gov_admin",
  createdAt: "2026-01-13T10:00:00.000Z"
}
```

#### **complaints** Collection
Stores citizen complaints.

Document structure:
```javascript
{
  id: "auto_generated_id",
  userId: "user_firebase_uid",
  userName: "User Name",
  category: "Roads" | "Water" | "Garbage" | "Electricity" | "Other",
  location: "Location Name",
  description: "Complaint description",
  status: "Pending" | "Under Review" | "In Progress" | "Resolved",
  createdAt: "2026-01-13T10:00:00.000Z",
  updatedAt: "2026-01-13T10:00:00.000Z",
  updatedBy: "Admin Name" // Optional
}
```

#### **polls** Collection
Stores community polls.

Document structure:
```javascript
{
  id: "auto_generated_id",
  title: "Poll Title",
  description: "Poll description",
  createdBy: "user_firebase_uid",
  createdAt: "2026-01-13T10:00:00.000Z",
  votes: {
    "user_id_1": "yes",
    "user_id_2": "no"
  }
}
```

#### **projects** Collection
Stores proposed community projects.

Document structure:
```javascript
{
  id: "auto_generated_id",
  title: "Project Title",
  description: "Project description",
  proposedBy: "user_firebase_uid",
  proposedByName: "User Name",
  createdAt: "2026-01-13T10:00:00.000Z",
  status: "Proposed" | "Approved" | "Rejected"
}
```

### 3.3 Firestore Security Rules

For **development/testing**, use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all authenticated users (TEST MODE)
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

For **production**, use these more secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
      allow delete: if false;
    }
    
    // Complaints collection
    match /complaints/{complaintId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'gov_admin']);
      allow delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'gov_admin'];
    }
    
    // Polls collection
    match /polls/{pollId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null && 
        (request.auth.uid == resource.data.createdBy || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'gov_admin']);
    }
    
    // Projects collection
    match /projects/{projectId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'gov_admin'];
      allow delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'gov_admin'];
    }
  }
}
```

To update security rules:
1. Go to **Firestore Database** → **Rules** tab
2. Paste the rules above
3. Click **Publish**

## Step 4: Configure Firebase Storage (Optional)

If your application uses file uploads:

1. Go to **Storage** in Firebase Console
2. Click **Get started**
3. Choose **Start in test mode**
4. Click **Next** and **Done**

### Storage Security Rules (Test Mode)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Step 5: Admin Email Configuration

The admin emails are configured in `src/constants/adminEmails.js`:

```javascript
export const ADMIN_EMAILS = [
    "codecrusaders62@gmail.com",
    "siddharthexam21@gmail.com",
    "government@gmail.com"
];
```

### To Add/Remove Admin Emails:
1. Edit `src/constants/adminEmails.js`
2. Add or remove email addresses from the array
3. Save the file

### Admin Roles:
- **Regular Admin** (`admin`): Can manage complaints, view users, update statuses
- **Government Admin** (`gov_admin`): Special privileges for government officials
  - Email: `government@gmail.com`
  - Default password (for quick login): `gdgc@123`
  - Can resolve complaints to final "Resolved" status

## Step 6: Government Sign-in Configuration

The government sign-in is pre-configured with:
- **Email**: `government@gmail.com`
- **Default Password**: `gdgc@123`

### To Create Government Account:

#### Method 1: Use the Quick Login Button
1. Go to `/admin/login`
2. Click the **"Government Authority Login"** button
3. This auto-fills the credentials
4. Click **"Sign in to Dashboard"**
5. The app will auto-create the account if it doesn't exist

#### Method 2: Use the Signup Flow
1. Go to `/admin/signup?role=gov`
2. The form will pre-fill with "Government Official" and "government@gmail.com"
3. Enter a password
4. Click **"Create Account"**

#### Method 3: Manual Creation
1. Create the account in Firebase Console (Authentication → Users)
2. Email: `government@gmail.com`
3. Password: Your choice (or use `gdgc@123`)
4. The role will be auto-assigned on first login

## Step 7: Testing the Migration

### 7.1 Test User Authentication
1. Navigate to `/signup`
2. Create a test user account
3. Verify you can log in at `/`
4. Check that the user document is created in Firestore

### 7.2 Test Admin Authentication
1. Navigate to `/admin/login`
2. Try logging in with one of the admin emails
3. Verify you're redirected to `/admin/dashboard`
4. Check that the role is set correctly in Firestore

### 7.3 Test Government Admin
1. Navigate to `/admin/login`
2. Click **"Government Authority Login"** button
3. Click **"Sign in to Dashboard"**
4. Verify the account is created with `role: "gov_admin"`

### 7.4 Test Firestore Operations
1. Create a complaint as a regular user
2. Verify it appears in the Firestore `complaints` collection
3. Update the complaint status as an admin
4. Verify real-time updates work

## Step 8: Update Environment Variables (if applicable)

If you're deploying to production, create a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Then update `src/firebase.js` to use environment variables:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
```

## Troubleshooting

### Issue: "Access denied" when logging in as admin
**Solution**: Ensure the email is listed in `src/constants/adminEmails.js`

### Issue: "User not found" error
**Solution**: Create the user account first via signup or Firebase Console

### Issue: Role not being assigned correctly
**Solution**: The app auto-assigns roles on login. Try logging out and back in.

### Issue: Firestore permission denied
**Solution**: Check your Firestore security rules. Use test mode rules during development.

### Issue: "Firebase: Error (auth/user-not-found)"
**Solution**: The account doesn't exist. Use the signup flow or create it in Firebase Console.

## Quick Start Checklist

- [ ] Update `src/firebase.js` with new Firebase config
- [ ] Enable Email/Password authentication in Firebase Console
- [ ] Create Firestore database in test mode
- [ ] Set up Firestore security rules
- [ ] Verify admin emails in `src/constants/adminEmails.js`
- [ ] Create admin accounts (or use auto-creation on first login)
- [ ] Test user signup and login
- [ ] Test admin login
- [ ] Test government admin login
- [ ] Verify Firestore collections are created
- [ ] Test real-time updates

## Support

If you encounter any issues during migration, check:
1. Firebase Console for error logs
2. Browser console for JavaScript errors
3. Network tab for failed API requests
4. Firestore rules for permission issues

---

**Last Updated**: January 13, 2026
