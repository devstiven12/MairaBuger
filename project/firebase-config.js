// Configuración de Firebase
// Reemplaza estos valores con tu configuración de Firebase
// Si usas los SDKs compat en index.html, no necesitas imports ES Modules aquí.
// TODO: Añade SDKs adicionales de Firebase en index.html si los necesitas
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxXEXl1sxtWiQdtRd-YZ2jlcp8CswtqJs",
  authDomain: "mariaburger-b09e2.firebaseapp.com",
  projectId: "mariaburger-b09e2",
  storageBucket: "mariaburger-b09e2.firebasestorage.app",
  messagingSenderId: "990479485261",
  appId: "1:990479485261:web:c6a2468cc95c5151ae0f04",
  measurementId: "G-MXHHE2XVP0"
};

// Inicializa Firebase con la versión compat si está disponible en global

// Inicializar Firebase solo si está disponible
if (typeof firebase !== 'undefined') {
    try {
        firebase.initializeApp(firebaseConfig);
        console.log('Firebase inicializado correctamente');
    } catch (error) {
        console.error('Error al inicializar Firebase:', error);
    }
} else {
    console.warn('Firebase no está disponible. La aplicación funcionará sin autenticación en la nube.');
}

// Funciones auxiliares para Firebase
function initializeFirestore() {
    if (typeof firebase !== 'undefined' && firebase.firestore) {
        return firebase.firestore();
    }
    return null;
}

function initializeAuth() {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        return firebase.auth();
    }
    return null;
}

// Exportar para uso en otros scripts
window.firebaseConfig = firebaseConfig;
window.initializeFirestore = initializeFirestore;
window.initializeAuth = initializeAuth;