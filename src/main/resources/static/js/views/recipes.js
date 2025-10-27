import {checkAndAddTrophy} from "./User.js";

let me;
let recipeInfo;

export default function recipesHTML(props) {
    recipeInfo = props.recipes
    console.log(recipeInfo);
    me = props.me;
    return `
<div id="recipes-page" class="container g-0">
    <div class="row">   
        <div id="recipes-header" class="col"></div>
    </div>
    <div class="row">
        <div class="col-6 g-0">
            <div id="ingredient-cards" class="row row-cols-3 row-cols-lg-6 g-0 ps-1"></div>
        </div>
        <div class="instruction-div col-6">
            <ol id="recipe-instructions"></ol>
        </div>  
    </div>
</div>
 `;
}

export function recipesEvent() {
    checkAndAddTrophy(me.trophies, 4);
    populateHeader();
    populateIngredients();
    populateSteps();
}

function populateHeader() {
    let header = document.querySelector("#recipes-header")
    header.innerHTML = `
<h3 id="recipes-card-title" data-id="${recipeInfo.id}">${recipeInfo.title}</h3>
<div class="row">
    <img src="${recipeInfo.image}" id="recipes-card-img" alt="Recipe Image">
</div>      
    `;
}

function populateIngredients() {
    let html = "";
    let ingredientCards = document.querySelector("#ingredient-cards")
    let ingredients = recipeInfo.extendedIngredients.map((el) => el);
    for (let i = 0; i < ingredients.length; i++) {
        let image = `https://spoonacular.com/cdn/ingredients_100x100/${ingredients[i].image}`;
        if (ingredients[i].image === null) {
            image = "/img/frying-panResized.png"
        }
        html += `

<div class="col">
    <div class="card ingredient-card">
        <div class="card-header">${ingredients[i].measures.us.amount} ${ingredients[i].measures.us.unitShort}</div>
        <div class="card-body p-1">
            <div class="ingredient-img" style="background-image: url(${image})"></div>
        </div>
        <div class="card-footer">${ingredients[i].name}</div>
    </div>
</div>
        `;
    }
    ingredientCards.innerHTML = html;
}


function populateSteps() {
    let html = "";
    let stepsList = document.querySelector("#recipe-instructions")
    let steps = recipeInfo.analyzedInstructions[0].steps.map((el) => el.step)
    console.log(`steps`);
    console.log(steps);
    for (let i = 0; i < steps.length; i++) {
        html += `<li>${steps[i]}</li>`
    }
    stepsList.innerHTML = html;
}
