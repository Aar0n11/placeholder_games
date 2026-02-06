let clicks = Number(getItem('clicks'));
let cpc = Number(getItem('cpc')) > 0 ? Number(getItem('cpc')) : 1;
let cps = Number(getItem('cps'));
let xp_prog = Number(getItem('exp_prog'));
let exp_mult = Number(getItem('exp_mult')) > 0 ? Number(getItem('exp_mult')) : 0.5;
let level = Number(getItem('level')) > 0 ? Number(getItem('level')) : 1
let boomprog = 0;

let levelElem = document.getElementById('level');
let counterElem = document.getElementById('counter');
let cpcElem = document.getElementById('cpc');
let cpsElem = document.getElementById('cps');
let toNextLevelElem = document.getElementById('to_next_level');

function getItem(name) {
    return localstorage.getItem(name);
}

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
    clicks = clicks + cps*.01;
    exp_prog = exp_prog + cps*.01;
    counterElem.innerHTML=Math.floor(clicks);
    localStorage.setItem('clicks', clicks);
    exp_up();
}

function clicked() {
    clicks = clicks + cpc;
    exp_prog = exp_prog + cpc;
    boomprog = boomprog + 1;
    if (boomprog == 100) {
        boom();
    }
    counterElem.innerHTML=Math.floor(clicks);
    localStorage.setItem('clicks', clicks);
    exp_up();
}

function exp_up() {
    localStorage.setItem('exp_prog', exp_prog);
    document.getElementById('exp_counter').innerHTML=Math.floor(exp_prog);
    document.getElementById('exp').style.width=exp_prog*exp_mult + "%";
    if (Number(document.getElementById('exp_counter').innerHTML) > Number(toNextLevelElem.innerHTML)) {
        exp_prog = exp_prog - Number(toNextLevelElem.innerHTML);
        localStorage.setItem('exp_prog', exp_prog);
        document.getElementById('exp_counter').innerHTML=Math.floor(exp_prog);
        lvl_up();
        document.getElementById('exp').style.width = exp_prog*exp_mult + "%";
        exp_up();
    }
}

function lvl_up() {
    level = level + 1;
    localStorage.setItem('level', level);
    levelElem.innerHTML=level;
    if (level == 2) {
        toNextLevelElem.innerHTML=1000;
        exp_mult = exp_mult/10
        localStorage.setItem('exp_mult', exp_mult);
        localStorage.setItem('to_next_level', Number(toNextLevelElem.innerHTML));
    }
        
    else {
        toNextLevelElem.innerHTML=toNextLevelElem.innerHTML + "000";
        exp_mult = exp_mult/1000
        localStorage.setItem('exp_mult', exp_mult);
        localStorage.setItem('to_next_level', Number(toNextLevelElem.innerHTML));
    }
}

function boom() {
    boomprog = 0;
    document.getElementById('image').src="explosion.gif";
    setTimeout(function(){
        document.getElementById('image').src="eggroll.png";
    }, 800);
}

function upgrade(resourceCost, increment, type) {
    if (document.getElementById("buy_all").checked) {
        var available = Math.floor(clicks/resourceCost);
        clicks = clicks - resourceCost*available;
        document.getElementById("counter").innerHTML = Math.floor(clicks);
        
        if (type == 'cpc') {
            cpc += available*increment;
            cpcElem.innerHTML = cpc;
            localStorage.setItem('cpc', cpc);
        }
            
        else if (type == 'cps') {
            cps += available*increment;
            cpsElem.innerHTML = cps;
            localStorage.setItem('cps', cps);
        }
    }
        
    else if (clicks >= resourceCost) {
        clicks -= resourceCost;
        counterElem.innerHTML = Math.floor(clicks);
        
        if (type == 'cpc') {
            cpc += increment;
            cpcElem.innerHTML = cpc;
            localStorage.setItem('cpc', cpc);
        }
            
        else if (type == 'cps') {
            cps += increment;
            cpsElem.innerHTML = cps;
            localStorage.setItem('cps', cps);
        }
    }
        
    else {
        alert("Not Enough Egg Rolls!");
    }
}
function reset() {
    if (confirm('Are you sure you want to reset all of your progress?')) {
        if (confirm('Are you really really sure? (You will not recieve anything.)')) {
            clicks = 0;
            cpc = 1;
            cps = 0;
            boomprog = 0;
            exp_prog = 0;
            exp_mult = .5;
            level = 1;
            localStorage.setItem('clicks', clicks);
            localStorage.setItem('cpc', cpc);
            localStorage.setItem('cps', cps);
            localStorage.setItem('level', level);
            localStorage.setItem('exp_mult', exp_mult);
            localStorage.setItem('exp_prog', exp_prog);
            levelElem.innerHTML=level;
            toNextLevelElem.innerHTML="100";
            localStorage.setItem('to_next_level', Number(toNextLevelElem.innerHTML));
            counterElem.innerHTML=clicks;
            cpcElem.innerHTML=cpc;
            cpsElem.innerHTML=cps;
        }
    }
}
