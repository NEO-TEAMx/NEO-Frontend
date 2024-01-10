// const baseUrl = 'https://neoprotocol.onrender.com/api/v1/';
const baseUrl = 'http://localhost:4040/api/v1/';
const currentYear = new Date().getFullYear();
const year = document.querySelector("#currentYear");
const forgotPassword = document.querySelector("#forgotPassword");

year.innerText = currentYear;

function clearErrors(){
    const errMsg = document.getElementById('errorMsg');
    const successMsg = document.getElementById('successMsg')
    errMsg.textContent = '';
    successMsg.textContent = 
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

function setToken(val, expDur){
    localStorage.setItem('accessToken', val)
    localStorage.setItem('expires', expDur)
}

// function getToken

async function submitSignupForm(){
    const usernameInput = document.querySelector("#username");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const confirmPasswordInput = document.querySelector("#confirmPassword");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let usernameVal = usernameInput.value;
    let emailVal = emailInput.value;
    let passwordVal = passwordInput.value;
    let confirmPasswordVal = confirmPasswordInput.value

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
            body: JSON.stringify(data),
            credentials: 'include'
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
            
            const accessToken = response.headers.get('Authorization')
            console.log(accessToken)
            
            const expiraionTime = Date.now() + 2 * 24 *60 * 60 * 1000;
            console.log(expiraionTime)
            setToken(accessToken, expiraionTime)
            displaysuccess(resp.msg)
            window.location.href = "../dashboard/dashboard.html"
            
            usernameVal = '',
            emailVal = '',
            passwordVal = '',
            confirmPasswordVal = ''
            return  true;
        }else{
            return false;
        }
        
    } catch (error) {
        console.log(error)    
        // return;
        displayError(error.message || 'SomeThing went wrong!!')
    }
}

async function submitLoginForm(){
    const usernameInput = document.querySelector("#item");
    const passwordInput = document.querySelector("#password");
    
    let usernameVal = usernameInput.value;
    let passwordVal = passwordInput.value;
    
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
            body: JSON.stringify(data),
            credentials:'include'
        });
        
        if(!response.ok){
            const resp = await response.json(); 
            displayError(resp.msg);
            return;
        }
       
        if(response.ok){
            const resp = await response.json();
            
            const accessToken = response.headers.get('Authorization')
        
            console.log(accessToken)
            const expiraionTime = Date.now() + 2 * 24 *60 * 60 * 1000;
            setToken(accessToken, expiraionTime)
            
            displaysuccess(resp.msg)
            window.location.href = "../dashboard/dashboard.html"
            
            usernameVal = '',
            passwordVal = ''
            
            return;
        }
    } catch (error) {
        console.log(error)       
        displayError(error.msg || "Something went wrong. Try again!")
        return;
    }
}

forgotPassword.addEventListener('click', async()=>{
    const emailInput = document.querySelector('#email');
    let emailVal = emailInput.value;

    // if(!emailVal){
    //     displayError("Please provide a registered email")
    // }
    const data = {
        email: emailVal
    }

    try {
        const response = await fetch(baseUrl+'forget-password',{
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
            displaysuccess(resp.msg||"Reset password link have been sent to your email")
            
            return;
        }   
        emailVal = ''     
    } catch (error) {
        console.log(error)
        displayError("Something went wrong!")
    }
});