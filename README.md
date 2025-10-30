# URL Shortener UI

A simple and modern **URL Shortener** frontend built with **React**, **TypeScript**, and **Material UI (MUI)**.  
This application allows users to input a long URL and receive a shortened version from a backend API, with built-in copy functionality, error handling, and a sleek responsive UI.

## Features

- Clean and responsive UI with **Material UI**
- URL shortening via API integration
- One-click copy to clipboard
- Error & loading state management
- TypeScript for type safety and better DX
- Easily connectable to any backend (AWS Lambda, Express, etc.)
- Deployment to AWS S3

## Tech Stack

| Tool / Library | Purpose |
|-----------------|----------|
| **React** | Frontend framework |
| **TypeScript** | Static typing |
| **Material UI (MUI)** | UI components & styling |
| **Vite / CRA / Next.js** | (Any React build tool of choice) |
| **Fetch API** | HTTP requests to backend |

## Project Structure

```
src/
├── components/
│   └── UrlShortener.tsx     # Main component
├── App.tsx                  # Root app component
├── index.tsx                # React entry point
└── ...
```

## Setup & Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/url-shortener-ui.git
   cd url-shortener-ui
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:5173
   ```

## Deployment

1. **Build the application:**

   ```bash
   npm build
   ```

2. **Deploy to AWS S3:**

   ```bash
   sls deploy
   ```
