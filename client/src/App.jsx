import Home from './views/home/Home'
import Detail from './views/detail/detail'
import Form from './views/create/form'
import Landing from './views/landing/landing'

import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/navbar/Navbar.component'


function App() {

  const location = useLocation();

  return (
    <>
      <div className='App'>
           {(location.pathname !== '/' && <Navbar />)}
           <Routes>
             <Route path='/' element={<Landing />} />
             <Route path='/home' element={<Home />} />
             <Route path='/detail/:id' element={<Detail />} />
             <Route path='/create' element={<Form />} />
            </Routes>
      </div>
    </>
  );
}

export default App;
