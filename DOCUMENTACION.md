# Documentación Técnica Completa · KAROLINE Web

## 1. Visión General
**KAROLINE** es una plataforma digital de consultoría de ultra lujo náutico, finanzas marítimas internacionales y estrategia de propulsión de alto rendimiento, desarrollada para **Carolina** (alumna de Maestría en Negocios y Finanzas Internacionales de la **Florida International University - FIU** en Miami, FL y especialista en el ecosistema **Mercury Marine**).

---

## 2. Arquitectura de Software & Buenas Prácticas

```
karoline-web/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Despliegue automatizado en GitHub Pages
├── api/
│   └── chat.js                     # Serverless Function en Vercel con Gemini AI
├── assets/
│   ├── css/
│   │   ├── tokens.css              # Variables de color (Azul Medianoche, Oro Champán)
│   │   ├── base.css                # Tipografía de lujo (Cinzel, Plus Jakarta Sans)
│   │   ├── layout.css              # Header con frosted glass, Hero, Métricas, Footer
│   │   ├── components.css          # Tarjetas de asesoría, Calculadora ROI, Casos de éxito
│   │   └── chat.css                # Widget flotante de Karoline AI Concierge
│   ├── js/
│   │   ├── core/
│   │   │   └── store.js            # Estado reactivo, persistencia de idioma y calculadora
│   │   ├── i18n/
│   │   │   └── translations.js     # Diccionario maestro trilingüe (EN · ES · FR)
│   │   ├── ui/
│   │   │   └── calculator.js       # Motor interactivo de retorno financiero de yates
│   │   ├── chat/
│   │   │   └── concierge.js        # IA de lujo con modo dual (API Gemini + Fallback local)
│   │   └── main.js                 # Inicialización y cableado de eventos
│   └── img/
│       └── favicon.svg             # Emblema náutico en oro champán
├── docs/
│   ├── PROMPT-ROBUSTO-KAROLINE.md  # Prompt maestro de alta ingeniería
│   └── BENCHMARK-TOP10-YACHTING.md # Análisis de los 10 referentes mundiales
├── DEPLOY-GITHUB-VERCEL.md         # Guía de despliegue en producción
├── DOCUMENTACION.md                # Esta documentación técnica
├── package.json                    # Manifiesto de scripts
├── README.md                       # Resumen ejecutivo del proyecto
├── robots.txt                      # Directivas de indexación SEO
├── site.webmanifest                # Manifiesto PWA para dispositivos móviles
├── sitemap.xml                     # Mapa de indexación web
├── start-demo.cmd                  # Ejecutable rápido para Windows en un clic
└── vercel.json                     # Cabeceras de seguridad y redirecciones
```

---

## 3. Características Diferenciales de Ultra Lujo

### 3.1 Motor Trilingüe Reactivo (Inglés · Español · Francés)
- Cambio instantáneo con un solo clic en la barra superior.
- Persistencia automática de la preferencia del visitante en `localStorage`.
- Dicionarios completos adaptados al vocabulario náutico de Miami, Mónaco y la Costa Azul.

### 3.2 Calculadora Interactiva de Inversión en Yates & Retorno de Charter
- Selección de eslora (38ft-50ft Day Cruiser, 130ft Superyacht con 5 motores Mercury V12, 200ft Megayacht).
- Estimación de costos operativos anuales (OpEx: tripulación, atraque en marina, seguro, combustible).
- Proyección de ingresos brutos por charter y **Rendimiento Operativo Neto**.

### 3.3 Asistente Virtual Karoline AI (Modo Dual Resiliente)
- Responde fluidamente en el idioma del usuario (inglés, español o francés).
- Asesora sobre arquitectura técnica de motores **Mercury Verado V12 (600 HP)**, credenciales académicas en **FIU Miami** y paquetes de consultoría privada.
- Funciona 100% en GitHub Pages gracias a su motor local de contingencia, y se potencia con Google Gemini cuando se aloja en Vercel.
