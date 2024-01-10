var signupName = document.querySelector('#signupName')
var signupEmail = document.querySelector('#signupEmail')
var signupPassword = document.querySelector('#signupPassword')
var signUpBtn = document.querySelector('#signUpBtn')
var loginBtn = document.querySelector('#loginBtn')
var loginEmail = document.querySelector('#loginEmail')
var loginPassword = document.querySelector('#loginPassword')
var validationMsg = document.querySelector('#validationMsg')
var users;
var sessionUser = document.querySelector('#sessionUser')
// ______________________________________________URL_____________________________________________________
var pathparts = location.href.split('/');
var baseURL = ''
for (var i = 1; i < pathparts.length-1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log( pathparts)

console.log('baseurl'+baseURL)
console.log('pathname'+location.pathname)
console.log('href'+location.href)
// console.log(location.origin)
function changeUrl(pathEnd) {
    {

        location.href = baseURL + `${pathEnd}`
        // window.location.replace(
        //     newUrl);
        // if (baseURL == '/') {
        //     location.replace(location.origin + `${pathEnd}`)

        // } else {
        //     location.replace(baseURL + `${pathEnd}`)

        // }

        // if (baseURL == '/') {
        //     location.replace('https://' + location.hostname + `${pathEnd}`)

        // } else {
        //     location.replace(baseURL + `${pathEnd}`)

        // }
    }

}
// ______________________________________________REGISTER_____________________________________________________

if (localStorage.getItem('allUsers')) {
    users = JSON.parse(localStorage.getItem('allUsers'))
} else {
    users = [];
}
function register() {
    console.log('register');
    var user = {
        userName: signupName.value,
        userEmail: signupEmail.value,
        userPassword: signupPassword.value,
    }

    if (isEmptySignup() && validateName() && validateEmail() && validatePass() && isNotEmailExist()) {
        
        users.push(user);
        localStorage.setItem('allUsers', JSON.stringify(users));
        validationMsg.innerHTML = `<span class="text-success m-3"> Successfully Registered</span>`
        setTimeout(function () {
            changeUrl('/index.html')
        }, '1000')

    } 
}

function isEmptySignup() {

    if (signupName.value != "" && signupEmail.value != "" && signupPassword.value != "") {

        return true
    } else {
        validationMsg.innerHTML = `<span class="text-danger m-3">all inputs are required</span>`
        return false
    }
}
function validateEmail() {
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regex.test(signupEmail.value)) {
        return true
    } else {
        validationMsg.innerHTML = `<span class="text-danger m-3">please, Enter a valid email</span>`

        return false;
    }
}
function validateName() {
    var regex = /^[a-zA-Z\_]{4,}\d{0,4}?$/;
    if (regex.test(signupName.value)) {
        return true
    } else {
        validationMsg.innerHTML = `<span class="text-danger m-3">
        Your name must start with Only alphapet or '_' and can contain four nums at most and its total at least 4 charcters</span>`
        return false;
    }
}
function validatePass() {
    var regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (regex.test(signupPassword.value)) {
        return true
    } else {
        validationMsg.innerHTML = `<span class="text-danger m-3">
        password should contain atleast one digit and one upperCase alphapet and its total at least 6 charcters</span>`
        return false;
    }
}
function isNotEmailExist() {
    if (users.length == 0) {
        return true
    }
    for (var i = 0; i < users.length; i++) {
        if (users[i].userEmail.toLowerCase() == signupEmail.value.toLowerCase()) {
            validationMsg.innerHTML = `<span class="text-danger m-3">email already exist ,try another email</span>`
            return false
        } else {
            return true
        }
    }
}
// ______________________________________________LOGIN_____________________________________________________
function login() {
    if (isEmptyLogin() && isCorrect()) {

        setTimeout(function () {
            changeUrl('/home.html')

        }, '200')
    }
}
function isEmptyLogin() {

    if (loginEmail.value != "" && loginPassword.value != "") {
        return true
    } else {
        validationMsg.innerHTML = `<span class="text-danger m-3">all inputs are required</span>`
        return false
    }
}
function isCorrect() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].userEmail.toLowerCase() == loginEmail.value.toLowerCase() &&
            users[i].userPassword.toLowerCase() == loginPassword.value.toLowerCase()) {
            validationMsg.innerHTML = `<span class=" m-3 text-success"> correct Email and Password</span>`
            sessionStorage.setItem('currentUser', users[i].userName)
            return true
        } else {
            validationMsg.innerHTML = `<span class="text-danger m-3">incorrect Email and Password</span>`
        }
    }
}
// ______________________________________________WELCOME_____________________________________________________

if (sessionStorage.getItem('currentUser') && (pathparts[pathparts.length - 1]) == 'home.html') {
    sessionUser.innerHTML = `welcome ${sessionStorage.getItem('currentUser')}`
}
// ______________________________________________LOGOUT_____________________________________________________
function logout() {
    if (sessionStorage.getItem('currentUser')) {
        sessionStorage.setItem('currentUser', '')
        changeUrl('/index.html')
    }
}