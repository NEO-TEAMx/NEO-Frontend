// alert("working")
// const baseUrl = 'http://localhost:4040/api/v1/';
// const baseUrl = 'https://neoprotocol.onrender.com/api/v1/';
const currentYear = new Date().getFullYear();
const year = document.querySelector("#currentYear");
year.innerText = currentYear;
// const socket = io("http://localhost:4040",{
//     query:{

//     },
//     withCredentials:true,
//     extraHeaders: {
//         'Access-Contorl-Allow-Origin': 'http://localhost:8081'
//     }
// });

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
    let yield_percentagep = document.getElementById("percentage");
    let total_balancep = document.querySelector("#balance")
    let time = document.querySelector("#timer")
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


            const parsedDate = moment(yield_time);
            const formattedTime = parsedDate.format('HH:mm:ss')
            yield_balancep.textContent = yield_balance.toFixed(8),
            total_balancep.textContent = total_balance,
            yield_percentagep.textContent = Math.ceil(yield_percentage),
            hash_ratep.textContent = hash_rate.toFixed(6),
            time.textContent = yield_time === null ? "24:00:00" : formattedTime

        } catch (error) {
            console.log(error)
        }
    }else{
         redirectToLogin();
    }
}


// socket.on('startMining', (data)=>{
//     // console.log(msg)
//     console.log('Recieved updated data!', data)

//     let yield_balancep = document.querySelector("#yield_balance");
//     let hash_ratep = document.querySelector("#hash_rate");
//     let yield_percentagep = document.getElementById("percentage");
//     let total_balancep = document.querySelector("#balance")

//     yield_balancep.textContent = yield_balance,
//     total_balancep.textContent = total_balance
//     yield_percentagep.textContent = yield_percentage
//     hash_ratep.textContent = hash_rate
// });

// dashboard();
const startMiningBtn = document.querySelector('#start-mining-btn');
async function startMining(){
    if(await isAuthenticated()){
        const accessToken = localStorage.getItem('accessToken')

        const socket = io("http://localhost:4040",{
            query:{
                accessToken: accessToken                
            },
            withCredentials:true,
            extraHeaders: {
                'Access-Contorl-Allow-Origin': 'http://localhost:8081'
            }
        });
        console.log("minning start")
        startMiningBtn.textContent = 'Currently Mining';
        startMiningBtn.disabled = true;
        
        socket.emit("startMining");
        socket.on('startMining',(data) =>{
            console.log({data})
        });
    }else{
        return redirectToLogin();
    }
    // console.log("minning start")
    // socket.emit("startMining");
}
