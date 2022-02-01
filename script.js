const themeSwitcher=document.querySelector(".fa-sun");
const speedFrame=document.getElementById("speedFrame");
const close=document.getElementById("close");
const speedTest=document.querySelectorAll(".speed");
const folderSize=document.getElementById("folder-size");
const downloadSpeed=document.getElementById("download-speed");
const calculatorDiv=document.querySelector(".calculator");
const result=document.getElementById("result");
const calculateBtn=document.getElementById("calculate-btn");
const folderSizeselect=document.getElementById("folder-size-select");
const downloadSpeedselect=document.getElementById("download-speed-select");
const ScrolltimeCalcBtn=document.getElementById("timeCalc");
const ScrollinfoBtn=document.getElementById("info");
const moveUpBtn=document.getElementById("moveUp");


let theme =localStorage.getItem("Theme")

//Display SpeedTest
speedTest.forEach(speedItem=>
{
    
    speedItem.addEventListener("click",()=>
    {
        if(speedFrame.style.display=="none")
        {
            speedFrame.style.display="inline";
            close.style.display="inline";
            close.addEventListener("click",()=>
            {
                speedFrame.style.display="none";
                close.style.display="none";
            });
        }
        else
        {
            speedFrame.style.display="none";
            close.style.display="none";
        } 
    });
});

//Page Loading
document.addEventListener("DOMContentLoaded", function() {
    
    downloadSpeed.value=localStorage.getItem("Download Speed");
    speedFrame.style.display="none";


    //Theme Change
    document.documentElement.setAttribute("theme", theme);
    themeSwitcher.addEventListener("click",()=>
    {
        const currentTheme = document.documentElement.getAttribute("theme");

        theme = currentTheme == "dark" ? "light" : "dark";
        document.documentElement.setAttribute("theme", theme);

        localStorage.setItem("Theme",theme)

    });
});

//Calculate Time
calculateBtn.addEventListener("click",()=>
{
    if(folderSize.value.length != 0 && downloadSpeed.value.length != 0)
    {
        calculatorDiv.style.height="340px";
        result.style.display="inline";

        calculateTime();

        localStorage.setItem("Download Speed",downloadSpeed.value);
        
        
       
    }
    else
    {
        result.innerText="Lütfen dosya boyutu ve indirme hızını girin";
        calculatorDiv.style.height="340px";
        result.style.display="inline";
    }
});

function calculateTime()
{
    const mapToBytes = 
    {
    "Kbps": 128,
    "Mbps": 131072,
    "Gbps": 134217728,
    "KB": 1024,
    "MB": 1048576,
    "GB": 1073741824,
    "TB":1099511627776
    };

    totalMilisecond=mapToBytes[folderSizeselect.value]*folderSize.value/(mapToBytes[downloadSpeedselect.value]*downloadSpeed.value)*1000;

    result.innerText=humanizeDuration(totalMilisecond, {language:"tr",round:true});  
}

//Scroll Element
ScrolltimeCalcBtn.addEventListener("click",()=>
{
    document.querySelector('.container').scrollIntoView({ 
        behavior: 'smooth' 
      });
});

ScrollinfoBtn.addEventListener("click",()=>
{
    document.querySelector('.info-text').scrollIntoView({ 
        behavior: 'smooth' 
      });
});

moveUpBtn.addEventListener("click",()=>
{
    document.querySelector('header').scrollIntoView({ 
        behavior: 'smooth' 
      });
})

window.addEventListener("scroll",()=>
{
    document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? moveUpBtn.style.display="block" : moveUpBtn.style.display="none";
});