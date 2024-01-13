const baseUrl = 'http://localhost:4040/api/v1/';
// const baseUrl = 'https://neoprotocol.onrender.com/api/v1/';
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

document.addEventListener('DOMContentLoaded', function() {
    const menu = document.querySelector("#navbar");
    const menuBtn = document.querySelector("#open-menu-btn");
    const closeBtn = document.querySelector("#close-menu-btn");
  
    menuBtn.addEventListener('click', () => {
      menu.style.display = "flex"
      closeBtn.style.display = "inline-block";
      menuBtn.style.display = "none";
    });
  
    closeBtn.addEventListener('click', () => {
      menu.style.display = "none";
      closeBtn.style.display = "none";
      menuBtn.style.display = "inline-block";
    });
  
    console.log("Contact script file linked successfully!");
  });
  
function calculateUSDTAmount(){
  const neo_amount = parseFloat(document.getElementById('neoAmount').value);
    fetch(baseUrl+'user/neo_equivalent',{
        method:  'POST',
        mode: 'cors',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        credentials: 'include',
        body: JSON.stringify({neo_amount})
    }).then(response =>response.json())
      .then(data =>{
        document.getElementById('usdtAmount').innerText = data.usdEqu
    });
}

async function swapANCtoUSDT(){
    if(await isAuthenticated()){
      const accessToken = localStorage.getItem('accessToken')
      const neo_amount = parseFloat(document.getElementById('neoAmount').value);
        
      if(!neo_amount){
        displayError("Please input a valid amount")
        return;            
      }

      try {
        const response = await fetch(baseUrl+'user/swap',{
          method: "POST",
          mode: 'cors',
          headers:{
              'Content-Type': 'application/json',
              'Authorization': accessToken
          },
          credentials: 'include',
          body: JSON.stringify({neo_amount}),
        });
        if(!response.ok){
          const resp = await response.json();
          displayError(resp.msg || 'Something went wrong. Try again!!')
          return;
        }
        if(response.ok){
          const resp = await response.json();
          displaysuccess("You have successfully converted your neo to usdt!!")
          console.log(resp)
          window.location.href = '../dashboard/dashboard.html'
          return;
        }
      } catch (error) {
        console.log(error)
        displayError("Something went wrong. Try again!!")
        return;
      }
    }else{
      redirectToLogin();
    }
}

    // fetching api
    // async function fetchANCtoUSDTPrice() {
    //   try {
    //     const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=anchor-protocol&vs_currencies=usd');
    //     const data = await response.json();
    //     const ancToUSDTPrice = data['anchor-protocol'].usd;
    //     return ancToUSDTPrice;
    //   } catch (error) {
    //     console.error('Failed to fetch ANC to USDT price:', error);
    //     return null;
    //   }
    // }
    

    // async function calculateUSDTAmount() {
    //   const ancAmount = parseFloat(document.getElementById('ancAmount').value);
    //   const ancToUSDTPrice = await fetchANCtoUSDTPrice();
    
    //   if (ancToUSDTPrice !== null) {
    //     const usdtAmount = ancAmount * ancToUSDTPrice;
    //     document.getElementById('usdtAmount').value = usdtAmount.toFixed(2);
    //   }
    // }
    
    // async function swapANCtoUSDT() {
    //   const ancAmountInput = document.getElementById('ancAmount');
    //   const ancAmount = parseFloat(ancAmountInput.value);
    //   const ancToUSDTPrice = await fetchANCtoUSDTPrice();
    
    //   // Check if ANC amount is valid
    //   if (isNaN(ancAmount) || ancAmount <= 0) {
    //     alert('Invalid ANC amount.');
    //     return;
    //   }
    
    //   // Get the yield balance
    //   const yieldBalance = parseFloat(document.getElementById('balance').textContent);
    
    //   // Check if the ANC amount is greater than the yield balance
    //   if (ancAmount > yieldBalance) {
    //     alert('Insufficient ANC balance.');
    //     return;
    //   }
    
      // // Calculate the USDT amount
      // const usdtAmount = ancAmount * ancToUSDTPrice;
    
      // // Simulating a delay to mimic the API call
      // await new Promise((resolve) => setTimeout(resolve, 2000));
    
      // // Simulating a successful swap
      // const swapResponse = {
      //   success: true,
      //   message: `Swapped ${ancAmount} ANC to ${usdtAmount.toFixed(2)} USDT. Yield balance updated.`,
      // };
    
      // Handle the swap response
    //   if (swapResponse.success) {
    //     // Update the yield balance
    //     const updatedBalance = yieldBalance - ancAmount;
    //     document.getElementById('balance').textContent = updatedBalance.toFixed(2);
    
    //     // Clear the ANC input field and disable the swap button
    //     ancAmountInput.value = '';
    //     document.getElementById('swapButton').disabled = true;
    
    //     alert(swapResponse.message);
    //   } else {
    //     // Handle swap failure
    //     alert('Swap failed. Please try again.');
    //   }
    // }








    
  // async function swapANCtoUSDT() {
  //   const ancAmountInput = document.getElementById('ancAmount');
  //   const ancAmount = parseFloat(ancAmountInput.value);
  //   const ancToUSDTPrice = await fetchANCtoUSDTPrice();
  
  //   // Check if ANC amount is valid
  //   if (isNaN(ancAmount) || ancAmount <= 0) {
  //     alert('Invalid ANC amount.');
  //     return;
  //   }
  
    // // Get the yield balance
    // const yieldBalance = parseFloat(document.getElementById('balance').textContent);
  
    // // Check if the ANC amount is greater than the yield balance
    // if (ancAmount > yieldBalance) {
    //   alert('Insufficient ANC balance.');
    //   return;
    // }
  
  //   // Calculate the USDT amount
  //   const usdtAmount = ancAmount * ancToUSDTPrice;
  
  //   // Simulate the swap action by deducting ANC from yield balance and adding USDT
  //   const updatedBalance = yieldBalance - ancAmount;
  //   document.getElementById('balance').textContent = updatedBalance.toFixed(2);
  
  //   // Clear the ANC input field and disable the swap button
  //   ancAmountInput.value = '';
  //   document.getElementById('swapButton').disabled = true;
  
  //   alert(`Swapped ${ancAmount} ANC to ${usdtAmount.toFixed(2)} USDT. Yield balance updated.`);
  // }
  

  // console.log("Contact script file linked successfully!");