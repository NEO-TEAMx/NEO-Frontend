// const baseUrl = 'http://localhost:4040/api/v1/';
const baseUrl = 'https://neoprotocol.onrender.com/api/v1/';
const currentYear = new Date().getFullYear();
const year = document.querySelector("#currentYear");
year.innerText = currentYear;



// referral();

async function referral(){
    let copy = document.querySelector(".refLink");
    const tablebody = document.querySelector("#refTable tbody")
    // console.log(tablebody)
    if(await isAuthenticated()){
        const accessToken = localStorage.getItem("accessToken")

        try {
            console.log("level1")
            const response = await fetch(baseUrl+'user/referral',{
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
                credentials:'include'
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
                
            }
            if(response.ok){
                const data = await response.json();
                const {
                    refLink,
                    referralData
                } = data

                copy.value = refLink
                console.log(referralData)
                if(referralData.length === 0){
                    const emptyRow = document.createElement('tr')
                    const emptyCell = document.createElement('td')
                    emptyCell.setAttribute('colspan', 2)
                    emptyCell.textContent = "You have not referred any user"
                    emptyRow.appendChild(emptyCell)
                    emptyCell.appendChild(emptyRow)
                }else{

                    referralData.forEach(data => {
                        const row = document.createElement("tr");
                        const display = ["username", "commission"]
                        display.forEach(column =>{
                            const cell = document.createElement("td");
                            cell.textContent = data[column];
                            row.appendChild(cell)
                        });
                        tablebody.appendChild(row)
                    });
                }    
            }
        } catch (error) {
            console.log(error)
        }
    }else{
        redirectToLogin();
        // redirectToLogin()
    }

}


window.onload = referral;