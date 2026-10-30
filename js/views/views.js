//course table functions
function addTableCell(rowElement, cellNum, cellValue, className){
    let newCell = rowElement.insertCell(cellNum);
    newCell.innerHTML = cellValue;
    if(className){
        newCell.setAttribute("class", className);
    }
}

//populating the course table
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
        addTableCell(newRow, 4, `<button id="editButton" onClick="showCorusePopup('+ course.courseId +')"><i class="fas fa-pencil-alt"></i></button><button id="deleteButton" onClick="deleteStudent('+course.courseId+')"><i class="fa fa-trash"></i></button>`)
    }
}

//the user clicks on the submit button
function submitCourse(){
    const formInput = document.getElementById('courseForm').elements;
    const courseId = formInput["courseId"].value;
    const courseTitle = formInput["courseTitle"].value;
    const courseNumber = formInput["courseNumber"].value;
    const courseStudentAmount = formInput["courseStudentAmount"].value;

    //just checking everything passed though
    console.log(`courseId: ${courseId}
courseTitle: ${courseTitle}
courseNumber: ${courseNumber}
courseStudentAmount: ${courseStudentAmount}`);

    if(courseId){
        editCourse(courseId, courseTitle, courseNumber, courseStudentAmount); //course already exist, just updating it
    }
    else{
        addCourse(courseTitle, courseNumber, courseStudentAmount); //course does not exist, creating it
    }
}