import { Link } from "react-router-dom";

export function Button({label, color, link, action, long}) {
    let buttonColorClasses = ''
    if(color === 'green') {
        buttonColorClasses = 'bg-green-700 hover:bg-green-900 text-white active:bg-green-500';
    } else if(color === 'blue') {
        buttonColorClasses = 'bg-blue-700 hover:bg-blue-900 text-white active:bg-blue-500';
    } else if(color === 'purple') {
        buttonColorClasses = 'bg-purple-700 hover:bg-purple text-white active:bg-purple-500';
    } else if(color === 'red') {
        buttonColorClasses = 'bg-red-700 hover:bg-red text-white active:bg-red-500';
    } else {
        throw 'Button must have blue, purple, red or green as the color';
    }

    if(long === 'true'){
        buttonColorClasses += ' w-full'
    }

    if(typeof(action) === 'string') {
        action = () => {}
    }

    const buttonClasses = buttonColorClasses + ' p-3 rounded-2xl text-center';

    if(link) {
        return <Link to={link} className={buttonClasses}>{label}</Link>
    } else if(action) {
        return <button onClick={action} className={buttonClasses}>{label}</button>
    } else {
        throw 'Button must have either link or action property defined';
    }
}