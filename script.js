// ======================
// IMAGES
// ======================

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


// ======================
// START ELEMENTS
// ======================

const starterElements = [

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

let discovered = [...starterElements];


// ======================
// RECIPES
// ======================

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


// ======================
// DESCRIPTIONS
// ======================

const descriptions = {

"Igneous Rock":"Igneous rocks form when magma or lava cools and solidifies.",

"Granite":"Granite is an intrusive igneous rock formed by slow cooling of silica-rich magma underground.",

"Basalt":"Basalt is an extrusive igneous rock formed from rapidly cooled lava.",

"Sediment":"Sediment consists of particles produced by weathering and erosion of rocks.",

"Sedimentary Rock":"Sedimentary rocks form through lithification, including compaction and cementation.",

"Limestone":"Limestone mainly forms from accumulated carbonate materials produced by marine organisms.",

"Sandstone":"Sandstone forms from compacted and cemented sand grains.",

"Claystone":"Claystone forms from compacted clay-rich sediments.",

"Metamorphic Rock":"Metamorphic rocks form when existing rocks are altered by pressure and temperature without melting.",

"Marble":"Marble forms when limestone undergoes metamorphism and recrystallization.",

"Quartzite":"Quartzite forms when sandstone undergoes metamorphism.",

"Slate":"Slate forms when claystone undergoes metamorphism."

};


// ======================
// TYPES
// ======================

const elementType = {

"Magma":"magma",

"Igneous Rock":"igneous",
"Granite":"igneous",
"Basalt":"igneous",

"Sediment":"sediment",

"Sedimentary Rock":"sedimentary",
"Limestone":"sedimentary",
"Sandstone":"sedimentary",
"Claystone":"sedimentary",

"Metamorphic Rock":"metamorphic",
"Marble":"metamorphic",
"Quartzite":"metamorphic",
"Slate":"metamorphic",

"High Silica":"material",
"Low Silica":"material",
"Sand":"material",
"Clay":"material",
"Organism":"material",

"Cooling":"process",
"Pressure":"process",
"High Temperature":"process",
"Weathering & Erosion":"process",
"Litification":"process"

};


// ======================
// MENU
// ======================

function startGame(){

document.getElementById("menu-screen").style.display="none";

document.getElementById("game-screen").style.display="block";

renderElements();

}


function showAbout(){

const popup=document.getElementById("discovery-popup");

const content=document.getElementById("popup-content");

content.innerHTML=`

<button id="close-popup">✖</button>

<h2>About Geo Alchemy</h2>

<p>
Geo Alchemy is an educational game designed to help players learn the rock cycle through interactive element combinations.
</p>

`;

popup.style.display="flex";

document.getElementById("close-popup").onclick=()=>{

popup.style.display="none";

};

}


function resetGame(){

discovered=[...starterElements];

renderElements();

}


// ======================
// RENDER
// ======================

function renderElements(){

const container=document.getElementById("elements");

container.innerHTML="";

discovered.forEach(element=>{

const card=document.createElement("div");

card.className="element-card "+(elementType[element]||"");

card.draggable=true;

card.innerHTML=`

<img src="${images[element]}">

<p>${element}</p>

`;

card.ondragstart=function(e){

e.dataTransfer.setData("element",element);

};

card.onclick=function(){

showDiscovery(element);

};

container.appendChild(card);

});

}


// ======================
// COMBINE
// ======================

let dropped=[];

const area=document.getElementById("combine-area");

area.ondragover=function(e){

e.preventDefault();

};

area.ondrop=function(e){

e.preventDefault();

const element=e.dataTransfer.getData("element");

dropped.push(element);

area.innerHTML=dropped.join(" + ");

if(dropped.length===2){

combine(dropped[0],dropped[1]);

dropped=[];

setTimeout(()=>{

area.innerHTML="Drop elements here";

},1000);

}

};


function combine(a,b){

const result=
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


// ======================
// POPUP
// ======================

function showDiscovery(element){

const popup=document.getElementById("discovery-popup");

const content=document.getElementById("popup-content");

content.innerHTML=`

<button id="close-popup">✖</button>

<h2>${element}</h2>

<img src="${images[element]}">

<p>
${descriptions[element] || "A geological discovery."}
</p>

`;

popup.style.display="flex";

document.getElementById("close-popup").onclick=()=>{

popup.style.display="none";

};

}