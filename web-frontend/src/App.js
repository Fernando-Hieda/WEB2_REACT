import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Sobre from './pages/Sobre';
import Dashboard from './pages/Dashboard';
import Playlist from './pages/Playlist';


function App() {
    sessionStorage.setItem("isLogged", 'false');
    sessionStorage.setItem("user", '');

    return (
        <BrowserRouter>
            <div className='absolute z-0 bg-green-100 h-full w-full'>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="sobre" element={<Sobre />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="playlist" element={<Playlist />} />
                    <Route path="playlist/:playlistId" component={Playlist} exact />
                </Route>
            </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
