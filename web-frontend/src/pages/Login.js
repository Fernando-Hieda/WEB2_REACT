import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { NavBar } from "../components/NavBar";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { FormInput } from "../components/FormInput";
import { MessageBanner } from "../components/MessageBanner";

function Login() {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [isUserCreated, setIsUserCreated] = useState(false);

    let navigate = useNavigate(); 

    function resetForm() {
        setUserEmail('');
        setUserPassword('');
        
        setInvalidEmail(false);
    }

    async function retrieveUserByEmail() {
        if (userEmail.trim().length === 0) {
            setInvalidEmail(true);
            return;
        } else {
            setInvalidEmail(false);
            try {
                const getUserResponse = await fetch('http://localhost:5000/user?email=' + userEmail);
                if (getUserResponse.status === 200) {
                    const user = await getUserResponse.json();
                }

                setUserEmail('');
                setUserPassword('');
            }
            catch (err) {
                console.log('Error: ' + err);
            }
        }
    }

    async function createUser() {
        const userRequestBody = {
            email: userEmail,
            password: userPassword
        };
        const putUserResponse = await fetch('http://localhost:5000/user', {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(userRequestBody),
        });
        if (putUserResponse.status === 200) {
            resetForm();
            setIsUserCreated(true);
            return;
        }

        throw 'Error while creating user. See server log for details.';
    }

    async function logUser() {
        setIsUserCreated(false);
        const getUserResponse = await fetch('http://localhost:5000/user?email=' + userEmail);
        if (getUserResponse.status === 200) {
            const user = await getUserResponse.json();
            console.log(user);
            if(user.email === userEmail)
                if(user.password === userPassword)
                {
                    sessionStorage.setItem("isLogged", 'true');
                    sessionStorage.setItem("user", user.id);
                    navigate("../dashboard");
                    return;
                }
        }
        setInvalidEmail(true);
        
        throw 'Error while loging as user. See server log for details.';
    }

    return (
        <div className="h-full min-h-screen flex flex-col dark:bg-slate-900">
            <NavBar />

            <div className="flex-1 flex flex-col items-center m-2 content-center self-center justify-center h-75 w-screen">
                <div className="md:min-w-[28em] bg-slate-100 rounded-xl p-4 drop-shadow dark:border-slate-600 items-center bg-gray-200 dark:bg-slate-700 border-solid border-2 dark:border-slate-500">
                    Email
                    <br/>
                    <input onChange={e => setUserEmail(e.target.value)} value={userEmail} className="flex-1 p-2 rounded bg-blue-100 dark:bg-blue-800 dark:text-white w-full" type="email" />
                    <br/>
                    <br/>
                    Senha
                    <br/>
                    <input onChange={e => setUserPassword(e.target.value)} value={userPassword} className="flex-1 p-2 rounded bg-blue-100 dark:bg-blue-800 dark:text-white w-full" type="password" />
                    <br/>
                    <br/>
                    <div className="flex flex-wrap gap-y-2 justify-center w-full">
                        <Button label='Logar' action={logUser} color='green' long="true"/>
                        <button onClick={createUser} >Criar conta</button>
                    </div>
                </div>
                <div className='md:min-w-[28em]'>
                    {invalidEmail && (
                    <div className="my-5 bg-red-400 rounded-xl p-4 drop-shadow dark:border-slate-600 items-center bg-red-200 dark:bg-red-700">
                        Esse email não é utilizado por uma conta cadastrada ou a senha está incorreta
                    </div>)}
                    {isUserCreated && (
                    <div className="my-5 bg-green-400 rounded-xl p-4 drop-shadow dark:border-slate-600 items-center bg-green-200 dark:bg-green-700">
                        Usuário criado com sucesso
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default Login;