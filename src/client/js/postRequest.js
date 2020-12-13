// getAPI function getting data from the server using server API
async function getAPI(sendData) {
    const request = await fetch('/weather', {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendData),      
    });
    // Async try catch block
    try {
        const response = await request.json();
        return response;
    } catch(error) {
        console.log("error", error);
    }
};      

export { getAPI }

