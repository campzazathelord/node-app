const weatherform = document.querySelector("form");
const search = document.querySelector("input");
weatherform.addEventListener("submit", (event) => {
  fetch(`/weather?address=${search.value}`).then((response) => {
    response.json().then((data) => {
      if (data.location != "error") {
        document.querySelector(".display").textContent = `the temperature of ${
          data.location != undefined ? data.location : `-`
        } is ${
          data.temperature != undefined ? data.temperature : `-`
        } degrees C`;
      } else
        document.querySelector(
          ".display"
        ).textContent = `Please enter new address`;
    });
  });
  event.preventDefault();
});
