import * as auth from "../auth.js";
import createView from "../create-view.js";
import {checkAndAddTrophy, getUserData} from "./User.js";
import * as utils from "../utils.js"

// TODO: update summaries for empty days
// TODO: calculate summaries in frontend
let today = new Date;
let me, intolerances, diet, nutrition, startDay, plan, results, timeslotId, summaries;
export default function Meals(props) {
    me = props.me;
    intolerances = me.intolerances;
    diet = me.diet;
    getStartDay(today)
    return `
<div class="container g-0">
    <div id="meals-main" class="container g-0">
        <div class="row">
            <div class="col-2 gs-0 ge-3 ps-0">
                <div id="meals-search-recipes" class="row">
                    <div class="col px-0">
                        <div class="meals-recipe-pane">
                            <div class="meals-recipe-search-pane"></div>
                                <form>
                                    <div class="mb-3">
                                        <label for="meals-recipe-search-field" class="form-label">Search Recipes</label>
                                        <input type="search" class="form-control" id="meals-recipe-search-field" placeholder="ex. korean bbq">
                                    </div>
                                     <div id="recipe-button" class="mb-3">
                                        <button class="btn btn-secondary d-none">Search</button>
                                    </div>
                                </form>
                                <div id="meals-recipe-search-results"></div> 
                        </div>
<!--                         <form>-->
<!--                            <div class="mb-3">-->
<!--                                <label for="meals-favorite-recipe-search" class="form-label">Search Favorites</label>-->
<!--                                <input type="search" class="form-control" id="meals-favorite-search" placeholder="Favorites">-->
<!--                            </div>-->
<!--                        </form>-->
                        <!--                        TODO: Collapsible-->
                        <!--                            TODO: Search Recipes-->
                        <!--                                TODO: Search Results data-recipe-id-->
                        <!--                            TODO: Search Favorite Recipes-->
                        <!--                                TODO: Search Results-->
                    </div>
                </div>
            </div>
            <div class="col-10 gs-3 ge-0 pe-0">
                <div id="meals-calendar" class="row">
                    <div class="col ps-1 pe-0">
                        <div id="meals-calendar-header">
                            <i id="week-prev" class="bi bi-caret-left-fill"></i>
                            <span id="meals-calendar-week" data-week-start="${startDay}">${generateCalendarWeek(startDay)}</span>
                            <i id="week-next" class="bi bi-caret-right-fill"></i>
                        </div>
                       <ul class="calendar-day">
                            <li class="timeslot-name"></li>
                            <li class="meals-calendar">Monday</li>
                            <li class="meals-calendar">Tuesday</li>
                            <li class="meals-calendar">Wednesday</li>
                            <li class="meals-calendar">Thursday</li>
                            <li class="meals-calendar">Friday</li>
                            <li class="meals-calendar">Saturday</li>
                            <li class="meals-calendar">Sunday</li>
                        </ul>
                        <ul class="meals-calendar-row slot-morning">
                            <li class="timeslot-name morning">
                                <i class="bi bi-brightness-alt-high-fill"></i>
                            </li>
                            <li class="meals-calendar timeslot top-left" data-slot="11"></li>
                            <li class="meals-calendar timeslot top" data-slot="21"></li>
                            <li class="meals-calendar timeslot top" data-slot="31"></li>
                            <li class="meals-calendar timeslot top" data-slot="41"></li>
                            <li class="meals-calendar timeslot top" data-slot="51"></li>
                            <li class="meals-calendar timeslot top" data-slot="61"></li>
                            <li class="meals-calendar timeslot top-right" data-slot="71"></li>
                        </ul>
                        <ul class="meals-calendar-row slot-noon">
                            <li class="timeslot-name noon">
                                <i class="bi bi-brightness-high-fill"></i>
                            </li>
                            <li class="meals-calendar timeslot left" data-slot="12"></li>
                            <li class="meals-calendar timeslot" data-slot="22"></li>
                            <li class="meals-calendar timeslot" data-slot="32"></li>
                            <li class="meals-calendar timeslot" data-slot="42"></li>
                            <li class="meals-calendar timeslot" data-slot="52"></li>
                            <li class="meals-calendar timeslot" data-slot="62"></li>
                            <li class="meals-calendar timeslot right" data-slot="72"></li>
                        </ul>
                        <ul class="meals-calendar-row slot-evening">
                            <li class="timeslot-name evening">
                                <i class="bi bi-moon-fill evening"></i>
                            </li>
                            <li class="meals-calendar timeslot" data-slot="13"></li>
                            <li class="meals-calendar timeslot" data-slot="23"></li>
                            <li class="meals-calendar timeslot" data-slot="33"></li>
                            <li class="meals-calendar timeslot" data-slot="43"></li>
                            <li class="meals-calendar timeslot" data-slot="53"></li>
                            <li class="meals-calendar timeslot" data-slot="63"></li>
                            <li class="meals-calendar timeslot" data-slot="73"></li>
                        </ul>
                        <ul class="meals-calendar-row summaries">
                            <li class="timeslot-name"></li>
                            <li class="meals-calendar summary bottom-left" data-summary="1"></li>
                            <li class="meals-calendar summary bottom" data-summary="2"></li>
                            <li class="meals-calendar summary bottom" data-summary="3"></li>
                            <li class="meals-calendar summary bottom" data-summary="4"></li>
                            <li class="meals-calendar summary bottom" data-summary="5"></li>
                            <li class="meals-calendar summary bottom" data-summary="6"></li>
                            <li class="meals-calendar summary bottom-right" data-summary="7"></li>
                        </ul>
                        <div style="text-align: center">Legend: <i class="bi bi-brightness-alt-high-fill"></i>:morning&#9;<i class="bi bi-brightness-high-fill"></i>:noon&#9;<i class="bi bi-moon-fill evening" style="font-size: .8rem"></i>:evening
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</div> 
    `;
}

