function parseAndFormat () {
    let presentationElement = document.querySelector(".presentation");
    presentationElement.innerHTML =
'	<div id="open-window">\
	    <div class="format-container">\
	    <div class="rotate-container">\
		<div class="scale-container">\
		    <div class="universe movable" id="universe">\
			<div width="10000" height="10000" class="fog"></div>\
			<canvas style="position:absolute;top:0;left:0;z-index:-2" width="10000" height="10000" id="globalCanvas" class="background-canvas"></canvas>\
' + presentationElement.innerHTML + '\
		    </div>\
		</div>\
		</div>\
	    </div>\
	</div>';
    presentationElement.querySelectorAll(".slide").forEach((slideElem) => {
	slideElem.innerHTML = '\
    <div class="slide-rotate-container"><canvas style="position:absolute;top:0;left:0;z-index:-2" width="1440" height="1080" class="background-canvas" id="canvas-'+slideElem.id+'"></canvas><div class="slide-container">'+ slideElem.innerHTML + '\
</div>';
    });
    // document.querySelector(".globalCanvas").addEventListener("click", (ev) => { console.log("vous avez cliquez aux coordonées : ", ev.layerX, ev.layerY); });
    document.querySelectorAll(".background-canvas").forEach((elem)=> {elem.addEventListener("click", (ev) => { console.log("vous avez cliquez aux coordonnées : ", ev.layerX, ev.layerY); });});
    
}
parseAndFormat();

