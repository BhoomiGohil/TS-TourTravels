////////////////////////// Header code ////////////////////////////////

interface Data {
  title: string;
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone: string;
  address: string;
  id: string;
  password: string;
}

var grabLocalStorageSignIn = localStorage.getItem("SignIn") || "[]";

function checkLocalStorageSignin() {
  var login: HTMLElement = document.querySelector("#headerLogin")!;
  var logout: HTMLElement = document.querySelector("#headerLogout")!;
  var profile: HTMLElement = document.querySelector("#headerProfile")!;

  if (grabLocalStorageSignIn === "[]" || grabLocalStorageSignIn === null) {
    login.style.display = "flex";
    logout.style.display = "none";
    profile.style.display = "none";
  } else {
    login.style.display = "none";
    logout.style.display = "flex";
    profile.style.display = "flex";
  }
}

checkLocalStorageSignin();

function profileOnLoad() {
  var data: Data = JSON.parse(grabLocalStorageSignIn);

  var user: string = `${data.title} ${data.firstname} ${data.lastname}`;
  var address: string = `${data.address} ${data.city} ${data.state} ${data.country}`;
  var email: string = `${data.email}`;
  var phone: string = `${data.phone}`;
  var password: string = `${data.password}`;

  document.querySelector("#DBuser")!.innerHTML = user;
  document.querySelector("#DBaddress")!.innerHTML = address;
  document.querySelector("#DBemail")!.innerHTML = email;
  document.querySelector("#DBphone")!.innerHTML = phone;
  document.querySelector("#DBpassword")!.innerHTML = password;
}

function logout() {
  var login: HTMLElement = document.querySelector("#headerLogin")!;
  var logout: HTMLElement = document.querySelector("#headerLogout")!;
  var profile: HTMLElement = document.querySelector("#headerProfile")!;

  localStorage.setItem("SignIn", "[]");

  login.style.display = "flex";
  logout.style.display = "none";
  profile.style.display = "none";
}

////////////////////////// Login Grab Registration LocalStorage Code ////////////////////////////////

function grabLocalStorageRegistration() {
  var getRegistrations = localStorage.getItem("Registration") || "[]";
  var data: Data[] = JSON.parse(getRegistrations);

  return data;
}

//////////////////////////// Form validation code ////////////////////////////////

var submit: boolean = false;
var signIn: Data;

var submitArray: {
  submit: boolean;
  signIn: Data;
};

var emailFormat: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var phoneFormat: RegExp = /^\d{10}$/;
var alphabetFormat: RegExp = /^[A-Za-z]+$/;

function inputFocus(input: HTMLInputElement) {
  // input.previousElementSibling.style.display = "none";
  input.previousElementSibling!.innerHTML = "";
}

function errorMessage(input: HTMLInputElement, message: string) {
  // input.previousElementSibling.style.display = "block";
  input.previousElementSibling!.innerHTML = message;
}

function inputValidationTitle(input: HTMLInputElement) {
  if (input.value === "PLEASE SELECT") {
    errorMessage(input, "Please select title");
    submit = false;
  } else {
    submit = true;
  }
  return submit;
}

function inputValidationAlphabet(input: HTMLInputElement) {
  if (!input.value.match(alphabetFormat)) {
    errorMessage(input, "Enter alphabet only");
    submit = false;
  } else {
    submit = true;
  }
  return submit;
}

function inputValidationEmail(input: HTMLInputElement) {
  if (!input.value.match(emailFormat)) {
    errorMessage(input, "Enter email format");
    submit = false;
  } else {
    var getRegistrations = grabLocalStorageRegistration();
    if (JSON.stringify(getRegistrations) !== "[]") {
      for (var i = 0; i < getRegistrations.length; i++) {
        if (input.value === getRegistrations[i].email) {
          errorMessage(input, "Email is already registered");
          submit = false;
          break;
        } else {
          submit = true;
        }
      }
    } else {
      submit = true;
    }
  }
  return submit;
}

function inputValidationPhone(input: HTMLInputElement) {
  if (!input.value.match(phoneFormat)) {
    errorMessage(input, "Enter 10 digit only");
    submit = false;
  } else {
    submit = true;
  }
  return submit;
}

function inputValidationAddress(input: HTMLInputElement) {
  submit = true;
  return submit;
}

