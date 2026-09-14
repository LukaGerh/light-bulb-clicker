//FIRST LIGHT BULB
const switchOff = document.getElementById("switchOff");
const switchOn = document.getElementById("switchOn");
const lightOn= document.getElementById("lightOn");
const lightOff = document.getElementById("lightOff");
// ========

//SHOP
const container = document.querySelector('.rectangle');
const bonus_container = document.getElementById('bonus-container');
// SHOP BUTTONS
const buyStepBttn = document.getElementById('buyStepBttn');
const buyAutoClick = document.getElementById('buyAutoClickBttn');
const gambleBttn = document.getElementById('gambleBttn');
// -------


// AUDIO
const turnOnSound = new Audio('../media/audio/turnOnSound.mp3');
const turnOffSound = new Audio('../media/audio/turnOffSound.mp3');
const lampExplosion = new Audio('../media/audio/lampExplosion.mp3');
const buttonPress = new Audio('../media/audio/buttonPress.mp3');
const timerStart = new Audio('../media/audio/timerStart.mp3');
const tickingCountdown = new Audio('../media/audio/tickingCountdown.mp3');
// ----

const announcement = document.getElementById('announcement');
const main = document.getElementById("main-screen");
const digitalContainer = document.createElement('div');
const count_label = document.getElementById('click-count');
const challengeCount = document.getElementById('challengeCount');
const timerText = document.querySelector('p.hiddenElement');
const timerNum = document.querySelector('#timer');

// LAMP
let digitalSwitchOff;
let digitalSwitchOn;
let digitalLightOff;
let digitalLightOn;

// BUTTONS
let newBttn500;

//STATE CHECKERS
is500Collected = false;


let lightExploded;


let count = 490;

// STEPS
let step = 1;
let autoClickStep = 0;

// SHOP PRICES
let stepBttnPrice = 500;
let autoClickPrice = 800;
let multiplierPrice = 15000;
let gambleAmount = 100;


let randInt = Math.floor(Math.random() * 1001) + 2500;
let randIntTriggered = false; 
console.log("Mērķis:", randInt);


let explodeTime = 10000;
let explodeTriggered = true; 

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// EVENT LISTENERS
buyStepBttn.addEventListener('click',()=>{shopBttns(buyStepBttn)});
buyAutoClick.addEventListener('click', ()=>{shopBttns(buyAutoClick)});
gambleBttn.addEventListener('click', () => { shopBttns(gambleBttn) });


switchOff.addEventListener("click", ()=>{onBulbClick(switchOff)});
switchOn.addEventListener("click", ()=>onBulbClick(switchOn));


setInterval(function () {
    if (autoClickStep > 0) {
        count = count + autoClickStep;
        count_label.innerHTML = count;
    }
}, 1000);

function shopBttns(bttn){
    
    switch(bttn){
        case buyStepBttn:
            if(count>=stepBttnPrice){
                if(is500Collected == false){
                newBttn500.remove();
                step=step + 1;
                }
                count=count-stepBttnPrice;
                stepBttnPrice= stepBttnPrice * 2;
                step=step * 2;
                count_label.innerHTML = count;
                buyStepBttn.innerHTML = `Add ${step} steps for ${stepBttnPrice}`;
            }
            break;
        case buyAutoClick: 
            if(count>=autoClickPrice){
                count=count-autoClickPrice;
                count_label.innerHTML = count;
                autoClickPrice = autoClickPrice * 1.5;
                if(autoClickStep == 0){
                    autoClickStep = autoClickStep + 1;
                }
                else{
                    autoClickStep = autoClickStep * 2;
                }
                buyAutoClick.innerHTML = `Add additional ${autoClickStep} autoclicks for ${autoClickPrice}`;
            }
            break;
        case gambleBttn:
            if (count >= gambleAmount) {
                let isWin = Math.random() < 0.5;

                if (isWin) {
                    count = count + gambleAmount;
                    announcement.innerHTML = `You won ${gambleAmount} clicks!`;
                } else {
                    count = count - gambleAmount;
                    announcement.innerHTML = `You lost ${gambleAmount} clicks!`;
                }
                
               
                gambleAmount = Math.round(gambleAmount * 1.5); 
                gambleBttn.innerHTML = `Risk with ${gambleAmount} clicks`;

                count_label.innerHTML = count;
                checkUpgrades();
            } 
            else {
                announcement.innerHTML = "Tev nepietiek punktu, lai riskētu!";
            }
            setTimeout(() => {announcement.innerHTML = '';}, 3000);
            break;
    }
}


