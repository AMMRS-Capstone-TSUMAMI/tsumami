import home, {HomeEvents} from "./views/home.js";
import landing from "./views/landing.js";
import about, {aboutEvent} from "./views/about.js";
import error404 from "./views/error-404.js";
import loading from "./views/loading.js";
import login, {LoginEvent} from "./views/login.js";
import register, {RegisterEvent} from "./views/register.js"
import prepareUserHTML, {prepareUserJS} from "./views/user.js";
import logout, {LogoutEvent} from "./views/logout.js";
import meals, {MealsEvent} from "./views/meals.js";
import recipesHTML, {recipesEvent} from "./views/recipes.js";

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */

export default function router(URI) {
    const routes = {
        '/landing': {
            returnView: landing,
            state: {},
            uri: '/landing',
            title: 'Landing',
        },
        '/': {
            returnView: landing,
            state: {},
            uri: '/landing',
            title: 'Landing',
        },
        '/home': {
            returnView: home,
            state: {},
            uri: '/home',
            title: 'home',
            background: `#eaeff3`,
            viewEvent: HomeEvents
        },
        '/me': {
            returnView: prepareUserHTML,
            state: {
                me: '/api/users/me',
                allTrophies: '/api/trophies/getAllTrophies',
                allChefLevels: '/api/chefLevels/getAllChefLevels',
                macros: '/api/macros',
            },
            uri: '/me',
            title: 'User Info',
            viewEvent: prepareUserJS,
            background: `#eaeff3`
            // background: 'linear-gradient(145deg, #444, #000)',
        },
        '/login': {
            returnView: login,
            state: {},
            uri: '/login',
            title: "Login",
            viewEvent: LoginEvent
        },
        '/register': {
            returnView: register,
            state: {},
            uri: '/register',
            title: "Register",
            viewEvent: RegisterEvent
        },
        '/logout': {
            returnView: logout,
            state: {},
            uri: '/logout',
            title: "Logout",
            viewEvent: LogoutEvent,
        },
        '/meals': {
            returnView: meals,
            state: {
                me: '/api/users/me'
            },
            uri: '/meals',
            title: 'Meals',
            viewEvent: MealsEvent,
            background: `#eaeff3`
        },
        '/about': {
            returnView: about,
            state: {
                me: '/api/users/me'
            },
            uri: '/about',
            title: 'About',
            // backgroundColor: ' var(--text-color)'
            // backgroundColor: 'rgb(29, 29, 29)',
            background: 'linear-gradient(145deg, #444, #000)',
            // backgroundColor: `#eaeff3`,
            // background: 'linear-gradient(145deg, #DFE0DF, #000)',
            // backgroundImage: "url('https://demos.creative-tim.com/paper-kit-2/assets/img/antoine-barres.jpg');"
            // backgroundImage: "url('\img/norway_fjord_2000x1200.jpeg\');",
            // backgroundImage: "url('\img/ocean-bgResized.jpeg\');",
            // backgroundImage: "url('\img/ocean-bgResized.jpeg\');",
            backdropFilter:  `blur(7.7px)`,
            viewEvent: aboutEvent
        },
        '/error': {
            returnView: error404,
            state: {},
            uri: location.pathname,
            title: ' ERROR',
            background: `#eaeff3`
        },
        '/loading': {
            returnView: loading,
            state: {},
            uri: location.pathname,
            title: 'Loading...',
            background: `#eaeff3`
        },
        '/recipes/:id': {
            returnView: recipesHTML,
            state: {
                recipes: `https://api.spoonacular.com/recipes/:id/information?apiKey=${SPOONACULAR_API}`,
                me: '/api/users/me'
            },
            uri: '/recipes/:id',
            title: 'Recipes',
            viewEvent: recipesEvent,
            background: `#eaeff3`
        }
    };

    if(!routes[URI]) {
        for (const routeKey in routes) {
            let keyPieces = routeKey.split("/")
            if (keyPieces.length > 2) {
                let pathVar = keyPieces[2];
                let pathInput = URI.split("/")[2];
                let baseURI = new RegExp(keyPieces[1])
                if (baseURI.test(BACKEND_HOST_URL + URI)) {
                    let foundRoute = routes[routeKey]
                    foundRoute.uri = URI;
                    for (let statePiece in foundRoute.state) {
                        foundRoute.state[statePiece] = foundRoute.state[statePiece].replaceAll(pathVar, pathInput);
                    }
                    return foundRoute
                }
            }
        }
    }
    return routes[URI];
}

