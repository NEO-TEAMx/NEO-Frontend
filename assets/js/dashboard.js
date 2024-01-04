const baseUrle = 'http://localhost:4040/api/v1/';
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

    console.log("dahsboard")
    try {
        const response = await fetch(baseUrle+'user/dashboard', {
            method: 'GET',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}


dashboard();