let Engine = function() {
    // Constants
    document.body.style.cursor = "auto";
    document.body.addEventListener("mousemove", (ev) => {
	setTimeout(() => { document.body.style.cursor = "none";}, 5000);
    });
    let openWindow = document.querySelector("#open-window");
    let universe = document.querySelector("#universe");
    let slides = universe.querySelectorAll(".slide");
    let browserHeight, openWindowWidth;
    let browserWidth, openWindowHeight;
    this.getOpenWindowHeight = () => openWindowHeight;
    this.getOpenWindowWidth = () => openWindowWidth;

    let winX, winY;
    let currentScale, currentRotate;

    this.moveWindow = function (x, y, scale, rotate, delay) {
	console.log("move to", x, y, "with scale, rotate, delay", scale, rotate, delay);
	currentScale = scale;
	currentRotate = rotate;
	winX = x ;
	winY = y;
	console.log(x,y);
	document.querySelector(".scale-container").style.transitionDuration = delay+"s";
	document.querySelector(".rotate-container").style.transitionDuration = delay+"s";
	universe.style.transitionDuration = delay+"s, "+delay+ "s"; 
	universe.style.left = -(x*1440 - 1440/2)+"px";
	universe.style.top = -(y*1080 - 1080/2)+"px";
	document.querySelector(".scale-container").style.transform = "scale("+(1/scale)+")";
	document.querySelector(".rotate-container").style.transform = "rotate("+(rotate)+"deg)";
    };
    this.moveWindowRelative = function(dx, dy, dscale, drotate, delay) {
	this.moveWindow(winX+dx, winY+dy, currentScale+dscale, currentRotate+drotate, delay);
    };
    this.placeSlides = function () {
	slides.forEach((slide) => {
	    // slide.style.width = openWindowWidth+"px";
	    // slide.style.height = openWindowHeight+"px";
	    let x=parseFloat(slide.getAttribute("pos-x")), y=parseFloat(slide.getAttribute("pos-y"));
	    slide.style.top = (y*1080 - 1080/2)+"px";
	    slide.style.left = (x*1440 - 1440/2)+"px";
	    // slide.style.transformOrigin = (openWindowWidth/2)+"px "+(openWindowHeight/2)+"px";
	    // slide.style.transform = "rotate("+slide.getAttribute("rotate")+"deg) scale("+slide.getAttribute("scale")+")";
	    if(!slide.classList.contains("permanent"))
		slide.style.zIndex = "-1";
	    // slide.style.transformOrigin = "0px 0px";
	    slide.style.transformOrigin = "50% 50%";
	    // console.log("frame scale is", slide.scale);
	    slide.style.transform = "scale("+parseFloat(slide.getAttribute("scale"))+")";

	});	
    };
    this.placeSlides();
    this.placeOpenWindow = function () {
	browserHeight = window.innerHeight;
	browserWidth = window.innerWidth;
	if(browserHeight/3 < browserWidth/4) {
	    openWindowWidth = Math.floor((browserHeight*4)/3);
	    openWindowHeight = browserHeight;
	    openWindow.style.left = ((window.innerWidth - openWindowWidth) /2)+"px";
	    openWindow.style.right = ((window.innerWidth - openWindowWidth) /2)+"px";
	    openWindow.style.width = (openWindowWidth)+"px";
	    openWindow.style.top = "0";
	    openWindow.style.bottom = "0";
	    openWindow.style.height = (openWindowHeight)+"px";
	}
	else {
	    openWindowHeight = Math.floor((browserWidth*3)/4);
	    openWindowWidth = browserWidth;
	    openWindow.style.top = ((window.innerHeight - openWindowHeight) /2)+"px";
	    openWindow.style.bottom = ((window.innerHeight - openWindowHeight) /2)+"px";
	    openWindow.style.height = (openWindowHeight)+"px";
	    openWindow.style.right = "0";
	    openWindow.style.left = "0";
	    openWindow.style.width = openWindowWidth+"px";
	}
	// document.querySelector(".scale-container").style.transformOrigin = "50% 50%";
	// document.querySelector(".rotate-container").style.transformOrigin = "50% 50%"; 
	document.querySelector(".scale-container").style.transformOrigin = (1440/2)+"px "+(1080/2)+"px";
	document.querySelector(".rotate-container").style.transformOrigin = (1440/2)+"px "+(1080/2)+"px";
	document.querySelector(".format-container").style.transform = "scale("+(openWindowWidth/1440)+")";
	document.querySelector(".cpt-slip").style.right =  (parseInt(openWindow.style.left)) + "px";
	document.querySelector(".cpt-slip").style.bottom =  "0";
	document.querySelector(".cpt-slip").style.zIndex =  "10";
    };
    this.placeOpenWindow();
    // this.resizeOpenWindow = function() {
    // 	browserHeight = window.innerHeight;
    // 	browserWidth = window.innerWidth;
    // 	// Create an open window to the universe, of aspect ratio 4:3
    // 	openWindowHeight = browserHeight = 1080;
    // 	openWindowWidth = browserWidth = 1440;
    // 	openWindowWidth = Math.floor((browserHeight*4)/3);
    // 	openWindowHeight = browserHeight;
    // 	openWindow.style.left = ((window.innerWidth - openWindowWidth) /2)+"px";
    // 	openWindow.style.right = ((window.innerWidth - openWindowWidth) /2)+"px";
    // 	openWindow.style.width = (openWindowWidth)+"px";
    // 	openWindow.style.top = "0";
    // 	openWindow.style.bottom = "0";
    // 	openWindow.style.height = (openWindowHeight)+"px";
    // 	// Resize each frame
    // 	// document.querySelector(".scale-container").style.transformOrigin = "0px 0px";
    // 	document.querySelector(".scale-container").style.transformOrigin = (openWindowWidth/2)+"px "+(openWindowHeight/2)+"px";
    // 	document.querySelector(".rotate-container").style.transformOrigin = (openWindowWidth/2)+"px "+(openWindowHeight/2)+"px";
    // 	console.log("resized");
    // };
    // this.resizeOpenWindow();
    window.addEventListener("resize", (ev) => {
	// this.resizeOpenWindow();
	this.placeOpenWindow();
	this.moveWindow(winX, winY, currentScale, currentRotate, 0);
    });
    
};

