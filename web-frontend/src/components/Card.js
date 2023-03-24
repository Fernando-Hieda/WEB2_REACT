import { Link } from "react-router-dom";

export function Card({content, link}) {
    let playlistLink = "/playlist?id=" + link

    return (
    <Link to={playlistLink}>
        <div className="mx-5 min-w-max h-full text-center hover:bg-gray-200 bg-slate-100 rounded-xl drop-shadow dark:border-slate-600 items-center bg-gray-200 dark:bg-slate-700 border-solid border-2 dark:border-slate-500 p-4">
            <img src={ process.env.PUBLIC_URL + '/images/playlist.png' } alt="playlist"></img>

            <br/>
            {content}
        </div>
    </Link>
    )
}