const name = document.getElementById("nameInput");
const grade = document.getElementById("gradeInput");
const addButton = document.getElementById("button");
const tableBody = document.getElementById("tableBody");
const averageDisplay = document.getElementById("average");

const grades = []; // store numeric grades

function getLetterGrade(gradeNumber) {
  if (gradeNumber >= 70) return "A";
  else if (gradeNumber >= 60) return "B";
  else if (gradeNumber >= 50) return "C";
  else return "Fail";
}

function updateAverage() {
  if (grades.length === 0) {
    averageDisplay.textContent = "Average: N/A";
    return;
  }
  const sum = grades.reduce((total, g) => total + g, 0);
  const avg = sum / grades.length;
  averageDisplay.textContent = "Average: " + avg.toFixed(2);
}

addButton.addEventListener('click', () => {
  const nameValue = name.value.trim();
  if (!nameValue) {
    alert("Please enter a name");
    return;
  }

  const gradeValue = grade.value.trim();
  const gradeNumber = Number(gradeValue);

  if (gradeValue === "" || isNaN(gradeNumber)) {
    alert("Please enter a valid grade");
    return;
  }

  const letterGrade = getLetterGrade(gradeNumber);
  alert(`Grade: ${letterGrade}`);

  grades.push(gradeNumber);

  const newRow = document.createElement("tr");

  // Highlight rows based on grade
  if (letterGrade === "Fail") {
    newRow.classList.add("fail-row");  // red
  } else if (letterGrade === "A") {
    newRow.classList.add("grade-a");   // green
  } else if (letterGrade === "B") {
    newRow.classList.add("grade-b");   // yellow
  } else if (letterGrade === "C") {
    newRow.classList.add("grade-c");   // orange
  }

  const nameCell = document.createElement("td");
  nameCell.textContent = nameValue;

  const gradeCell = document.createElement("td");
  gradeCell.textContent = gradeNumber;

  const letterCell = document.createElement("td");
  letterCell.textContent = letterGrade;

  const actionCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn"); // red Delete button

  deleteBtn.addEventListener("click", () => {
    const index = grades.indexOf(gradeNumber);
    if (index > -1) grades.splice(index, 1);
    newRow.remove();
    updateAverage();
  });

  actionCell.appendChild(deleteBtn);

  newRow.appendChild(nameCell);
  newRow.appendChild(gradeCell);
  newRow.appendChild(letterCell);
  newRow.appendChild(actionCell);

  tableBody.appendChild(newRow);

  updateAverage();

  // Clear inputs
  name.value = "";
  grade.value = "";
});
