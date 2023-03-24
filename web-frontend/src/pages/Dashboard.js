import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { FormInput } from "../components/FormInput";
import { MessageBanner } from "../components/MessageBanner";
import { NavBar } from "../components/NavBar";
import { formatDate } from '../utils/utils';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Dashboard() {
    const [playlistName, setPlaylistName] = useState('');
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        async function fetchPlaylists() {
            const response = await fetch('http://localhost:5000/playlist?user_id=' + sessionStorage.getItem("user"));
            if (response.status === 200) {
                let responseJson = await response.json();
                console.log(responseJson);
                setPlaylists(responseJson);
            }
        }
        fetchPlaylists();
    }, []);

    async function fetchPlaylists() {
        const response = await fetch('http://localhost:5000/playlist?user_id=' + sessionStorage.getItem("user"));
        if (response.status === 200) {
            let responseJson = await response.json();
            console.log(responseJson);
            setPlaylists(responseJson);
        }
    }

    const playlistRows = playlists.map(e => 
    <Card link={e.id} content={e.name}></Card>);

    async function adicionarPlaylist() {
        const playlistRequestBody = {
            user_id: sessionStorage.getItem("user"),
            name: playlistName
        };
        const putPlaylistResponse = await fetch('http://localhost:5000/playlist', {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(playlistRequestBody),
        });
        if (putPlaylistResponse.status === 200) {
            fetchPlaylists();
            return;
        }

        throw 'Error while creating playlist. See server log for details.';
    }

    return (
        <div className="flex flex-col dark:bg-slate-900 justify-center align-center h-screen">
            <NavBar />
            {sessionStorage.getItem("isLogged") === 'true' && (
                <div className="flex-1 flex flex-col items-center md:px-64 m-2 h-full max-w-full">
                    <div className="text-center mt-5">
                        <input onChange={e => setPlaylistName(e.target.value)} value={playlistName} className="flex-1 p-2 rounded bg-blue-100 dark:bg-blue-800 dark:text-white md:w-2/5 mx-5" placeholder="Nome da Playlist" type="text" />
                        <Button label='Adicionar Playlist' action={adicionarPlaylist} color='green'/>
                    </div>
                    <br/>
                    <br/>
                    <div className="md:mx-10 flex flex-row flex-nowrap overflow-x-scroll max-w-full md:min-w-[28em] h-80">
                        {playlistRows}
                    </div>
                </div>
            )}
            {sessionStorage.getItem("isLogged") === 'false' && (<div className="flex-1 flex flex-col items-center m-2 content-center self-center justify-center h-75 max-w-2xl">
                <img src={ process.env.PUBLIC_URL + '/images/banner.png' } alt="banner"></img>
                <br/>
                <div className="flex flex-wrap justify-center w-full max-w-lg">
                    <div className="p-2 dark:text-white text-xl text-justify">Você precisa estar logado para ver suas playlists, deseja entrar?</div>
                </div>
                <br/>
                <div className="flex flex-wrap justify-center w-[75%]">
                    <Button label='Fazer login' link="/login" color='green' long='true'/>
                </div>
            </div>)}
        </div >
    );
}

export default Dashboard;