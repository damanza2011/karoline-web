# Guía de Despliegue · KAROLINE

Este portal de consultoría de ultra lujo está listo para desplegarse en **GitHub Pages** y en **Vercel**.

---

## 1. Probar en Local (Windows)

### Opción A (Un Clic):
Haz doble clic sobre [`start-demo.cmd`](file:///c:/Users/dan/Desktop/karoline-web/start-demo.cmd). Se abrirá automáticamente `http://127.0.0.1:8098/` en tu navegador predeterminado.

### Opción B (Terminal / PowerShell):
```powershell
cd C:\Users\dan\Desktop\karoline-web
python -m http.server 8098
```
Abre `http://127.0.0.1:8098/` en tu navegador.

---

## 2. Repositorio en GitHub

El repositorio está activo en tu cuenta de GitHub:
👉 **[https://github.com/damanza2011/karoline-web](https://github.com/damanza2011/karoline-web)**

Para subir nuevos cambios:
```powershell
cd C:\Users\dan\Desktop\karoline-web
git add .
git commit -m "Actualizacion portal Karoline"
git push origin main
```

---

## 3. Despliegue en GitHub Pages (Gratuito)

1. Ingresa a [https://github.com/damanza2011/karoline-web](https://github.com/damanza2011/karoline-web).
2. Ve a **Settings** -> **Pages**.
3. En **Source**, selecciona **Deploy from a branch** -> rama `main` -> `/ (root)` (o selecciona **GitHub Actions** con el workflow incluido).
4. El sitio estará activo en:
   👉 **https://damanza2011.github.io/karoline-web/**

---

## 4. Despliegue en Vercel (Con Gemini AI)

1. Ingresa a [vercel.com/new](https://vercel.com/new) e importa `damanza2011/karoline-web`.
2. Framework Preset: **Other**.
3. Root Directory: `./`.
4. Variables de entorno:
   - `GEMINI_API_KEY`: Tu clave de Google AI Studio.
   - `GEMINI_MODEL`: `gemini-2.5-flash`.
5. Haz clic en **Deploy**.