export async function MealsEvent() {
    await checkAndAddTrophy(me.trophies, 1);
    me = await auth.getMe();
    prepareSearchFields();
    addCalendarListeners();
    await fetchCalendarEntries().then(async() => {
        await populateCalendar()
    }).then(() => {
        addMealCardListeners()
    })
    await fetchSummaries().then(async () => {
        populateSummaries()
    })
    console.log("MealsEvent Complete");
}

function calculateSummaries(calories, fat, carbs, protein) {

}

function prepareSearchFields() {
    const recipeField = document.querySelector("#meals-recipe-search-field");
    const recipeBtn = document.querySelector("#recipe-button")
    const favoriteRecipeField = document.querySelector("#meals-favorite-recipe-field");
    recipeBtn.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("submitted");
        console.log(recipeField.value);
        fetchRecipes(recipeField.value);
    })
}

async function fetchRecipes(query) {
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let url = `${SEARCH_RECIPES}?query=${query}&number=${MAX_RESULTS}&apiKey=${SPOONACULAR_API}`
    if(intolerances.length > 0) {
        url += `&intolerances=${intolerances.map((el) => el.name).join(",")}`
    }
    if(diet !== "no diet" && diet !== null)
        url += `&diet=${diet}`
    let data = await fetch(url, options)
        .then(async function(response) {
            if(!response.ok) {
                console.log("Error Finding Recipe: " + response.status);
            } else {
                console.log("Search Complete");
                me = await auth.getMe();
                checkAndAddTrophy(me.trophies, 2)
                getUserData().then(data => me = data);
                return response.json()
            }
        });
    console.log(data.results);
    results = data.results;
    populateResults();
}
async function fetchNutrition(id) {
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let URL = `${RECIPES}/${id}/nutritionWidget.json?apiKey=${SPOONACULAR_API}`
    let data = await fetch(URL, options)
        .then(async function(response) {
            if(!response.ok) {
                console.log("Error Finding Nutrition Facts: " + response.status);
            } else {
                console.log("Search Complete");
                return response.json()
            }
        });
    console.log(data);
    nutrition = data;
}

async function fetchSummaries() {
    const url = `${BACKEND_HOST_URL}/api/plans/summary?startDate=${startDay.ISO()}`;
    summaries = await utils.fetchJSON(url, auth.BACKEND_GET_OPTIONS);
}

// function populateSummaries () {
//     summaries.forEach((summary) => {
//         let target = document.querySelector(`[data-summary="${summary.dayNum}"]`)
//         target.innerHTML = `
//         <div class="calories">Calories: <span>${summary.calories}</span></div>
//         <div class="fat">Fat: <span>${summary.fat}</span>g</div>
//         <div class="carbs">Carbs: <span>${summary.carbs}</span>g</div>
//         <div class="protein">Protein: <span>${summary.protein}</span>g</div>
//         `
//     })
// }
function populateSummaries () {
    summaries.forEach((summary) => {
        let target = document.querySelector(`[data-summary="${summary.dayNum}"]`)
        target.innerHTML = `
        <div class="calories">Calories: <span>${summary.calories}</span></div>
        <div class="fat">Fat: <span>${summary.fat}</span>g</div>
        <div class="carbs">Carbs: <span>${summary.carbs}</span>g</div>
        <div class="protein">Protein: <span>${summary.protein}</span>g</div>
        `
    })
}

