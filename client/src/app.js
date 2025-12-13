// We get feedback form and add eventListener "handleSubmit" to submit button.
// We prevent the form's default behaviour.
// We take the data from the form (formData) and then convert it to an object (formValues)
// Send formValues in a request to the server

const userForm = document.getElementById("feedback-form");
userForm.addEventListener("submit", handleSubmit);

function handleSubmit(submitEvent) {
  submitEvent.preventDefault();

  const formData = new FormData(userForm);
  console.log(formData);

  const formValues = Object.fromEntries(formData);
  console.log(formValues);

  fetch("http://localhost:8080/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
}

// TODO: After submit button clicked. Use DOM to present to user what they put with a nice, un-editable sheen.
//TODO: I assume on teh same page is fine, but could I direct to another page and have it displayed there? Would I want to?
//TODO: Probably want to just get rid of all form elements and display on current page
