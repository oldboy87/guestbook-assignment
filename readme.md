Captain's Log:

-Signed up to Render
-Created vite project version 7

!!! FIXED INCORRECT FOLDER STRUCTURES !!!

- Parent
  -Add .gitignore: DATABASE URL and node_modules

==Client==

- npx create vite@7
- npm i

==Server==

- npm init -y
- npm I express cors
- npm install dotenv
- npm i pg

- create server.js

  - import express
  - import cors
  - import {db}
  - define app variable as express function
  - define PORT as 8080
  - listen command that logs PORT
  - get command for root route

- create .env : DATABASE URL

- create dbConnection.js

  - import pg
  - import dotenv
  - dotenv.config();
  - export const db

  - package.json
    - add dev watch server -->
    - add type module -->
    - confirmed cors, dotenv, express and pg are all present

==Set up Render==

- client deployed!
- server APPLICATION EXITED EARLY
  _HOPEFULLY this is because my server.js is currently empty_
- hooray!

==Client HTML==

I recall supabase/SQL does not play nicely with hyphens. I think you can use quotations but nor now I am avoiding using them. Forms are constructed with slightly awkward looking ID/NAME/VALUE parameters (looking at you especially, age values!)

<!-- I might want to add - in Personal Information - a question regarding if they have experienced escape rooms prior to this one. I'd make that one an OPTION and the age one just a field that accepts only numbers. Could always categorise in javascript, or maybe even SQL? --> **

<!-- I have a feeling the same is true for properties staring with a number. If so, will need to rename star ratings. Let's find out... --> Have improved this.

<!-- Also, can I reuse the same naming scheme so long as in different fieldsets? --> **

<!-- Star rating was rather repetitive setting up. Could have used DOM! -->

<!-- Could have a "How likely are you to recommend us to freiends/family?" And have it be a RANGE slider, just to be fancy. --> **

- forgot to give select option list a name. Corrected.

==app.js==

-Have submit functionality working, form data can now be stored as object formValues.

<!-- Clear form elements and DOM formValues back to the user. "You wrote this" that sort of thing. --> **

WITH FETCH MAKE SURE YOU DO NOT SUBMIT LOCALHOST!!!!!!
WITH FETCH MAKE SURE YOU DO NOT SUBMIT LOCALHOST!!!!!!
WITH FETCH MAKE SURE YOU DO NOT SUBMIT LOCALHOST!!!!!!
WITH FETCH MAKE SURE YOU DO NOT SUBMIT LOCALHOST!!!!!!
WITH FETCH MAKE SURE YOU DO NOT SUBMIT LOCALHOST!!!!!!
WITH FETCH MAKE SURE YOU DO NOT SUBMIT LOCALHOST!!!!!!
WITH FETCH MAKE SURE YOU DO NOT SUBMIT LOCALHOST!!!!!!
One more time...
WITH FETCH MAKE SURE YOU DO NOT SUBMIT LOCALHOST!!!!!!

==server.js==

<!-- I'll try to pull from the server.js list above and put into here if I remember -->**

-post for /feedback successfully retrieves formValues, which is form data from app.js

<!-- Is const feedback being the same name as the table causing problems? --> I don't think so.

<!-- /home/randy/TechEd/guestbook-project/server/node_modules/pg-pool/index.js:45
    Error.captureStackTrace(err)
          ^

