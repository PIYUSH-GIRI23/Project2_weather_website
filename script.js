const a = document.body.querySelector('#flexSwitchCheckDefault');
const b = document.body.querySelectorAll('.navbar')
const c = document.body.querySelector('#mainbutton');
let term;
c.addEventListener("click", (event) => {
    event.preventDefault();
    let a = document.body.querySelector(".form-control")
    let b = a.value.trim().toLowerCase();
    term = b;
    let obj;
    let rise = [];
    let setss = [];
    let tempe;
    let min;
    let max;
    let humidi;
    let wind;
    async function fetches() {
        obj = await fetchData();
        console.log(obj);
        tempe = obj.temp;
        if (tempe === undefined) {
            document.body.querySelector('#root').insertAdjacentHTML("afterbegin",
                `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>${term.toUpperCase()} Not Found</strong> Try to Search Different City
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button><br>
</div>
            `
            )
        }
        else {
            let imagess;
            rise = convertdate(obj.sunrise);
            setss = convertdate(obj.sunset);
            min = obj.min_temp;
            max = obj.max_temp;
            humidi = obj.humidity;
            wind = obj.wind_speed;
            console.log(tempe)
            console.log(rise)
            console.log(setss)
            if(humidi>55){
                if(tempe>30) imagess="partially.jpg";
                else if(tempe<28) imagess="rainy.png";
                else imagess="cloudy.jpg";
            }
            else{
                imagess="sunny.png";
            }
            document.body.querySelector('.maincardclass').insertAdjacentHTML("afterbegin",
                `<div class="card double-border-card " >
            <div class="flip-card">
            <div class="flip-card-inner">
            <div class="flip-card-frontside" style="width: 18rem;">
            <h2 class="text-center">${b.toUpperCase()}</h2>
            <img src=${imagess} class="card-img-top img-fluid" alt="not found"><br>
            <h4 class="text-center">${tempe}&deg;C</h4>
            </div>
                  <div class="flip-card-backside" style="width: 18rem;">
                  <h2 class="text-center">${b.toUpperCase()}</h2>
                  <ul class="list-group list-group-flush">
                  <li class="list-group-item">Max Temp : ${min}&degC</li>
                  <li class="list-group-item">Min Temp : ${max}&degC</li>
                  <li class="list-group-item">Sunrise : ${rise[0]}:${rise[1]} ${rise[2]}</li>
                  <li class="list-group-item">Sunset : ${setss[0]}:${setss[1]} ${setss[2]}</li>
                  <li class="list-group-item">Humidity : ${humidi}</li>
                  <li class="list-group-item">Wind Speed : ${wind}</li>
                  </ul>
                  </div>
                  </div>
                  </div>`
            )
        }
    };
    async function final(){
        await fetches();
        console.log("hello");
        let abc = document.body.querySelector('#flexSwitchCheckDefault').classList.contains("setdark")
        if (abc) {
            document.body.querySelectorAll('.card').forEach((e) => {
                e.classList.toggle("double-border-card-white", abc)
            })
        }
    }
    final()

})


a.addEventListener("click", changecolor)
function changecolor() {
    a.classList.toggle("setdark")
    const d = document.body.querySelectorAll('.card');
    document.body.classList.toggle("bg-dark");
    document.body.querySelector('.navbar').classList.toggle("navbar2")
    document.body.querySelector('#mainbutton').classList.toggle("buttonOutline");
    d.forEach((e) => {
        e.classList.toggle("double-border-card-white")
    })
};


// ----------------------------------------------------------------



async function fetchData() {
    let result;
    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${term}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c0458332c7msh195747fc97b7cbbp1fa136jsn6e64a6ef97bc',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);
        result = await response.json();
        return result;
    } catch (error) {
        return error
    }
}

function convertdate(time) {
    let sunriseTimestamp = time;
    let zone = "AM";
    const sunriseDate = new Date(sunriseTimestamp * 1000); // Convert to milliseconds

    // Get hours and minutes from the sunriseDate
    let hours = sunriseDate.getHours();
    let minutes = sunriseDate.getMinutes();
    if (hours > 12) {
        hours = hours - 12;
        zone = "PM"
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return [hours, minutes, zone];
}
