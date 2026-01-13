// Firebase Configuration Validator
// Run this script to verify your Firebase setup is correct

import { auth, db, storage } from './firebase.js';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

console.log('🔍 Validating Firebase Configuration...\n');

// Check Firebase Auth
try {
    const authInstance = getAuth();
    console.log('✅ Firebase Authentication initialized');
    console.log(`   Auth Domain: ${authInstance.config.authDomain}`);
    console.log(`   Project ID: ${authInstance.config.apiKey ? '***' + authInstance.config.apiKey.slice(-4) : 'Not set'}`);
} catch (error) {
    console.error('❌ Firebase Authentication error:', error.message);
}

// Check Firestore
try {
    const dbInstance = getFirestore();
    console.log('\n✅ Firestore Database initialized');
    console.log(`   Database: ${dbInstance.app.options.projectId}`);

    // Try to list collections (this will help verify permissions)
    console.log('\n📊 Checking Firestore collections...');
    const collections = ['users', 'complaints', 'polls', 'projects'];

    for (const collectionName of collections) {
        try {
            const snapshot = await getDocs(collection(db, collectionName));
            console.log(`   ✓ ${collectionName}: ${snapshot.size} documents`);
        } catch (error) {
            console.log(`   ⚠ ${collectionName}: ${error.code || 'Error accessing collection'}`);
        }
    }
} catch (error) {
    console.error('\n❌ Firestore Database error:', error.message);
}

// Check Storage
try {
    if (storage) {
        console.log('\n✅ Firebase Storage initialized');
        console.log(`   Bucket: ${storage.app.options.storageBucket}`);
    } else {
        console.log('\n⚠ Firebase Storage not initialized (optional)');
    }
} catch (error) {
    console.error('\n❌ Firebase Storage error:', error.message);
}

console.log('\n✨ Configuration check complete!\n');
console.log('📝 Next steps:');
console.log('   1. If you see errors, check your Firebase Console settings');
console.log('   2. Ensure Email/Password authentication is enabled');
console.log('   3. Verify Firestore security rules allow authenticated access');
console.log('   4. Create admin accounts using the signup flow');
console.log('\n📖 See FIREBASE_MIGRATION_GUIDE.md for detailed instructions\n');
