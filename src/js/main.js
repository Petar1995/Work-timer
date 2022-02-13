
function drawClock()
{
        //linije na satu
        var clock = document.getElementById("clock");
        var lines = document.createElement("div");
        for(var i=0; i<60; i++)
        {
            var line = document.createElement("div");
            var lineHolder = document.createElement("div");
            lineHolder.style.position = "absolute";
            lineHolder.style.top = "0%";
            lineHolder.style.left = "0%";
            lineHolder.style.height = "100%";
            lineHolder.style.width = "100%";
            lineHolder.style.transform = "rotateZ(" + 360/60*i + "deg)";
    
        
            line.style.color = "black";
            line.style.border = "1px solid black";
            if(i%5===0)
            {
                line.style.height = "5%";
            }
            else
            {
                line.style.height = "2%";
            }
            line.style.width = "2px";
            line.style.margin = "auto";
        
            lineHolder.appendChild(line);
            lines.appendChild(lineHolder);
        }
        clock.appendChild(lines);
}

function main()
{

    //logika za sat 
    var workTime = 25;
    var breakTime = 5;

    var startTimerBtn = document.getElementById("startTimer");
    var startWorkTimeText = document.getElementById("startWorkTimeText");
    var startBreakTimeText = document.getElementById("startBreakTimeText");
    var remainingTime = document.getElementById("remainingTime");
    var clockPointer = document.getElementById("clockPointer");
    var paused = false;
    var timerStarted = false;
    var timer;
    var elapsedTime = 0;
    var isBreak = false;
    var audio = new Audio('src/audio/done.mp3');

    remainingTime.innerHTML = workTime + " minutes";
    startWorkTimeText.innerHTML = workTime;
    startBreakTimeText.innerHTML = breakTime;

    const resetClock = function()
    {
        clearInterval(timer);
        timerStarted = false;
        remainingTime.innerHTML = workTime + " minutes";
        document.getElementById("remainingTimeText").innerHTML = "Time until break:";
        paused = false;
        clockPointer.style.transform = "rotateZ(0deg)";
        startTimerBtn.children[0].classList.add("fa-play");
        startTimerBtn.children[0].classList.remove("fa-pause");
    }
    const togglePlayIcon = function()
    {
        startTimerBtn.children[0].classList.toggle("fa-play");
        startTimerBtn.children[0].classList.toggle("fa-pause");
    }
    const startTimer = function(temp)
    {
        var sekund = 0;
        goingTimer = temp;
        elapsedTime = 0;
        remainingTime.innerHTML = goingTimer - elapsedTime - 1 + " minutes";
        timerStarted=true;
        clearInterval(timer);
        timer = setInterval(() => 
        {
            if(paused) return;
            sekund++;
            clockPointer.style.transform = "rotateZ(" + 360/60*sekund + "deg";
            if(sekund===60)
            {  
                elapsedTime++;
                sekund=0;
                remainingTime.innerHTML = goingTimer - elapsedTime - 1 + " minutes";
                if(goingTimer - elapsedTime === 0)
                {
                    audio.play();
                    resetClock();
                    if(!isBreak)
                    {
                        startTimer(breakTime);
                        togglePlayIcon();
                        isBreak = true;
                        document.getElementById("remainingTimeText").innerHTML = "Break time!";
                    }
                    else if(isBreak)
                    {
                        startTimer(workTime);
                        togglePlayIcon();
                        isBreak = false;
                        document.getElementById("remainingTimeText").innerHTML = "Time until break:";
                    }
                }

            }
        }, 1000);
    }



    
    document.getElementById("increaseBreakTime").addEventListener("click", function()
    {
        if(timerStarted) return;
        breakTime++;
        startBreakTimeText.innerHTML = breakTime;
    });
    document.getElementById("decreaseBreakTime").addEventListener("click", function()
    {
        if(timerStarted) return;
        if(breakTime<=1) return;
        breakTime--;
        startBreakTimeText.innerHTML = breakTime;
    });
    startTimerBtn.addEventListener("click", function()
    {
        if(timerStarted)
        {
            paused=!paused;
            togglePlayIcon();
            return;
        }
        togglePlayIcon();
        startTimer(workTime);
    });
    document.getElementById("resetTimer").addEventListener("click", function()
    { 
        resetClock();
        isBreak = false;
    });
    document.getElementById("increaseWorkTime").addEventListener("click", function()
    {
        if(timerStarted) return;
        workTime++;
        startWorkTimeText.innerHTML = workTime;
        remainingTime.innerHTML = workTime + " minutes";
    });
    document.getElementById("decreaseWorkTime").addEventListener("click", function()
    {
        if(timerStarted) return;
        if(workTime<=1) return;
        workTime--;
        startWorkTimeText.innerHTML = workTime;
        remainingTime.innerHTML = workTime + " minutes";
    });
}

main();
drawClock();