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
var ValidateForm = function(jsonFile) {
    return (ValidateCustomerName(jsonFile.customerName) &&)
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

var ValidateserviceNRIC = function(nric) {
    
}