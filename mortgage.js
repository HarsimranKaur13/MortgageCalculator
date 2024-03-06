//Inputs /DOM Elements
const homeValue = document.getElementById("homeValue");
const downPayment = document.getElementById("downPayment");
const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const loanDuration = document.getElementById("loanDuration");

const form = document.getElementById("mortgage");

downPayment.addEventListener("keyup", () => {
    loanAmount.value = homeValue.value - downPayment.value;

    let loanAmountValue = loanAmount.value;
    return loanAmountValue;
});

homeValue.addEventListener("keyup", () => {
    loanAmount.value = homeValue.value - downPayment.value;

    let loanAmountValue = loanAmount.value;
    return loanAmountValue;
});

function calculateMortgage(loanAmount, interestRate, numberMonthlyPayments){
    function percentageToDecimal(percent){
        return percent / 12 / 100;
    }

    interestRate = percentageToDecimal(interestRate);

    function yearsToMonths(year){
        return year * 12;
    }

    numberMonthlyPayments = yearsToMonths(numberMonthlyPayments);

    let mortgage = 
        (interestRate * loanAmount) / 
        (1 - Math.pow(1 + interestRate, -numberMonthlyPayments));

    return parseFloat(mortgage.toFixed(2));
}

form.onsubmit = (e) => {
    e.preventDefault();
    document.getElementById("monthlyPayment").innerHTML = "";
    if(validate() == 0){
    let loanAmount = homeValue.value - downPayment.value;
    let monthlyPayment = calculateMortgage(
        loanAmount, 
        interestRate.value, 
        loanDuration.value
    );

    document.getElementById("monthlyPayment").innerHTML = `$ ${monthlyPayment}`;
    };
};

function validate(){
    let ret = 0;
    let alert = document.createElement("div");
        alert.className = "alert alert-danger d-grid justify-content-center center";
        alert.role = "alert";
        alert.style.justifySelf = "center";
        alert.style.margin = "50px 45px";
        alert.style.padding = "3px 5px 3px";
        
    if (
        homeValue.value === "" ||
        downPayment.value === "" ||
        interestRate.value === "" ||
        loanDuration.value === "" 
    ) {
        alert.innerHTML = `<span><b>Alert!</b> Please complete all fields</span>`;
        form.parentNode.insertBefore(alert, form);
        ret = 1;
    }
    else if(
        downPayment.value > homeValue.value
    ){
        alert.innerHTML = `<span><b>Alert!</b> Down Payment can't be greater than Home Value</span>`;
        form.parentNode.insertBefore(alert, form);
        ret = 1;
    }
    alert.onclick = () => alert.remove();
    setTimeout(() => alert.remove(), "2000");
    return ret;
};