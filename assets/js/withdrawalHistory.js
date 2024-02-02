// const baseUrl = 'http://localhost:4040/api/v1/';
const baseUrl = 'https://neoprotocol.onrender.com/api/v1/';
const currentYear = new Date().getFullYear();
const year = document.querySelector("#currentYear");
year.innerText = currentYear;


async function withdrawalHistory(){

    const tablebody = document.querySelector("#witHistory tbody")
    // console.log(tablebody)
    if(await isAuthenticated()){
        const accessToken = localStorage.getItem("accessToken")

        try {
            
            const response = await fetch(baseUrl+'user/withdrawal-history',{
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
                    withdrawal    
                } = data

                // console.log(data)
                if(data.msg === "Withdrawal history is empty"){
                    const emptyRow = document.createElement('tr')
                    const emptyCell = document.createElement('td')
                    emptyCell.setAttribute('colspan', 4)
                    emptyCell.textContent = "Withdrawal History is empty"
                    emptyRow.appendChild(emptyCell)
                    tablebody.appendChild(emptyRow)
                    // emptyCell.appendChild(emptyRow)
                }else{

                    withdrawal.forEach(data => {
                        const row = document.createElement("tr");
                        const display = ["date", "transaction_id", "amount", "approved"]
                        display.forEach(column =>{
                            const cell = document.createElement("td");
                            cell.textContent = column === 'date' ? formattedTime : column === 'approved' ? (data[column] ? 'Approved' : 'Pending') : data[column];
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


window.onload = withdrawalHistory;