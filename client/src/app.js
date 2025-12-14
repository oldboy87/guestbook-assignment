// For DOM - adding reviews to page:

const reviewSection = document.getElementById("reviews");

let starRating1 = document.createElement("img");
let starRating2 = document.createElement("img");
let starRating3 = document.createElement("img");
let starRating4 = document.createElement("img");
let starRating5 = document.createElement("img");

const starElements = [
  starRating1,
  starRating2,
  starRating3,
  starRating4,
  starRating5,
];

console.log(starElements);

function buildRatings() {
  const starImages = [
    "./src/images/1star.png",
    "./src/images/2star.png",
    "./src/images/3star.png",
    "./src/images/4star.png",
    "./src/images/5star.png",
  ];

  const starAlts = [
    "1 star rating",
    "2 star rating",
    "3 star rating",
    "4 star rating",
    "5 star rating",
  ];

  for (let i = 0; i <= starImages.length - 1; i++) {
    console.log(starElements[i]);
    starElements[i].setAttribute("src", starImages[i]);
    starElements[i].setAttribute("alt", starAlts[i]);
  }
}

buildRatings();

// We get feedback form and add eventListener "handleSubmit" to submit button.
// We prevent the form's default behaviour.
// We take the data from the form (formData) and then convert it to an object (formValues)
// Send formValues in a request to the server

const userForm = document.getElementById("feedback-form");

function handleSubmit(event) {
  event.preventDefault();

  const formDataTemplate = new FormData(userForm);
  console.log(formDataTemplate);

  const formValues = Object.fromEntries(formDataTemplate);
  console.log(formValues);

  fetch("http://localhost:8080/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
}

userForm.addEventListener("submit", handleSubmit);

//Get database query results from server:

async function getDatabaseQuery() {
  const response = await fetch("http://localhost:8080/feedback");
  console.log(response);
  const data = await response.json();
  return data;
}

//Decrementing for loop so DOM will add elements in order of most recent

async function sortReviews() {
  const unsorted = await getDatabaseQuery();
  console.log(unsorted);
  for (let i = unsorted.length - 1; i >= 0; i--) {
    const maindiv = document.createElement("div");
    maindiv.setAttribute("class", "review-main");
    maindiv.setAttribute("id", i);

    const namediv = document.createElement("div");
    namediv.setAttribute("class", "review-name");
    namediv.setAttribute("id", i);

    const ratingsdiv = document.createElement("div");
    ratingsdiv.setAttribute("class", "review-rating");
    ratingsdiv.setAttribute("id", i);

    const immersiondiv = document.createElement("div");
    immersiondiv.setAttribute("class", "immersion-rating");
    immersiondiv.setAttribute("id", i);

    const actingdiv = document.createElement("div");
    actingdiv.setAttribute("class", "acting-rating");
    actingdiv.setAttribute("id", i);

    const challengediv = document.createElement("div");
    challengediv.setAttribute("class", "challenge-rating");
    challengediv.setAttribute("id", i);

    const immersionText = document.createElement("div");
    immersionText.setAttribute("class", "immersion-text");
    immersionText.setAttribute("id", i);
    const immersionImg = document.createElement("div");
    immersionImg.setAttribute("class", "immersion-stars");
    immersionImg.setAttribute("id", i);

    const actingText = document.createElement("div");
    actingText.setAttribute("class", "acting-text");
    actingText.setAttribute("id", i);
    const actingImg = document.createElement("div");
    actingImg.setAttribute("class", "acting-stars");
    actingImg.setAttribute("id", i);

    const challengeText = document.createElement("div");
    challengeText.setAttribute("class", "challenge-text");
    challengeText.setAttribute("id", i);
    const challengeImg = document.createElement("div");
    challengeImg.setAttribute("class", "challenge-stars");
    challengeImg.setAttribute("id", i);

    const commentdiv = document.createElement("div");
    commentdiv.setAttribute("class", "review-comment");
    commentdiv.setAttribute("id", i);

    namediv.innerHTML = unsorted[i].firstname + " " + unsorted[i].surname;

    immersionText.innerHTML = "Immersion Rating:";
    actingText.innerHTML = "Acting Rating:";
    challengeText.innerHTML = "Challenge Rating:";

    const unsortedIndex = unsorted[i];
    const immersion = unsortedIndex.immersion - 1;
    const acting = unsortedIndex.acting - 1;
    const challenge = unsortedIndex.challenge - 1;

    // Oh boy this was a pain in teh backside:

    reviewSection.appendChild(maindiv);
    maindiv.appendChild(namediv);
    maindiv.appendChild(ratingsdiv);
    maindiv.appendChild(commentdiv);
    ratingsdiv.appendChild(immersiondiv);
    ratingsdiv.appendChild(actingdiv);
    ratingsdiv.appendChild(challengediv);
    immersiondiv.appendChild(immersionText);
    immersiondiv.appendChild(immersionImg);
    actingdiv.appendChild(actingText);
    actingdiv.appendChild(actingImg);
    challengediv.appendChild(challengeText);
    challengediv.appendChild(challengeImg);

    // Didn't work, lol:
    // const stringedImmersion = JSON.stringify(starElements[immersion]);
    // const stringedActing = JSON.stringify(starElements[acting]);
    // const stringedChallenge = JSON.stringify(starElements[challenge]);

    // console.log(stringedImmersion);

    immersionImg.innerHTML = immersion + 1;
    actingImg.innerHTML = acting + 1;
    challengeImg.innerHTML = challenge + 1;

    console.log(unsorted[i].comment);

    commentdiv.innerHTML = unsorted[i].comment;

    console.log(i);
  }
}

sortReviews();

// TODO: After submit button clicked. Use DOM to present to user what they put with a nice, un-editable sheen.
//TODO: I assume on teh same page is fine, but could I direct to another page and have it displayed there? Would I want to?
//TODO: Probably want to just get rid of all form elements and display on current page
