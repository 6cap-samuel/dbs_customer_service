import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CustomerResult } from 'src/app/entities/customer-result'
import { Product } from 'src/app/entities/product';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})

export class CustomerFormComponent implements OnInit {

  constructor(protected http: HttpClient) { 
  }

  private readonly IPADDRESS: string = "http://localhost:3000"
  private readonly CUSTOMERPRODUCTENDPOINT: string = this.IPADDRESS +  "/validate"
  private readonly CUSTOMERNAME: string = "customerName"
  private readonly CUSTOMERAGE: string = "customerAge"
  private readonly SERVICEOFFICERNAME: string = "serviceOfficerName"
  private readonly NRIC: string = "nric"
  private readonly REGISTRATIONTIME: string = "registrationTime"
  private readonly BRANCH: string = "branch"
  private readonly PRODUCTTYPE: string = "productType"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
    crossDomain: true,
  };

  listOfProducts: Product[]

  customerName : string
  customerAge: number
  serviceOfficerName: string
  nric: string
  registrationTime: string
  branchCode: string
  image: Blob
  selectedProducts: string[]

  error: string = ""
  success: string = ""

  customerNameError: boolean
  customerAgeError: boolean
  serviceOfficerNameError: boolean
  nricError: boolean
  registrationTimeError: boolean
  branchCodeError: boolean
  imageError: boolean
  productTypeError: boolean

  ngOnInit() {
    this.listOfProducts.push(new Product("137", "Investor"))
    this.listOfProducts.push(new Product("070", "Insurance"))
    this.listOfProducts.push(new Product("291", "Loans"))
    this.listOfProducts.push(new Product("969", "Savings"))
    this.listOfProducts.push(new Product("555", "Credit Cards"))
  }

  // connects to login endpoint and listens for true and false
  submitForm(customerName, customerAge, serviceOfficerName, nric, registrationTime, branchCode, image, productType): Observable<CustomerResult>{
    let params = {}
    params[this.CUSTOMERNAME] = customerName
    params[this.CUSTOMERAGE] = customerAge
    params[this.SERVICEOFFICERNAME] = serviceOfficerName
    params[this.NRIC] = nric
    params[this.REGISTRATIONTIME] = registrationTime
    params[this.BRANCH] = branchCode
    params[this.PRODUCTTYPE] = productType

    return this.http.post<CustomerResult>(this.CUSTOMERPRODUCTENDPOINT, params, this.httpOptions)
  }
  
  validateForm(){
    console.log("test")
    var result: Observable<CustomerResult>  = this.submitForm(this.customerName, this.customerAge, this.serviceOfficerName, this.nric, this.registrationTime, this.branchCode, this.image, this.selectedProducts);
    result.subscribe(customerResult => {
      if (customerResult.status){
        // move to new page
        this.success = "Information Registered"
        this.customerName = "";
        this.customerAge = 18;
        this.serviceOfficerName = "";
        this.nric = "";
        this.registrationTime = ""
        this.branchCode = ""
        this.selectedProducts = []
      } else {
        // show error login
        this.error = customerResult.error
      }
    })
  }

  addProduct(code){
    this.selectedProducts.push(code)
  }

  validateCustomerName(){
    if (this.customerName.length > 64){
      this.customerNameError = true
    } else {
      this.customerNameError = false
    }
  }

  validateCustomerAge(){
    if (this.customerAge < 18){
      this.customerAgeError = true
    } else {
      this.customerAgeError = false
    }
  }

  validateServiceOfficerName(){
    if (this.serviceOfficerName.length > 64){
      this.serviceOfficerNameError = true
    } else {
      this.serviceOfficerNameError = false
    }
  }

  validateNric(){
    var regex = /^[STFG]\d{7}[A-Z]$/;
    if (regex.test(this.nric)){
      this.nricError = false
    } else{
      this.nricError = true
    }
  }

  validateRegistrationTime(){

  }

  validateBranchCode(){
    if (this.branchCode.length > 3){
      this.branchCodeError = true
    } else {
      this.branchCodeError = false
    }
  }
}