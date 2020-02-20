window.addEventListener('load', ()=> {
    let long;   // longitude
    let lat;    // latitude
    let temperatureDescription= document.querySelector('.temperature-description');
    let temperatureDegree= document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    if(navigator.geolocation){ //if this location exists in browser then..
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'http://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/b781eeead8f3badb62e0081e4e70ebf5/${lat},${long}`

            fetch(api)
            .then(response =>{
                return response.json();
            })
            
            .then(data =>{
                const {temperature, summary, icon} = data.currently; // pulls out data from data.currently
                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                // Formula for celsius
                    let celsius = (temperature - 32) * (5/9);

                // Set Icon
                setIcons(icon, document.querySelector(".icon"));

                //Change temp to Celsius/Farenheit
                temperatureSection.addEventListener("click", () =>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }

                })
            })
        }); 
    }
     
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]) // Grabs current icon and iconID
    }
});
// after page loads, get location