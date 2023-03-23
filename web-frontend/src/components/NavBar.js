import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function NavBar() {
    const [floatMenuShown, setFloatMenuShown] = useState(false);

    let navigate = useNavigate(); 

    function toggleFloatMenuShown() {
        setFloatMenuShown(!floatMenuShown);
    }

    async function sair() {
        sessionStorage.setItem("isLogged", 'false');
        sessionStorage.setItem("user", '');
        navigate("/");
    }

    return (

        <div className="z-50 w-full bg-gray-300 dark:bg-slate-800 text-white flex flex-row p-3 justify-between items-center">
            <Link to="/" className="text-green-800 dark:text-green-400 text-center text-base sm:text-2xl font-black select-none">__PLShare</Link>
            <div className="cursor-pointer">
                <MdMenu onClick={toggleFloatMenuShown} className="text-2xl sm:hidden text-green-700 dark:text-green-400 dark:hover:text-green-200 hover:text-green-900 select-none" />
                <div>
                    {sessionStorage.getItem("isLogged") === 'false' && (
                    <div className={`z-50 absolute right-0 top-12 min-w-[26%] flex sm:hidden flex-col items-center bg-gray-300 dark:bg-slate-800 border-solid border-2 dark:border-slate-600 p-4 transition-all duration-300 ${floatMenuShown ? 'visible opacity-100' : 'collapse opacity-0'}`}>
                        <Link to="/sobre" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 mb-4 select-none">Sobre</Link>
                        <Link to="/login" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 select-none">Login</Link>
                    </div>)}
                    {sessionStorage.getItem("isLogged") === 'true' && (
                    <div className={`z-50 absolute right-0 top-12 min-w-[26%] flex sm:hidden flex-col items-center bg-gray-300 dark:bg-slate-800 border-solid border-2 dark:border-slate-600 p-4 transition-all duration-300 ${floatMenuShown ? 'visible opacity-100' : 'collapse opacity-0'}`}>
                        <Link to="/dashboard" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 mb-4 select-none">Dashboard</Link>
                        <Link to="/sobre" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 mb-4 select-none">Sobre</Link>
                        <button onClick={sair} className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 select-none">Sair</button>
                    </div>)}
                </div>
            </div>
            {sessionStorage.getItem("isLogged") === 'false' && (
            <div className="hidden sm:flex items-center">
                <Link to="/sobre" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 mr-10 select-none">Sobre</Link>
                <Link to="/login" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 mr-10 select-none">Login</Link>
            </div>)}
            {sessionStorage.getItem("isLogged") === 'true' && (
            <div className="hidden sm:flex items-center">
                <Link to="/dashboard" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 mr-10 select-none">Dashboard</Link>
                <Link to="/sobre" className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 mr-10 select-none">Sobre</Link>
                <button onClick={sair} className="text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 mr-10 select-none">Sair</button>
            </div>)}
        </div>

    );
}