import {Routes, Route} from 'react-router-dom';
import About from './About.jsx';
import NotFound from './NoutFound.jsx';
import Home from './Home.jsx';
import Usuarios from './Usuarios.jsx';
import Usuario from './Usuario.jsx';


export default function Router() {
    return <Routes>
            <Route path="/" element={<Home />} />
            {sessionStorage.user?.roles?.includes('admin') && <>
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/usuario" element={<Usuario />} />
                <Route path="/usuario/:uuid" element={<Usuario />} />
            </>}
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
}

