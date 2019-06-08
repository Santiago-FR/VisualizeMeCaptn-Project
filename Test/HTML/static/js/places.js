// data for markers
var parks = [
  {
    name: "High Park",
    location: [43.6476281585089, -79.463939666748]
  },
  {
    name: "Toronto Island",
    location: [43.6196735315115, -79.376220703125]
  },
  {
    name: "Queen's Park",
    location: [43.662637, -79.393308]
  },
  {
    name: "Trinity Bellwoods Park",
    location: [43.6458891388822, -79.4135141372681]
  },
  {
    name: "Christie Pits Park",
    location: [43.6647051401031, -79.4208097457886]
  },
  {
    name: "Cherry Beach Park",
    location: [43.6364789273876, -79.3440771102905]
  },
  {
    name: "Centennial Park",
    location: [43.649398, -79.588495]
  }
];

var places = [
  {
    name: "Jungle Land",
    location: [43.8199314544272, -79.37147]
  },
  {
    name: "Gymboree Play & Music",
    location: [43.69697, -79.376220703125]
  },
  {
    name: "Riverdale Farm",
    location: [43.6673199, -79.3610099]
  },
  {
    name: "High Park Zoo",
    location: [43.6427233, -79.4612017]
  },
  {
    name: "Toronto Music Garden",
    location: [43.63697, -79.394659]
  },
  {
    name: "Rainbow World indoor playground",
    location: [43.8183886713049, -79.2330879718065]
  },
  {
    name: "Creative Club",
    location: [43.7053318845126, -79.3981396772461]
  }
];

//custom markers
var greenIcon = L.icon({
  iconUrl: '/static/images/tree.png',
  // shadowUrl: '/static/images/shadow.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var plIcon = L.icon({
  iconUrl: '/static/images/cubes.png',
  // shadowUrl: '/static/images/shadow.png',

  iconSize:     [45, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// array to store cityparks  markers
var cityparks = [];
for (var i = 0; i < parks.length; i++) {
// loop through parks, create markers push to cityparks
  cityparks.push(
    L.marker(parks[i].location, {icon: greenIcon}).bindPopup("<h1>" + parks[i].name + "</h1>")
  );
}

// array to store cityplaces  markers
var cityplaces = [];
for (var i = 0; i < places.length; i++) {
// loop through parks, create markers push to cityplaces
cityplaces.push(
    L.marker(places[i].location, {icon: plIcon}).bindPopup("<h1>" + places[i].name + "</h1>")
  );
}

// group markers to layers
var cityPrklayer = L.layerGroup(cityparks);
var cityPlclayer = L.layerGroup(cityplaces);

// set variables to hold layers

  var street_mode = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  })

  var treasure_mode = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "mapbox.pirates",
    accessToken: API_KEY
  })
  
  var dark_mode = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "mapbox.dark",
    accessToken: API_KEY
  })

// set variable to allow only one view at the time
var baseViews = {
  Outdoor_mode: street_mode,
  Pirate_mode: treasure_mode,
  Dark_mode: dark_mode
};


// controls for markers
var mpOverlay = {
  Parks: cityPrklayer,
  Places: cityPlclayer
};

// Create map object add layers
var myMap = L.map("map", {
  center: [43.665, -79.3868],
  zoom: 12,
  layers: [street_mode,cityPrklayer, cityPlclayer]
});

// add layers to map control add control to map
L.control.layers(baseViews, mpOverlay).addTo(myMap);

function toggleDarkLight() {
  var body = document.getElementById("body");
  var currentClass = body.className;
  body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
}