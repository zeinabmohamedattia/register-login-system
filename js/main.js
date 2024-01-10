let signupName = document.querySelector('#signupName')
let signupEmail = document.querySelector('#signupEmail')
let signupPassword = document.querySelector('#signupPassword')
let signUpBtn = document.querySelector('#signUpBtn')
let loginBtn = document.querySelector('#loginBtn')
let loginEmail = document.querySelector('#loginEmail')
let loginPassword = document.querySelector('#loginPassword')
let validationMsg = document.querySelector('#validationMsg')
let users;
let sessionUser = document.querySelector('#sessionUser')
// ______________________________________________URL_____________________________________________________
let pathparts = location.href.split('/');
let baseURL = ''
for (let i = 1; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
function changeUrl(pathEnd) {
    {
        location.href = baseURL + `${pathEnd}`
    }
}
// ______________________________________________REGISTER_____________________________________________________

if (localStorage.getItem('allUsers')) {
    users = JSON.parse(localStorage.getItem('allUsers'))
} else {
    users = [];
}
function register() {
    let user = {
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
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regex.test(signupEmail.value)) {
        return true
    } else {
        validationMsg.innerHTML = `<span class="text-danger m-3">please, Enter a valid email</span>`

        return false;
    }
}
function validateName() {
    let regex = /^[a-zA-Z\_]{4,}\d{0,4}?$/;
    if (regex.test(signupName.value)) {
        return true
    } else {
        validationMsg.innerHTML = `<span class="text-danger m-3">
        Your name must start with Only alphapet or '_' and can contain four nums at most and its total at least 4 charcters</span>`
        return false;
    }
}
function validatePass() {
    let regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
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
    for (let i = 0; i < users.length; i++) {
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
    for (let i = 0; i < users.length; i++) {
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