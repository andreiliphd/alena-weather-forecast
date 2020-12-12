function checkForName(inputText) {
    console.log('::: Running checkForName :::', inputText);
    var reg = /^[A-Za-z\s]+$/;
    console.log('Regex test is running!');
    if (!reg.test(inputText + "\n")) {
        document.getElementById('location').innerHTML = 'Please, enter correct request.';
        return false;
    };  
    return true;
}

export { checkForName }
