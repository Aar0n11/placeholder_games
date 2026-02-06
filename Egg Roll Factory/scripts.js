clicks = Number(localStorage.getItem('clicks'));
if (Number(localStorage.getItem('cpc')) > 0) {
    cpc = Number(localStorage.getItem('cpc'));
}
else {
    cpc = 1;
}
cps = Number(localStorage.getItem('cps'));
exp_prog = Number(localStorage.getItem('exp_prog'));
if (Number(localStorage.getItem('exp_mult')) > 0) {
    exp_mult = Number(localStorage.getItem('exp_mult'));
}
else {
    exp_mult = .5;
}
if (Number(localStorage.getItem('level')) > 0) {
    level = Number(localStorage.getItem('level'));
}
else {
    level = 1;
}
boomprog = 0;
function loadpage() {
    document.getElementById('level').innerHTML=level;
    document.getElementById('counter').innerHTML=Math.floor(clicks);
    document.getElementById('cpc').innerHTML=cpc;
    document.getElementById('cps').innerHTML=cps;
    if (Number(localStorage.getItem('to_next_level')) > 0) {
        document.getElementById('to_next_level').innerHTML = localStorage.getItem('to_next_level');
    }
}
function startcps() {
    setInterval(continuecps,10);
}
function continuecps() {
    clicks = clicks + cps*.01;
    exp_prog = exp_prog + cps*.01;
    document.getElementById('counter').innerHTML=Math.floor(clicks);
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
    document.getElementById('counter').innerHTML=Math.floor(clicks);
    localStorage.setItem('clicks', clicks);
    exp_up();
}
function exp_up() {
    localStorage.setItem('exp_prog', exp_prog);
    document.getElementById('exp_counter').innerHTML=Math.floor(exp_prog);
    document.getElementById('exp').style.width=exp_prog*exp_mult + "%";
    if (Number(document.getElementById('exp_counter').innerHTML) > Number(document.getElementById('to_next_level').innerHTML)) {
        exp_prog = exp_prog - Number(document.getElementById('to_next_level').innerHTML);
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
    document.getElementById('level').innerHTML=level;
    if (level == 2) {
        document.getElementById('to_next_level').innerHTML=1000;
        exp_mult = exp_mult/10
        localStorage.setItem('exp_mult', exp_mult);
        localStorage.setItem('to_next_level', Number(document.getElementById('to_next_level').innerHTML));
    }
    else {
        document.getElementById('to_next_level').innerHTML=document.getElementById('to_next_level').innerHTML + "000";
        exp_mult = exp_mult/1000
        localStorage.setItem('exp_mult', exp_mult);
        localStorage.setItem('to_next_level', Number(document.getElementById('to_next_level').innerHTML));
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
            document.getElementById('cpc').innerHTML = cpc;
            localStorage.setItem('cpc', cpc);
        }
        else if (type == 'cps') {
            cps += available*increment;
            document.getElementById('cps').innerHTML = cps;
            localStorage.setItem('cps', cps);
        }
    }
    else if (clicks >= resourceCost) {
        clicks -= resourceCost;
        document.getElementById('counter').innerHTML = Math.floor(clicks);
        if (type == 'cpc') {
            cpc += increment;
            document.getElementById('cpc').innerHTML = cpc;
            localStorage.setItem('cpc', cpc);
        }
        else if (type == 'cps') {
            cps += increment;
            document.getElementById('cps').innerHTML = cps;
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
            document.getElementById('level').innerHTML=level;
            document.getElementById('to_next_level').innerHTML="100";
            localStorage.setItem('to_next_level', Number(document.getElementById('to_next_level').innerHTML));
            document.getElementById('counter').innerHTML=clicks;
            document.getElementById('cpc').innerHTML=cpc;
            document.getElementById('cps').innerHTML=cps;
        }
    }
}
