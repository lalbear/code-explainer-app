import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "prismjs/themes/prism-tomorrow.css"; // or another Prism theme
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