let Controller = function (ng, pres) {
    let engine = ng;
    this.getEngine = () => this.engine;
    this.setEngine = (ng) => this.engine = ng;

    let presentation = pres;
    this.getPresentation = () => presentation;
    this.setPresentation = (pres) => presentation = pres;

    let speedMove=1;
    document.addEventListener("keypress", (ev) => {
	if(ev.key == "f") { speedMove = (speedMove + 4)%30+1; }    
	if(ev.key == "r") { presentation.refresh(); }    
	if(ev.key == "#") {
	    document.querySelectorAll(".slide").forEach((slide) => {slide.style.zIndex = "-1";});
	    document.querySelectorAll(".background-canvas").forEach((canvas) => {canvas.style.zIndex = "1";});
	}    
    });
    document.addEventListener("keydown", (ev) => {
	let openWindowHeight = engine.getOpenWindowHeight();
	let openWindowWidth = engine.getOpenWindowWidth();
	if(ev.key == "l") { engine.moveWindowRelative( 0                          ,  (speedMove)/openWindowHeight, 0, 0, 0.1); }   // Bas
	if(ev.key == "o") { engine.moveWindowRelative( 0                          , -(speedMove)/openWindowHeight, 0, 0, 0.1); }  // Haut
	if(ev.key == "k") { engine.moveWindowRelative(-(speedMove)/openWindowWidth,  0                           , 0, 0, 0.1); }   // Gauche
	if(ev.key == "m") { engine.moveWindowRelative( (speedMove)/openWindowWidth,  0                           , 0, 0, 0.1); }   // Droite
	if(ev.key == "i") { engine.moveWindowRelative(0, 0,  0   ,  1, 0.1); }                             // Rotate 
	if(ev.key == "p") { engine.moveWindowRelative(0, 0,  0   , -1, 0.1); }                             // Unrotate
	if(ev.key == "z") { engine.moveWindowRelative(0, 0,  0.01,  0, 0.1); }                          // Zoom
	if(ev.key == "Z") { engine.moveWindowRelative(0, 0, -0.01,  0, 0.1); }                          // Unzoom
	if(ev.key == "ArrowRight") {
	    console.log(ev);
	    if(ev.shiftKey)
		presentation.nextSlide();
	    else    
		presentation.next();
	    // currentState = (currentState+1)%action.length;
	    // action[currentState]();
	}
	else if (ev.key == "ArrowLeft") {
	    if(ev.shiftKey)
		presentation.previousSlide();
	    else    
		presentation.previous();
	    // console.log(document.URL.split("#")[0]+"#"+((currentState-1+action.length)%action.length));
	    // window.location.href = document.URL.split("#")[0]+"#"+((currentState-1+action.length)%action.length);
	    // document.location.reload(true);
	    // currentState = (currentState-1+action.length)%action.length;
	    
	    // action[currentState]();
	}
    });  
    
};


function Slide (name, init, actionL, ng, firstVisitA) {
    let engine = ng;
    this.getEngine = () => this.engine;
    this.setEngine = (ng) => this.engine = ng;
    
    this.element = document.querySelector(".slide#"+name);
    let initialHTML = this.element.outerHTML;
    let innerHTML = this.element.innerHTML;

    this.x = parseFloat(this.element.getAttribute("pos-x"));
    this.y = parseFloat(this.element.getAttribute("pos-y"));
    this.scale = parseFloat(this.element.getAttribute("scale"));
    this.rotate = parseFloat(this.element.getAttribute("rotate"));
    this.delay = parseFloat(this.element.getAttribute("delay"));

    this.query = (quer) => this.element.querySelector(quer);
    this.queryAll = (quer) => this.element.querySelectorAll(quer);
    let actionList = actionL;
    let actionIndex=0;
    this.setActionIndex = (actionI) => actionIndex = actionI;
    this.getActionIndex = () => actionIndex;
    this.setAction = (actionL) => {actionList = actionL;};

    this.next = function (presentation) {
	if(actionIndex >= actionList.length)
	    return false;
	this.queryAll(".h"+(actionIndex+1)).forEach((elem) => {elem.style.opacity = "0";});	
	this.queryAll(".v"+(actionIndex+1)).forEach((elem) => {elem.style.opacity = "1";});	

	actionList[actionIndex](this, engine, presentation);
	actionIndex = actionIndex+1;
	return true;
    };
    if(firstVisitA)
	this.firstVisit = (presentation) => firstVisitA(this, engine, presentation);
    else
	this.firstVisit = (presentation) => {};
	
    this.refresh = () => {
	this.setActionIndex(0);
	console.log(this.element);
	// this.element.outerHTML = initialHTML;
	this.element.innerHTML = innerHTML;
	MathJax.typeset();
	this.queryAll(".h"+0).forEach((elem) => {elem.style.opacity = "0";});	
	init(this, engine);
	this.firstVisit();
	console.log("ai", actionIndex);
    };
    
    // this.previous : TODO...
    init(this, engine);
    this.queryAll(".h"+0).forEach((elem) => {elem.style.opacity = "0";});	
}

