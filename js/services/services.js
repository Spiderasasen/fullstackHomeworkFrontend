
// Building the fetch options
function buildFetchOptions(method, bodyObject){
    let fetchOptions = {};

    fetchOptions.method = method.toLowerCase();

    if (fetchOptions.method == 'post' || fetchOptions.method == 'put') {
        fetchOptions.body = JSON.stringify(bodyObject);
        fetchOptions.headers = {"Content-Type":"application/json"};
    }

    return fetchOptions;
}

// Making the API call
async function makeAPICall(url, method, idParam, bodyObject){

    console.log(`Url: ${url} Method: ${method} body: ${bodyObject} idParam: ${idParam}`);

    let fetchOptions = buildFetchOptions(method, bodyObject);

    if (idParam && idParam != null){
        url += `/${idParam}`;
    }

    try {
        let apiResponse = await fetch(url, fetchOptions);

        if (apiResponse.status != 200) {
            console.log("API request failed:", apiResponse.status);
            return undefined;
        }

        let apiResponseJSON = await apiResponse.json();

        console.log(apiResponseJSON);

        return apiResponseJSON;
    }
    catch(error) {
        console.error("API connection error:", error);
        return undefined;
    }
}

// Getting the course list
async function getCourseList(){
    let courseList = await makeAPICall(getCoursesURL, "get");
    console.log(courseList);
    return courseList;
}

// Loading all courses
async function loadCourses(){
    let courseList = await getCourseList();

    console.log(courseList);

    if(courseList){
        populateCourses(courseList);
    }
}

// Getting one course
async function getCourse(courseId){
    let course = await makeAPICall(getCourseURL, "get", courseId);
    return course;
}

// Creating a course
async function addCourse(courseTitle, courseNumber, courseStudentAmount){

    console.log("Adding course to backend");

    let newCourse = new Course(-1, courseTitle, courseNumber, courseStudentAmount);

    let courseResponse = await makeAPICall(createCourseURL, "post", undefined, newCourse);

    console.log(courseResponse);

    if(courseResponse){
        await loadCourses();
        hideCoursePopup();
    }
}

// Editing a course
async function editCourse(id, courseTitle, courseNumber, courseStudentAmount){

    console.log("Editing course in backend");

    let editedCourse = new Course(id, courseTitle, courseNumber, courseStudentAmount);

    let courseResponse = await makeAPICall(updateCourseURL, "put", id, editedCourse);

    console.log(courseResponse);

    if(courseResponse){
        await loadCourses();
        hideCoursePopup();
    }
}

// Deleting a course
async function deleteCourse(courseId){

    console.log("Deleting course from backend");

    let deleteResponse = await makeAPICall(deleteCourseURL, "delete", courseId);

    console.log(deleteResponse);

    if(deleteResponse){
        removeCourse(courseId);
    }
}
