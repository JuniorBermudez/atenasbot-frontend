
# 💻 AtenasBot Frontend

Este es el frontend para **AtenasBot**, una app de soporte técnico universitario con React + TailwindCSS.

## 🚀 Despliegue en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com).
2. Sube este repositorio a GitHub (por ejemplo: `atenasbot-frontend`).
3. En Vercel, selecciona "New Project" y conecta tu GitHub.
4. Configura:

   - **Framework**: React
   - **Build Command**: `npm run build`
   - **Output Directory**: `build` o automático (si usas CRA)

5. Antes de subir, **modifica la URL del backend en `ChatbotApp.jsx`**:
   ```js
   await axios.post('https://TU-BACKEND.onrender.com/api/chat', { ... });
   ```

6. ¡Listo! Tu app estará online.

---

## 🌑 Características

- Modo oscuro / claro
- Animaciones suaves
- Temas rápidos (FAQs)
- Historial en localStorage
- Estilo moderno y responsive

