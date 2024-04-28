function startProgressBarAnimation() {
          const progressBar = document.querySelector('.progress-circle');
          let progress = 0;

          // Start the progress animation
          const interval = setInterval(() => {
            progress += 5; // Increment progress
            progressBar.style.strokeDasharray = `${progress}, 100`;
            if (progress >= 100) {
              progress = 0; 
            }
          }, 10); 
};

function showPreloader(){
    document.querySelector(".spinner").style.display = 'block';
    document.querySelector(".mining-section").style.display = "none";
    document.body.classList.add("overlay")
}

function hidePreloader(){
    document.querySelector(".spinner").style.display = 'none';
    document.querySelector(".mining-section").style.display = "block";
    document.body.classList.remove("overlay")
    
}

async function dashboard(){
    // clearErrors();
    let yield_balancep = document.querySelector("#yield_balance");
    let hash_ratep = document.querySelector("#hash_rate");
    let yield_percentagep = document.getElementById("percentage");
    let total_balancep = document.querySelector("#balance")
    let time = document.querySelector("#timer");
    const startMiningBtn = document.querySelector('#start-mining-btn');
    const progressBar = document.querySelector(".progress-circle")
    let progress = 0;

    if(await isAuthenticated()){
        const accessToken = getCookie("accessToken")
        const refreshToken = getCookie("refreshToken")
        
        try {
            showPreloader();
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

            window.onbeforeunload = function(){
                if(mining_status){
                    return 'Mining is in progress. Are you sure you want to leave?'
                }
            }
            
            const parsedDate = moment(yield_time);
            const formattedTime = parsedDate.format('HH:mm:ss')
            yield_balancep.textContent = yield_balance.toFixed(8),
            total_balancep.textContent = total_balance.toFixed(5),
            yield_percentagep.textContent = Math.ceil(yield_percentage),
            hash_ratep.textContent = hash_rate === 0 ? hash_rate.toFixed(4) : hash_rate.toFixed(7),
            time.textContent = yield_time === null ? "24:00:00" : formattedTime
            
            setTimeout(function(){
                hidePreloader();
            },3500)

            if( mining_status){
                startMiningBtn.textContent = 'Currently Mining';
                startMiningBtn.disabled = true;
                let interval = setInterval(() =>{
                    progress += 5;
                    progressBar.style.strokeDasharray = `${progress}, 100`;
                    if(progress >= 100){
                        progress = 0;
                        // clearInterval(interval)
                    }
                },10)            
            }else{
                startMiningBtn.textContent = 'Start Mining';
                startMiningBtn.disabled = false;
                yield_percentagep.textContent = 0
                let interval = setInterval(() =>{
                    progress += 5;
                    progressBar.style.strokeDasharray = `${progress}, 100`;
                    if(progress >= 100){
                        progress = 0;
                        clearInterval(interval)
                    }
                },10)
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
    const progressBar = document.querySelector(".progress-circle")
    let progress = 0;
    

    if(await isAuthenticated()){
        const accessToken = getCookie("accessToken")
        
        // const socket = io('https://neoprotocol.onrender.com',{
        const socket = io("http://localhost:4040",{
            query:{
                accessToken: accessToken                
            },
            withCredentials:true,
            extraHeaders: {
                // 'Access-Contorl-Allow-Origin': 'https://neo-protocol.com'

                'Access-Contorl-Allow-Origin': 'http://localhost:8081'
            }
        });
        if( socket.emit("startMining")){
            socket.emit("startMining")
            startMiningBtn.textContent = 'Currently Mining';
            startMiningBtn.disabled = true;
            const interval = setInterval(() =>{
                progress += 5;
                progressBar.style.strokeDasharray = `${progress}, 100`;
                if(progress >= 100){
                    progress = 0;
                    // clearInterval(interval)
                }
            },10)
        
        }else{
            startMiningBtn.textContent = 'Start Mining';
            startMiningBtn.disabled = false;
            let interval = setInterval(() =>{
                progress += 5;
                progressBar.style.strokeDasharray = `${progress}, 100`;
                if(progress >= 100){
                    progress = 0;
                    clearInterval(interval)
                }
            },10)
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
            const formattedTime = parsedDate == "Invalid date" ? "00:00:00" : parsedDate.format('HH:mm:ss')

            yield_balancep.textContent = yield_balance.toFixed(8), 
            yield_percentagep.textContent = yield_percentage
            time.textContent = formattedTime == "Invalid date" ? "00:00:00" : formattedTime
            
        });

    }else{
        return redirectToLogin();
    }
}
