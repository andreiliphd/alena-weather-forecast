const getImage = async (incoming) => {    
    const res = await fetch('https://pixabay.com/api/?category=travel' + '&key=' + process.env.pixabay + '&q=' + incoming['location']); 
    try {
        const data = await res.json();
        console.log(data);
        incoming['img'] = data.hits[0].userImageURL;
        return incoming;
    } catch (error) {
        console.log("error",error);
        return false;
    }
}

export { getImage }