function inputValidationUsername(input: HTMLInputElement) {
  if (!input.value.match(emailFormat)) {
    errorMessage(input, "Enter email format");
    submit = false;
  } else {
    var getRegistrations = grabLocalStorageRegistration();
    if (
      JSON.stringify(getRegistrations) !== "[]" ||
      getRegistrations !== null
    ) {
      for (var i = 0; i < getRegistrations.length; i++) {
        if (input.value !== getRegistrations[i].email) {
          errorMessage(input, "Enter is not registered");
          submit = false;
        } else {
          signIn = getRegistrations[i];
          submit = true;
        }
      }
    } else {
      errorMessage(input, "Enter is not registered");
      submit = false;
    }
  }
  return { submit: submit, signIn: signIn || null };
}

function inputValidationPassword(input: HTMLInputElement) {
  var getRegistrations = grabLocalStorageRegistration();
  if (JSON.stringify(getRegistrations) !== "[]" || getRegistrations !== null) {
    for (var i = 0; i < getRegistrations.length; i++) {
      if (input.value !== getRegistrations[i].password) {
        errorMessage(input, "Password is not matching");
        submit = false;
      } else {
        submit = true;
      }
    }
  } else {
    errorMessage(input, "Password is not matching");
    submit = false;
  }
  return submit;
}

function inputValidationFrom(input: HTMLInputElement) {
  var to = document.querySelector("form")!.to;
  if (input.value === to.value) {
    errorMessage(input, "Please select different destinations.");
    errorMessage(to, "Please select different destinations.");
    submit = false;
  } else {
    if (to.value === "Please Select" || to.value === "PLEASE SELECT") {
    } else {
      inputFocus(to);
    }
    submit = true;
  }
  return submit;
}

function inputValidationTo(input: HTMLInputElement) {
  var from = document.querySelector("form")!.from;

  if (input.value === from.value) {
    errorMessage(input, "Please select different destinations.");
    errorMessage(from, "Please select different destinations.");
    submit = false;
  } else {
    if (from.value === "Please Select" || from.value === "PLEASE SELECT") {
    } else {
      inputFocus(from);
    }
    submit = true;
  }
  return submit;
}

function inputValidation(input: HTMLInputElement) {
  if (
    input.value === "" ||
    input.value === "PLEASE SELECT" ||
    input.value === "Please Select"
  ) {
    errorMessage(
      input,
      `Enter ${input.name.charAt(0).toUpperCase() + input.name.substring(1)}`
    );
    submit = false;
  } else if (input.value) {
    if (input.name === "title") {
      submit = inputValidationTitle(input);
    } else if (input.name === "email") {
      submit = inputValidationEmail(input);
    } else if (input.name === "phone") {
      submit = inputValidationPhone(input);
    } else if (input.name === "address") {
      submit = inputValidationAddress(input);
    } else if (input.name === "username") {
      submitArray = inputValidationUsername(input);
    } else if (input.name === "password") {
      submit = inputValidationPassword(input);
    } else if (input.name === "from") {
      submit = inputValidationFrom(input);
    } else if (input.name === "to") {
      submit = inputValidationTo(input);
    } else {
      submit = inputValidationAlphabet(input);
    }
  }
  return { submit: submit, submitArray: submitArray };
}

////////////////////////// Load Images's object for Home and Login page code ////////////////////////////////

var imageArray: { image: string; title: string }[];
var sliderImageLength: number;
var randomIndex: number;

function grabArrayObjectData() {
  imageArray = [
    {
      image: "../Images/Place1.gif",
      title: "London",
    },
    {
      image: "../Images/Place2.gif",
      title: "Venice",
    },
    {
      image: "../Images/Place3.gif",
      title: "New Zealand",
    },
    {
      image: "../Images/Place4.gif",
      title: "Goa",
    },
    {
      image: "../Images/Place5.gif",
      title: "Jammu and Kashmir",
    },
    {
      image: "../Images/Place6.gif",
      title: "Australia",
    },
  ];

  sliderImageLength = imageArray.length - 1;
  randomIndex = Math.floor(Math.random() * sliderImageLength);
}

// Home page

////////////////////////// Home Slider Code ////////////////////////////////

function homeImageChange(randomIndex: number) {
  var imageEl: HTMLImageElement = document.querySelector(".slider-image")!;
  var imageTitleEl: HTMLDivElement = document.querySelector(".slider-title")!;

  imageEl.src = imageArray[randomIndex].image;
  imageTitleEl.innerHTML = imageArray[randomIndex].title;
}

