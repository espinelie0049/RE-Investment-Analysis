document.addEventListener("DOMContentLoaded", function() {

    const button = document.getElementById("calculate");
    if (button) {  // Check if button exists
        button.addEventListener("click", function(event) {
          event.preventDefault();
          console.log("Button clicked! Running calculations...");


    // Get input values
    const price = document.getElementById('price').value;
    const downpayment = document.getElementById('downpayment').value;
    const interest = (document.getElementById('interest').value) / 100 / 12; // Monthly interest
    const term = (document.getElementById('term').value) * 12; // Months
    const income = (document.getElementById('income').value)*12;
    const expenses = (document.getElementById('expenses').value);

    if (price === "" || downpayment === "" ||interest === "" || term === "" || income === "" || expenses === ""){
      alert("Please enter values before pressing Enter!");
      event.preventDefault();
      return;


    };


    
    // Calculate the down payment and loan amount
    const downPaymentAmount = (downpayment / 100) * price;
    const principal = price - downPaymentAmount;

    // Calculate monthly mortgage payment using the formula
    const mortgagePayment = (principal * interest) / (1 - Math.pow(1 + interest, -term));

    // Calculate monthly cash flow
    const annualCashFlow = income - expenses - (mortgagePayment * 12);
    const monthlyCashFlow = annualCashFlow / 12;

    // Calculate Cap Rate
    const capRate = ((income - expenses) / price) * 100;

    // Calculate Cash-on-Cash Return (CoC)
    const cashOnCash = ((income - expenses - (mortgagePayment * 12)) / downPaymentAmount) * 100;

    // Calculate ROI (simple estimate)
    const roi = (annualCashFlow / downPaymentAmount) * 100;


    const totalPmt = mortgagePayment * term;
    const int = totalPmt - principal;

    const monthlyExp = expenses/12;
    const BE = monthlyCashFlow > 0
      ? totalPmt / (monthlyCashFlow*12)
      : -1;

    // For Chart
    const totalmonthlypmt = monthlyExp + mortgagePayment;
    const monthlyincome = income/12;


    // Display results
    document.getElementById('purchase_price').textContent = `$${price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('principal').textContent = `$${principal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('int').textContent = `$${int.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('total').textContent = `$${totalPmt.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (over ${term/12} years)`;


    document.getElementById('incomeresult').textContent = `$${monthlyincome.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('mortgage').textContent = `$${mortgagePayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('monthExp').textContent = `$${monthlyExp.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('cashflow').textContent = `$${monthlyCashFlow.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('BreakEven').textContent = BE < 0 ? "Property is losing money due to negative CF" : `${BE.toFixed(0)} Years`;

    document.getElementById('caprate').textContent = `${capRate.toFixed(2)}%`;
    document.getElementById('coc').textContent = `${cashOnCash.toFixed(2)}%`;
    document.getElementById('roi').textContent = `${roi.toFixed(2)}%`;
    document.getElementById('results').style.display = 'block';

//Line Graph
const xValues = ["Monthly Income", "Monthly Expenses"];
const yValues = [monthlyincome, totalmonthlypmt];
const barColors = ["green", "red"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,

    },
    scales: {
        y: {
            beginAtZero: true,
            min: 0
          }
    
    }
  }
});
});

    }

});

/* Above is for Analysis*/







document.addEventListener("DOMContentLoaded", function() {

  const button = document.getElementById("calculatenpv");
  if (button) {  // Check if button exists
      button.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("Button clicked! Running calculations...");


  // Get input values
  const price = parseFloat(document.getElementById('price').value);
  const cf1 = parseFloat(document.getElementById('cf1').value);
  const cf2 = parseFloat(document.getElementById('cf2').value);
  const cf3 = parseFloat(document.getElementById('cf3').value);
  const cf4 = parseFloat(document.getElementById('cf4').value);
  const cf5 = parseFloat(document.getElementById('cf5').value);
  const rate = parseFloat(document.getElementById('rate').value);

  if (isNaN(price) || isNaN(cf1) || isNaN(cf2) || isNaN(cf3) || isNaN(cf4) || isNaN(cf5) || isNaN(rate)){
    alert("Please enter values before pressing Enter!");
    return;
  };

  const cashflows = [ cf1, cf2, cf3, cf4, cf5];

  let npv = -price;
  for (let i = 0; i < cashflows.length; i++) {
    npv += cashflows[i] / Math.pow(1 + rate / 100, i+1);
    console.log(npv);
  }
  document.getElementById('npv_result').textContent = `$${npv.toFixed(2)}`;

/*above is NPV*/




/* Set up for iteration */
let lowRate = 0;
let highRate = 100;
let irr = 0;
let tolerance = 0.00001;
let iteration = 0; //what is this stuff for


/* Solve Via Iteration */
while (iteration < 100) {
  let guessRate = (lowRate + highRate) / 2;
  let npvGuess = -price;


  // Find where NPV = 0
  for (let i = 0; i < cashflows.length; i++) {
    npvGuess += cashflows [i] / Math.pow(1 + guessRate / 100, i + 1);
  }

  // If NPV is close to 0 break the loop (we found IRR)
  if (Math.abs(npvGuess) < tolerance) {
    irr = guessRate;
    break;
  }

  // IF NPV pos --> guessRate is too low | If NPV neg --> guessRate is too high
  if (npvGuess > 0) {
    lowRate = guessRate;
  } else {
    highRate = guessRate;
  }
  iteration++;
}
document.getElementById('irr_result').textContent += `${irr.toFixed(4)}%`;

/*Above Space is for IRR */


    });
  }
});

/* Above is for NPV/IRR */







document.addEventListener("DOMContentLoaded", function() {

  const button = document.getElementById("calculatetmv");
  if (button) {  // Check if button exists
      button.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("Button clicked! Running calculations...");


    // Get input values
    const N = parseFloat(document.getElementById('n').value);
    const I = parseFloat(document.getElementById('i').value)/100; /*Put in Decimal form */
    const PV = parseFloat(document.getElementById('pv').value);
    const PMT = parseFloat(document.getElementById('pmt').value);
    const FV = parseFloat(document.getElementById('fv').value);


    let tmv_result;


    // TERM LENGTH
    if (isNaN(N) && !isNaN(I) && !isNaN(PV) && !isNaN(FV) && I > 0) {
      if (PV === 0) {
        alert("PV cannot be zero when solving for N")
        return;
      }
      
      if (PMT === 0) {
        result = Math.log(FV/PV) / Math.log(1+I);
      } else {
        result = Math.log((FV * I + PMT) / (PMT + PV * I)) / Math.log(1+I);
      }

      document.getElementById('tmv_result').textContent = `N = ${result.toFixed(0)} Years`;
    } 
  




    //INTEREST RATE
    else if(isNaN(I)){         
      let guessRate = 0.1;
      let tolerance = 0.00001;
      let guess = 0;
      let iteration = 0;

      let PV = parseFloat(document.getElementById("pv").value) || 0;
      let FV = parseFloat(document.getElementById("fv").value) || 0;
      let N = parseFloat(document.getElementById("n").value) || 0;
      let PMT = parseFloat(document.getElementById("pmt").value) || 0;
      // PMT = 0 if left blank

      if (PMT === 0) {
        // If ther are no PMTs, use simple compounding formula
      
        guess = Math.pow(FV/PV, 1/N) - 1;
  
      } else{

        //Newton-Raphson Method
        while (iteration < 100){
          let npv = PV * Math.pow(1+ guessRate, N) + PMT * ((Math.pow(1+guessRate, N)-1) / guessRate) - FV;
          let npv_derivative = PV * N * Math.pow(1+guessRate, N-1) + PMT * (N*Math.pow (1 + guessRate, N-1) / guessRate) - PMT *((Math.pow(1 + guessRate, N) - 1)/ Math.pow(guessRate, 2));
          let rate_new = guessRate - npv / npv_derivative;


        if (Math.abs(rate_new - guessRate) < tolerance) {
          guess = rate_new;
          break;
        }
        guessRate = rate_new;
        iteration++
        }
      }
      document.getElementById('tmv_result').textContent = `Interest Rate: ${(guess * 100).toFixed(4)}%`;
    }




    //PRESENT VALUE
    else if(isNaN(PV)) {
      result = (FV - PMT * ((Math.pow(1 + I, N) - 1) / I)) / Math.pow(1 + I, N);
      document.getElementById('tmv_result').textContent = `Present Value: $${-result.toFixed(2)}`;
    }



    // PAYMENT
    else if(isNaN(PMT)) {
      result = (FV - PV * Math.pow(1 + I, N)) / ((Math.pow(1 + I, N) - 1) / I);
      document.getElementById('tmv_result').textContent = `Payment: $${result.toFixed(2)}`;
    }



    //FUTURE VALUE
    else if(isNaN(FV)) {
      result = PV * Math.pow(1 + I, N) + PMT * ((Math.pow(1 + I, N) - 1) / I);
      document.getElementById('tmv_result').textContent = `Future Value: $${result.toFixed(2)}`;
    }

  

    });
  }
});
/* Above is for TMV */




//const button = document.getElementById("calculate");
//if (button) {  // Check if button exists
  //  button.addEventListener("click", function() {





        
       // alert("Button clicked");
  //  });
//}