function populateResults() {
    const recipeResults = document.querySelector("#meals-recipe-search-results")
    let html = "";
    let id,
        recipeId,
        title,
        image;
    results.forEach(result => {
        id = `r${Math.random().toString(36).slice(2)}`;
        recipeId = result.id;
        title = result.title;
        image = result.image;

        html += `
<div class="card meal-card" id="${id}" data-recipe-id="${recipeId}" data-title="${title}" data-image="${image}" draggable="true" style="background-image: url(${image})">
    <div class="meal-overlay" style="display: none">
        <i class="bi bi-info-circle-fill info" data-recipe-id="${recipeId}"></i>
<!--        <i class="bi bi-heart-fill save" data-recipe-id="${recipeId}"></i>-->
        <i class="bi bi-trash3-fill delete" data-recipe-id="${recipeId}"></i>
    </div>
    <div class="card-body"></div>
    <div class="card-footer p-1">${title}</div>
</div>
        `
    })
    recipeResults.innerHTML = html;
    addMealCardListeners()
}

async function addRecipe(recipeId, recipeName, image, startDate, dayNum, timeslot, calories, fat, carbs, protein) {
    const url = `${BACKEND_HOST_URL}/api/plans/post?recipeId=${recipeId}&dayNum=${dayNum}&image=${image}&recipeName=${recipeName}&startDate=${startDay.ISO()}&timeslot=${timeslot}&calories=${calories}&fat=${fat}&carbs=${carbs}&protein=${protein}`;
    timeslotId = await utils.fetchJSON(url, auth.BACKEND_POST_OPTIONS);
}

async function deleteRecipe(planTimeslotId, recipeId) {
    const url = `${BACKEND_HOST_URL}/api/plans/delete?planTimeslotId=${planTimeslotId}&recipeId=${recipeId}`;
    await utils.fetchText(url, auth.BACKEND_DELETE_OPTIONS);
}

function getStartDay(date) {
    let day = date.getDay()
    if(day === 0) {
        startDay = date.addDays(-6);
    }
    if(day === 1) {
        startDay = date;
    }
    if(day >= 2) {
        startDay = date.addDays(1 - day);
    }
    return startDay
}

async function fetchCalendarEntries() {
    const url = `${BACKEND_HOST_URL}/api/plans/recipes?startDate=${startDay.ISO()}`
    plan = await utils.fetchJSON(url, auth.BACKEND_GET_OPTIONS)
}

function populateCalendar() {
    console.log(plan);
    plan.forEach((el) => {
        let target = document.querySelector(`[data-slot="${el.dayNum}${el.timeslot}"]`),
            id = `r${Math.random().toString(36).slice(2)}`;
        target.innerHTML += `
        <div class="card meal-card" id="${id}" data-slot-id="${el.timeslotId}" data-recipe-id="${el.recipeId}" data-title="${el.title}" data-image="${el.image}" data-calories="${el.calories}" data-carbs="${el.carbs}" data-fat="${el.fat}" data-protein="${el.protein}" draggable="true" style="background-image: url(${el.image})">
            <div class="meal-overlay" style="display: none">              
                <i class="bi bi-info-circle-fill info" data-recipe-id="${el.recipeId}"></i>
                <i class="bi bi-trash3-fill delete" data-recipe-id="${el.recipeId}" data-slot-id="${el.timeslotId}"></i>
            </div>
            <div class="card-body"></div>
            <div class="card-footer p-1">${el.title}</div>
        </div>
        `
    })
    let summaryClasses = document.querySelectorAll(".summary");
    for(let i = 0; i < 7; i++) {
        summaryClasses[i].innerHTML = `
        <div class="calories">Calories: <span id="cal${i}"></span></div>
        <div class="fat">Fat: <span id="fat${i}"></span></div>
        <div class="carbs">Carbs: <span id="car${i}"></span></div>
        <div class="protein">Protein: <span id="pro${i}"></span></div>`
    }
}

