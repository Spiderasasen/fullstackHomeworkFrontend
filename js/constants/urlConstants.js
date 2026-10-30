//for local host to work
// const port = 9004
// const domain = `http://localhost:${port}`

//for the chronos api call to work
const domain = "http://chronos.cs.elon.edu/ddiaz11/api"

const coursePath = "courses"

//getting the urls
const getCoursesURL =  `${domain}/${coursePath}`;
const getCourseURL = getCoursesURL;
const createCourseURL = getCoursesURL;
const deleteCourseURL = getCoursesURL;
const updateCourseURL = getCoursesURL