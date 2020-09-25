const { json } = require("express");
const https = require('https');
const userModel = require('./models/user');
const axios     = require('axios');

/*
    jsonFile {
        "customerName"          : "",
        "cusomterAge"           : int,
        "serviceOfficerName"    : "",
        "NRIC"                  : "",
        "registrationTime"      : "",
        "branchCode"            : int,
        "image"                 : blob,
        "productType"           : [""]
    }
*/
var SendForm = function(jsonFile) {
    var formCheck = ValidateForm(jsonFile);

    if(formCheck) {
        const data = jsonFile;
        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
        axios.post('http://techtrek2020.ap-southeast-1.elasticbeanstalk.com/validateForm', data, config)
        .then((res) => {
            console.log();
        }).catch((err) => {
            console.error(err);
        });
    }

}

var ValidateForm = function(jsonFile) {
    return (ValidateName(jsonFile.customerName) && ValidateCustomerAge(jsonFile.customerAge) && ValidateNRIC(jsonFile.NRIC) && ValidateRegistrationTime(jsonFile.registrationTime) && ValidateImage(jsonFile.image) && ValidateProductType(jsonFile.productType));
};

var ValidateName = function(name) {
    if(name.length > 64) {
        return false;
    }
    return true;
};

var ValidateCustomerAge = function(age) {
    if(age < 18) {
        return false;
    }
};

var ValidateNRIC = function(nric) {
    var numCount = 0;
    for(var i = 0; i < nric.length; i++) {
        var nricChar = nric.charAt(i);
        if(nricChar >= '0' && nricChar <= '9') {
            numCount++
        }
    }

    //Check if there is 7 numeric number
    if(numCount != 7) {
        return false;
    }
    return true;
};

var ValidateRegistrationTime = function(registrationTime) {
    // DD/MM/YYY HH:mm:ss
};

var ValidateImage = function(image) {

};

var ValidateProductType = function(array) {
    //array = array[string]
};