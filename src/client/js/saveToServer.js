const saveToServer = async (data) => {
    let response;
    if (parseFloat(toString(document.getElementById('temperature').innerHTML)) < 13.45) {
        const response = await fetch('/rainy', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });} else {
        const response = await fetch('/sunny', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }); 
    }
    try {
        const newData = await response.json();
        return newData;
    }
    catch (error) {
        console.log("Error while sending data to server.", error);
    }
}

export { saveToServer }
