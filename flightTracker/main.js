//current location of computer
function getCurrentLocation() {
  let res;
  $.ajax({
    url: "https://www.flightradar24.com/v1/search/web/geoip",
    type: "GET",
    dataType: "json",
    async: false,
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      if (response) {
        res = response;
      } else {
        console.error("Getting location failed");
      }
    },
    error: function (res) {
      console.error(res);
    },
  });
  return res;
}
let myLocation=getCurrentLocation();
var long = myLocation.result.pos.lng;
var lat = myLocation.result.pos.lat;


let flights;
function showFlights(flights){
    let values = Object.values(flights);
    let countOfElem = values.length;
    document.writeln('Numarul total de avioane in cer:');
    document.writeln(flights.full_count);
    document.writeln('<br/>')
    document.writeln(`Coordonatele mele:Longitudine ${long} Latitudine ${lat}`);
    document.writeln('<br/>')

    document.writeln("In raza de 300km avem urmatoarele avioane :");
    document.writeln('<br/>')
    var concatenatedResults="<div style='display:flex;'>";
    for (let index = 2; index < countOfElem; index++) {
        if(isFlightNear(values[index], lat, long)){

            concatenatedResults +=`
            <div style='margin:2rem; height:15rem;background-size: cover; background-image:url("https://images.unsplash.com/photo-1531642765602-5cae8bbbf285?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80");'>
              <div style='text-align: center;'>
                <h2 style='padding:2rem'> Plane ${values[index][0]}</h2>
                <h4 style='color:white;'><b>Lat:</b> ${values[index][1]} </br> <b>Long:</b> ${values[index][2]} </h4>
              </div>
            </div>`;
        }
        
    }
    concatenatedResults+='</div>';
    document.writeln(concatenatedResults)

}

let setup = {
    "url": "https://data-live.flightradar24.com/zones/fcgi/feed.js?faa=1&bounds=78.904%2C-56.945%2C-39.65%2C97.458&satellite=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=14400&gliders=1&stats=1",
    "method": "GET",
    "headers": {
      "Content-Type": "text/plain"
    },
    "data": "{\r\n    \"keys\": [\r\n        {\r\n            \"key_name\": \"index.develop\",\r\n            \"description\": \"Index app welcome\",\r\n            \"platforms\": [\r\n                \"web\"\r\n            ],\r\n            \"translations\": [\r\n                {\r\n                    \"language_iso\": \"en\",\r\n                    \"translation\": \"Welcome\"\r\n                }\r\n            ]\r\n        },\r\n        {\r\n            \"key_name\": \"index.appless\",\r\n            \"description\": \"Welcome apple\",\r\n            \"platforms\": [\r\n                \"web\"\r\n            ],\r\n            \"is_plural\": true,\r\n            \"translations\": [\r\n                {\r\n                    \"language_iso\": \"en\",\r\n                    \"translation\": \"Welcome\"\r\n                }\r\n            ]\r\n        },\r\n        {\r\n            \"key_name\": \"index.hello\",\r\n            \"platforms\": [\r\n                \"web\"\r\n            ]\r\n        }\r\n    ]\r\n}",
  };
  
  $.ajax(setup).done(function (response) {
    showFlights(response);
});



function isFlightNear(flight, latitude, longitude){
    var flightLat = flight[1];
    var flightLong = flight[2] ;

    var latDif = latitude - flightLat;
    var longDif = longitude -flightLong;
    //1degree is ~ 100km;

    if(((latDif < 3) && ((latDif) > -3)) &&
    ((longDif) < 3) && ((longDif) > -3)){
        return true;
    }

    return false;
}


