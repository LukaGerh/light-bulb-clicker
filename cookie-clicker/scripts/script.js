

const switchOff = document.getElementById("switchOff")
const switchOn = document.getElementById("switchOn")
const lightOn= document.getElementById("lightOn")
const lightOff = document.getElementById("lightOff")
const count_label = document.getElementById('click-count')
const timerLabel = document.querySelector('#timer')

let photoElements = document.querySelectorAll("photo-elements");
let bttnWorth2 = document.getElementById('worth2')

switchOff.addEventListener("click",onBulbClick);
switchOn.addEventListener("click", onBulbClick);


/*bttnWorth2.addEventListener('click', checkCount500)*/

let count = 2450;
let step = 1;
let randInt;

function onBulbClick(){
    switchOn.classList.toggle('active');
    switchOff.classList.toggle('active');
    lightOff.classList.toggle('active');
    lightOn.classList.toggle('active');
    count_label.classList.toggle('active');

    count = count + step;
    document.getElementById('click-count').innerHTML = count;
    checkUpgrades()
}

function checkUpgrades(){
    if (count == 500){
        return upgrade500()
    }
    else if(count == 2500){
        return challangeAtRandTime()
    }

}

function upgrade500(){
    const container = document.querySelector('.rectangle');
    const newBttn = document.createElement("button");
    container.appendChild(newBttn);
    newBttn.textContent = "Collect 2 per 1 click";
    newBttn.addEventListener('click', () => {step = 2; newBttn.remove()})
}


function challangeAtRandTime(){
    const randInt =  Math.floor(Math.random() * 1001) + 2500;
    
}



/*if(count !== randInt){
        console.log('Sākās challange!')
        setInterval(() => {for(i = 0; i<61; i++){timerLabel.innerHTML='i'}}, 1000);
    }