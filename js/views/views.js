
// Course table functions
function addTableCell(rowElement, cellNum, cellValue, className){

    let newCell = rowElement.insertCell(cellNum);

    newCell.textContent = cellValue;

    if(className){
        newCell.setAttribute("class", className);
    }
}

// Populating the course table
function populateCourses(courseList){

    let courseTableBody = document.getElementById('courseTableBody');

    console.log(courseTableBody);

    courseTableBody.innerHTML = "";

    for (const course of courseList){

        console.log(course);

        let newRow = courseTableBody.insertRow(-1);

        newRow.setAttribute("id", `course${course.courseId}`);

        addTableCell(newRow, 0, course.courseId);
        addTableCell(newRow, 1, course.courseTitle);
        addTableCell(newRow, 2, course.courseNumber);
        addTableCell(newRow, 3, course.courseStudentAmount);

        // Creating the action buttons
        let actionCell = newRow.insertCell(4);

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function(){
            showCoursePopup(course.courseId);
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function(){
            deleteCourse(course.courseId);
        };

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
    }
}

// Submitting a course
function submitCourse(){

    const formInput = document.getElementById('courseForm').elements;

    const courseId = formInput["courseId"].value;
    const courseTitle = formInput["courseTitle"].value;
    const courseNumber = parseInt(formInput["courseNumber"].value);
    const courseStudentAmount = parseInt(formInput["courseStudentAmount"].value);

    console.log(`courseId: ${courseId}
courseTitle: ${courseTitle}
courseNumber: ${courseNumber}
courseStudentAmount: ${courseStudentAmount}`);

    if(courseId){
        editCourse(courseId, courseTitle, courseNumber, courseStudentAmount);
    }
    else{
        addCourse(courseTitle, courseNumber, courseStudentAmount);
    }
}

// Showing the course popup
function showCoursePopup(courseId){

    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");

    if(courseId){
        setEditCourse(courseId);
    }
    else{
        setNewCourse();
    }

    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

// Setting up the edit course popup
async function setEditCourse(courseId){

    let popupTitle = document.getElementById("popupTitle");

    popupTitle.innerHTML = "Edit Course";

    let course = await getCourse(courseId);

    if(course){
        mapCourse(course);
    }
}

// Setting up a new course popup
function setNewCourse(){

    let popupTitle = document.getElementById("popupTitle");

    popupTitle.innerHTML = "Create Course";

    let courseId = document.getElementById("courseId");
    courseId.value = "";

    let courseTitle = document.getElementById("courseTitle");
    courseTitle.value = "";

    let courseNumber = document.getElementById("courseNumber");
    courseNumber.value = "";

    let courseStudentAmount = document.getElementById("courseStudentAmount");
    courseStudentAmount.value = "";
}

// Mapping course information into the form
function mapCourse(course){

    let courseId = document.getElementById("courseId");
    courseId.value = course.courseId;

    let courseTitle = document.getElementById("courseTitle");
    courseTitle.value = course.courseTitle;

    let courseNumber = document.getElementById("courseNumber");
    courseNumber.value = course.courseNumber;

    let courseStudentAmount = document.getElementById("courseStudentAmount");
    courseStudentAmount.value = course.courseStudentAmount;
}

// Hiding the course popup
function hideCoursePopup(){

    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");

    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// Removing a course from the table
function removeCourse(courseId){

    let courseRow = document.getElementById("course" + courseId);

    if(courseRow){
        courseRow.remove();
    }
}
