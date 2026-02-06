try{
function getItem(name) {
    return localStorage.getItem(name);
}

function setItem(name, value) {
    return localStorage.setItem(name, value);
}

let clicks = Number(getItem('clicks'));
let cpc = Number(getItem('cpc')) > 0 ? Number(getItem('cpc')) : 1;
let cps = Number(getItem('cps'));
let xp_prog = Number(getItem('exp_prog'));
let exp_mult = Number(getItem('exp_mult')) > 0 ? Number(getItem('exp_mult')) : 0.5;
let level = Number(getItem('level')) > 0 ? Number(getItem('level')) : 1;
let boomprog = 0;

let levelElem = document.getElementById('level');
let counterElem = document.getElementById('counter');
let cpcElem = document.getElementById('cpc');
let cpsElem = document.getElementById('cps');
let toNextLevelElem = document.getElementById('to_next_level');
let imageElem = document.getElementById('image');
let expCounterElem = document.getElementById('exp_counter');
let expElem = document.getElementById('exp');

function loadpage() {
    levelElem.innerHTML=level;
    counterElem.innerHTML=Math.floor(clicks);
    cpcElem.innerHTML=cpc;
    cpsElem.innerHTML=cps;
    if (Number(getItem('to_next_level')) > 0) {
        toNextLevelElem.innerHTML = getItem('to_next_level');
    }
}

function startcps() {
    setInterval(continuecps,10);
}

function continuecps() {
    clicks += cps*.01;
    exp_prog += cps*.01;
    counterElem.innerHTML = Math.floor(clicks);
    setItem('clicks', clicks);
    exp_up();
}

function clicked() {
    clicks += cpc;
    exp_prog += cpc;
    boomprog++;
    
    if (boomprog === 100) {
        boom();
    }
    
    counterElem.innerHTML = Math.floor(clicks);
    setItem('clicks', clicks);
    exp_up();
}

function exp_up() {
    setItem('exp_prog', exp_prog);
    expCounterElem.innerHTML=Math.floor(exp_prog);
    expElem.style.width=exp_prog*exp_mult + "%";
    if (Number(expCounterElem.innerHTML) > Number(toNextLevelElem.innerHTML)) {
        exp_prog = exp_prog - Number(toNextLevelElem.innerHTML);
        setItem('exp_prog', exp_prog);
        expCounterElem.innerHTML=Math.floor(exp_prog);
        lvl_up();
        expElem.style.width = exp_prog*exp_mult + "%";
        exp_up();
    }
}

function lvl_up() {
    level++;
    setItem('level', level);
    levelElem.innerHTML = level;
    if (level === 2) {
        toNextLevelElem.innerHTML = 1000;
        exp_mult /= 1000;
        setItem('exp_mult', exp_mult);
        setItem('to_next_level', Number(toNextLevelElem.innerHTML));
    }
        
    else {
        toNextLevelElem.innerHTML=toNextLevelElem.innerHTML + "000";
        exp_mult /= 1000;
        setItem('exp_mult', exp_mult);
        setItem('to_next_level', Number(toNextLevelElem.innerHTML));
    }
}

function boom() {
    boomprog = 0;
    imageElem.src="explosion.gif";
    setTimeout(() => {
        imageElem.src="eggroll.png";
    }, 800);
}

function upgrade(resourceCost, increment, type) {
    if (document.getElementById("buy_all").checked) {
        var available = Math.floor(clicks/resourceCost);
        clicks = clicks - resourceCost*available;
        counterElem.innerHTML = Math.floor(clicks);
        
        if (type == 'cpc') {
            cpc += available*increment;
            cpcElem.innerHTML = cpc;
            setItem('cpc', cpc);
        }
            
        else if (type == 'cps') {
            cps += available*increment;
            cpsElem.innerHTML = cps;
            setItem('cps', cps);
        }
    }
        
    else if (clicks >= resourceCost) {
        clicks -= resourceCost;
        counterElem.innerHTML = Math.floor(clicks);
        
        if (type == 'cpc') {
            cpc += increment;
            cpcElem.innerHTML = cpc;
            setItem('cpc', cpc);
        }
            
        else if (type == 'cps') {
            cps += increment;
            cpsElem.innerHTML = cps;
            setItem('cps', cps);
        }
    }
        
    else {
        alert("Not Enough Egg Rolls!");
    }
}

function reset() {
    if (!confirm('Are you sure you want to reset all of your progress?'))
        return;
    if (!confirm('Are you really really sure? (You will not recieve anything.)'))
        return;
    
    clicks = 0;
    cpc = 1;
    cps = 0;
    boomprog = 0;
    exp_prog = 0;
    exp_mult = .5;
    level = 1;
    setItem('clicks', clicks);
    setItem('cpc', cpc);
    setItem('cps', cps);
    setItem('level', level);
    setItem('exp_mult', exp_mult);
    setItem('exp_prog', exp_prog);
    setItem('to_next_level', 100);
    levelElem.innerHTML=level;
    toNextLevelElem.innerHTML="100";
    counterElem.innerHTML=clicks;
    cpcElem.innerHTML=cpc;
    cpsElem.innerHTML=cps;
}
} catch(e) {alert(e)}