function onBulbClick(switchPressed){
    if(switchPressed == switchOff){
        turnOnSound.currentTime = 0; // Pārtrauc iepriekšējo un sāk no jauna
        turnOnSound.play().catch(e => console.log(e));
    }
    else if(switchPressed == switchOn){
        turnOffSound.currentTime = 0; // Pārtrauc iepriekšējo un sāk no jauna
        turnOffSound.play().catch(e => console.log(e));
    }
    switchOn.classList.toggle('active');
    switchOff.classList.toggle('active');
    lightOff.classList.toggle('active');
    lightOn.classList.toggle('active');
    count_label.classList.toggle('active');

    count = count + step;
    count_label.innerHTML = count;
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
    if (count == 500 && !is500Collected){
        upgrade500();
    }
    else if (count >= randInt && !randIntTriggered) {
        randIntTriggered = true;
        startChallenge(); 
    }
    else if (count >= explodeTime){
        removeEventListener('wheel', onDigitalScroll)
        lightBulbExplodes();
    }
}

function upgrade500(){
    newBttn500 = document.createElement("button");
    bonus_container.appendChild(newBttn500);
    newBttn500.textContent = "Collect 2 per 1 click";
    newBttn500.addEventListener('click', () => {step = 2; is500Collected = true; newBttn500.remove();})
}



async function startChallenge(){
    let timerCount = 60;
    //let startCount = count;
    let newBttn;
    announcement.innerHTML = 'Get atleast 400 clicks for instant bonus!<br> (clicks are counted by 1)';
    timerText.classList.toggle('active');

    let clicksCounted = 0;
    
    timerStart.play();
   
    await sleep(2000);
    tickingCountdown.play();

    switchOff.addEventListener('click', countClicks);
    switchOn.addEventListener('click', countClicks);
     function countClicks(){
        clicksCounted = clicksCounted + 1;
        challengeCount.innerHTML = clicksCounted;
    }

    for(let i = 0; i < 61; i++){

        timerNum.innerHTML = timerCount;
        timerCount--;
        await sleep(1000);
    }

    announcement.innerHTML ='';
    challengeCount.remove();
    newBttn = document.createElement('button');
    newBttn.textContent = "Collect smart switch";

    if(clicksCounted >= 400){
        timerText.classList.toggle('active');
        console.log('Klikšķi 60 sekundēs', clicksCounted);
        container.appendChild(newBttn);
        
    }   
    else{
        timerText.classList.toggle('active');
        console.log('Klikšķi 60 sekundēs', clicksCounted);
        await sleep(60000);
        container.appendChild(newBttn);
    }
    newBttn.addEventListener('click', function(){
        newBttn.remove();
        switchOff.remove();
        lightOff.remove();
        switchOn.remove();
        lightOn.remove();

        digitalContainer.classList.add('digitalContainer')
        main.appendChild(digitalContainer);

        digitalSwitchOff = document.createElement('img');
        digitalSwitchOff.src = "../media/digitalSwitchOff.png";
        digitalSwitchOff.alt = "digital switch for lamp which state is off";
        //digitalSwitchOff.classList.add('active');
        //digitalSwitchOff.classList.add('lamp');
        digitalContainer.appendChild(digitalSwitchOff);

        digitalSwitchOn = document.createElement('img');
        digitalSwitchOn.src = "../media/digitalSwitchOn.png";
        digitalSwitchOn.alt = "digital switch for lamp which state is on";
        digitalSwitchOn.classList.add('active');
        //digitalSwitchOn.classList.add('lamp');
        digitalContainer.appendChild(digitalSwitchOn);

        digitalLightOff= document.createElement('img');
        digitalLightOff.src = "../media/digitalLightOff.png";
        digitalLightOff.alt = "big lamp with state turned off";
        //digitalLightOff.classList.add('active');
        //digitalLightOff.classList.add('lamp');
        digitalContainer.appendChild(digitalLightOff);

        digitalLightOn = document.createElement('img');
        digitalLightOn.src = "../media/digitalLightOn.png";
        digitalLightOn.alt = "big lamp with state turned on";
        digitalLightOn.classList.add('active');
        //digitalLightOn.classList.add('lamp');
        digitalContainer.appendChild(digitalLightOn);

        

        //step = step * 2;
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
        digitalContainer.appendChild(digitalSwitchOff);
        digitalContainer.appendChild(digitalSwitchOn);
        digitalContainer.appendChild(digitalLightOff);
        digitalContainer.appendChild(digitalLightOn);
        newBttn.remove();
    
    }


}

