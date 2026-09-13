
const switchOff = document.getElementById("switchOff");
const switchOn = document.getElementById("switchOn");
const lightOn= document.getElementById("lightOn");
const lightOff = document.getElementById("lightOff");
const count_label = document.getElementById('click-count');
const timerText = document.querySelector('p.hiddenElement');
const timerNum = document.querySelector('#timer');
const container = document.querySelector('.rectangle');
const buyStepBttn = document.getElementById('buyStepBttn');
const buyAutoClick = document.getElementById('buyAutoClickBttn');
const main = document.getElementById("main-screen");


const turnOnSound = new Audio('../media/audio/turnOnSound.mp3');
const turnOffSound = new Audio('../media/audio/turnOffSound.mp3');
const lampExplosion = new Audio('../media/audio/lampExplosion.mp3');
const buttonPress = new Audio('../media/audio/buttonPress.mp3');
const timerStart = new Audio('../media/audio/timerStart.mp3');
const tickingCountdown = new Audio('../media/audio/tickingCountdown.mp3');


let digitalSwitchOff;
let digitalSwitchOn;
let digitalLightOff;
let digitalLightOn;

let lightExploded;


let count = 2490;
let step = 1;
let stepBttnPrice = 1000;
let randInt = Math.floor(Math.random() * 1001) + 2500;
let randIntTriggered = false; // Nomainīt atpakal uz false
console.log("Mērķis:", randInt);


let explodeTime = 10000;
let explodeTriggered = true; 

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

buyStepBttn.addEventListener('click',()=>{shopBttns(buyStepBttn)});
/*
switchOff.addEventListener("click", ()=>{onBulbClick(switchOff)});
switchOn.addEventListener("click", ()=>onBulbClick(switchOn));
*/

// Testēšanas zona



//newBttn.remove();
function test10000(){
    switchOff.remove();
    lightOff.remove();
    switchOn.remove();
    lightOn.remove();

    digitalSwitchOff = document.createElement('img');
    digitalSwitchOff.src = "../media/digitalSwitchOff.png";
    digitalSwitchOff.alt = "digital switch for lamp which state is off";
    digitalSwitchOff.classList.add('active');
    main.appendChild(digitalSwitchOff);

    digitalSwitchOn = document.createElement('img');
    digitalSwitchOn.src = "../media/digitalSwitchOn.png";
    digitalSwitchOn.alt = "digital switch for lamp which state is on";
    //digitalSwitchOn.classList.add('active');
    main.appendChild(digitalSwitchOn);

    digitalLightOff= document.createElement('img');
    digitalLightOff.src = "../media/digitalLightOff.png";
    digitalLightOff.alt = "big lamp with state turned off";
    digitalLightOff.classList.add('active');
    main.appendChild(digitalLightOff);

    digitalLightOn = document.createElement('img');
    digitalLightOn.src = "../media/digitalLightOn.png";
    digitalLightOn.alt = "big lamp with state turned on";
    //digitalLightOn.classList.add('active');
    main.appendChild(digitalLightOn);

        

    step = step * 4;

    digitalSwitchOff.addEventListener('click', ()=>{onDigitalScroll(digitalSwitchOff)});
    digitalSwitchOn.addEventListener('click', ()=>{onDigitalScroll(digitalSwitchOn)});
    digitalSwitchOff.addEventListener('wheel', ()=>{onDigitalScroll(digitalSwitchOff)});
    digitalSwitchOn.addEventListener('wheel', ()=>{onDigitalScroll(digitalSwitchOn)});
}

test10000();
// Šeit beidzas testēšanas zona


function shopBttns(bttn){
    
    switch(bttn){
        case buyStepBttn:
            if(count>=stepBttnPrice){
                count=count-stepBttnPrice;
                stepBttnPrice= stepBttnPrice * 2;
                step=step * 2;
                document.getElementById('click-count').innerHTML = count;
                buyStepBttn.innerHTML = `Buy ${step} step for ${stepBttnPrice}`;
            }
            break;
        case buyAutoClick: 
            break; 
    }
}


function onBulbClick(switchPressed){
    if(switchPressed == switchOff){
        turnOnSound.play().catch(e => console.log("Nevar atskaņot skaņu:", e));;
    }
    else if(switchPressed == switchOn){
        turnOffSound.play().catch(e => console.log("Nevar atskaņot skaņu:", e));;
    }
    switchOn.classList.toggle('active');
    switchOff.classList.toggle('active');
    lightOff.classList.toggle('active');
    lightOn.classList.toggle('active');
    count_label.classList.toggle('active');

    count = count + step;
    document.getElementById('click-count').innerHTML = count;
    checkUpgrades();
}


