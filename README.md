# 📄 Chat with PDF

Una aplicación web moderna que permite interactuar con documentos PDF mediante inteligencia artificial. Sube tu PDF y realiza preguntas sobre su contenido, obteniendo respuestas contextuales precisas en tiempo real.

![Chat with PDF](https://img.shields.io/badge/Astro-4.4.0-FF5D01?logo=astro&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-412991?logo=openai&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-4.2.11-FF3E00?logo=svelte&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.1-06B6D4?logo=tailwindcss&logoColor=white)

## 🎯 ¿Qué hace esta aplicación?

**Chat with PDF** es una herramienta que combina el poder del OCR (Reconocimiento Óptico de Caracteres) con modelos de lenguaje de inteligencia artificial para permitirte mantener conversaciones naturales con tus documentos PDF.

### Flujo de funcionamiento:

1. **Carga del documento**: El usuario sube un archivo PDF a través de una interfaz drag & drop intuitiva
2. **Procesamiento OCR**: El PDF se envía a Cloudinary, que utiliza OCR avanzado para extraer todo el texto del documento
3. **Almacenamiento**: El texto extraído se guarda localmente en formato `.txt` para consultas rápidas
4. **Interacción con IA**: El usuario puede hacer preguntas en lenguaje natural sobre el contenido del PDF
5. **Respuestas contextuales**: OpenAI GPT-3.5 analiza el contexto del documento y genera respuestas precisas en tiempo real mediante streaming

## ✨ Características principales

- 🔄 **Carga de PDFs con drag & drop**: Interfaz moderna y fácil de usar
- 🔍 **OCR avanzado**: Extracción precisa de texto usando Cloudinary con tecnología OCR
- 💬 **Chat en tiempo real**: Respuestas en streaming usando Server-Sent Events (SSE)
- 🧠 **IA contextual**: Respuestas basadas únicamente en el contenido del documento
- 🎨 **UI moderna**: Interfaz responsive construida con Svelte y Flowbite
- ⚡ **Rendimiento optimizado**: Aplicación construida con Astro para máxima velocidad
- 🌐 **Respuestas en español**: IA configurada como investigador español experimentado

## 🛠️ Stack tecnológico

### Frontend
- **[Astro](https://astro.build/)** (v4.4.0): Framework web ultrarrápido
- **[Svelte](https://svelte.dev/)** (v4.2.11): Framework reactivo para la UI
- **[TailwindCSS](https://tailwindcss.com/)** (v3.4.1): Framework CSS utility-first
- **[Flowbite Svelte](https://flowbite-svelte.com/)**: Biblioteca de componentes UI

### Backend & Servicios
- **[OpenAI API](https://platform.openai.com/)**: Modelo GPT-3.5-turbo para procesamiento de lenguaje natural
- **[Cloudinary](https://cloudinary.com/)**: Servicio de hosting y procesamiento de imágenes con OCR avanzado
- **Node.js**: Runtime para operaciones del servidor

### Utilidades
- **svelte-file-dropzone**: Componente para carga de archivos
- **TypeScript**: Tipado estático para mayor seguridad

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión 18 o superior)
- npm o pnpm
- Una cuenta en [OpenAI](https://platform.openai.com/) con créditos disponibles
- Una cuenta en [Cloudinary](https://cloudinary.com/) con el addon OCR activado

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/xavigu/Chat-with-PDF.git
cd Chat-with-PDF
```

### 2. Instalar dependencias

```bash
npm install
# o
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# OpenAI API Key
OPENAI_API_KEY=tu_api_key_de_openai

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

#### Cómo obtener las credenciales:

**OpenAI:**
1. Ve a [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Crea una nueva API key
3. **Importante**: Necesitas tener créditos en tu cuenta para usar la API

**Cloudinary:**
1. Regístrate en [https://cloudinary.com/](https://cloudinary.com/)
2. Ve a Dashboard → Settings
3. Copia tu Cloud Name, API Key y API Secret
4. **Importante**: Ve a Add-ons y activa el addon "Advanced OCR" en la sección de AI

### 4. Crear directorio para archivos de texto

```bash
mkdir -p public/text
```

## 🎮 Uso

### Desarrollo

Inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:4321`

### Producción

Construye la aplicación para producción:

```bash
npm run build
```

Previsualiza la build de producción:

```bash
npm run preview
```

## 📂 Estructura del proyecto

```
Chat-with-PDF/
├── src/
│   ├── components/          # Componentes Svelte
│   │   ├── App.svelte      # Componente principal
│   │   ├── StepUpload.svelte   # Paso 1: Carga del PDF
│   │   ├── StepLoading.svelte  # Paso 2: Estado de carga
│   │   └── StepChat.svelte     # Paso 3: Chat con el PDF
│   ├── layouts/            # Layouts de Astro
│   ├── pages/
│   │   ├── index.astro     # Página principal
│   │   └── api/            # Endpoints de la API
│   │       ├── upload.ts   # Endpoint para subir PDFs
│   │       └── ask.ts      # Endpoint para hacer preguntas
│   ├── utils/              # Utilidades
│   │   └── sse.ts          # Helper para Server-Sent Events
│   └── store.ts            # Store global de Svelte
├── public/
│   └── text/               # Archivos de texto extraídos de los PDFs
└── package.json
```

## 🔍 Arquitectura y funcionamiento técnico

### 1. Upload del PDF (`/api/upload`)

Cuando el usuario sube un PDF:

1. El archivo se recibe como `FormData` en el endpoint
2. Se convierte a `Uint8Array` para el procesamiento
3. Se sube a Cloudinary mediante streaming usando la opción `ocr: 'adv_ocr'`
4. Cloudinary procesa el PDF página por página con OCR avanzado
5. El texto extraído se obtiene de `info.ocr.adv_ocr.data`
6. Se guarda en `public/text/{asset_id}.txt`
7. Se devuelve el ID, URL y número de páginas al frontend

### 2. Chat con el PDF (`/api/ask`)

Para cada pregunta del usuario:

1. Se recibe el `id` del documento y la `question`
2. Se lee el archivo de texto correspondiente desde `public/text/{id}.txt`
3. Se envía a OpenAI con:
   - **System prompt**: Define el comportamiento como investigador español
   - **Context**: El texto completo del PDF entre etiquetas `<context>`
   - **Question**: La pregunta del usuario entre etiquetas `<question>`
4. La respuesta se transmite en tiempo real usando **Server-Sent Events (SSE)**
5. El frontend recibe los chunks de respuesta y los muestra progresivamente

### 3. Sistema de estados (Svelte Store)

La aplicación maneja tres estados principales:

```typescript
enum Status {
  INIT,    // Estado inicial - mostrar upload
  LOADING, // Procesando el PDF
  READY    // Listo para chatear
}
```

## 🎨 Componentes principales

### App.svelte
Componente raíz que gestiona el estado global y coordina los tres pasos del flujo.

### StepUpload.svelte
- Zona de drag & drop para PDFs
- Validación de tipo de archivo
- Envío del archivo al endpoint `/api/upload`

### StepLoading.svelte
- Indicador visual mientras se procesa el PDF
- Muestra feedback al usuario

### StepChat.svelte
- Interfaz de chat interactiva
- Input para preguntas
- Visualización de respuestas en tiempo real con SSE
- Historial de conversación

## ⚙️ Comandos disponibles

| Comando | Acción |
| :------------------------ | :----------------------------------------------- |
| `npm install` | Instala las dependencias |
| `npm run dev` | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build` | Construye la aplicación para producción en `./dist/` |
| `npm run preview` | Previsualiza la build localmente antes de desplegar |
| `npm run astro ...` | Ejecuta comandos CLI de Astro |
| `npm run astro -- --help` | Obtiene ayuda sobre la CLI de Astro |

## 💰 Consideraciones de costos

### OpenAI
- GPT-3.5-turbo: ~$0.002 por 1K tokens
- Necesitas tener saldo positivo en tu cuenta
- [Más información sobre precios](https://openai.com/pricing)

### Cloudinary
- Plan gratuito: 25 créditos/mes
- OCR Avanzado: consume créditos adicionales
- [Más información sobre precios](https://cloudinary.com/pricing)

## 🔒 Seguridad

- ⚠️ **Nunca** subas tu archivo `.env` al repositorio
- Las API keys son **sensibles** - manténlas en secreto
- El `.gitignore` ya está configurado para excluir el `.env`
- Considera implementar rate limiting en producción
- Los archivos de texto se almacenan localmente - implementa limpieza periódica

## 🐛 Solución de problemas comunes

### Error: "File not found"
- Verifica que el directorio `public/text/` exista
- Asegúrate de tener permisos de escritura

### Error: "Missing API Key"
- Revisa que las variables de entorno estén correctamente configuradas en `.env`
- Reinicia el servidor de desarrollo después de crear el `.env`

### El OCR no extrae texto
- Verifica que el addon "Advanced OCR" esté activado en Cloudinary
- Asegúrate de que el PDF contenga texto real (no solo imágenes escaneadas)

### Respuestas vacías de la IA
- Confirma que tienes créditos en tu cuenta de OpenAI
- Verifica que la API key sea válida y esté activa

## 🚀 Mejoras futuras

- [ ] Soporte para múltiples idiomas
- [ ] Caché de respuestas frecuentes
- [ ] Historial de conversaciones persistente
- [ ] Soporte para más formatos (Word, TXT, etc.)
- [ ] Sistema de autenticación de usuarios
- [ ] Compartir conversaciones
- [ ] Resaltado del texto relevante en el PDF original
- [ ] Exportar conversaciones a PDF/MD

## 📚 Recursos adicionales

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de OpenAI](https://platform.openai.com/docs)
- [Documentación de Cloudinary OCR](https://cloudinary.com/documentation/ocr_text_detection_and_extraction_addon)
- [Flowbite Svelte Components](https://flowbite-svelte.com/)

## 📝 Licencia

Este proyecto está bajo licencia MIT.

## 👤 Autor

**xavigu**

- GitHub: [@xavigu](https://github.com/xavigu)

---

⭐ Si este proyecto te ha sido útil, considera darle una estrella en GitHub
