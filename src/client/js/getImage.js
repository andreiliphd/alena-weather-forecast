const getImage = async (incoming) => {    
    console.log("getImage");
    console.log(incoming);
    try {
        const res = await fetch('https://api.unsplash.com/search/photos?query=' + incoming['location'] + '&client_id=y9qmhW-78MRf7O9A8AO1ShX-cbXTIdEaeDIXcjy-45k'); 
    } catch (error) {
        console.log(error);
    }
    
    try {
        const data = await res.json();
        console.log(data);
        incoming['img'] = data.results[4].urls.small;
        return incoming;
    } catch (error) {
        console.log("error",error);
        return false;
    }
}

export { getImage }