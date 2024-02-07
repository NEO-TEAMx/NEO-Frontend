// const baseUrl = 'http://localhost:4040/api/v1/';
const baseUrl = 'https://neoprotocol.onrender.com/api/v1/';
const currentYear = new Date().getFullYear();
const year = document.querySelector("#currentYear");
year.innerText = currentYear;

function clearErrors(){
    const errMsg = document.getElementById('errorMsg');
    errMsg.textContent = '';
}

function displayError(msg){
    const errMsg = document.getElementById("errorMsg");
    errMsg.innerHTML += `<p class="text-center lead mb-4" >${msg}</p>`
    setTimeout(clearErrors,5000)
}    
function displaysuccess(msg){
    const errMsg = document.getElementById("successMsg");
    errMsg.innerHTML += `<p class="text-center lead mb-4" >${msg}</p>`
    setTimeout(clearErrors, 5000)
    
}

// function nextButton(){
//     console.log("btn clicked")
//     // throw Error("Clicked")
// }

function nextButton(){
    console.log("clicked")
   clearErrors();
    const amountInput = document.getElementById('amount');
    let amountVal = parseFloat(amountInput.value);
    const regex = /^[0-9.]+$/

    if(!amountVal){ 
        displayError("Amount is required!")
        return;
    }
    if(!regex.test(amountVal)){
        displayError("Amount must be a number!!")
        return;
    }
    const amount = Number(amountVal);
    if(isNaN(amountVal) || amount <=0){
        displayError("Please enter a valid deposit amount")
        return;
    }
    localStorage.setItem('withdrawalAmount', amount)
    // console.log(amount)
    window.location.href = "../dashboard/confirm-withdrawal.html"
    // window.location.href = "../dashboard/confirmation.html"
    return;
}

function loadData(){
    const storedNum = localStorage.getItem('withdrawalAmount')    
    const amount = parseFloat(storedNum);
    // const payable_amount = (total_amount * charge)/100;

    // user.total_balance -= total_amount;
    const charge = amount * (5/100);
    const payable = amount - charge;

    document.getElementById('wAmount').textContent = amount;
    document.getElementById('charge').textContent = charge;
    document.getElementById('payAmount').textContent = payable;
}

async function confirmPayment(){
    clearErrors();
    const addressInput = document.getElementById("walletAdd");
    let walletAddress = addressInput.value;

    if(await isAuthenticated()){
        const accessToken = localStorage.getItem('accessToken');
        const storedNum = localStorage.getItem('withdrawalAmount');
        const total_amount = parseFloat(storedNum);
        if(!walletAddress){
            displayError("Please provide a valid wallet address!")
        }
        try {
            const response = await fetch(baseUrl+'user/withdrawal',{
                method: 'POST',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
                credentials: 'include',
                body: JSON.stringify({total_amount,walletAddress})
            });
            if(response.status === 404){
                
                redirectToLogin()
            }
            if(!response.ok){
                const resp = await response.json();
                if(resp.msg === "No user with such id"){
                    
                    redirectToLogin()
                }
                if(resp.statusCode === 404){
                    
                    redirectToLogin()
                }

                displayError(resp.msg || 'Something went wrong. Try again!!')
                return;
            }
            if(response.ok){
                const resp = await response.json();
                displaysuccess("Your withdrawal request is being processed!!")
                localStorage.removeItem('amount')
                window.location.href = '../dashboard/dashboard.html'
                return;
            }   
        } catch (error) {
            console.log(error)
            displayError("Something went wrong. Please try again!")
            return;
        }
    }else{
        redirectToLogin();
        return;
    }
}