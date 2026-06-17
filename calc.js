let clr = document.querySelector('.err');
let bspc = document.querySelector('.bcksp');
let tpn = document.querySelector('.toggle-pn');
let eqbtn = document.querySelector('.equals');
let cont = document.querySelector('.showcontent');
let btn = document.querySelectorAll('.calc-btns');

// btn.forEach(value =>{
//     value.addEventListener('click', (e) => {
//         cont.textContent += value.value;
//     });
// });

let operators = ['+', '-', '*', '/', '%'];

function addValue(value) 
{
    let curr = cont.textContent;
    let currVal = curr[curr.length-1];

    if(operators.includes(value)&&operators.includes(currVal)){
        cont.textContent = curr.slice(0, -1) + value;
    }
    cont.textContent += value;
}
btn.forEach(value =>{
    value.addEventListener('click', (e) =>{
        addValue(value.value);
    })
})

eqbtn.addEventListener('click', () =>{
    try{
        let exp = cont.textContent;
        cont.textContent = eval(exp);
    }
    catch{
        cont.textContent = "Error";
    }
})

clr.addEventListener('click', ()=>{
    cont.textContent = " ";
});

bspc.addEventListener('click', ()=>{
    cont.textContent = cont.textContent.slice(0,-1)
})

tpn.addEventListener('click', () =>{
    let value = cont.textContent;
    if(value.startsWith('-')){
        cont.textContent = cont.textContent.slice(1);
    }
    else{
        cont.textContent = '-' + value;
    }
})

document.addEventListener('keydown' , (e) =>{
    const key = e.key;
    console.log(key);
    

    if('0123456789+-./*%'.includes(key)){
        addValue(key);
    }
    else if(key === 'Enter'){
        e.preventDefault();
        cont.textContent = eval(cont.textContent);
    }
    else if(key === 'Backspace'){
        cont.textContent = cont.textContent.slice(0, -1);
    }
    else if(key === 'Escape'){
        cont.textContent = "";
    }
});