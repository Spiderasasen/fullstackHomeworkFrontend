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