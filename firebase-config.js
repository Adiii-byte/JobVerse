// =========================================================
// FIREBASE CONFIG — fill this in with YOUR OWN project keys
// =========================================================
//
// How to get these (takes ~3 minutes, completely free):
//
// 1. Go to https://console.firebase.google.com
// 2. Click "Add project" → name it (e.g. "jobverse") → finish setup.
// 3. In the left sidebar: Build → Authentication → "Get started".
// 4. Under "Sign-in method", enable "Email/Password" → Save.
// 5. Go to Project Overview (gear icon) → Project settings.
// 6. Scroll to "Your apps" → click the </> (web) icon → register
//    an app (any nickname) → Firebase will show you a config
//    object that looks exactly like the one below.
// 7. Copy YOUR values into the object below and save this file.
//
// EXTRA STEP for "Saved Jobs" (uses Firestore, a free database):
// 8. Left sidebar: Build → Firestore Database → "Create database".
// 9. Pick a location close to you → Start in "test mode" (fine for
//    a college project) → Create.
// 10. Once it's live, go to the "Rules" tab and replace the rules
//     with this, so each user can only read/write their own saved
//     jobs, anyone logged in can record an application or submit
//     feedback, applications stay admin-only, but feedback/reviews
//     are public (shown to every visitor above the footer):
//
//     rules_version = '2';
//     service cloud.firestore {
//       match /databases/{database}/documents {
//         match /users/{userId}/savedJobs/{jobId} {
//           allow read, write: if request.auth != null && request.auth.uid == userId;
//         }
//         match /applications/{appId} {
//           allow create: if request.auth != null;
//           allow read: if request.auth != null && request.auth.uid == "PASTE_YOUR_ADMIN_UID_HERE";
//         }
//         match /feedback/{feedbackId} {
//           allow create: if request.auth != null;
//           allow read: if true;
//         }
//       }
//     }
//
//     Replace PASTE_YOUR_ADMIN_UID_HERE (both places) with the SAME
//     uid you put in ADMIN_UID inside script.js (see next step) —
//     Publish after editing.
//
// EXTRA STEP for the "Admin" applications dashboard:
// 11. Sign up on your own live site once (as yourself), using the
//     normal Sign Up form.
// 12. In Firebase console: Build → Authentication → Users tab. Find
//     your account in the list and copy its "User UID" column value.
// 13. Open script.js, find the line:
//         const ADMIN_UID = "PASTE_YOUR_ADMIN_UID_HERE";
//     and replace the placeholder with the UID you just copied.
// 14. Also paste that same UID into the Firestore rule above
//     (step 10) and click Publish.
// 15. Log out and back in on the site — you'll now see a "🔒 Admin"
//     link in the nav, showing everyone's applications. No other
//     account can see this, even if they inspect the page's code,
//     because the Firestore rule itself blocks the read.
//
// These keys are safe to expose in client-side code — Firebase
// is designed for this. Real security is enforced separately via
// Firebase's Authentication + these Firestore rules, not by hiding
// this file.

const firebaseConfig = {
  apiKey: "AIzaSyDozYiInHAPBDUyH0MJxE30ShNDHdV9xNo",
  authDomain: "jobverse-e09e1.firebaseapp.com",
  projectId: "jobverse-e09e1",
  storageBucket: "jobverse-e09e1.firebasestorage.app",
  messagingSenderId: "732772175708",
  appId: "1:732772175708:web:8eeb02823e1729b919fb99",
  measurementId: "G-1GCC04JVMC"
};

firebase.initializeApp(firebaseConfig);
