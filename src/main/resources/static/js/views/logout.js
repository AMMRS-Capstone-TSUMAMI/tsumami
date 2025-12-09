import createView from "../create-view.js";

export default function logout(props) {
    return `
       <h1>Logging Out</h1>
    `;
}

export function LogoutEvent() {
    window.setTimeout(function (){
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("tsumami_user");
    createView("/landing");
},500)
}