function generateCalendarWeek(start) {
    let end = start.addDays(6);
    return `${start.toDateString()} - ${end.toDateString()}`;
}
function updateCalendarWeek(newStart) {
    let timeslots = document.querySelectorAll(".timeslot");
    timeslots.forEach(slot => slot.innerHTML = "");
    fetchCalendarEntries().then(() =>
        populateCalendar()).then(() =>
        addMealCardListeners());
    console.log(plan);
}

function incrementWeek() {
    let displayedWeek = document.querySelector("#meals-calendar-week");
    let displayedWeekStart = new Date(displayedWeek.getAttribute("data-week-start"));
    startDay = displayedWeekStart.addDays(7);
    displayedWeek.innerHTML = generateCalendarWeek(startDay);
    displayedWeek.setAttribute("data-week-start", startDay);
    updateCalendarWeek(startDay)
}
function decrementWeek() {
    let displayedWeek = document.querySelector("#meals-calendar-week");
    let displayedWeekStart = new Date(displayedWeek.getAttribute("data-week-start"));
    startDay = displayedWeekStart.addDays(-7);
    displayedWeek.innerHTML = generateCalendarWeek(startDay);
    displayedWeek.setAttribute("data-week-start", startDay);
    updateCalendarWeek(startDay);
}

function addCalendarListeners() {
    const timeslots = document.querySelectorAll(".timeslot");
    timeslots.forEach(function(timeslot) {
        timeslot.addEventListener("drop", drop)
        timeslot.addEventListener("dragover", allowDrop)
    })
    const weekNextBtn = document.querySelector("#week-next")
    weekNextBtn.addEventListener("click", incrementWeek)
    const weekPrevBtn = document.querySelector("#week-prev")
    weekPrevBtn.addEventListener("click", decrementWeek)
}
function addMealCardListeners() {
    let mealCards = document.querySelectorAll(".meal-card");
    let overlay;
    mealCards.forEach(card => {
        card.addEventListener("dragstart", drag)
        card.children[1].addEventListener("click", () => {
            card.children[0].style.display = "flex";
        })
        card.children[0].addEventListener("click", () => {
            card.children[0].style.display = "none";
        })
    })
    let infoBtns = document.querySelectorAll(".info")
    infoBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            let recipeId = btn.dataset.recipeId;
            console.log(recipeId);
            createView(`/recipes/${recipeId}`)
        })
    })
    let delBtns = document.querySelectorAll(".delete")
    delBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            let recipeCard = btn.parentElement.parentElement;
            let recipeId = btn.dataset.recipeId;
            let slotId = btn.dataset.slotId;
            deleteRecipe(slotId, recipeId).then(() => {
                recipeCard.outerHTML = "";
            })
        })

    })
}


function allowDrop(e) {
    e.preventDefault();
}
function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
    if(this.dataset.slotId) {
        console.log(`The slotId is ${this.dataset.slotId}`);
        deleteRecipe(this.dataset.slotId, this.dataset.recipeId)
    } else {
        console.log("This doesn't have a slotId");
    }
    if(!this.dataset.calories) {
        fetchNutrition(this.dataset.recipeId).then(() => {
            this.dataset.calories = Math.round(Number.parseFloat(nutrition.calories)).toString();
            this.dataset.carbs = Math.round(Number.parseFloat(nutrition.carbs)).toString();
            this.dataset.fat = Math.round(Number.parseFloat(nutrition.fat)).toString();
            this.dataset.protein = Math.round(Number.parseFloat(nutrition.protein)).toString();
        })
    }
}

async function drop(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    console.log(data);
    let el = document.querySelector(`#${data}`)
    e.currentTarget.appendChild(document.getElementById(data));
    let recipeId = el.dataset.recipeId;
    let recipeName = el.dataset.title;
    let image = el.dataset.image;
    let startDate = startDay.ISO()
    let dayNum = el.parentElement.dataset.slot[0];
    let timeslot = el.parentElement.dataset.slot[1];
    let calories = el.dataset.calories;
    let fat = el.dataset.fat;
    let carbs = el.dataset.carbs;
    let protein = el.dataset.protein;
    await addRecipe(recipeId, recipeName, image, startDate, dayNum, timeslot, calories, fat, carbs, protein).then(() => {
        el.dataset.slotId = timeslotId;
    }).then(async () => {
        await fetchSummaries().then(async () => {
            populateSummaries()
        })
    })
}