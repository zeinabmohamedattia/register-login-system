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

var pathparts = location.pathname.split('/');
var baseURL = ''

for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
// console.log(baseURL)
console.log(location.pathname)
function changeUrl(pathEnd) {
    {
        if (location.pathname [0]== '/') {
            location.replace('https://' + baseURL + location.hostname + `${pathEnd}`)
            console.log(2222222222222)

        } else {
            location.replace('https://' + baseURL + location.hostname + `${pathEnd}`)

        }

        // // location.replace(baseURL + `${pathEnd}`)
        // location.replace( baseURL +   `${pathEnd}`)
        // console.log('2')

    }
    // newUrl = baseURL + `${pathEnd}`
    // window.location.assign(
    //     newUrl);



}
// ______________________________________________REGISTER_____________________________________________________

if (localStorage.getItem('allUsers')) {
    users = JSON.parse(localStorage.getItem('allUsers'))
} else {
    users = [];
}


function register() {
    // if (isEmptySignup() && validateEmail() && isEmailExist()) {
        var user = {
            userName: signupName.value,
            userEmail: signupEmail.value,
            userPassword: signupPassword.value,
        }
        users.push(user);
        localStorage.setItem('allUsers', JSON.stringify(users));
        validationMsg.innerHTML = `<span class="text-success m-3"> Successfully Registered</span>`
        setTimeout(function () {
            changeUrl('/index.html')
        }, '1000')

}
    

// }

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
function isEmailExist() {
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