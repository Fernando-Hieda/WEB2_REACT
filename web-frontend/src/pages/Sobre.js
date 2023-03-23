import { NavBar } from "../components/NavBar";

function Sobre() {
    return (
        <div className="h-full min-h-screen flex flex-col dark:bg-slate-900">
            <NavBar />
            <div className="flex-1 flex flex-col items-center m-2 content-center self-center justify-center h-75 max-w-2xl">
                <div className="flex flex-wrap justify-center w-full max-w-lg">
                    <div className="p-2 dark:text-white text-xl text-justify">Site construido por:</div>
                </div>
                <br/>
                <div className="bg-slate-100 rounded-xl p-4 drop-shadow dark:border-slate-600 items-center bg-gray-200 dark:bg-slate-700 border-solid border-2 dark:border-slate-500">
                    <a href="https://www.github.com/jobucaldas">
                        <ul>
                            <li>João Victor Bueno de Caldas</li> 
                            <li>RA: 769657</li>
                            <li>Github: @jobucaldas</li>
                        </ul>
                    </a>
                </div>
            </div>
            <div className="p-2 dark:text-white text-md text-center">
                Idealizado para a disciplina de <em>Desenvolvimento de Software Web 2</em> na <em>Universidade Federal de São Carlos</em>
            </div>
        </div>
    );
}

export default Sobre;