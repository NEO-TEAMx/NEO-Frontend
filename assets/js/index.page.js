
// const baseUrl = 'https://neoprotocol.onrender.com/api/v1/';
const baseUrl = 'http://localhost:4040/api/v1/';
const currentYear = new Date().getFullYear();
const year = document.querySelector("#currentYear");
const forgotPassword = document.querySelector("#forgotPassword");

year.innerText = currentYear;

function clearErrors(){
    const errMsg = document.getElementById('errorMsg');
    const successMsg = document.getElementById('successMsg')
    errMsg.textContent = '',
    successMsg.textContent =  ''
}

function displayError(msg){
    const errMsg = document.getElementById("errorMsg");
    errMsg.innerHTML += `<p class="text-center lead mb-4" >${msg}</p>`
    setTimeout(clearErrors, 7000)
    // const errorElement = document.getElementById(elementId);
    // errorElement.textContent = msg;
    // errorElement.style.display = 'block';
}
function displaysuccess(msg){
    const errMsg = document.getElementById("successMsg");
    errMsg.innerHTML += `<p class="text-center lead mb-4" >${msg}</p>`
    setTimeout(clearErrors, 7000)
    // const errorElement = document.getElementById(elementId);
    // errorElement.textContent = msg;
    // errorElement.style.display = 'block';
}

function setToken(val, expDur){
    localStorage.setItem('accessToken', val)
    localStorage.setItem('expires', expDur)
}

function getRefCode(){
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get("referralCode")
}

// function getToken

async function submitSignupForm(){
    const usernameInput = document.querySelector("#username");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const confirmPasswordInput = document.querySelector("#confirmPassword");
    const urlParams =  new URLSearchParams( window.location.search)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formp = document.querySelector(".form");
    const btn = document.querySelector(".btn");

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
    const referralCode = getRefCode();

    //req payload
    const data = {
        username: usernameVal,
        email: emailVal,
        password: passwordVal,
        confirmPassword: confirmPasswordVal,
        referralCode
    }

    // const referralCode = urlParams.get("referralCode")

    btn.textContent = 'Please wait.....';
    btn.disabled = true;
    formp.disabled = true;

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
            displayError(resp.msg || 'Something went wrong!');
            
            btn.textContent = 'Sign up';
            btn.disabled = false;
            formp.disabled = false;
            return;
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
            
            const expiraionTime = Date.now() + 2 * 24 *60 * 60 * 1000;
            
            setToken(accessToken, expiraionTime)
            displaysuccess(resp.msg)
            window.location.href = "../dashboard/dashboard.html"
            
            usernameVal = '',
            emailVal = '',
            passwordVal = '',
            confirmPasswordVal = ''

            btn.textContent = 'Sign up';
            btn.disabled = false;
            formp.disabled = false;
           
            return  true;
        }else{
            return false;
        }
        
    } catch (error) {
        console.log(error)    
        btn.textContent = 'Sign up';
        btn.disabled = false;
        formp.disabled = false;
        // return;
        displayError(error.message || 'SomeThing went wrong!!')
    }
}

async function submitLoginForm(){
    const usernameInput = document.querySelector("#item");
    const passwordInput = document.querySelector("#password");
    const formp = document.querySelector(".form");
    const btn = document.querySelector(".btn");

    let usernameVal = usernameInput.value;
    let passwordVal = passwordInput.value;
    
    clearErrors();
    // validate inputs
    if(!usernameVal || !passwordVal){
        displayError('Please provide the needed value(s)')
        return;
    }

    if(passwordVal.length < 8){
        displayError('Password should be at least 8 characters')
        return;
    }

    //req payload
    const data = {
        username: usernameVal,
        password: passwordVal,
    }

    btn.textContent = 'Please wait.....';
    btn.disabled = true;
    formp.disabled = true;

    
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
            btn.textContent = 'Sign up';
            btn.disabled = false;
            formp.disabled = false;
            return;
        }
       
        if(response.ok){
            const resp = await response.json();
            
            const accessToken = response.headers.get('Authorization')
        
            
            const expiraionTime = Date.now() + 2 * 24 *60 * 60 * 1000;
            setToken(accessToken, expiraionTime)
            btn.textContent = 'Sign up';
            btn.disabled = false;
            formp.disabled = false;
            
            displaysuccess(resp.msg)
            window.location.href = "../dashboard/dashboard.html"
            
            usernameVal = '',
            passwordVal = ''
            
            return;
        }
    } catch (error) {
        console.log(error)       
        btn.textContent = 'Sign up';
        btn.disabled = false;
        formp.disabled = false;
        displayError(error.msg || "Something went wrong. Try again!")
        return;
    }
}

forgotPassword.addEventListener('click', async()=>{

    clearErrors();
    const emailInput = document.querySelector('#email');
    let emailVal = emailInput.value;

    if(!emailVal){
        displayError("Please provide a registered email")
    }
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
            window.location.href = '../html/password-reset-done'
            return;
        }   
        emailVal = ''     
    } catch (error) {
        console.log(error)
        displayError("Something went wrong!")
    }
});

async function resetPassword(){
    clearErrors();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    const urlParams = new URLSearchParams(window.location.search);

    const email = urlParams.get("email");
    const token = urlParams.get("token");

    if(!password || !confirmPassword){
        displayError("Please provide the needed credential(s)")
        return;
    }
    if(password.length < 8){
        displayError('Password should be at least 8 characters')
        return;
        // throw new Error("Password should be at least 8 character")
    }
    if(password !== confirmPassword){
        displayError("Password must match confirm password")
        return;
    }
    const data = {email,token,password,confirmPassword}
    try{
        const response = await fetch(baseUrl+'reset-password',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        if(!response.ok){
            const resp = await response.json(); 
            displayError(resp.msg || 'Something went wrong!');
            return;
        }
        if(response.ok){
            const resp = await response.json();
            displaysuccess(resp.msg || "You have successfully changed your password!! Proceed to login to your account");
            password = "",
            confirmPassword = ""
        }
    }catch(err){
        displayError("Something went wrong. Try again!!")
        console.log(err)
    }
}

async function logoutFunc(){
    if(await isAuthenticated()){
        const accessToken = localStorage.getItem("accessToken")

        try {
            const response = await fetch(baseUrl+'logout', {
                method: 'DELETE',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
                credentials: 'include'
            });
            if(response.status === 404){
                
                redirectToLogin()
            }
            if(!response.ok){
                const resp = await response.json();
                if(resp.msg === "No user with such id"){
                    
                    redirectToLogin()
                }
                if(resp.msg === "No user with such id"){
                    
                    redirectToLogin()
                }
                if(resp.statusCode === 404){
                    
                    redirectToLogin()
                }

                displayError('Something went wrong. Try again!!')
                return;
            }
            if(response.ok){
                const resp = await response.json();
                // displaysuccess(resp.msg || "Logged out")
                localStorage.clear();
                window.location.href = "../html/signin.html"
            }
        } catch (error) {
            console.log(error)
            redirectToLogin()
            displayError("Error occurred. Try again")
        }
    }else{
        redirectToLogin();
    }
    // try {
    // //     console.log('Clicked')
    //     const response = await fetch(baseUrl+'logout', {
    //       method: 'DELETE',
    //     });
    //     const data = await response.json()
    //     console.log(data)
    // } catch (error) {
    //     console.log(error);
    // }    
    // console.log('Clicked')
}
  