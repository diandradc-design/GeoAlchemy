const images = {

"Magma":"assets/Magma.png",
"Cooling":"assets/Cooling.png",

"Igneous Rock":"assets/Igneous Rock.png",

"High Silica":"assets/High Silica.png",
"Low Silica":"assets/Low Silica.png",

"Granite":"assets/Granite.png",
"Basalt":"assets/Basalt.png",

"Weathering & Erosion":"assets/Weathering & Erosion.png",

"Sediment":"assets/Sediment.png",

"Litification":"assets/Litification.png",

"Sedimentary Rock":"assets/Sedimentary Rock.png",

"Organism":"assets/Organism.png",

"Limestone":"assets/Limestone.png",

"Sand":"assets/Sand.png",

"Sandstone":"assets/Sandstone.png",

"Clay":"assets/Clay.png",

"Claystone":"assets/Claystone.png",

"Pressure":"assets/Pressure.png",

"High Temperature":"assets/High Temperature.png",

"Metamorphic Rock":"assets/Metamorphic Rock.png",

"Marble":"assets/Marble.png",

"Quartzite":"assets/Quartzite.png",

"Slate":"assets/Slate.png"

};



let discovered = [

"Magma",
"Cooling",
"High Silica",
"Low Silica",
"Weathering & Erosion",
"Litification",
"Organism",
"Sand",
"Clay",
"Pressure",
"High Temperature"

];



const recipes = {


"Magma+Cooling":"Igneous Rock",


"Igneous Rock+High Silica":"Granite",

"Igneous Rock+Low Silica":"Basalt",



"Igneous Rock+Weathering & Erosion":"Sediment",

"Sedimentary Rock+Weathering & Erosion":"Sediment",

"Metamorphic Rock+Weathering & Erosion":"Sediment",



"Sediment+Litification":"Sedimentary Rock",



"Sedimentary Rock+Organism":"Limestone",

"Sedimentary Rock+Sand":"Sandstone",

"Sedimentary Rock+Clay":"Claystone",



"Igneous Rock+Pressure":"Metamorphic Rock",

"Igneous Rock+High Temperature":"Metamorphic Rock",

"Sedimentary Rock+Pressure":"Metamorphic Rock",

"Sedimentary Rock+High Temperature":"Metamorphic Rock",



"Limestone+Pressure":"Marble",

"Limestone+High Temperature":"Marble",

"Sandstone+Pressure":"Quartzite",

"Sandstone+High Temperature":"Quartzite",

"Claystone+Pressure":"Slate",

"Claystone+High Temperature":"Slate"

};





const descriptions = {


"Igneous Rock":
"Igneous rocks form when magma cools and solidifies.",


"Granite":
"Granite is an intrusive igneous rock formed from slow cooling silica-rich magma.",


"Basalt":
"Basalt is an extrusive igneous rock formed from rapidly cooled lava.",


"Sediment":
"Sediment forms from weathering and erosion of existing rocks.",


"Sedimentary Rock":
"Sedimentary rocks form through compaction and cementation of sediments.",


"Limestone":
"Limestone forms mainly from biological materials such as shells and marine organisms.",


"Sandstone":
"Sandstone forms from compacted and cemented sand grains.",


"Claystone":
"Claystone forms from compacted clay sediments.",


"Metamorphic Rock":
"Metamorphic rocks form when existing rocks experience high pressure and temperature without melting.",


"Marble":
"Marble forms when limestone undergoes metamorphism.",


"Quartzite":
"Quartzite forms when sandstone undergoes metamorphism.",


"Slate":
"Slate forms when claystone undergoes metamorphism."

};





function renderElements(){


let container=document.getElementById("elements");

container.innerHTML="";



discovered.forEach(element=>{


let card=document.createElement("div");

card.className="element-card";


card.draggable=true;


card.innerHTML=`

<img src="${images[element]}">

<p>${element}</p>

`;



// LAPTOP DRAG

card.addEventListener("dragstart",function(e){

e.dataTransfer.setData(
"element",
element
);

});



// HP TOUCH DRAG

let touchStart=false;


card.addEventListener("touchstart",function(){

touchStart=true;

card.style.opacity="0.5";

});



card.addEventListener("touchend",function(e){


if(touchStart){


let target=document.elementFromPoint(

e.changedTouches[0].clientX,

e.changedTouches[0].clientY

);



if(target && target.closest(".element-card")){


let second=

target.closest(".element-card").dataset.name;


combine(element,second);


}


}


card.style.opacity="1";

touchStart=false;


});



// klik untuk lihat deskripsi

card.onclick=function(){

showDiscovery(element);

};


card.dataset.name=element;


container.appendChild(card);



});


}







let firstElement=null;


const combineArea=document.getElementById("combine-area");



combineArea.addEventListener(
"dragover",
function(e){

e.preventDefault();

}

);



combineArea.addEventListener(
"drop",
function(e){

e.preventDefault();


let element=e.dataTransfer.getData("element");


if(firstElement==null){

firstElement=element;

combineArea.innerHTML=
"Selected : "+element;


}

else{


combine(firstElement,element);


firstElement=null;


combineArea.innerHTML=
"Combine Elements";


}


});







function combine(a,b){


let result=

recipes[a+"+"+b] ||

recipes[b+"+"+a];



if(result){


if(!discovered.includes(result)){


discovered.push(result);

renderElements();


}



showDiscovery(result);


}

}








function showDiscovery(element){


let popup=document.getElementById("discovery-popup");

let content=document.getElementById("popup-content");



content.innerHTML=`

<button id="close-popup">✖</button>

<h2>✨ ${element}</h2>

<img src="${images[element]}">

<p>
${descriptions[element] || ""}
</p>

`;



popup.style.display="flex";



document.getElementById("close-popup").onclick=function(){

popup.style.display="none";

};


}







function resetGame(){


discovered=[

"Magma",
"Cooling",
"High Silica",
"Low Silica",
"Weathering & Erosion",
"Litification",
"Organism",
"Sand",
"Clay",
"Pressure",
"High Temperature"

];


renderElements();


}





window.onload=function(){

renderElements();

};