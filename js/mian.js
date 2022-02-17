
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



//event handler for epense calculation
expenseBtn.addEventListener('click', function (e) {
    clearWarningDisplay();
    let targetName = '';
    let totalExpenses = 0;
    let incomeAmount = parseFloat(income.value);

    let incomeValited = inputValidation(incomeAmount);
    if (!incomeValited) {
        return;
    }
    if (incomeAmount > 0) {

        for (let perexpense of expenses) {
            let perexpenseAmount = parseFloat(perexpense.value);
            if (perexpenseAmount >= 0) {
                totalExpenses = totalExpenses + perexpenseAmount;
            }
            else {
                warningDisplay.style.display = 'block'
                targetName = perexpense.parentNode.childNodes[3].id + ", " + targetName;
                warningDisplay.innerHTML = targetName + "field  should be a positive number";
            }
            if (!inputValidation(perexpenseAmount)) {
                return;
            };
        }
    }
    else {
        warningDisplay.style.display = 'block'
        warningDisplay.innerText = "Income should be positive";
        clearWarningDisplay();
        return;
    }
    if (incomeAmount >= totalExpenses) {
        balance = incomeAmount - totalExpenses;
        console.log(totalExpenses);
        expencesDisplay.innerHTML = totalExpenses;
        balanceDisplay.innerText = balance;
        savingCalculation();//if income changes need to calculate savings again
    }
    else {
        warningDisplay.style.display = 'block'
        warningDisplay.innerText = "Your income can't be less than your expenditure"
    }
})



//event handler for saving button
saveBtn.addEventListener('click', function () {
    const savePercent = parseFloat(save.value);
    clearWarningDisplay();
    if (!inputValidation(savePercent)) {
        return;
    }
    savingCalculation(savePercent);
})


//saving calculation function
function savingCalculation(savePercent) {
console.log(savePercent)
    if (savePercent < 0) {
        warningDisplay.style.display ='block'
        warningDisplay.innerHTML = "Percent Value should be positive number";
        return;
    }
    savingAmount = balance * (savePercent / 100);
    remainBalance = balance - savingAmount;
    if (!isNaN(savingAmount) && !isNaN(remainBalance)) {
        if (balance >= savingAmount) {

            updateDisplay();
        }
        else {
            warningDisplay.style.display = 'block';
            warningDisplay.innerHTML = "You can't save more than your current Balance";
            return;
        }
    }
}

function updateDisplay() {
    savingAmountDisplay.innerHTML = savingAmount.toFixed(2);
    remainigBalanceDisplay.innerText = remainBalance.toFixed(2);

}

//input validation function
function inputValidation(number) {
    if (isNaN(number)) {
        warningDisplay.style.display = 'block';
        warningDisplay.innerHTML = `"Input should not be empty or any character or any other expression"  <br/> "other than number from 0 to 9"`;
        return false;
    }
    else {
        return true;
    }
}

function clearWarningDisplay() {
    setTimeout(() => {
        warningDisplay.innerHTML = "";
        warningDisplay.style.display = 'none';
    }, 5000);
}
