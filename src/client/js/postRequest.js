async function getAPI(sendData) {
    const request = await fetch('/sentiment', {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendData),      
    });

    try {
        const response = await request.json();
        console.log(response);
        return response;
    } catch(error) {
        console.log("error", error);
    }
};      

export { getAPI }