function homeSliderButton(text: string) {
  if (text === "left") {
    randomIndex = randomIndex - 1;
    if (randomIndex < 0) {
      randomIndex = sliderImageLength;
    }
    homeImageChange(randomIndex);
  } else if (text === "right") {
    randomIndex = randomIndex + 1;
    if (randomIndex > sliderImageLength) {
      randomIndex = 0;
    }
    homeImageChange(randomIndex);
  }
}

function homeOnload() {
  grabArrayObjectData();
  homeImageChange(randomIndex);
}

// Reservation page

////////////////////////// Flight Dummy Data ////////////////////////////////

var economicPrice: number = 1;
var premiumPrice: number = 1.2;
var businessPrice: number = 1.5;

var kmPrice: number = 5;

function measureKm(
  originLaltitude: number,
  originLongitude: number,
  destinationLaltitude: number,
  destinationLongitude: number
) {
  var radius: number = 6378.137;
  var laltitude: number =
    (destinationLaltitude * Math.PI) / 180 - (originLaltitude * Math.PI) / 180;
  var longitude: number =
    (destinationLongitude * Math.PI) / 180 - (originLongitude * Math.PI) / 180;
  var a: number =
    Math.sin(laltitude / 2) * Math.sin(laltitude / 2) +
    Math.cos((originLaltitude * Math.PI) / 180) *
      Math.cos((destinationLaltitude * Math.PI) / 180) *
      Math.sin(longitude / 2) *
      Math.sin(longitude / 2);
  var center: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance: number = radius * center;
  return distance;
}

var airlineObjects: {
  number: string;
  name: string;
  operate: string;
  wifi: boolean;
}[] = [
  {
    number: "AC 056",
    name: "Air Mumbai",
    operate: "Mumbai",
    wifi: true,
  },
  {
    number: "AC 436",
    name: "Air Delhi",
    operate: "Delhi",
    wifi: true,
  },
  {
    number: "AC 393",
    name: "Air Banglore",
    operate: "Banglore",
    wifi: false,
  },
  {
    number: "AC 522",
    name: "Air Mumbai",
    operate: "Mumbai",
    wifi: true,
  },
  {
    number: "AC 346",
    name: "Air Delhi",
    operate: "Delhi",
    wifi: false,
  },
  {
    number: "AC 098",
    name: "Air Banglore",
    operate: "Banglore",
    wifi: false,
  },
];

var airportObjects: {
  airportCode: number;
  airportName: string;
  airportShortName: string;
  location: string;
  facilities: string;
  cooridates: { laltitude: number; longitude: number };
}[] = [
  {
    airportCode: 584,
    airportName: "Delhi Airport",
    airportShortName: "Del",
    location: "Delhi",
    facilities: "Flights",
    cooridates: { laltitude: 28.7041, longitude: 77.1025 },
  },
  {
    airportCode: 214,
    airportName: "Mumbai Airport",
    airportShortName: "Mum",
    location: "Mumbai",
    facilities: "Flights",
    cooridates: { laltitude: 19.076, longitude: 72.8777 },
  },
  {
    airportCode: 762,
    airportName: "Banglore Airport",
    airportShortName: "Ban",
    location: "Banglore",
    facilities: "Flights",
    cooridates: { laltitude: 12.9716, longitude: 77.5946 },
  },
];

