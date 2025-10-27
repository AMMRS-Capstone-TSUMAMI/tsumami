let recipes;
let food;
let recipeArray;
let html="";




export default function Home(props) {
    // recipeData=props.recipeData;
    console.log("The frontend did it. HER FAULT");
    // console.log(recipeData);

    return `
        <main>
            <div class="home-container">
                <h1 class="home-title">Search Recipe</h1>
                <form>
                    <input type="text" id="search-bar" placeholder="Search Your Recipe...">
                    <i class="fa-solid fa-magnifying-glass search-icon"></i>
                </form>
                <div id="search-results" class="d-flex flex-wrap scrolling-wrapper"></div>
            </div>
        </main>
    `;
}

export function HomeEvents() {
    searchBarHandler()
}

function searchBarHandler(e) {
    const userInput = document.querySelector('#search-bar');
    userInput.addEventListener('keypress', async function (e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            //function here to clear inner html for #search-results
            let newUserQuery = userInput.value;
            await getAPI(newUserQuery);
        }
    })
}
// function clearSearchResults(){
//     let searchContainer = document.querySelector("#search-results");
//     searchContainer.innerHTML = "";
// }

function getAPI(userSearch) {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API}&query=${userSearch}&number=100`).then(resp => {
        return resp.json();
    }).then(food => {
        recipeArray = [];
        recipeArray.push(food);
        console.log(food);
        console.log(recipeArray);
        loopRecipesData()
    })
}
function loopRecipesData() {
    html="";
    console.log(recipeArray);
    for (let i = 0; i < recipeArray.length; i++) {
        //     recipeArray.push(recipes.results)
        // }
        console.log(recipeArray[0].results)

        for (let j = 0; j < recipeArray[0].results.length; j++) {
            let image = "";
            let title = "";
            let id = "";

            image += recipeArray[0].results[j].image;
            title += recipeArray[0].results[j].title;
            id += recipeArray[0].results[j].id;
            for (let i = 0; i < recipeArray[0].results[j].length; i++) {
                let image = `https://spoonacular.com/recipeImages/${recipeArray[0].results[j].image}`;
                if (recipeArray[0].results[j].image === null) {
                    image = "/img/frying-panResized.png"
                }
            }
            html += `
                <div id="outer-outer-border">
                    <div id="outer-border">
                        <div class="home-recipe-card">
                            <div class="home-card-image">
                                <img src="${image}" id="home-card-img" class="home-card-img" alt="Recipe Image">
                                <div data-id="${id}" id="home-card-title" class="card-footer">${title}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            const recipesContainer = document.querySelector("#search-results");
            recipesContainer.innerHTML = html;
        }
    }
}
// console.log(recipeArray)
// recipeArray.forEach(function (recipe, index) {

// })



