
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
    let time = document.querySelector("#timer");
    const startMiningBtn = document.querySelector('#start-mining-btn');
    // console.log("dahsboard")
    
    if(await isAuthenticated()){
        const accessToken = getCookie("accessToken")
        const refreshToken = getCookie("refreshToken")
        
        try {
            const response = await fetch(baseUrl+'user/dashboard', {
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'AccessToken': accessToken,
                    'Refresh_Token': refreshToken,
                },
                credentials: 'include',
            });
            
            const data = await response.json();
            
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
            
            
            
            const {
                hash_rate,
                total_balance,
                yield_balance,
                yield_percentage,
                yield_time,
                mining_status
            } = data.user;


            const parsedDate = moment(yield_time);
            const formattedTime = parsedDate.format('HH:mm:ss')
            yield_balancep.textContent = yield_balance.toFixed(8),
            total_balancep.textContent = total_balance,
            yield_percentagep.textContent = Math.ceil(yield_percentage),
            hash_ratep.textContent = hash_rate === 0 ? hash_rate.toFixed(4) : hash_rate.toFixed(7),
            time.textContent = yield_time === null ? "24:00:00" : formattedTime

            
            if( mining_status){
                startMiningBtn.textContent = 'Currently Mining';
                startMiningBtn.disabled = true;
            }else{
                startMiningBtn.textContent = 'Start Mining';
                startMiningBtn.disabled = false;
                yield_percentagep.textContent = 0
            }

        } catch (error) {
            console.log(error)
            return error;
        }
    }else{
         redirectToLogin();
    }
}

window.onload = dashboard;

const startMiningBtn = document.querySelector('#start-mining-btn');
async function startMining(){

    let yield_balancep = document.querySelector("#yield_balance");
    let time = document.querySelector("#timer");
    let yield_percentagep = document.getElementById("percentage");

    if(await isAuthenticated()){
        const accessToken = getCookie("accessToken")
        
        const socket = io('https://neoprotocol.onrender.com',{
        // const socket = io("http://localhost:4040",{
            query:{
                accessToken: accessToken                
            },
            withCredentials:true,
            extraHeaders: {
                'Access-Contorl-Allow-Origin': 'https://https://neoprotocol.netlify.app'

                // 'Access-Contorl-Allow-Origin': 'http://localhost:8081'
            }
        });
        if( socket.emit("startMining")){
            socket.emit("startMining")
            startMiningBtn.textContent = 'Currently Mining';
            startMiningBtn.disabled = true;
        }else{
            startMiningBtn.textContent = 'Start Mining';
            startMiningBtn.disabled = false;
        }
        
        // socket.emit("startMining")
        
        socket.on('miningData',(data) =>{
            // console.log({data})
            const {
                yield_balance,
                yield_percentage,
                yield_time
            } = data;
            const parsedDate = moment(yield_time);
            const formattedTime = parsedDate.format('HH:mm:ss')

            yield_balancep.textContent = yield_balance.toFixed(8), 
            yield_percentagep.textContent = yield_percentage
            time.textContent = formattedTime
            
        });

    }else{
        return redirectToLogin();
    }
}
