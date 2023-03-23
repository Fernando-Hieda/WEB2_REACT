import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { FormInput } from "../components/FormInput";
import { MessageBanner } from "../components/MessageBanner";
import { NavBar } from "../components/NavBar";
import { formatDate } from '../utils/utils';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Playlist() {
    let navigate = useNavigate(); 

    const [songName, setSongName] = useState('');
    const [songLink, setSongLink] = useState('');
    const [songs, setSongs] = useState([]);

    const [queryParameters] = useSearchParams()


    useEffect(() => {
        async function fetchPlaylists() {
            const response = await fetch('http://localhost:5000/song?reference=' + queryParameters.get("id"));
            if (response.status === 200) {
                let responseJson = await response.json();
                console.log(responseJson);
                setSongs(responseJson);
            }
        }
        fetchPlaylists();
    }, []);

    const songRows = songs.map(e => 
    <a href={e.link}>{e.link}</a>
    );

    async function adicionarMusica() {
        const songRequestBody = {
            reference: queryParameters.get("id"),
            link: songLink,
            name: songName
        };
        console.log(songRequestBody);
        const putPlaylistResponse = await fetch('http://localhost:5000/song', {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(songRequestBody),
        });
        if (putPlaylistResponse.status === 200) {
            console.log(songRequestBody);
            return;
        }

        throw 'Error while adding song. See server log for details.';
    }

    async function apagarPlaylist() {
        const response = await fetch('http://localhost:5000/playlistRemove?id=' + queryParameters.get("id"));
        if (response.status === 200) {
            let responseJson = await response.json();
            console.log(responseJson);
            navigate("../");
        }
    }

    return (
        <div className="flex flex-col dark:bg-slate-900 align-center">
            <NavBar />
            <div className="flex-1 flex flex-col items-center m-2 content-center self-center justify-center h-75 max-w-2xl">
                <div className="text-xl text-center mt-5">
                </div>
                <input onChange={e => setSongLink(e.target.value)} value={songName} className="flex-1 p-2 rounded bg-blue-100 dark:bg-blue-800 dark:text-white w-2/5 mx-5" placeholder="Nome da Música" type="text" />
                <input onChange={e => setSongLink(e.target.value)} value={songLink} className="flex-1 p-2 rounded bg-blue-100 dark:bg-blue-800 dark:text-white w-2/5 mx-5" placeholder="Link" type="text" />
                <Button label='Adicionar Música' action={adicionarMusica} color='green'/>
                <br/>
                <Button label='Apagar Playlist' action={apagarPlaylist} color='red'/>
                <br/>
                <br/>
                <div className="mx-10 flex flex-row flex-nowrap overflow-y-scroll max-w-screen-sm md:min-w-[28em] h-full">
                    {songRows}
                </div>
            </div>
        </div >
    );
}

export default Playlist;