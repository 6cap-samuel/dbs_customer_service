const { json } = require("express");
const https = require('https');
const userModel = require('./models/user');
const axios     = require('axios');

/*
    jsonFile {
        "username"              : "",
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

    var user = userModel.getUser(jsonFile.username);

    if(formCheck) {
        const data = jsonFile;
        let config = {
            headers: {
                Authorization: 'Bearer ' + user.authorization_token,
            }
        }
        axios.post('http://techtrek2020.ap-southeast-1.elasticbeanstalk.com/validateForm', data, config)
        .then((res) => {
            console.log(res.data);
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
    var splitDateTime = registrationTime.split(" ");
    if(splitDateTime.length != 2) {
        return false;
    }
    var date = splitDateTime[0];
    var time = splitDateTime[1];

    var dateSplit = date.split('/');
    var day = parseInt(dateSplit[0]);
    var month = parseInt(dateSplit[1]);
    var year = parseInt(dateSplit[2]);
    var timeSplit = time.split(':');
    var hour = parseInt(timeSplit[0]);
    var minute = parseInt(timeSplit[1]);
    var second = parseInt(timeSplit[2]);

    if(month < 1 || month > 12) {
        return false;
    }
    //Check for 31st
    else if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        if(day < 1 || day > 31) {
            return false;
        }
    }
    else if(month == 4 || month == 6  || month == 9  || month == 11) {
        if(day < 1 || day > 30) {
            return false;
        }
    }
    //Feb
    else {
        if (((year % 4 == 0) && (year % 100!= 0)) || (year % 400 == 0)) {
            if(day < 1 || day > 29) {
                return false;
            }
        }
        else {
            if(day < 1 || day > 28) {
                return false;
            }
        }
    }

    if(hour < 0 || hour > 23) {
        return false;
    }
    else if(minute < 0 || minute > 60) {
        return false;
    }
    else if(second < 0 || second > 60) {
        return false;
    }
};

var ValidateImage = function(image) {
    //Image is in blob
    //Do later
};

var ValidateProductType = function(array) {
    //array = array[string]
    for( str of array) {
        if(typeof str != "string") {
            return false;
        }
    }
    return true;
};