function onDigitalScroll(digSwitchPressed){
    if(digSwitchPressed == digitalSwitchOff){
        turnOnSound.play();
    }
    else if(digSwitchPressed == digitalSwitchOn){
        turnOffSound.play();
    }

    digitalSwitchOff.classList.toggle('active');
    digitalSwitchOn.classList.toggle('active');
    digitalLightOff.classList.toggle('active');
    digitalLightOn.classList.toggle('active');
    count_label.classList.toggle('active');
    
    count = count + step;
    document.getElementById('click-count').innerHTML = count;
    checkUpgrades();
}


async function checkUpgrades(){
    if (count == 500){
        upgrade500();
    }
    else if (count >= randInt && !randIntTriggered) {
        randIntTriggered = true;
        
        startChallenge(); 
    }
    else if (count >= explodeTime){
        //explodeTriggered = true;
        removeEventListener('wheel', onDigitalScroll)
        lightBulbExplodes();
    }
}

function upgrade500(){
    
    const newBttn = document.createElement("button");
    container.appendChild(newBttn);
    newBttn.textContent = "Collect 2 per 1 click";
    newBttn.addEventListener('click', () => {step = 2; newBttn.remove()})
}



async function startChallenge(){
    let timerCount = 60;
    let startCount = count;
    let newBttn;
    timerText.classList.toggle('active');
    timerStart.play();

    await sleep(2000);
    tickingCountdown.play();
    for(let i = 0; i < 61; i++){

        timerNum.innerHTML = timerCount;
        timerCount--;
        await sleep(1000);
    }

    newBttn = document.createElement('button');
    newBttn.textContent = "Collect smart switch";

    if(count-startCount >= 400){
        timerText.classList.toggle('active');
        console.log('Klikšķi 60 sekundēs', count-startCount);
        container.appendChild(newBttn);
        
    }   
    else{
        timerText.classList.toggle('active');
        console.log('Klikšķi 60 sekundēs', count-startCount);
        await sleep(15000);
        container.appendChild(newBttn);
    }
    newBttn.addEventListener('click', function(){
        newBttn.remove();
        switchOff.remove();
        lightOff.remove();
        switchOn.remove();
        lightOn.remove();

        digitalSwitchOff = document.createElement('img');
        digitalSwitchOff.src = "../media/digitalSwitchOff.png";
        digitalSwitchOff.alt = "digital switch for lamp which state is off";
        digitalSwitchOff.classList.add('active');
        main.appendChild(digitalSwitchOff);

        digitalSwitchOn = document.createElement('img');
        digitalSwitchOn.src = "../media/digitalSwitchOn.png";
        digitalSwitchOn.alt = "digital switch for lamp which state is on";
        //digitalSwitchOn.classList.add('active');
        main.appendChild(digitalSwitchOn);

        digitalLightOff= document.createElement('img');
        digitalLightOff.src = "../media/digitalLightOff.png";
        digitalLightOff.alt = "big lamp with state turned off";
        digitalLightOff.classList.add('active');
        main.appendChild(digitalLightOff);

        digitalLightOn = document.createElement('img');
        digitalLightOn.src = "../media/digitalLightOn.png";
        digitalLightOn.alt = "big lamp with state turned on";
        //digitalLightOn.classList.add('active');
        main.appendChild(digitalLightOn);

        

        step = step * 2;
        digitalSwitchOff.addEventListener('click', ()=>{onDigitalScroll(digitalSwitchOff)});
        digitalSwitchOn.addEventListener('click', ()=>{onDigitalScroll(digitalSwitchOn)});
        digitalSwitchOff.addEventListener('wheel', ()=>{onDigitalScroll(digitalSwitchOff)});
        digitalSwitchOn.addEventListener('wheel', ()=>{onDigitalScroll(digitalSwitchOn)});
        
        
        

    })
}

function lightBulbExplodes(){
    lampExplosion.volume = 0.35;
    lampExplosion.play()
    
    explodeTime = Math.floor(explodeTime * 2.5);
    
    digitalSwitchOn.remove();
    digitalSwitchOff.remove();
    
    digitalLightOff.remove();
    digitalLightOn.remove();
    

    lightExploded = document.createElement('img');
    lightExploded.src = "../media/lightExploded.png";
    lightExploded.alt = "lamp exploding";
    lightExploded.classList.add('active');
    main.appendChild(lightExploded);

    const newBttn = document.createElement("button");
    container.appendChild(newBttn);
    newBttn.textContent = "Restore lamp";
    newBttn.addEventListener('click', restoreLamp)
    
    function restoreLamp(){
        buttonPress.play();
        count = Math.floor(count - (count/5));
        count_label.innerHTML = count;
        lightExploded.remove();
        main.appendChild(digitalSwitchOff);
        main.appendChild(digitalSwitchOn);
        main.appendChild(digitalLightOff);
        main.appendChild(digitalLightOn);
        newBttn.remove();
    
    }


}

