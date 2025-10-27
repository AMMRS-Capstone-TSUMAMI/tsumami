import {isLoggedIn} from "../../auth.js";

export default function Navbar(props) {
    if(isLoggedIn()) {
        return `
<nav class="navbar navbar-expand-sm">
    <div class="container-fluid">
        <a class="navbar-brand" data-link href="/home">
            <img src="/img/logo-sm.png" data-passthru alt="tsUmami" height="40" class="d-inline-block align-text-top">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav d-flex" >
                <li class="nav-item p-2 bd-highlight">
                    <a class="nav-link active" style="color: white" data-link aria-current="true" href="/meals">Meal Planner</a>
                </li>
                <li class="nav-item p-2 bd-highlight">
                    <a class="nav-link active" style="color: white" data-link href="/me">My Account</a>
                </li> 
                 <li class="nav-item ms-auto p-2 bd-highlight">
                    <a data-link href="/about">
                        <img src="/img/devLogo.png" data-passthru alt="tsUmami" height="40" id="devLogo" class="d-inline-block align-text-top">
                    </a>
                </li>
                <li class="nav-item ms-auto p-2 bd-highlight">
                    <a id="logout-btn" class="nav-link active" style="color: white" data-link href="/logout">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
    `;
    } else {
        return ""
    }
}
console.log("graphic design(devLogo.png)--Ann Yoshimura");
