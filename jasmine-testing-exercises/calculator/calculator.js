window.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("calc-form");
    if (form) {
        setupIntialValues();
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            update();
        });
    }
});

function getCurrentUIValues() {
    // console.log('run getCurrentUIValues');

    return {
        amount: +(document.getElementById("loan-amount").value),
        years: +(document.getElementById("loan-years").value),
        rate: +(document.getElementById("loan-rate").value),
    }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
    // console.log('run setupInitialValues');

    let inputs = {
        amount: 0,
        years: 0,
        rate: 0,
    };
    // calculateMonthlyPayment();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
    // console.log('run update');

    inputs = getCurrentUIValues();
    updateMonthly(calculateMonthlyPayment(inputs));
    // updateMonthly;
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
    let monthlyPay = (values["amount"] * values["rate"] / 12) / (1 - (Math.pow(1 + values["rate"] / 12, -12 * values["years"])));
    if (values["years"] === 0) {
        monthlyPay = values["amount"];
    } else if (values["rate"] === 0) {
        monthlyPay = values["amount"] / values["years"] / 12;
    }
    return Math.round(monthlyPay * 100) / 100;
    // return monthlyPay;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
    // console.log('run updateMonthly');
    const payment = document.querySelector('#monthly-payment');
    payment.innerText = `$${monthly}`;
}