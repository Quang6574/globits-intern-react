import Sidenav from './components/Sidenav'
import SidenavRoute from './routers/SidenavRoute'
import './styles/App.css'
import {useState} from 'react'

import {Button, Container} from "@mui/material"

function App() {
  const [showNav, setShowNav] = useState(false);

  return (
    <Container sx={{bgcolor: 'background.default', color: 'text.default'}}>
      <header >
        
        <Button variant="contained" onClick ={() => setShowNav(!showNav)}>Globlits</Button>
        
      </header>
      
      <Sidenav show={showNav}/>

      <main>
        <SidenavRoute />
      </main>
    
    </Container>
  )
}
export default App
