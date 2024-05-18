import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './components/nav-bar/NavBar'
import Footer from './components/footer/Footer'
import { useFooter } from './hooks/useFooter'

function App() {

  const isFooter = useFooter();

  return (
    <div className='app'>
      <NavBar />
      <Outlet />
      {isFooter && <Footer />}
    </div>
  )
}

export default App
