# Khai Absensi

Dashboard absensi internal berbasis HTML, CSS, JavaScript dan Firebase Firestore.

## Features

- Submit absensi realtime
- Today log realtime Firebase
- Popup success & failed
- Sound notification
- Glassmorphism UI
- PWA Ready
- Mobile responsive
- Offline cache support

---

# Firebase Setup

## 1. Create Firebase Project

Masuk ke:

https://console.firebase.google.com

Buat project:

Khai Absensi

---

## 2. Enable Firestore Database

Build → Firestore Database → Create Database

Pilih:

Start in test mode

Location:

Singapore

---

## 3. Register Web App

Project Settings → General → Your Apps

Klik:

</>

Lalu copy config Firebase.

---

## 4. Replace Firebase Config

Di file `index.html`:

```javascript
const firebaseConfig = {

  apiKey: "YOUR_API_KEY",

  authDomain:
    "khai-absensi.firebaseapp.com",

  projectId:
    "khai-absensi",

  storageBucket:
    "khai-absensi.appspot.com",

  messagingSenderId:
    "1067230668614",

  appId:
    "YOUR_APP_ID"

};

