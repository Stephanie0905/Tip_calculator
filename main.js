const bill = document.getElementById('bill');
const people = document.getElementById('tip__people');
const custom = document.getElementById('custom');
const reset = document.getElementById('reset');
const tip_person = document.getElementById('total_bill');
const total_person = document.getElementById('total_person');
const people_error = document.getElementById('people_error');
const tip = document.querySelectorAll('.tip');

bill.addEventListener('input', billFunction);
people.addEventListener('input', peopleFunction);
custom.addEventListener('input', customFunction);
reset.addEventListener('click', resetFunction);


bill.value = '0.0';
people.value = '1';

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;

function billFunction() {
    billValue = parseFloat(bill.value);

    CalculateTip();
}

function peopleFunction() {
    peopleValue = parseFloat(people.value);

    if(peopleValue < 1 ) {
        people_error.style.display = 'block';
        people.style.border = '2px solid red';
    } else {
        people_error.style.display = 'none';
        people.style.border = '2px solid hsl(172, 67%, 45%)';
        CalculateTip();

    }
}

function customFunction() {
    tipValue = parseFloat(custom.value / 100);

    tip.forEach((item) => {
        item.classList.remove('active-tip');
    });

    CalculateTip();

}

tip.forEach((item) =>{
    item.addEventListener('click', handleClick);
})

function handleClick(e) {
        tip.forEach((item) => {
           if(e.target.innerHTML === item.innerHTML) {
            item.classList.add('active-tip');
            tipValue = parseFloat(item.innerHTML) / 100;
        } else {
            item.classList.remove('active-tip');
        }
         
        });
        CalculateTip();

}

function resetFunction() {
    bill.value = '0.0';
    billFunction();
    people.value = '1';
    peopleFunction();

    custom.value = '';
}

function CalculateTip() {
    if(peopleValue >= 1 ){
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue + tipAmount) / peopleValue;
        tip_person.innerHTML = '$' + tipAmount.toFixed(2);
        total_person.innerHTML = '$' + total.toFixed(2);
    }
}