Error: getaddrinfo EAI_AGAIN postgres.
    at /home/randy/TechEd/guestbook-project/server/node_modules/pg-pool/index.js:45:11
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5) {
  errno: -3001,
  code: 'EAI_AGAIN',
  syscall: 'getaddrinfo',
  hostname: 'postgres.' -->

<!-- - Tried removing async: no difference
- corrected vlaues for star rating so number (on render, expecting int) = no difference
- Tried creating a new table and linking to that = no difference
- Literally trying anything at this point
- changed app.get and post to arrow functions, just to get it like for like with workshop demo
- in server package.json moved "type":"module" to the same spot as in demo.
- I would compare package.json but.... no thanks.
- Moved addEventListener in client app.js from before to after handleSubmit, in case there's something fundamental I'm forgetting. As far as I could tell, that side of things was working fine.
- in client app.js changed event argument name from "submitEvent" to "event" just so it's identical to workshop (and I'm all out of ideas). Ditto with "formData" to "formDataTemplate"
- Bertie can attest there were some mishaps when setting up the project (vite stuff) but we seemingly got it sorted. Maybe not?
- Guess what?
- I solved it
- Want to know how?
- Noticed in dbConnections for getting the DATABASE-URL, it says "connectionString"
- S-T-R-I-N-G
- My darn url in the env was pasted without quotations! It wasn't a string! Egads! -->

- Well it is now. Fixed and works.

- added reviewSection for DOM

==database==

- set up Feedback Responses table
- ensured method: transaction pooler is selected
- forgot to include age in table on render. Deleted table, included age in teh order it should be, yet for some reason it puts it as the last column. Thanks Render.

==Media==

Added star rating images to project. The 5 star rating is slightly misaligned compared to the other images despite coming from the same artist, how annoying!

Was trying to do something similar to how vite generates an entire HTML page but just for teh star rating section but for whatever reaosn I simply could not add alt text to the images after they've been created. Src? No problem. But not alt. Thought it was because the element selector "forgets" it once an attribute has been set, but even if I try JUST doing alt, still no dice. Bizarre. Doing as global at top of script and just peppering that section with divs. We like divs.

I simply do not understand why only one star image is getting added to the divs (the last one attempted, I tested by commenting it out and the preceding one is suddenly successful). This happens with this code (after comment "Oh boy this was a pain in the backside:"):
// immersionImg.appendChild(starElements[immersion]);
// actingImg.appendChild(starElements[acting]);
// challengeImg.appendChild(starElements[challenge]);

    // maindiv.appendChild(namediv);
    // maindiv.appendChild(ratingsdiv);

    // ratingsdiv.appendChild(immersiondiv);
    // ratingsdiv.appendChild(actingdiv);
    // ratingsdiv.appendChild(challengediv);

    // immersiondiv.appendChild(immersionText);
    // immersiondiv.appendChild(immersionImg);

    // actingdiv.appendChild(actingText);
    // actingdiv.appendChild(actingImg);

    // challengediv.appendChild(challengeText);
    // challengediv.appendChild(challengeImg);

    // maindiv.appendChild(commentdiv);
    // reviewSection.appendChild(maindiv);

If I do this instead, same things happen:

reviewSection.appendChild(maindiv);
// maindiv.appendChild(namediv);
// maindiv.appendChild(ratingsdiv);
// maindiv.appendChild(commentdiv);
// ratingsdiv.appendChild(immersiondiv);
// ratingsdiv.appendChild(actingdiv);
// ratingsdiv.appendChild(challengediv);
// immersiondiv.appendChild(immersionText);
// immersiondiv.appendChild(immersionImg);
// actingdiv.appendChild(actingText);
// actingdiv.appendChild(actingImg);
// challengediv.appendChild(challengeText);
// challengediv.appendChild(challengeImg);
// immersionImg.appendChild(starElements[immersion]);
// actingdiv.appendChild(starElements[acting]);
// challengediv.appendChild(starElements[challenge]);

I tried something else but deleted the comment for it. Didn't work either.

So _blows raspberries_ gonna just do a separate function and await this one. Is what I WOULD say if my back wasn't on teh verge of breaking and virtually falling asleep at my PC, so instead we are just gonna saay "sucks to that" and just display it as text.

I did try stringify but didn't work, just prints out empty brackets.

Yeah I'm checking out unfortunately. Zero CSS. Zero responsiveness. Radio buttons are confusing, but otehrwise functionality works.

I was going to add a page refresh to HandleSubmit by turning it into async and adding a reload() after await, but brain is melt.
