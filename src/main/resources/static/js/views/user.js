import {getHeaders} from "../auth.js";
import createView from "../create-view.js";


let me;
export default function prepareUser(props) {
    me = props.me;
    console.log(props);
    let trophies = props.me.trophies;
    let allTrophies = props.allTrophies;
    let userTrophiesIds = [];
    let chefLevels = props.me.chefLevels;
    console.log(chefLevels);
    let allChefLevels = props.allChefLevels;
    let userChefLevelsIds = [];

    //going thru trophy array and pushing added trophies to it
    for (let trophy of trophies) {
        userTrophiesIds.push(trophy.id)
    }

    for (let chefLevel of chefLevels) {
        userChefLevelsIds.push(chefLevel.id)
    }

    // console.log(userTrophiesIds)
    // console.log(trophies);
    // console.log(chefLevels);

    return `
    <div class="container-fluid user-container">
    <div class="card-flex">
        <div class="user-card">
        <h2 class="update-h1">Update Info</h2>
        
       <!--                    //FORM #1-->
<!--                    //weight input-->
                    <form>
                    <div class="form-row">
                    <div class="form-group col-md-6">
                    <label>Weight Goal</label>
                    <input type="text" class="form-control" id="inputWeight" style="width:500px;margin:8px;" placeholder="Current Weight: ${me.weight}">
                    </div>
                    </div>
                
                  
                  
<!--                    //fitness level input-->
                      <div class="form-row">
                    <div class="form-group col-md-6">
                    <label>Activity Level</label>
                    <select id="inputActivityLevel" style="width:500px;margin:8px;" class="form-control">
                        <option selected>Choose...</option>
                        <option>Sedentary</option>
                        <option>Mildly Active</option>
                        <option>Active</option>
                        </select>
                    </div>
                  </div>
                  
 

<!--                    diet type input-->
                    <div class="form-row">
                    <div class="form-group col-md-6">
                    <label>Diet Type</label>
                    <select id="inputDietType" style="width:500px;margin:8px;" class="form-control">
                        <option selected>Choose...</option>
                        <label>Diet Type</label>
                        <option>Paleo</option>
                        <option>Keto</option>
                        <option>Vegan</option>
                        <option>no diet</option>
                        </select>
                    </div>
                    </div>
                    
                             
                   
<!--                    //protein input-->
                      <div class="form-row">
                    <div class="form-group col-md-6">
                    <label>Protein Goal</label>
                    <input type="text" class="form-control" id="inputProtein" style="width:500px;margin:8px;" placeholder="Current Protein Goal: ${me.proteinGoal}">
                    </div>
                    </div>
<!--                    //carbs input-->
                     <div class="form-row">
                    <div class="form-group col-md-6">
                    <label>Carb Goal</label>
                    <input type="text" class="form-control" id="inputCarbs" style="width:500px;margin:8px;" placeholder="Current Carb Goal: ${me.carbGoal}">
                    </div>
                    </div>
<!--                    //fat input-->
                      <div class="form-row">
                    <div class="form-group col-md-6">
                    <label>Fat Goal</label>
                    <input type="text" class="form-control" id="inputFat" style="width:500px;margin:8px;" placeholder="Current Fat Goal: ${me.fatGoal}">
                    </div>
                    </div>
                    
                    <!--                    //calories information-->
                      <div class="form-row">
                    <div class="form-group col-md-6">
                    <label>Calorie Goal</label>
                    <input type="text" class="form-control" id="inputCalories" style="width:500px;margin:8px;" placeholder="Current Calorie Goal: ${me.calorieGoal}">
                    </div>
                       </div>
<!--                    //submit button-->
                  <button class="button" type="submit" id="submitBtn">Update Info</button>
                  </form>
              </div>
            </div>
    </div>
            
<!--    working on achievement displays-->
        <div class="container-fluid achievement-background">
            <h2 class="underline-achievement-header">My Achievements</h2>
            <p>Earn Trophies and gain Chef Levels by completing tasks around the site.</p>  
            <p>Hoover over the greyed out trophy for a helpful tip! </p>
        <div class="achievement-row row">
        
            <div class="col-6">
                <div class="chef-container">
                    ${allChefLevels.map(chefLevel => `

                         ${appendChefHTML(userChefLevelsIds, chefLevel, me.experiencePoints)}

                    `).join("")}
                </div>
            </div>
                    <div class="col-6">
                        <div class="trophy-container d-flex flex-wrap justify-content-center">
                            ${allTrophies.map(trophy => `
                            
                                 ${appendTrophyHTML(userTrophiesIds, trophy)}
                            
                            `).join("")}
                        </div> 
                    </div>
            </div>    
        </div> 
    `;
}

