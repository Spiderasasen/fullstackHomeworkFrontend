//building the fetch options
function buildFetchOptions(method, bodyObject){
    let fetchOptions = {};
    fetchOptions.method = method.toLowerCase();
    if (fetchOptions.method == 'post' || fetchOptions.method == 'put') {
        fetchOptions.body = JSON.stringify(bodyObject);
        fetchOptions.headers = {"Content-Type":"application/json"};
    }
    console.log(fetchOptions.body);
    return fetchOptions;
}

//making the api call
async function makeAPICall(url, method, idParam, bodyObject){
    //getting all the parameters in the console log to see what is going on
    console.log(`Url: ${url} Method: ${method} body: ${bodyObject} idParam: ${idParam}`);

    let fetchOptions = buildFetchOptions(method, bodyObject);
    if (idParam && idParam != null){
        url += `/${idParam}`;
    }
    let apiResponse = await fetch(url, fetchOptions);
    if (apiResponse.status != 200) return undefined;
    let apiResponseJSON = await apiResponse.json();
    console.log(apiResponseJSON);
    return apiResponseJSON;
}

//getting the course list
async function getCourseList(){
    let courseList = await makeAPICall(getCoursesURL, "get");
    console.log(courseList);
    return courseList;
}

async function loadCourses(){
    let courseList = await getCourseList();

    console.log("Courses received:", courseList);

    if (!courseList) {
        console.log("Failed to retrieve courses from backend");
        return;
    }

    populateCourses(courseList);
}

//creating a course
async function addCourse(courseTitle, courseNumber, courseStudentAmount){
    console.log("Adding course to backend");
    let newCourse = new Course(-1, courseTitle, courseNumber, courseStudentAmount);
    let courseResponse = await makeAPICall(createCourse, "post", undefined, newCourse);
    console.log(courseResponse);
    if(courseResponse){
        await loadCourses();
    }
}

async function editCourse(id, courseTitle, courseNumber, courseStudentAmount){
    console.log("Editing course to backend");
    let editCourse = new Course(id, courseTitle, courseNumber, courseStudentAmount);
    let courseResponse = await makeAPICall(updateCourse, "put", id, editCourse);
    console.log(courseResponse);
    if(courseResponse){
        await loadCourses();
    }
}