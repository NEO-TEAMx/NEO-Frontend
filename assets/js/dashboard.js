// const baseUrl = 'http://localhost:4040/api/v1/';
const baseUrl = 'https://neoprotocol.onrender.com/api/v1/';
const currentYear = new Date().getFullYear();
const year = document.querySelector("#currentYear");

year.innerText = currentYear;

dashboard();

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
}    
function displaysuccess(msg){
    const errMsg = document.getElementById("successMsg");
    errMsg.innerHTML += `<p class="text-center lead mb-4" >${msg}</p>`
    setTimeout(clearErrors, 4000)
    
}


async function dashboard(){
    clearErrors();
    let yield_balancep = document.querySelector("#yield_balance");
    let hash_ratep = document.querySelector("#hash_rate");
    // let hash_ratep = document.getElementById("hash_rate");
    let yield_percentagep = document.getElementById("percentage");
    // let yield_percentagep = document.querySelector("#percentage");
    let total_balancep = document.querySelector("#balance")
    // console.log("dahsboard")

    // console.log(total_balancep.textContent = 400)
    // console.log(hash_ratep.textContent = 10)
    // console.log(yield_percentagep.textContent = 20)
    // console.log(yield_balancep.text)
    // console.log(hash_ratep)
    // console.log(yield_percentagep)
    if(await isAuthenticated()){
        const accessToken = localStorage.getItem('accessToken')
        try {
            const response = await fetch(baseUrl+'user/dashboard', {
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
                credentials: 'include',
            });
            const data = await response.json();
            // console.log(data.user)
            const {
                hash_rate,
                total_balance,
                yield_balance,
                yield_percentage,
                yield_time
            } = data.user;

            
            yield_balancep.textContent = yield_balance,
            total_balancep.textContent = total_balance
            yield_percentagep.textContent = yield_percentage
            hash_ratep.textContent = hash_rate

        } catch (error) {
            console.log(error)
        }
    }else{
         redirectToLogin();
    }
}


// dashboard();


