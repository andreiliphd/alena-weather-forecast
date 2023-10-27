const saveToServer = async (data) => {
    const response = await fetch('/rain', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    }
    catch (error) {
        console.log("Error while sending data to server.", error);
    }
}

export { saveToServer }
