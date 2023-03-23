import { Button } from "../components/Button";
import { FormInput } from "../components/FormInput";
import { MessageBanner } from "../components/MessageBanner";
import { NavBar } from "../components/NavBar";
import { formatDate } from '../utils/utils';
import { useState } from 'react';

function Home() {
    const text = ''
    return (
        <div className="h-full min-h-screen flex flex-col dark:bg-slate-900 align-center">
            <NavBar />
            {sessionStorage.getItem("isLogged") === 'false' && (
                <div className="flex-1 flex flex-col items-center m-2 content-center self-center justify-center h-75 max-w-2xl">
                    <img src={ process.env.PUBLIC_URL + '/images/banner.png' } alt="banner"></img>
                    <br/>
                    <div className="flex flex-wrap justify-center w-full max-w-lg">
                        <div className="p-2 dark:text-white text-xl text-justify">Crie playlists independente do serviço escolhido!</div>
                    </div>
                    <br/>
                    <div className="flex flex-wrap justify-center w-[75%]">
                        <Button label='Começar' link="/login" color='green' long='true'/>
                    </div>
                </div>
            )}
            {sessionStorage.getItem("isLogged") === 'true' && (
                <div className="flex-1 flex flex-col items-center m-2 content-center self-center justify-center h-75 max-w-2xl">
                    <img src={ process.env.PUBLIC_URL + '/images/banner.png' } alt="banner"></img>
                    <br/>
                    <div className="flex flex-wrap justify-center w-full max-w-lg">
                        <div className="p-2 dark:text-white text-xl text-center"><p>Bem-vindo!</p><p>Você pode ver e editar suas playlists pelo dashboard</p></div>
                    </div>
                    <br/>
                    <Button label='Ir ao dashboard' link="/dashboard" color='green' long='true'/>
                </div>
            )}
        </div >
    );
}

export default Home;