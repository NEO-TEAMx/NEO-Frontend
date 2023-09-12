// Get the modal element
const modal = document.getElementById('exampleModal');

// Get the button that opens the modal
const openButton = document.querySelector('.btn.deposit');

// Get the close button inside the modal
const closeButton = document.querySelector('.btn-close');

// Get the close button inside the modal
const closeBtn = document.querySelector('.close');

// Get the form element
const form = document.getElementById('confirmation-form');

// Function to open the modal
function openModal() {
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
}

// Event listener to open the modal
openButton.addEventListener('click', openModal);

// Event listener to close the modal
closeButton.addEventListener('click', closeModal);

// Close the modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Event listener to close the modal
closeBtn.addEventListener('click', closeModal);

// Close the modal when pressing the Escape key
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Function to handle the form submission
function handleFormSubmit(event) {
  event.preventDefault();

  // Retrieve the entered amount from the input field
  const amountInput = document.getElementById('amount');
  const amount = parseFloat(amountInput.value);
  const withdrawaLimit = "unlimited";

  if (amount < withdrawaLimit) {
    // Create the payment limit message
    const limitMessage = document.createElement('div');
    limitMessage.classList.add('alert');
    limitMessage.classList.add('alert-danger');
    limitMessage.textContent = 'Please follow the payment limit.';
    limitMessage.style.color = 'red'; // Set the text color to red
    limitMessage.style.position = 'absolute'; // Set the positioning to absolute
    limitMessage.style.top = '14px'; // Position the message vertically in the middle
    limitMessage.style.transform = 'translateY(-50%)'; // Adjust the vertical positioning
    limitMessage.style.left = '0'; // Position the message horizontally to the left
    limitMessage.style.right = '0'; // Position the message horizontally to the right
    limitMessage.style.textAlign = 'center'; // Center the text within the message


    

    // Append the message to the modal container
    modal.appendChild(limitMessage);
  } else {
    // Store the amount in local storage
    localStorage.setItem('amount', amount);

    // Redirect the user to the confirmation page
    window.location.href = 'confirm-withdrawal.html';
  }
}

// Event listener for form submission
form.addEventListener('submit', handleFormSubmit);
