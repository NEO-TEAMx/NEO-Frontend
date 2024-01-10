const baseUrl = 'http://localhost:4040/api/v1/';
// const baseUrl = 'https://neoprotocol.onrender.com/api/v1/';
const currentYear = new Date().getFullYear();
const year = document.querySelector("#currentYear");
year.innerText = currentYear;


const amount = document.querySelector("#amount");
const usdt = document.querySelector("#usdt");
const buyHash = document.querySelector("#buyHash");


buyHash.addEventListener("click", async() =>{
    console.log("hello")
});
