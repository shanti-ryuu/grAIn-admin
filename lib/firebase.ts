import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAi5o5wyRBVEkmdLwdPa5qu53e0HLp8o3o',
  authDomain: 'grain-640ed.firebaseapp.com',
  projectId: 'grain-640ed',
  storageBucket: 'grain-640ed.firebasestorage.app',
  messagingSenderId: '827578604716',
  appId: '1:827578604716:web:7d3ef89ca001a884ae5309',
  measurementId: 'G-Z4ZGW9L8RZ',
}

let firebaseApp: FirebaseApp | null = null
let firebaseAnalytics: Analytics | null = null

export function initFirebase() {
  if (typeof window === 'undefined') {
    return null
  }

  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig)
  } else {
    firebaseApp = getApp()
  }

  return firebaseApp
}

export async function initFirebaseAnalytics() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const app = initFirebase()
    if (!app) {
      return null
    }

    const supported = await isSupported()
    if (!supported) {
      return null
    }

    firebaseAnalytics = getAnalytics(app)
    return firebaseAnalytics
  } catch (error) {
    console.warn('Firebase analytics initialization failed:', error)
    return null
  }
}

export function getFirebaseApp() {
  return firebaseApp || initFirebase()
}

export function getFirebaseAnalytics() {
  return firebaseAnalytics
}
