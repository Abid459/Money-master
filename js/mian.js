
const income = document.querySelector('#income');
const expenses = document.querySelectorAll('.expense');
const save = document.querySelector('#save');
const expenseBtn = document.querySelector('.btn-calc');
const saveBtn = document.querySelector('.btn-save')

// ----------display-------------
const expencesDisplay = document.querySelector('#total-expences-display');
const balanceDisplay = document.querySelector('#balance-display');
const savingAmountDisplay = document.querySelector('#saving-amount-display');
const remainigBalanceDisplay = document.querySelector('#remainig-balance-display');
const warningDisplay = document.querySelector('.warning-display');



let totalExpenses = 0;
let savingAmount = 0;
let remainBalance = 0;
let isclicked = false;
let balance = 0;

expenseBtn.addEventListener('click', function (e) {
    let targetName = '';
    let totalExpenses = 0;
    let incomeAmount = income.value;
    for (let perexpense of expenses) {
        let perexpenseAmount = parseFloat(perexpense.value);
        if(perexpenseAmount >=0){
            totalExpenses = totalExpenses + perexpenseAmount;
        }
        else{
            targetName =perexpense.parentNode.childNodes[3].id  +", " + targetName;
            warningDisplay.innerHTML = targetName+ "field  should be a positive number";
            // console.dir(perexpense.parentNode.childNodes[3].id;
        }
    }

    if(incomeAmount>=totalExpenses){
    balance = incomeAmount - totalExpenses;
    console.log(totalExpenses);
    expencesDisplay.innerHTML = totalExpenses;
    balanceDisplay.innerText = balance;
    savingCalculation();
}
else{
    warningDisplay.innerText = "Your income can't be less than your expenditure"
}
})


saveBtn.addEventListener('click', function () {
    savingCalculation();
})

function savingCalculation() {
    const savePercent = parseFloat(save.value);
    savingAmount = balance * (savePercent/100);
    remainBalance = balance - savingAmount;
    if(!isNaN(savingAmount) && !isNaN(remainBalance)){
    updateDisplay();
    }

}

function updateDisplay() {
    
        savingAmountDisplay.innerHTML = savingAmount.toFixed( 2 );
        remainigBalanceDisplay.innerText = remainBalance.toFixed( 2 );
    
}