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
    <a className="flex flex-col my-2 w-full h-min" href={e.link}>
        <div className="w-full hover:bg-gray-200 bg-slate-100 rounded-xl p-4 drop-shadow dark:border-slate-600 items-center bg-gray-200 dark:bg-slate-700 border-solid border-2 dark:border-slate-500">
            {e.name}
        </div>
    </a>);

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

    // async function apagarPlaylist() {
    //     const playlistRemoveBody = {
    //         id: queryParameters.get("id")
    //     };
    //     const response = await fetch('http://localhost:5000/playlistRemove', {
    //         headers: { 'Content-Type': 'application/json' },
    //         method: 'PUT',
    //         body: playlistRemoveBody,
    //     });
    //     console.log(playlistRemoveBody.id);
    //     if (response.status === 200) {
    //         console.log(playlistRemoveBody.id);
    //         navigate("../");
    //         return;
    //     }

    //     throw 'Error while removing playlist. See server log for details.';
    // }

    return (
        <div className="flex flex-col dark:bg-slate-900 max-h-screen align-center">
            <NavBar />
            <div className="flex-1 flex py-10 items-center align-center justify-center flex-col md:flex-row m-2 content-center self-center justify-center md:w-4/5 max-h-5/6">
                <div className="flex-1 flex-col grow h-min md:max-w-[26em] content-center align-center text-center justify-center bg-slate-100 rounded-xl p-4 drop-shadow dark:border-slate-600 items-center bg-gray-200 dark:bg-slate-700 border-solid border-2 dark:border-slate-500">
                    <input onChange={e => setSongName(e.target.value)} value={songName} className=" justify-center p-2 rounded bg-blue-100 dark:bg-blue-800 dark:text-white md:w-full max-w-full mr-5" placeholder="Nome da Música" type="text" />
                    <br/>
                    <br/>
                    <input onChange={e => setSongLink(e.target.value)} value={songLink} className=" justify-center p-2 rounded bg-blue-100 dark:bg-blue-800 dark:text-white md:w-full max-w-full mr-5" placeholder="Link" type="text" />
                    <br/>
                    <br/>
                    <Button label='Adicionar Música' action={adicionarMusica} color='green'/>
                </div>
                <br/>
                <br/>
                <div className="md:mx-10 self-stretch content-center align-center text-center overflow-y-scroll md:w-3/5 md:min-w-[28em] md:max-h-[73vh] max-h-[27vh]">
                    {songRows}
                </div>
            </div>
        </div >
    );
}

export default Playlist;