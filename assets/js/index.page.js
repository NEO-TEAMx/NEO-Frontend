const baseUrl = 'https://neoprotocol.onrender.com/api/v1/'
const currentYear = new Date().getFullYear();
const year = document.querySelector("#currentYear");

year.innerText = currentYear;

function clearErrors(){
    const errMsg = document.getElementById('errorMsg');
    const successMsg = document.getElementById('successMsg')
    errMsg.textContent = '';
    successMsg.textContent = '';
}

function displayError(msg){
    const errMsg = document.getElementById("errorMsg");
    errMsg.innerHTML += `<p class="text-center lead mb-4" >${msg}</p>`
    setTimeout(clearErrors, 4000)
    // const errorElement = document.getElementById(elementId);
    // errorElement.textContent = msg;
    // errorElement.style.display = 'block';
}
function displaysuccess(msg){
    const errMsg = document.getElementById("successMsg");
    errMsg.innerHTML += `<p class="text-center lead mb-4" >${msg}</p>`
    setTimeout(clearErrors, 4000)
    // const errorElement = document.getElementById(elementId);
    // errorElement.textContent = msg;
    // errorElement.style.display = 'block';
}

function handleCookie(val){
    const cookies = val.split(';');
    cookies.forEach(cookie => {
        const trimmedCookie = cookie.trim();
        if(trimmedCookie.startsWith('access_token=')){
            document.cookie = trimmedCookie;
        }else if(trimmedCookie.startsWith('refresh_token=')){
            document.cookie = trimmedCookie;
        }
    });
}

async function submitSignupForm(){
    const usernameInput = document.querySelector("#username");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const confirmPasswordInput = document.querySelector("#confirmPassword");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const usernameVal = usernameInput.value;
    const emailVal = emailInput.value;
    const passwordVal = passwordInput.value;
    const confirmPasswordVal = confirmPasswordInput.value

    clearErrors();
    // validate inputs
    if(!usernameVal || !emailVal || !passwordVal || !confirmPasswordVal){
        displayError('Please provide the needed value(s)')
        return;
        // throw new Error("Please provide the needed value")
    }

    if(!emailRegex.test(emailVal)){
        displayError('Email is not valid!')
        return;
        // throw new Error("Email is not valid!")
    }

    if(passwordVal.length < 8){
        displayError('Password should be at least 8 characters')
        return;
        // throw new Error("Password should be at least 8 character")
    }

    if(passwordVal !== confirmPasswordVal){
        displayError("Passwiord and confirm password does not match!")
        // throw new Error("Password and confirm password does not match!")
        return;
    }

    //req payload
    const data = {
        username: usernameVal,
        email: emailVal,
        password: passwordVal,
        confirmPassword: confirmPasswordVal
    }

    
    try {
       const response = await fetch(baseUrl+'register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            const resp = await response.json(); 
            displayError(resp.msg);
        }
        if (response.status === 200) {
            usernameVal = '',
            emailVal = '',
            passwordVal = '',
            confirmPasswordVal = ''
        }
        if(response.ok){
            const resp = await response.json();
            // const cookies = document.cookie;
        
            displaysuccess(resp.msg)
            const setCookieHeader = response.headers.get('set-cookie');
            if(setCookieHeader){
                console.log(setCookieHeader)
                handleCookie(setCookieHeader)
            }

            window.location.href = "../dacshboard/dashboard.html"
            
            usernameVal = '',
            emailVal = '',
            passwordVal = '',
            confirmPasswordVal = ''
            return;
        }
        
    } catch (error) {
        console.log(error)    
        // return;
        displayError('SomeThing went wrong!!')
    }
}

async function submitLoginForm(){
    const usernameInput = document.querySelector("#item");
    const passwordInput = document.querySelector("#password");
    
    const usernameVal = usernameInput.value;
    const passwordVal = passwordInput.value;
    
    clearErrors();
    // validate inputs
    if(!usernameVal || !passwordVal){
        displayError('Please provide the needed value(s)')
        return;
        // throw new Error("Please provide the needed value")
    }

    if(passwordVal.length < 8){
        displayError('Password should be at least 8 characters')
        return;
        // throw new Error("Password should be at least 8 character")
    }

    //req payload
    const data = {
        username: usernameVal,
        password: passwordVal,
    }

    
    try {
       const response = await fetch(baseUrl+'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            const resp = await response.json(); 
            displayError(resp.msg);
            return;
        }
        if(response.ok){
            const resp = await response.json();
            const setCookieHeader = response.headers.get('set-cookie');
            if(setCookieHeader){
                console.log(setCookieHeader)
                handleCookie(setCookieHeader)
            }
            displaysuccess(resp.msg)
            window.location.href = "../dashboard/dashboard.html"
            
            usernameVal = '',
            passwordVal = ''
            return;
        }
    } catch (error) {
        console.log(error)       
        // return;
        displayError(error.msg || "Something went wrong. Try again!")
        return;
    }
}