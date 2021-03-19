describe('sumPaymentTotal tests', function() {
    beforeEach(function() {
        allPayments['payment' + paymentId] = {
            billAmt: 100,
            tipAmt: 15,
            tipPercent: 15
        }
        paymentId += 1;
    })
    it('should have sumPaymentTotal array items be initialized', function() {
        expect(sumPaymentTotal('billAmt')).toEqual(100);
        expect(sumPaymentTotal('tipAmt')).toEqual(15);
        expect(sumPaymentTotal('tipPercent')).toEqual(15);
    })

    // it('should submit a new payment', function() {
    //     expect(allPayments.length).toEqual(1);
    // })

    afterEach(function() {
        allPayments = {};
        paymentId = 0;
    })
})

describe('calculateTipPercent tests', function() {
    it('should calculate tip percentages', function() {
        expect(calculateTipPercent(100, 15)).toEqual(15);
        expect(calculateTipPercent(100, 0)).toEqual(0);
        expect(calculateTipPercent(100, 100)).toEqual(100);
        expect(calculateTipPercent(100, 101)).toEqual(101);
        expect(calculateTipPercent(0, 15)).toBePositiveInfinity();
    })

    it('should round tip to whole number', function() {
        expect(calculateTipPercent(100, 9.9)).toBe(Math.round(calculateTipPercent(100, 9.9)));
    })
})

describe('appendTd tests', function() {
    it('should add a new tr element', function() {
        let newTr = document.createElement('tr');
        appendTd(newTr, 100);
        expect(newTr.hasChildNodes()).toBeTruthy();
        expect(newTr.innerText).toBe('100');
    })
})

describe('appendDeleteBtn() tests', function() {
    // beforeEach(function() {
    //     let newTr = document.createElement('tr');
    //     appendDeleteBtn(newTr);
    // })
    it('should create a new element representing a delete button, which is an \'X\'', function() {
        let newTr = document.createElement('tr');
        appendDeleteBtn(newTr);
        expect(newTr.lastElementChild).toBeDefined();
        expect(newTr.lastElementChild.innerText).toBe('X');
    })
    it('should add an event listener', function() { // only works in browser
        // expect(getEventListeners(newTr.lastElementChild)).not.toEqual({}); 
    })
    it('should delete server row if clicked', function() {
        // before code
        serverNameInput.value = 'Charlie';
        submitServerInfo();

        // simulate click event
        delete allServers['server1'];
        updateServerTable();

        expect(allServers['server1']).not.toBeDefined();
    })
    it('should delete payment row if clicked', function() {
        // before code
        billAmtInput.value = 100;
        tipAmtInput.value = 50;
        submitPaymentInfo();
        // appendPaymentTable(createCurPayment());

        // simulate click event
        delete allPayments['payment1'];
        document.querySelector('#payment1').remove();
        updateServerTable();
        updateSummary();

        expect(allPayments['payment1']).not.toBeDefined();
    })
})