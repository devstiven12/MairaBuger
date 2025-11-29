# MairaBurger - Aplicación Web

Una aplicación web completa para el emprendimiento casero de hamburguesas MairaBurger, desarrollada con HTML, CSS puro y JavaScript.

## 🍔 Características

- **Splash Screen animado** con el logo de MairaBurger
- **Diseño responsivo** que se adapta a todos los dispositivos
- **Menú interactivo** con categorías filtradas
- **Personalización de hamburguesas** con ingredientes adicionales
- **Carrito de compras** completo con gestión de cantidades
- **Sistema de autenticación** (login/registro)
- **Integración con Firebase** para autenticación y base de datos
- **Secciones completas**: menú, promociones, reseñas, ubicación
- **Métodos de pago** (efectivo/digital) y programación de entrega

## 🎨 Diseño

- **Colores apetitosos**: Paleta de rojos, naranjas y amarillos
- **Animaciones suaves** con CSS puro
- **Tipografía moderna** con Google Fonts (Poppins)
- **Interfaz intuitiva** con micro-interacciones
- **Responsive design** mobile-first

## 🚀 Instalación y Uso

### Desarrollo Local

1. **Clona o descarga** el proyecto
2. **Instala las dependencias**:
   ```bash
   npm install
   ```
3. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
4. **Abre tu navegador** en `http://localhost:3000`

### Configuración de Firebase (Opcional)

Para usar las funcionalidades de autenticación y base de datos:

1. **Crea un proyecto en Firebase Console**
2. **Habilita Authentication** (Email/Password)
3. **Crea una base de datos Firestore**
4. **Copia tu configuración** y reemplaza los valores en `firebase-config.js`

```javascript
const firebaseConfig = {
    apiKey: "tu-api-key",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "tu-app-id"
};
```

## 📱 Funcionalidades

### Para Clientes
- **Explorar menú** con imágenes atractivas
- **Personalizar hamburguesas** eligiendo ingredientes
- **Agregar productos al carrito** con cantidades específicas
- **Seleccionar método de entrega** (pickup/delivery)
- **Elegir forma de pago** (efectivo/digital)
- **Programar hora de entrega** o recogida
- **Ver promociones especiales** y ofertas
- **Leer reseñas** de otros clientes
- **Encontrar ubicación** del negocio

### Para el Negocio
- **Gestión de pedidos** (con Firebase)
- **Base de datos de clientes** registrados
- **Analytics de ventas** y productos populares
- **Newsletter** para promociones

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3 puro** - Estilos y animaciones (sin frameworks)
- **JavaScript vanilla** - Funcionalidad interactiva
- **Firebase** - Autenticación y base de datos
- **Font Awesome** - Iconografía
- **Google Fonts** - Tipografía

## 📂 Estructura del Proyecto

```
mairaburger-app/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script.js               # Funcionalidad JavaScript
├── firebase-config.js      # Configuración de Firebase
├── package.json           # Dependencias del proyecto
└── README.md              # Documentación
```

## 🎯 Lista de Funcionalidades

- ✅ Splash screen animado
- ✅ Header con menú hamburguesa responsive
- ✅ Sección hero con call-to-action
- ✅ Menú filtrable por categorías
- ✅ Modal de personalización de hamburguesas
- ✅ Carrito de compras funcional
- ✅ Sistema de autenticación
- ✅ Secciones de promociones y reseñas
- ✅ Mapa de ubicación integrado
- ✅ Formulario de newsletter
- ✅ Diseño responsive completo
- ✅ Integración con Firebase

## 🎨 Personalización

### Colores
Los colores están definidos como variables CSS en `:root`:
- `--primary-red: #dc2626`
- `--primary-orange: #ea580c`
- `--primary-yellow: #fbbf24`

### Contenido
- **Menú**: Edita el array `menuItems` en `script.js`
- **Promociones**: Modifica el HTML en la sección promotions
- **Información de contacto**: Actualiza los datos en la sección location

## 📈 Optimización para Producción

La aplicación está optimizada para producción con:
- **CSS optimizado** con variables y responsive design
- **JavaScript modular** y bien documentado
- **Imágenes optimizadas** desde Pexels CDN
- **Lazy loading** de contenido pesado
- **SEO básico** implementado

## 🚀 Despliegue

Para desplegar en producción:

1. **Firebase Hosting**:
   ```bash
   firebase init hosting
   firebase deploy
   ```

2. **Netlify**: Arrastra la carpeta del proyecto

3. **Vercel**: Conecta tu repositorio Git

4. **GitHub Pages**: Sube a un repositorio público

## 📞 Soporte

Para soporte técnico o preguntas:
- 📧 Email: soporte@mairaburger.com
- 📱 WhatsApp: +57 300 123 4567

---

**MairaBurger** - Las mejores hamburguesas caseras de la ciudad 🍔