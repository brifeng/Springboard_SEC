it('should calculate the monthly rate correctly', function() {
    // ...
    let input = {
        amount: 5000,
        years: 5,
        rate: 0.045,
    }
    expect(calculateMonthlyPayment(input)).toEqual(93.22);
    input = {
        amount: 1200,
        years: 1,
        rate: 0.00001,
    }
    expect(calculateMonthlyPayment(input)).toEqual(100);

    input = { // no amount borrowed
        amount: 0,
        years: 1,
        rate: 0.05,
    }
    expect(calculateMonthlyPayment(input)).toEqual(0);

    input = { // no interest
        amount: 12000,
        years: 1,
        rate: 0,
    }
    expect(calculateMonthlyPayment(input)).toEqual(1000);

    input = { // no time borrowed (pay back instantly)
        amount: 12000,
        years: 0,
        rate: 0.05,
    }
    expect(calculateMonthlyPayment(input)).toEqual(12000);
});


it("should return a result with 2 decimal places", function() {
    // ..
    let input = {
        amount: 10000,
        years: 5,
        rate: 0.045,
    }
    expect(calculateMonthlyPayment(input)).toEqual(Math.round(calculateMonthlyPayment(input) * 100) / 100);
});

/// etc