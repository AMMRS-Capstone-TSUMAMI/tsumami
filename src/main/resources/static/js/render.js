import navbar from "./views/partials/navbar.js";

/**
 * Pushes the current URI to the URL bar and sets the HTML of the app div.
 * @param props - the data required for view rendering
 * @param route - the object containing information for the given endpoint
 */
export default function render(props, route) {
    const body = document.querySelector("#indexBody");
    if(route.backgroundColor) {
        // body.setAttribute("style", `background-color: ${route.backgroundColor};`);
        body.style.backgroundColor = route.backgroundColor;
        console.log("bg color is running");
    } else {
        body.setAttribute("style", `background-color: var(--bg-color)`);
    }
    if(route.backgroundImage){
        body.setAttribute("style", `background-image: ${route.backgroundImage};`);
        console.log("bg img is running");
    }
    if(route.backdropFilter){
        // body.setAttribute("style", `backdrop-filter: ${route.blurb};`);
        body.style.backdropFilter = route.backdropFilter;
        console.log(route.backgroundColor);
    }
    if(route.background){
        // body.setAttribute("style", `backdrop-filter: ${route.blurb};`);
        body.style.background = route.background;
        console.log(route.background);
    }

    const app = document.querySelector('#app');
    const title = `tsUmami - ${route.title}`;
    document.title = title;
    app.innerHTML = `${navbar(null)} ${route.returnView(props)}`;
    if (route.viewEvent){
        route.viewEvent();
    }
}
