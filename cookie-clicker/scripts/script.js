

let switchOff = document.getElementById("switchOff")
let switchOn = document.getElementById("switchOn")
let lightOn= document.getElementById("lightOn")
let lightOff = document.getElementById("lightOff")
let count_label = document.getElementById('click-count')

let photoElements = document.querySelectorAll("photo-elements");
let bttnWorth2 = document.getElementById('worth2')

switchOff.addEventListener("click",onBulbClick);
switchOn.addEventListener("click", onBulbClick);


/*bttnWorth2.addEventListener('click', checkCount500)*/

let count = 490;
let step = 1;
function onBulbClick(){
    if (count == 499){
        const container = document.querySelector('.rectangle');
        const newBttn = document.createElement("button");
        container.appendChild(newBttn);
        newBttn.textContent = "Collect 2 per 1 click";
        newBttn.addEventListener('click', () => {step = 2; newBttn.remove()})

    }
        switchOn.classList.toggle('active');
        switchOff.classList.toggle('active');
        lightOff.classList.toggle('active');
        lightOn.classList.toggle('active');
        count_label.classList.toggle('active');

    document.getElementById('click-count').innerHTML = count + step;
    count = count + step;
}

function checkCount50(){
    if (count >= 500){
        bttnWorth2.remove()
        return step = 2;
    }
    else{
        return console.log('You have not achieved count 500!')
    }
}