function appendTrophyHTML (usersTrophies, currentTrophy){
    if (usersTrophies.includes(currentTrophy.id)) {
        return `
                    
                        <div class="card trophy-card trophy-earned m-2 tt" data-bs-placment="bottom" data-bs-title=${JSON.stringify(currentTrophy.description)} data-desc=${currentTrophy.description.replace(/\s/g , "-")}>
                          <div class="card-body">
                            <img src="/img/earned-trophy.png" class="trophy-icon"> 
                          </div>
                          <div class="card-body">
                            <h6 class="trophy-title text-center">${currentTrophy.title}</h6>
                          </div>
                        </div>      
          `
    }
        return `<div class="card trophy-card trophy-unearned m-2 tt" data-bs-title=${JSON.stringify(currentTrophy.description)} data-desc=${currentTrophy.description.replace(/\s/g , "-")}>
                        <div class="trophy-unearned-overlay">
                          <div class="card-body">
                            <img src="/img/new-unearned.png" class="trophy-icon"> 
                          </div>
                          <div class="card-body">
                            <h6 class="trophy-title text-center">${currentTrophy.title}</h6>
                          </div>
                        </div>
                        </div>
        `

    }

function appendChefHTML (usersChefLevels, currentChefLevel, usersXp){
    let usersCurrentXp = usersXp
    let currentChefLevelXpThreshold = currentChefLevel.requiredXp;

    let xpBarPercent = ((usersCurrentXp / currentChefLevelXpThreshold) * 100).toFixed(0) + "%";
    console.log(xpBarPercent)
    if (usersCurrentXp / currentChefLevelXpThreshold * 100 > 100) {
        usersCurrentXp = currentChefLevelXpThreshold
        xpBarPercent = "100%"
    }
    if (usersChefLevels.includes(currentChefLevel.id)) {
        return `
                <div class="chef-card m-2 p-2 tt" data-bs-title=${JSON.stringify(currentChefLevel.description)} data-desc=${JSON.stringify(currentChefLevel.description)}">
                  <div class="d-flex align-items-center justify-content-between">
                      <div class="d-flex">
                        <img src=${JSON.stringify(currentChefLevel.photo)} alt="chef level" class="chef-level-img">                  
                        <h6 class="chef-title mx-3">${currentChefLevel.title} </h6>
                      </div>
                      <div class="w-65">
                          <div class="bar-container">
                              <div class="skills html" id=${"chefLevel" + currentChefLevel.id} style="width: ${xpBarPercent}">${xpBarPercent}</div>
                          </div>
                          <div class="d-flex justify-content-between">
                            <div>${usersCurrentXp} / ${currentChefLevelXpThreshold}</div>
                            <div>${currentChefLevel.description}</div>
                          </div>
                      </div>
                  </div>
                </div>
        `
    }
        return `<div class="chef-card m-2 p-2 tt" data-bs-title=${JSON.stringify(currentChefLevel.description)} data-desc=${JSON.stringify(currentChefLevel.description)}">
                      <div class="d-flex align-items-center justify-content-between">
                          <div class="d-flex">
                            <img src=${JSON.stringify(currentChefLevel.photo)} alt="chef level" class="chef-level-img">                  
                            <h6 class="chef-title mx-3">${currentChefLevel.title} </h6>
                          </div>
                          <div class="w-65">
                              <div class="bar-container">
                                  <div class="skills html" id=${"chefLevel" + currentChefLevel.id} style="width: ${xpBarPercent}">${xpBarPercent}</div>
                              </div>
                              <div class="d-flex justify-content-between">
                                <div>${usersCurrentXp} / ${currentChefLevelXpThreshold}</div>
                                <div>${currentChefLevel.description}</div>
                              </div>
                          </div>
                      </div>
                    </div>`
    }


export function prepareUserJS() {
    updateUserInfo();
    trophyCardEventListener();
}

function trophyCardEventListener() {
    const tooltips = document.querySelectorAll('.tt')
    tooltips.forEach(t => {
        new bootstrap.Tooltip(t)
    })
}