let Presentation = function (ls, ng) {
    let cpt = 0;
    this.getCpt = () => cpt;
    
    let engine = ng;
    this.getEngine = () => this.engine;
    this.setEngine = (ng) => this.engine = ng;
    let listSlides = ls || [];
    let slideIndex = 0;
    this.getListSlides = () => listSlides;
    this.setListSlides = (ls) => listSlides = ls;
    this.getCurrentSlide = () => listSlides[slideIndex];
    this.gotoSlide = function(slide) {
	// let x = slide.x, y = slide.y;
	// let scale = slide.scale, rotate = slide.rotate, delay = slide.delay;
	// console.log(x,y, scale, rotate);
	engine.moveWindow(slide.x, slide.y, slide.scale, slide.rotate, slide.delay);
    };
    this.next = () => {
	listSlides[slideIndex].currentCpt = cpt;
	let flag;
	if((flag = !listSlides[slideIndex].next(this))) {
	    if(!listSlides[slideIndex].element.classList.contains("permanent"))
		listSlides[slideIndex].element.style.zIndex = "-1";
	    slideIndex = Math.min((slideIndex+1),listSlides.length-1);
	    listSlides[slideIndex].element.style.zIndex = "1";
	    if (typeof listSlides[slideIndex].initCpt == "undefined") {
		listSlides[slideIndex].initCpt = cpt;
		listSlides[slideIndex].currentCpt = cpt;
	    }
	    this.gotoSlide(listSlides[slideIndex]);
	    listSlides[slideIndex].firstVisit(this);
	}
	cpt++;
	document.querySelector(".cpt-slip").innerText = (cpt);
	return flag;
    };
    this.nextSlide = () => {
	if(!this.next())
	    this.nextSlide();
    };
    this.previousSlide = () => {
	slideIndex = Math.max(0, slideIndex -1);
	this.gotoSlide(listSlides[slideIndex]);
	cpt = listSlides[slideIndex].currentCpt;
	document.querySelector(".cpt-slip").innerText = (cpt);
    };
    this.previous = () => {
	let saveCpt = cpt;
	this.refresh();
	if(saveCpt == cpt)
	    this.previousSlide();
	else
	    while(cpt<saveCpt-1)
		this.next();
    };
    this.refresh = () => {
	listSlides[slideIndex].refresh();
	this.gotoSlide(listSlides[slideIndex]);
	cpt = listSlides[slideIndex].initCpt;
	document.querySelector(".cpt-slip").innerText = (cpt);
    };
    this.gotoSlide(listSlides[slideIndex]);
    listSlides[slideIndex].element.style.zIndex = "1";
    listSlides[slideIndex].firstVisit(this);
    listSlides[slideIndex].initCpt = cpt;
    listSlides[slideIndex].currentCpt = cpt;
    // this.previous : TODO...
};


