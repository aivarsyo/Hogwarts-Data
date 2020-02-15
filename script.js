"use strict";

const modal = document.querySelector(".modal-background");
const main = document.querySelector("main");
var span = document.getElementsByClassName("close")[0];

// close the modal when clicked on X or outside of modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.add("hide");
  }
};
span.onclick = function () {
  modal.classList.add("hide");
};

// getting info from JSON file
fetch("students1991.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    data.forEach(showStudents);
  });

// displays content in a loop
function showStudents(student) {
  console.log(student);

  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  // sets the text content for selected elements and gives a class for opening modal
  copy.querySelector("h3").textContent = student.fullname;

  copy.querySelector("h3").setAttribute("class", student.house);

  // when student name clicked, opens modal
  copy.querySelector(`.${student.house}`).addEventListener("click", function () {

    modal.querySelector("h2").textContent = student.fullname;
    modal.querySelector("h4 span").textContent = student.house;
    document.querySelector(".crest").src = `crests/${student.house}.png`;
    // sets theme for modal and takes styling elements from CSS
    const theme = this.classList;
    console.log(theme);
    modal.dataset.theme = theme;

    // cloned elements appends to main
    document.querySelector("main").appendChild(modal);
    // shows modal when clicked on a student name
    modal.classList.remove("hide");
    // when option selected, changes theme
    document.querySelector("#theme").addEventListener("change", changeTheme);
  });

  document.querySelector("main").appendChild(copy);
}
// changes theme for selected option
function changeTheme() {
  const theme = this.value;
  console.log(theme);
  modal.dataset.theme = theme;
}
