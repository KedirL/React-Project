import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './main.css'

import App from './App.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Discovery from './Discovery.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="app-container">
      <Header/>
      <Discovery/>
      <App />
      <Footer/>
    </div>
    
  </StrictMode>,
)
