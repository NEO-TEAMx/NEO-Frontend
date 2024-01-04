// const baseUrl = 'https://neoprotocol.onrender.com/api/v1/';
const baseUrl = 'https://localhost:4040/api/v1';

function getCookie(name){
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null
}


async function fetchCurrentUser(){
    try {
        // const token = getCookie('access_token');
        // if(!token){
        //     window.location.href = '../html/signin.html'

        //     throw new Error("Token not found")
        // }
        const response = await fetch(baseUrl+'/show-me',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            // 'Authorization': `Bearer ${token}`            
        });
        if(!response.ok){
            return;
        }
        if(response.ok){
            const resp = await response.json();
            console.log(resp)
            console.log("jjj")
            return;
        }
    } catch (error) {
        // window.location.href = '../html/signin.html'
        console.log(error)
    }
}


document.addEventListener('DOMContentLoaded', fetchCurrentUser)
