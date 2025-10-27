export default function Landing(props) {
    console.log("The frontend did it. HER FAULT");
    return `
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Landing Page</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
            <link href="/css/landing.css" rel="stylesheet">
          </head>
          <body>  
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
            
            <div class="container">
              <div class="row">
                <div class="col-sm-6" id="leftHalf">
                    <div class="leftHalfOverlay">
                        <img src="/img/logo.png" alt="logo" class="logo">
                    </div>
                </div>
                <div class="col-sm-6" id="rightHalf">
                    <!--  This is the sign up card              -->
                    <div class="aboutTSU">
<!--                      <h3 class="card-header underline">About tsUmami</h3>-->
                      <div class="">
<!--                      TODO: get p tag renamed in about.css so that we can style other p tags-->
                        <p class="landingAboutText">Fall into a wave of flavor with tsUmami. Let us help you plan  your weekly meals. With a press of a button find every day recipes  at your fingertips and in one location! </p>
                        <a href="/login" data-link className="my-link" class="btn btn-primary">Sign in with Google!</a>
                      </div>
                    </div>
                </div>
               </div>
             </div>
          </body>
    `;
}

