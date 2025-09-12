import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import HomePage from './pages/home'
import LibraryPage from './pages/library'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LibraryPage />
    {/* <HomePage /> */}
  </StrictMode>,
)
