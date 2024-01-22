// const baseUrl = 'http://localhost:4040/api/v1/';
const baseUrl = 'https://neoprotocol.onrender.com/api/v1/';
const currentYear = new Date().getFullYear();
const year = document.querySelector("#currentYear");
year.innerText = currentYear;


// const amount = document.querySelector("#amount");
// const usdt = document.querySelector("#usdt");
const buyHash = document.querySelector("#buyHash");

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

function calcEquVal(){
    const hash_amount = parseFloat(document.getElementById('amount').value);
    const accessToken = localStorage.getItem('accessToken')
    
    fetch(baseUrl+'user/hash_equivalent',{
        method:  'POST',
        mode: 'cors',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'include',
        body: JSON.stringify({hash_amount})
    }).then(response =>response.json())
      .then(data =>{
        document.getElementById('usdt').innerText = data.equivalentVal
    });

}


buyHash.addEventListener("click", async() =>{
    clearErrors()   
    if (await isAuthenticated()) {
            const accessToken = localStorage.getItem('accessToken')
            const hash_amount = parseFloat(document.getElementById('amount').value);
        
            if(!hash_amount){
                displayError("Please input a valid amount")
                return;
            }
          try{
        
            
            const response = await fetch(baseUrl+'user/buy-hash',{
                method: "POST",
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
                credentials: 'include',
                body: JSON.stringify({hash_amount}),
            });
            if(!response.ok){
                const resp = await response.json();
                displayError(resp.msg || 'Something went wrong. Try again!!')
                return;
            }
            if(response.ok){
                const resp = await response.json();
                displaysuccess("You have successfully purchased hash!!")
                console.log(resp)
                window.location.href = '../dashboard/dashboard.html'
                return;
            }

          }catch(error){
            console.log(error)
            displayError("Something went wrong. Try again!!")
            return;
          }  
        } else {
            redirectToLogin()
        }
});
