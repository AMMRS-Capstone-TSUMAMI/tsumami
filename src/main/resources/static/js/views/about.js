import {checkAndAddTrophy} from "./User.js";
let me;
export default function About(props) {
     me = props.me;
    console.log(me)
    
    let Developer = [
        {
            "pictures": "../../img/ashley.png",
            "vetStatus": "Full Stack Developer & AirForce Veteran",
            "firstName": "Ashley",
            "lastName": "Martinez",
            "linkedIn": "ashmar32",
            "github": "ashmar32",
            "alumniLink": "https://alumni.codeup.com/web-developers",
            "resume": "ashleymartinez",
            "background": "/img/ashleyBgAbout.jpeg\" alt=\"img",
            "quotes": '"I dwell in possibility"' + '<br>' + '― Emily Dickinson'
        },
        {
            "pictures": "../../img/matthew.png",
            "vetStatus": "Full Stack Developer & Army Veteran",
            "firstName": "Matthew",
            "lastName": "Grayson",
            "linkedIn": "matthewagrayson",
            "github": "Matthew-Grayson",
            "alumniLink": "https://alumni.codeup.com/web-developers",
            "resume": "matthewgrayson",
            "background": "/img/bg-matthew.png\" alt=\"img",
            "quotes": '"Consider fully; act decisively"' + '<br>' + '― Jigoro Kano'
        },
        {
            "pictures": "../../img/miguel.png",
            "vetStatus": "Full Stack Developer & Army Veteran",
            "firstName": "Miguel",
            "lastName": "Guzman",
            "linkedIn": "miguelguzmanwd",
            "github": "MiguelAGuzman",
            "alumniLink": "https://alumni.codeup.com/web-developers",
            "resume": "miguelguzman",
            "background": "../../img/rocky-mountain.jpg\" alt=\"Rocky Mountains",
            "quotes": '"Arrogance breeds complacency and complacency breeds failure"' + '<br>' + '-Anonymous'
        },
        {
            "pictures": "../../img/ryan.png",
            "vetStatus": "Full Stack Developer & Air Force Veteran",
            "firstName": "Ryan",
            "lastName": "Yoshimura",
            "linkedIn": "ryanskyoshimura",
            "github": "RSKYoshi",
            "alumniLink": "https://alumni.codeup.com/web-developers",
            "resume": "ryanyoshimura",
            "background": "/img/kaenaBeachResized.jpg\" alt=\"img",
            "quotes": '"From one thing, know ten thousand things"' + '<br>' + '― Miyamoto Musashi'
        },
        {
            "pictures": "../../img/shaquielle.png",
            "vetStatus": "Full Stack Developer & AirForce Veteran",
            "firstName": "Shaquielle",
            "lastName": "Robbins",
            "linkedIn": "shaquiellerobbins",
            "github": "shaquiellerobbins",
            "alumniLink": "https://alumni.codeup.com/web-developers",
            "resume": "shaquiellerobbins",
            "background": "/img/shaquielleAboutBg.jpeg\" alt=\"img",
            "quotes": '"Shoot for the moon. Even if you miss, you\'ll land among the stars"' + '<br>' + '― Norman Vincent Peale'
        },
    ]
    // icon credits
    console.log(`
          <a href="https://www.flaticon.com/free-icons/resume" title="resume icons">Resume icons created by nawicon - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/linkedin" title="linkedin icons">Linkedin icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/rubber-duck" title="rubber duck icons">Rubber duck icons created by Talha Dogar - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/github" title="github icons">Github icons created by Dave Gandy - Flaticon</a>
    `)

    let aboutHtml = `
    <header>
        <div>
            <h1 id="about-page-h1" class="d-flex">About us</h1>
            <div id="button" class="d-flex" style="justify-content: center">AMMRS</div>
        </div.img-bg>
    </header>
    <div class="container wrapper">
        <div class="aboutCardsMainContainer">`;

            for (let i = 0; i <= 4; i++) {
                aboutHtml += `
    <div class="about-card-container" style="--hue: 220" xmlns="http://www.w3.org/1999/html">
      <div class="about-card col">
        <div class="about-card-front">
          <ul>
            <figure>
            <div class="img-bg imgAbout"></div>
            <img class="imgAbout" src="${Developer[i].background}" alt="img">
          </figure>

            <figcaption> <img src="${Developer[i].pictures}" class="ppl-img" alt="img"></figcaption>
            <li id="card-name"> ${Developer[i].firstName}<br>${Developer[i].lastName}</li>
            <li> <span>${Developer[i].vetStatus}</span></li>
            <li class="g-0"> <span>${Developer[i].quotes}</span></li>
            <li>
                <button id="about-card-btn">           
                  <a data-link href="https://linkedin.com/in/${Developer[i].linkedIn}" target="_blank"><img class = "linkBtn" data-passthru src="img/linkedin.png" alt="img"></a>
                  <a data-link href="https://github.com/${Developer[i].github}" target="_blank"><img class = "linkBtn" data-passthru src="img/github-signResized.png" alt="img"></a>
                  <a data-link href="${Developer[i].alumniLink}" target="_blank"><img class = "linkBtn" data-passthru src="img/codeup-arrow.png" alt="img"></a>
                  <a data-link href="https://${Developer[i].resume}.venuscohort.com" target="_blank"><img class = "linkBtn" data-passthru src="img/venus-sm.png" alt="img"></a>
                </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    `}
            aboutHtml += `
        </div>
</div>`;
        return aboutHtml;
}

export function aboutEvent() {
    // console.log(me.trophies)
    checkAndAddTrophy(me.trophies, 3)
    // console.log("is this thing on?")

    // function clickEffect(e){
    //     // e.preventDefault();
    //     let d=document.createElement("div");
    //     d.className="clickEffect";
    //     d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
    //     document.body.appendChild(d);
    //     d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
    // }
    // let aboutPage = document.querySelector("#entireAboutPage")
    //     aboutPage.addEventListener('click', clickEffect);

    // let clientScrollY = 0;
    // let totalScrollY = 0;
    //
    // function updateTotalScrollY(){
    //     totalScrollY = window.scrollY + clientScrollY;
    //     console.log(totalScrollY);
    // }
    //
    // document.addEventListener('mousemove', (e1) => {
    //     clientScrollY = e1.clientY;
    //     updateTotalScrollY();
    // })
    // document.addEventListener('scroll', (e) => {
    //     updateTotalScrollY();
    // });

// document.addEventListener("scroll", clickEffect);
//     function clickEffect(e) {
//         let d = document.createElement("div");
//         d.className = "clickEffect";
//         d.style.top = e.clientY + "px";
//         d.style.left = e.clientX + "px";
//
//         document.body.appendChild(d);
//         d.addEventListener('animationend', function () {
//             d.parentElement.removeChild(d);
//         }.bind(this));
//
//         console.log(e);
//     }
//
//     document.addEventListener('click', clickEffect);
// }

    function clickEffect(e) {
        let d = document.createElement("div");
        d.className = "clickEffect";
        d.style.top = e.clientY + "px";
        d.style.left = e.clientX + "px";
        document.body.appendChild(d);
        d.addEventListener('animationend', function () {
            d.parentElement.removeChild(d);
        }.bind(this));
    }

    document.addEventListener('click', clickEffect);
}



