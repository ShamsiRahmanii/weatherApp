function currentTime() {
  let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();

   hh = (hh < 10) ? "0" + hh : hh;
   mm = (mm < 10) ? "0" + mm : mm;
    
   let time ="in this hour  " + hh + ":" + mm ;

  document.querySelector(".clock").innerText = time; 
  let t = setTimeout(function(){ currentTime() }, 1000);
}
currentTime();


const apikey = "a170317aba7169652c099ba0cc91ef30" ;
// let apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" ;

const inputSearch = document.querySelector(".saerchinput") ; 
const btnSearch = document.querySelector(".searchbtn") ;
const show = document.querySelector(".weather") ; 
const imageIcon = document.querySelector(".img")
const invalid = document.querySelector(".invalid-city")

let getweather = () => {
  
    let inputvalue = inputSearch.value;
    if (inputvalue.length == 0) {
        show.innerHTML = `<h3 class="eror">Please enter the name of the city 🙂</h3>
        <img src="img/sad.jpg" class="sad" style="display: block;">
        `
    } else {
      let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&appid=${apikey}&units=metric&`;
      inputvalue.value = "" ;
      async function getdata() {
        const response = await fetch(apiurl)
        .catch(() => {
          invalid.textContent = "Please search for a valid city 😩" ; 
        });
        let data = await response.json() ;
        console.log(data)

        if(data.weather[0].main == "clouds"){
          imageIcon.src = "img/clouds.png"
        }
        else if (data.weather[0].main == "mist") {
          imageIcon.src = "img/clouds.png"
        }
        else if (data.weather[0].main == "rain") {
          imageIcon.src = "img/rain.png"
        }
        else if (data.weather[0].main == "clear") {
          imageIcon.src = "img/clear.png"
        }
        else if (data.weather[0].main == "haze") {
          imageIcon.src = "img/haze.png"
        } 

        // imageIcon.src = `img/${data.weather[0].main}.png` ; 
        // console.log(imageIcon) ;

        // if(data.weather[0].main == "clouds") {
        //   imageIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`
        // } else if(data.weather[0].main == "haze") {
        //   imageIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`
        // }else if (data.weather[0].main == "clear") {
        //   imageIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`
        // } else if (data.weather[0].main == "mist") {
        //   imageIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`
        // } else {
        //   imageIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`
        // }



        show.innerHTML = `
           <img class="img" src="img/rain.png">
           <p class="city-name">Temperature in ${data.name} is ${Math.round(data.main.temp)} °C </p>

          <p class="clock" style="display: block;"></p>
              
           <div class="description">
              <p class="title">${data.weather[0].main}</p>
              <p class="description2">${data.weather[0].description}</p>
           </div> 
               
           <div class="datas">
           <p class="dataOne">humidity : ${data.main.humidity} RH</p>
           <p class="dataTwo">pressure : ${data.main.pressure} Pa </p>
          </div>

           <div class="wind">
             <span class="speed-icon"><i class="fa-solid fa-wind"></i></span>
              <p class="speed">${data.wind.speed} km/h</p>
              <span class="visibility-icon"><i class="fa-regular fa-eye-slash"></i></span>
              <p class="visibility">${data.visibility} mi</p>
           </div>
             `    
      }
      getdata() ;  
    }    
  }

btnSearch.addEventListener("click" , getweather) ;

