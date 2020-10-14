exports.showError = error =>{
    if(error.keyPattern){
        var message = "";

        var firstKey = Object.keys(error.keyPattern)[0];
        message = `there is problem in ${firstKey}`;
        return message;
    }
}