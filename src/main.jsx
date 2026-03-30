import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './styles/index.css'
import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme ({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
  },
},
})


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme= {theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