var flightObjects: {
  flightId: number;
  flightNumber: number;
  departureDateTime: string;
  arrivalDateTime: string;
  originAirportCode: number;
  destinationAirportCode: number;
  availableSeats: number;
  intialPlaneAssign: {
    number: string;
    name: string;
    operate: string;
    wifi: boolean;
  };
  stopAirportCode:
    | {
        code: number;
        waitingTime: string;
        planeAssign: {
          number: string;
          name: string;
          operate: string;
          wifi: boolean;
        } | null;
      }[]
    | [];
  economy: number;
  premium: number;
  business: number;
}[] = [
  {
    flightId: 35536,
    flightNumber: 236,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[0].airportCode,
    destinationAirportCode: airportObjects[1].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[1],
    stopAirportCode: [],
    economy: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude
      ) * economicPrice
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude
      ) * premiumPrice
    ),
    business: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude
      ) * businessPrice
    ),
  },
  {
    flightId: 65476,
    flightNumber: 362,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[0].airportCode,
    destinationAirportCode: airportObjects[2].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[0],
    stopAirportCode: [
      {
        code: airportObjects[1].airportCode,
        waitingTime: "2hr 35min",
        planeAssign: airlineObjects[2],
      },
    ],
    economy: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * economicPrice
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * premiumPrice
    ),
    business: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * businessPrice
    ),
  },
  {
    flightId: 65476,
    flightNumber: 362,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[0].airportCode,
    destinationAirportCode: airportObjects[2].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[0],
    stopAirportCode: [
      {
        code: airportObjects[1].airportCode,
        waitingTime: "2hr 35min",
        planeAssign: airlineObjects[2],
      },
    ],
    economy: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * economicPrice
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * premiumPrice
    ),
    business: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * businessPrice
    ),
  },
  {
    flightId: 73561,
    flightNumber: 273,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[1].airportCode,
    destinationAirportCode: airportObjects[0].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[2],
    stopAirportCode: [],
    economy: Math.floor(
      measureKm(
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude,
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude
      ) * economicPrice
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude,
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude
      ) * premiumPrice
    ),
    business: Math.floor(
      measureKm(
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude,
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude
      ) * businessPrice
    ),
  },
  {
    flightId: 45235,
    flightNumber: 232,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[1].airportCode,
    destinationAirportCode: airportObjects[2].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[4],
    stopAirportCode: [],
    economy: Math.floor(
      measureKm(
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * economicPrice
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * premiumPrice
    ),
    business: Math.floor(
      measureKm(
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * businessPrice
    ),
  },
  {
    flightId: 63718,
    flightNumber: 452,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[2].airportCode,
    destinationAirportCode: airportObjects[0].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[2],
    stopAirportCode: [
      {
        code: airportObjects[1].airportCode,
        waitingTime: "2hr 35min",
        planeAssign: null,
      },
    ],
    economy: Math.floor(
      measureKm(
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude,
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude
      ) * economicPrice
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude,
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude
      ) * premiumPrice
    ),
    business: Math.floor(
      measureKm(
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude,
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude
      ) * businessPrice
    ),
  },
  {
    flightId: 25143,
    flightNumber: 634,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[2].airportCode,
    destinationAirportCode: airportObjects[1].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[5],
    stopAirportCode: [],
    economy: Math.floor(
      measureKm(
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude,
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude
      ) * economicPrice
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude,
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude
      ) * premiumPrice
    ),
    business: Math.floor(
      measureKm(
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude,
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude
      ) * businessPrice
    ),
  },
];

////////////////////////// Reservation Title Change Code ////////////////////////////////

function reservationTitle(text: string) {
  document.querySelector("#reservation-heading")!.innerHTML =
    text + " RESERVATION";
}

////////////////////////// Reservation Calculation Code ////////////////////////////////

function ChangeStartDate() {
  var startDate =
    document.querySelector<HTMLInputElement>(".start-date")!.value;
  document.querySelector<HTMLInputElement>(".end-date")!.min = startDate;
}

