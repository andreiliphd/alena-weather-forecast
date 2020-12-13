// checkForName function checks that data entered into the field is correct
function checkForName(inputText) {
    console.log('::: Running checkForName :::', inputText);
    // Using regex to check the data
    var reg = /^[A-Za-z\s]+$/;
    console.log('Regex test is running!');
    // Regex test
    if (!reg.test(inputText + "\n")) {
        // Giving user an information that entered data was not correct.
        document.getElementById('location').innerHTML = 'Please, enter correct request.';
        return false;
    };  
    return true;
}

export { checkForName }
