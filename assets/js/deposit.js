const baseUrl = 'http://localhost:4040/api/v1/';
// const baseUrl = 'https://neoprotocol.onrender.com/api/v1/';
const currentYear = new Date().getFullYear();
const year = document.querySelector("#currentYear");
const confirmPayment = document.querySelector("#confirmPayment");
const amountInput = document.getElementById('amount');
const amount = parseFloat(amountInput.value);

year.innerText = currentYear;


confirmPayment.addEventListener("click", async()=>{
    try {
        const response = await fetch(baseUrl+'/deposit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.ok){
            const resp = response.json()
            console.log(resp)
        } 
        console.log("Clicked")
    } catch (error) {
        console.log(error)
    }
});

// function handleFormSubmit(event) {
//   event.preventDefault();

//   // Retrieve the entered amount from the input field
//   const amountInput = document.getElementById('amount');
//   const amount = parseFloat(amountInput.value);
//   const paymentLimit = 50;

//   if (amount < paymentLimit) {
//     // Create the payment limit message
//   //   const limitMessage = document.createElement('div');
//   //   limitMessage.classList.add('alert');
//   //   limitMessage.classList.add('alert-danger');
//   //   limitMessage.textContent = 'Please follow the payment limit.';
//   //   limitMessage.style.color = 'red'; // Set the text color to red
//   //   limitMessage.style.position = 'absolute'; // Set the positioning to absolute
//   //   limitMessage.style.top = '14px'; // Position the message vertically in the middle
//   //   limitMessage.style.transform = 'translateY(-50%)'; // Adjust the vertical positioning
//   //   limitMessage.style.left = '0'; // Position the message horizontally to the left
//   //   limitMessage.style.right = '0'; // Position the message horizontally to the right
//   //   limitMessage.style.textAlign = 'center'; // Center the text within the message


    

//   //   // Append the message to the modal container
//      modal.appendChild(limitMessage);
//    } else {
//   //  Store the amount in local storage
//      localStorage.setItem('amount', amount);

//     // Redirect the user to the confirmation page
//     window.location.href = 'confirmation.html';
//   }
// }

// // Event listener for form submission
// form.addEventListener('submit', handleFormSubmit);