function flights(from: string, to: string) {
  var flightFound = document.querySelector(".reservation-detail")!;
  var lists = document.querySelector(".reservation-lists")!;
  var list = document.querySelectorAll(".reservation-list")!;
  var count = 0;

  flightFound.innerHTML = `Flight results: ${count} flights found`;

  for (var i = 1; i < list.length; i++) {
    lists.removeChild(list[i]);
  }

  for (var i = 0; i < airportObjects.length; i++) {
    var airportObject = airportObjects[i]; // Assign

    if (airportObject.location === from) {
      var fromCode = airportObject.airportCode;
    }
    if (airportObject.location === to) {
      var toCode = airportObject.airportCode;
    }
  }

  var loading = document.createElement("img");
  loading.classList.add("reservation-loading");
  loading.src = "../Images/loading.jpeg";

  lists.appendChild(loading);

  setTimeout(() => {
    lists.removeChild(loading);
    for (var i = 0; i < flightObjects.length; i++) {
      var flightObject = flightObjects[i]; // Assign
      var flightOrigin = flightObject.originAirportCode; // Assign
      var flightDestination = flightObject.destinationAirportCode; // Assign
      var flightDepartureTime = flightObject.departureDateTime; // Assign
      var flightArrivalTime = flightObject.arrivalDateTime; // Assign
      var flightStopCode = flightObject.stopAirportCode; // Assign
      var flightPlaneAssign = flightObject.intialPlaneAssign; // Assign

      if (flightOrigin === fromCode && flightDestination === toCode) {
        ////////////// List //////////////

        var list = document.createElement("div");
        list.classList.add("reservation-list");

        ////////////// List Detail //////////////

        var listDetail = document.createElement("div");
        listDetail.classList.add("reservation-route-detail");

        list.appendChild(listDetail);

        var timing = document.createElement("div");
        timing.classList.add("reservation-route-timing");

        listDetail.appendChild(timing);

        var startingTime = document.createElement("div");
        startingTime.classList.add("reservation-route-start-time");
        startingTime.innerHTML = flightDepartureTime;

        var routeHours = document.createElement("div");
        routeHours.classList.add("reservation-route-hours");
        routeHours.innerHTML = flightStopCode.length + " Stop";

        var endingTime = document.createElement("div");
        endingTime.classList.add("reservation-route-end-time");
        endingTime.innerHTML = flightArrivalTime;

        timing.appendChild(startingTime);
        timing.appendChild(routeHours);
        timing.appendChild(endingTime);

        ////////////// Route Locations //////////////

        var locations = document.createElement("div");
        locations.classList.add("reservation-route-locations");

        listDetail.appendChild(locations);

        var location = document.createElement("div");
        location.classList.add("reservation-route-location");

        locations.appendChild(location);

        var locationFromP = document.createElement("p");
        // locationFromP.classList.add("");
        locationFromP.innerHTML = from;

        var locationToP = document.createElement("p");
        // locationToP.classList.add("");
        locationToP.innerHTML = to;

        location.appendChild(locationFromP);
        location.appendChild(locationToP);

        ////////////// Route Stops //////////////

        var stops = document.createElement("div");
        stops.classList.add("reservation-route-stops");

        locations.appendChild(stops);

        if (flightOrigin !== null && flightOrigin) {
          var dotLeft = document.createElement("div");
          dotLeft.classList.add("reservation-route-dots");
          stops.appendChild(dotLeft);

          for (var j = 0; j < airlineObjects.length; j++) {
            var airlineObject = airlineObjects[j]; // Assign

            var wifi = document.createElement("img");
            wifi.classList.add("reservation-route-wifi");

            if (airlineObject.number === flightPlaneAssign.number) {
              if (airlineObject.wifi) {
                wifi.src = "../Images/wifi.png";
                stops.appendChild(wifi);
              } else {
                wifi.src = "../Images/no-signal.png";
                stops.appendChild(wifi);
              }
            }
          }
        }

        var routes = document.createElement("div");
        routes.classList.add("reservation-route-text");

        for (var l = 0; l < flightStopCode.length; l++) {
          var code = flightStopCode[l].code;
          var plane = flightStopCode[l].planeAssign;

          for (var m = 0; m < airportObjects.length; m++) {
            var airportObject = airportObjects[m];

            if (airportObject.airportCode === code) {
              var routeText = document.createElement("p");
              routeText.classList.add("reservation-route-text");
              routeText.innerHTML = airportObject.airportShortName;
              stops.appendChild(routeText);

              if (plane !== null) {
                for (var n = 0; n < airlineObjects.length; n++) {
                  var airlineObject = airlineObjects[n];

                  var wifi = document.createElement("img");
                  wifi.classList.add("reservation-route-wifi");

                  if (airlineObject.number === plane.number) {
                    if (airlineObject.wifi) {
                      wifi.src = "../Images/wifi.png";
                      stops.appendChild(wifi);
                    } else {
                      wifi.src = "../Images/no-signal.png";
                      stops.appendChild(wifi);
                    }
                  }
                }
              }
            }
          }
        }

        // stops.appendChild(routes);

        if (flightDestination !== null && flightDestination) {
          var dotRight = document.createElement("div");
          dotRight.classList.add("reservation-route-dots");
          stops.appendChild(dotRight);
        }

        var stopsLine = document.createElement("div");
        stopsLine.classList.add("reservation-route-line");

        stops.appendChild(stopsLine);

        ////////////// Waiting Time //////////////s

        var waitingTime = document.createElement("div");
        waitingTime.classList.add("reservation-route-waiting-time");

        locations.appendChild(waitingTime);

        for (var o = 0; o < flightStopCode.length; o++) {
          var code = flightStopCode[o].code;
          var time = flightStopCode[o].waitingTime;

          for (var p = 0; p < airportObjects.length; p++) {
            var airportObject = airportObjects[p];
            if (airportObject.airportCode === code) {
              var waitingTimeText = document.createElement("p");
              waitingTimeText.innerHTML = "+ " + time;
              waitingTime.appendChild(waitingTimeText);
            }
          }
        }

        ////////////// Price Details //////////////

        var priceDetailEconomy = document.createElement("div");
        priceDetailEconomy.classList.add("reservation-price-detail");

        list.appendChild(priceDetailEconomy);

        var priceEconomyPrice = document.createElement("p");
        priceEconomyPrice.innerHTML = "$" + flightObject.economy;

        var priceEconomyText = document.createElement("p");
        priceEconomyText.innerHTML = "";

        priceDetailEconomy.appendChild(priceEconomyPrice);
        priceDetailEconomy.appendChild(priceEconomyText);

        var priceDetailPremium = document.createElement("div");
        priceDetailPremium.classList.add("reservation-price-detail");

        list.appendChild(priceDetailPremium);

        var pricePremiumPrice = document.createElement("p");
        pricePremiumPrice.innerHTML = "$" + flightObject.premium;

        var pricePremiumText = document.createElement("p");
        pricePremiumText.innerHTML = "Mixed cabin";

        priceDetailPremium.appendChild(pricePremiumPrice);
        priceDetailPremium.appendChild(pricePremiumText);

        var priceDetailBusiness = document.createElement("div");
        priceDetailBusiness.classList.add("reservation-price-detail");

        list.appendChild(priceDetailBusiness);

        var priceBusinessPrice = document.createElement("p");
        priceBusinessPrice.innerHTML = "$" + flightObject.business;

        var priceBusinessText = document.createElement("p");
        priceBusinessText.innerHTML = "Includes lie-flat seats";

        priceDetailBusiness.appendChild(priceBusinessPrice);
        priceDetailBusiness.appendChild(priceBusinessText);

        count++;
        lists.appendChild(list);
      }
    }

    flightFound!.innerHTML = `Flight results: ${count} flights found`;
  }, Math.floor(Math.random() * 5000) + 1000);
}

