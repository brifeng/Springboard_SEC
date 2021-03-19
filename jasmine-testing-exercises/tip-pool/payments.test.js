describe("submitPaymentInfo test (with setup and tear-down)", function() {
    beforeEach(function() {
        // initialization logic
        billAmtInput.value = 100;
        tipAmtInput.value = 15;
    });

    it('should add a new payment to allPayments on submitPaymentInfo()', function() {
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment' + paymentId].billAmt).toEqual('100');
        expect(allPayments['payment' + paymentId].tipAmt).toEqual('15');
        expect(allPayments['payment' + paymentId].tipPercent).toEqual(15);
    });

    afterEach(function() {
        // teardown logic
        allPayments = {};
        paymentId--;
        // while (paymentTbody.firstChild()) {
        paymentTbody.removeChild(paymentTbody.firstElementChild);
        // }
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
    });
});

describe("test createCurPayment()", function() {
    it('should do nothing if input is empty', function() {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        expect(createCurPayment()).not.toBeDefined();
    })
    it('should do nothing if billAmt is not positive', function() {
        billAmtInput.value = 0;
        tipAmtInput.value = 100;
        expect(createCurPayment()).not.toBeDefined();
    })
    it('should do nothing if either input is not a number', function() {
        billAmtInput.value = 'ten';
        tipAmtInput.value = 'five';
        expect(createCurPayment()).not.toBeDefined();
    })
    it('should return a payment object if inputs are nonzero', function() {
        billAmtInput.value = 100;
        tipAmtInput.value = 15;
        expect(createCurPayment()).toBeDefined();
        expect(createCurPayment().billAmt).toEqual('100');
        expect(createCurPayment().tipAmt).toEqual('15');
        expect(createCurPayment().tipPercent).toEqual(15);
    })
    it('should still work and return an object if the tip is zero', function() {
        billAmtInput.value = 10;
        tipAmtInput.value = 0;
        expect(createCurPayment()).toBeDefined();
        expect(createCurPayment().billAmt).toEqual('10');
        expect(createCurPayment().tipAmt).toEqual('0');
        expect(createCurPayment().tipPercent).toEqual(0);
    })

    afterEach(function() {
        // clear payment info
        billAmtInput.value = '';
        tipAmtInput.value = '';
    })
})

describe('appendPaymentTable() tests', function() {
    beforeEach(function() {
        billAmtInput.value = 100;
        tipAmtInput.value = 15;
        appendPaymentTable(createCurPayment());
    })

    it('should append a new element to paymentTbody', function() {
        expect(paymentTbody.lastElementChild).toBeDefined();
    })
    it('should add elements to the new row', function() {
        expect(paymentTbody.lastElementChild.hasChildNodes()).toBeTruthy();
    })

    afterEach(function() {
        // clear payment info
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.removeChild(paymentTbody.firstElementChild);
    })
})

describe('updateSummary() tests', function() {
    beforeEach(function() {
        // initialization logic
        billAmtInput.value = 100;
        tipAmtInput.value = 15;
        submitPaymentInfo();
    });

    it('should fill summary table', function() {
        expect(summaryTds[0]).toBeTruthy();
        expect(summaryTds[0].innerText).toContain('$');
        expect(summaryTds[1]).toBeTruthy();
        expect(summaryTds[1].innerText).toContain('$');
        expect(summaryTds[2]).toBeTruthy();
        expect(summaryTds[2].innerText).toContain('%');
    })
    it('should calculate the totals correctly with multiple payments', function() {
        // first payment done in beforeEach()
        billAmtInput.value = 250; // second payment
        tipAmtInput.value = 50;
        submitPaymentInfo();

        expect(summaryTds[0].innerHTML).toEqual('$350');
        expect(summaryTds[1].innerHTML).toEqual('$65');
        expect(summaryTds[2].innerHTML).toEqual('18%');

        paymentId--;
        paymentTbody.removeChild(paymentTbody.firstElementChild); // remove one payment
        // remove second payment in afterEach()
    })


    afterEach(function() {
        // clear payment info
        paymentTbody.removeChild(paymentTbody.firstElementChild);
        allPayments = {};
        paymentId--;
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
    })
})


it('should display a tip percentage of 0 in shift summary if there are no payments made', function() {
    updateSummary();
    expect(summaryTds[0].innerText).toEqual('$0');
    expect(summaryTds[1].innerText).toEqual('$0');
    expect(summaryTds[2].innerText).toEqual('0%');
    summaryTds[0].innerHTML = '';
    summaryTds[1].innerHTML = '';
    summaryTds[2].innerHTML = '';
})