function updateUserInfo() {
    // let updateUser = {
    //     height: "",
    //     weight: "",
    //     allergies: "",
    //     restrictions: "",
    //     preferences: "",
    //     activityLevel: "",
    //     weightGoal: "",
    //     bodyType: "",
    //     dietType: "",
    //     calories: "",
    //     protein: "",
    //     carbs: "",
    //     fat: ""
    // }
    let submitBtn = document.querySelector("#submitBtn")
    console.log(submitBtn);
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("is this working?")
//     const button = document.querySelector("#updateUserInfo");
//     button.addEventListener("click", function(event) {
        // grab the 3 password field values

        // const heightField = document.querySelector("#inputHeight");
        const weightField = document.querySelector("#inputWeight");
        // const allergiesField = document.querySelector("#inputAllergies");
        // const restrictionsField = document.querySelector("#inputRestrictions");
        // const preferencesField = document.querySelector("#inputPreferences");
        const activityLevelField = document.querySelector("#inputActivityLevel");
        // const weightGoalField = document.querySelector("#inputWeightGoal");
        // const bodyTypeField = document.querySelector("#inputBodyType");
        const dietTypeField = document.querySelector("#inputDietType");
        const caloriesField = document.querySelector("#inputCalories");
        const proteinField = document.querySelector("#inputProtein");
        const carbsField = document.querySelector("#inputCarbs");
        const fatField = document.querySelector("#inputFat");
        // changed names of fields to match database
        let updateUser = {
            // height: heightField.value,
            weight: weightField.value,
            // allergies: allergiesField.value,
            // restrictions: restrictionsField.value,
            // preferences: preferencesField.value,
            activityLevel: activityLevelField.value,
            // weightGoal: weightGoalField.value,
            // bodyType: bodyTypeField.value,
            diet: dietTypeField.value,
            calorieGoal: caloriesField.value,
            proteinGoal: proteinField.value,
            carbGoal: carbsField.value,
            fatGoal: fatField.value,
        }

        let request = {
            method: "PATCH",
            headers: getHeaders(),
            body: JSON.stringify(updateUser)
        }
//changed endpoint name
        fetch(USER_API_BASE_URL + "/updateUser", request)
            .then(response => {
                // moreToast();
                console.log(response.status);
                createView("/me");
            })
    })
}


// changed to export to be used elsewhere
export async function awardUserATrophy(trophyId) {
    console.log('inside awardUserATrophy function')

    let requestHeader = {
        method: 'PATCH',
        headers: getHeaders()
    }

    await fetch(`${BACKEND_HOST_URL}/api/users/addTrophy/` + trophyId, requestHeader).then(response => {
        // console.log('inside fetch')
        console.log(response)
        return response.json();
    }).then(data => {
        // console.log("trophy added successfully")
        console.log(data)
        //function that will append a toast to the body on page
        moreToast(data.title, data.description)
    })
}

// maybe make this an await function?
export function checkAndAddTrophy(usersTrophyArray, trophyId) {
    console.log('inside checkAndAddTrophy function')
    for (let i = 0; i < usersTrophyArray.length; i++) {
        if (usersTrophyArray[i].id === trophyId) {
            return;
        }
    }
    awardUserATrophy(trophyId);
    usersTrophyArray.push({ id: trophyId});
}



function moreToast(title, description) {
    let toastDiv = document.createElement("div");

    toastDiv.classList.add("toast-card");
    //language=html
    toastDiv.innerHTML = `
        <div class="toast-title">
            <div class="mx-1 my-1 d-flex">
                <img src="/img/earned-trophy.png" class="toast-img">
                <div class="mx-1">${title}</div>
            </div>
            <div class="mx-1 my-1">
                <i class="bi bi-x-lg" id="toast-close"></i>
            </div>
        </div>
        <div class="toast-body mx-1 my-3">
            <div>${description}</div>
         </div>
`


    document.body.appendChild(toastDiv);
    // alertSound();

    document.querySelector('#toast-close').addEventListener('click', function (){
        toastDiv.remove();
    })

    setTimeout(function (){
        removeFadeOut(toastDiv, 1000)
    }, 5000)
}

function removeFadeOut( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s ease";

    el.style.opacity = 0;
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, speed);
}

function alertSound () {
    const sound = new Audio('/img/woo-hoo.mp3');
    sound.play().then();
}

export function getUserData() {
    let requestObject = {
        method: "GET",
        headers: getHeaders()
    }
    return fetch(`${BACKEND_HOST_URL}/api/users/me`, requestObject).then(response => {
        return response.json()
    }).then(data => {
        return data;
    })
}