function reservationFlights() {
  var from = document.querySelector("form")!.from;
  var to = document.querySelector("form")!.to;
  if (
    (from.value === "Please Select" || from.value === "PLEASE SELECT") &&
    (to.value === "Please Select" || to.value === "PLEASE SELECT")
  ) {
    inputValidation(from);
    inputValidation(to);
  } else if (
    (from.value !== "Please Select" || from.value !== "PLEASE SELECT") &&
    (to.value !== "Please Select" || to.value !== "PLEASE SELECT")
  ) {
    var submitFrom = inputValidation(from);
    var submitTo = inputValidation(to);

    if (submitFrom && submitTo) {
      flights(from.value, to.value);
    }
  } else if (
    (from.value === "Please Select" || from.value === "PLEASE SELECT") &&
    (to.value !== "" || to.value !== "")
  ) {
    inputValidation(from);
    inputValidation(to);
  } else if (
    (from.value !== "" || from.value !== "") &&
    (to.value === "Please Select" || to.value === "PLEASE SELECT")
  ) {
    inputValidation(from);
    inputValidation(to);
  }
}

function reservationOnLoad() {
  var from = document.querySelector("form")!.from;
  var to = document.querySelector("form")!.to;
  var formOption;

  var adult = document.querySelector("form")!.adult;
  var child = document.querySelector("form")!.child;

  for (var i = 0; i < airportObjects.length; i++) {
    var airportObject = airportObjects[i]; // Assign

    formOption = document.createElement("option");
    formOption.value = airportObject.location;
    formOption.innerHTML = airportObject.location;
    from.appendChild(formOption);
  }

  for (i = 0; i < airportObjects.length; i++) {
    var airportObject = airportObjects[i]; // Assign

    formOption = document.createElement("option");
    formOption.value = airportObject.location;
    formOption.innerHTML = airportObject.location;
    to.appendChild(formOption);
  }

  for (i = 1; i <= 100; i++) {
    formOption = document.createElement("option");
    formOption.value = String(i);
    formOption.innerHTML = String(i);
    adult.appendChild(formOption);
  }

  for (i = 0; i <= 100; i++) {
    formOption = document.createElement("option");
    formOption.value = String(i);
    formOption.innerHTML = String(i);
    child.appendChild(formOption);
  }

  function updateDate(days: number) {
    var date: Date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  var sevenDays = updateDate(7);
  var fourteenDays = updateDate(14);
  var yearDays = updateDate(365);

  function dateConvert(date: Date) {
    return date.toISOString().split("T")[0];
  }

  var startDate = document.querySelector<HTMLInputElement>(".start-date")!;
  startDate.value = dateConvert(sevenDays);
  startDate.min = dateConvert(sevenDays);
  startDate.max = dateConvert(yearDays);

  var returnDate = document.querySelector<HTMLInputElement>(".end-date")!;
  returnDate.value = dateConvert(fourteenDays);
  returnDate.min = dateConvert(sevenDays);
  returnDate.max = dateConvert(yearDays);
}

// Login page

////////////////////////// Login Signup and Signin Code ////////////////////////////////

function signUpButton() {
  document.querySelector<HTMLElement>(".login")!.style.display = "none";
  document.querySelector<HTMLElement>(".registration")!.style.display = "flex";
}

function signInButton() {
  document.querySelector<HTMLElement>(".login")!.style.display = "grid";
  document.querySelector<HTMLElement>(".registration")!.style.display = "none";
}

////////////////////////// Login Slider Code ////////////////////////////////

function loginLoadImage() {
  if (randomIndex === sliderImageLength) {
    randomIndex = 0;
  }
  document.querySelector<HTMLImageElement>(".login-img-slider")!.src =
    imageArray[randomIndex].image;
  document.querySelector<HTMLElement>(".login-img-slider-name")!.innerHTML =
    imageArray[randomIndex].title;
  randomIndex++;
}

////////////////////////// Login SignIn Code ////////////////////////////////

var validation = false;
var registration = [];
var registerObject: Data;

function SignInSubmission() {
  var signInFormSubmission = document.getElementById("login")!;

  signInFormSubmission.addEventListener("submit", (e) => {
    e.preventDefault();
    var target = e.target! as HTMLFormElement;

    var username = target.querySelector<HTMLInputElement>(".username")!;
    var password = target.querySelector<HTMLInputElement>(".password")!;

    if (username.value !== "" && password.value !== "") {
      var submitUsername = inputValidation(username);
      var submitPassword = inputValidation(password);

      console.log("1", submitUsername.submitArray.signIn);

      if (submitUsername.submit === submitPassword.submit) {
        localStorage.setItem(
          "SignIn",
          JSON.stringify(submitUsername.submitArray.signIn)
        );
        document.location.href = "/dist/html/Profile.html";
        checkLocalStorageSignin();
      }
    } else if (username.value === "" && password.value === "") {
      inputValidation(username);
      inputValidation(password);
    } else if (username.value === "" && password.value !== "") {
      inputValidation(username);
    } else if (username.value !== "" && password.value === "") {
      inputValidation(password);
    }
  });
}

////////////////////////// Login SignUp Code ////////////////////////////////

function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

function generateId() {
  var length = 8,
    charset = "0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

function SignUpSubmission() {
  var validation = false;
  var signUpFormSubmission = document.getElementById("signup")!;

  signUpFormSubmission.addEventListener("submit", (e) => {
    var target = e.target! as HTMLFormElement;
    e.preventDefault();

    var getRegistrations = grabLocalStorageRegistration();
    var inputs = target.querySelectorAll<HTMLInputElement>(
      "select, input ,textarea"
    );

    for (var i = 0; i < inputs.length; i++) {
      var submitForm = inputValidation(inputs[i]);
      if (submitForm) {
        validation = true;
        registerObject = {
          ...registerObject,
          [inputs[i].name]: inputs[i].value,
        };
      } else {
        validation = false;
        break;
      }
    }

    if (validation) {
      registerObject = {
        ...registerObject,
        id: generateId(),
        password: generatePassword(),
      };
      getRegistrations.push(registerObject);
      localStorage.setItem("Registration", JSON.stringify(getRegistrations));
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
    }
  });
}

////////////////////////// Login Onload Function Code ////////////////////////////////

function loginOnload() {
  grabArrayObjectData();

  loginLoadImage();
  setInterval(loginLoadImage, 3000);

  SignInSubmission();
  SignUpSubmission();
}
