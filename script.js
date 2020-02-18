"use strict";

const modal = document.querySelector(".modal-background");
const main = document.querySelector("main");
var span = document.getElementsByClassName("close")[0];

const allStudents = [];
const Student = {
  firstName: "",
  lastName: "",
  middleName: "",
  nickName: "",
  house: "",
  image: null
};

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
fetch("https://petlatkea.dk/2020/hogwarts/students.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    data.forEach(jsonObject => {

      //console.log(jsonObject)
      let student = Object.create(Student);
      //console.log(student)

      // defining strings from original JSON file and making data usable
      let fullname = jsonObject.fullname.trim().toLowerCase().replace(/[-""]/g, ' ').split(" ")
      let house = jsonObject.house.trim().toLowerCase()
      // defining repaired strings
      student.house = house
      student.image = jsonObject.image
      // putting info for students in the right places for new strings
      student.firstName = fullname[0]
      if (fullname.length == 2) {
        student.lastName = fullname[1]
      } else if (fullname.length == 3) {
        student.lastName = fullname[2]
        student.middleName = fullname[1]
      } else if (fullname.length == 5) {
        student.lastName = fullname[4]
        student.nickName = fullname[2]
      }
      // pushing repaired arrays into a string
      allStudents.push(student)
    });
    // for each array doing this function
    allStudents.forEach(showStudents);
  });

// displays content from made array
function showStudents(student) {
  console.log(student);

  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);

  // sets the text content for selected elements and gives a class for opening modal
  copy.querySelector("h3").textContent = `${student.firstName} ${student.lastName}`;
  copy.querySelector("h3").setAttribute("class", student.house);

  // when student name clicked, opens modal
  copy.querySelector(`.${student.house}`).addEventListener("click", function () {
    if (student.nickName.length > 0) {
      modal.querySelector(".nickName span").textContent = student.nickName;
    } else {
      modal.querySelector(".nickName span").textContent = "none";
    }
    if (student.middleName.length > 0) {
      modal.querySelector(".middleName span").textContent = student.middleName;
    } else {
      modal.querySelector(".middleName span").textContent = "none";
    }

    modal.querySelector(".headerName").textContent = `${student.firstName} ${student.lastName}`;
    modal.querySelector(".studentFullname span").textContent = `${student.firstName} ${student.lastName}`;
    modal.querySelector(".house span").textContent = student.house;
    document.querySelector(".crest").src = `crests/${student.house}.png`;
    // sets theme for modal and takes styling elements from CSS
    const theme = this.classList;
    //console.log(theme);
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
  //console.log(theme);
  modal.dataset.theme = theme;
}
