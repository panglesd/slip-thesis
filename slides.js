
// function getAnchor() {
//     var currentUrl = document.URL,
// 	urlParts   = currentUrl.split('#');
		
//     return (urlParts.length > 1) ? urlParts[1] : null;
// }
// let anchor = parseInt(getAnchor());
// if(anchor) {
//     for(let i=0;i<=anchor; i++) {
// 	action[i]();
//     }
//     currentState = anchor;
//     console.log("anchor", anchor);
//     moveWindow(winX, winY, currentScale, currentRotate, 0);

// }
//else
    // action[currentState]();


let engine = new Engine();

//////////////////////////////////////////////////////////////////////////////////
//              Action Slide Title                                              //
//////////////////////////////////////////////////////////////////////////////////

let title = new Slide("title", (slide, engine) => {
	let calcul = slide.query(".calcul"), calcul2 = slide.query(".calcul2");
	calcul.style.top = calcul2.offsetTop+"px";
	// calcul.style.top = (calcul2.offsetTop+(calcul2.offsetTop-calcul.offsetTop))+"px";
	calcul.style.left = calcul2.offsetLeft+"px";
	let aleat = slide.query(".aleat"), aleat2 = slide.query(".aleat2");
	aleat.style.top = aleat2.offsetTop+"px";
	// aleat.style.top = (aleat2.offsetTop+(aleat2.offsetTop-aleat.offsetTop))+"px";
	aleat.style.left = aleat2.offsetLeft+"px";
	let reverse = slide.query(".reverse"), reverse2 = slide.query(".reverse2");
	reverse.style.top = reverse2.offsetTop+"px";
	// reverse.style.top = (reverse2.offsetTop+(reverse2.offsetTop-reverse.offsetTop))+"px";
	reverse.style.left = reverse2.offsetLeft+"px";
	reverse.style.transition = aleat.style.transition = calcul.style.transition = "top 1s, left 1s";
    }
		      , [], engine);
title.setAction([
    (slide, engine, presentation) => {
	engine.moveWindowRelative(0,1/3,0,0,1);
	// engine.moveWindow(winX,winY+1/3,1,0,1);
    },
    (slide, engine, presentation) => {
	let top = slide.query(".main").offsetTop+slide.query(".main").offsetHeight;
	slide.query(".calcul").style.top = (top+60)+"px";
	slide.query(".calcul").style.left = slide.query(".aleat").offsetLeft+"px";
	slide.query(".I").style.top= (top+60)+"px";
	slide.query(".I").style.left= (slide.query(".aleat").offsetLeft-100)+"px";
	slide.query(".I").style.visibility = "visible";
    },
    (slide, engine, presentation) => {
	let top = slide.query(".main").offsetTop+slide.query(".main").offsetHeight;
	slide.query(".aleat").style.top = (top+60+150)+"px";
	slide.query(".aleat").style.left = slide.query(".aleat").offsetLeft+"px";
	slide.query(".II").style.top= (top+60+150)+"px";
	slide.query(".II").style.left= (slide.query(".aleat").offsetLeft-100)+"px";
	slide.query(".II").style.visibility = "visible";
    },
    (slide, engine, presentation) => {
	let top = slide.query(".main").offsetTop+slide.query(".main").offsetHeight;
	slide.query(".reverse").style.top = (top+60+300)+"px";
	slide.query(".reverse").style.left = slide.query(".aleat").offsetLeft+"px";
	slide.query(".III").style.top= (top+60+300)+"px";
	slide.query(".III").style.left= (slide.query(".aleat").offsetLeft-100)+"px";
	slide.query(".III").style.visibility = "visible";
    } 
]);

//////////////////////////////////////////////////////////////////////////////////
//              Action Slide Clés pour comprendre                               //
//////////////////////////////////////////////////////////////////////////////////

let calcul = new Slide("calcul", (slide) => {
    turingMachine1 = new TuringMachine(transitionTable1, 0, 3);
    turingMachine1.setMemory([0,1,0,1,1,0]);
    // slide.query(".slide-container").style.display="block";
}, [
    (slide, engine, presentation) => {
	this.cv = slide.query("#canvas-tm1");
	slide.queryAll(".h0").forEach((elem) => {elem.style.opacity = "1";});
	drawGraph1(100, 500, 300, 700, 25, null, "0", this.cv);
	drawMem(["","","","","",""], 250,600, 0, this.cv);
	slide.query(".f-calc").style.opacity = "1";
    }, (slide, engine, presentation) => {
	slide.query(".input").classList.add("putted");
    }, (slide, engine, presentation) => {
	engine.moveWindowRelative(0,0.15,-0.3,0,1);
	drawTuringMachine1(turingMachine1, 500,  () => {
	    slide.query(".output").style.opacity= "1";	    
	});
    }, (slide, engine, presentation) => {
	slide.query(".output").classList.add("putted");
	engine.moveWindowRelative(0,-0.15,+0.3,0,1);
    }, (slide, engine, presentation) => {
	slide.query(".f-calc").style.opacity = "0";
	slide.query(".output").style.display = "none";
	slide.query(".recursif").style.opacity = "1";
	slide.query(".input").classList.toggle("movable");
	slide.query(".input").classList.toggle("putted");
    }, (slide, engine, presentation) => {
	turingMachine1.setPointer(0);
	turingMachine1.setState(0);
	turingMachine1.setMemory([0,1,0,1,1,0]);
	setTimeout(() => {	// slide.query(".appartenance").style.opacity = "1";
	    drawTuringMachine1(turingMachine1, 50,  () => {
		slide.query(".appartenance").classList.toggle("putted");
	    });
	}, 1000);
	slide.query(".input").classList.toggle("movable");
	slide.query(".input").classList.toggle("putted");	
    }, (slide, engine, presentation) => {
	slide.query(".recursif").style.opacity = "0";
	slide.query(".r-e").style.opacity = "1";
	slide.query(".input").style.opacity = "0";
	slide.query(".appartenance").style.display="none";
    }, (slide, engine, presentation) => {
	this.stop = 0 
	let step = () => {turingMachine1.setPointer(0);turingMachine1.setState(0);turingMachine1.setMemory([0,1,0,1,1,0]);
			  drawTuringMachine1(turingMachine1, 150,  () => {
			      slide.query(".entier").style.transition = "";
			      slide.query(".entier").classList.remove("movable");
			      setTimeout(() => {
				  slide.query(".entier").classList.remove("putted");
				  setTimeout(() => {
				  slide.query(".entier").innerHTML = Math.floor(Math.random()*1000);
				  slide.query(".entier").style.transition = "left 1s";
				  slide.query(".entier").classList.add("putted");
			      }, 100);
			      }, 100);
			      if(!this.stop)
				  step();
			  }, "notblue");
			 };
	step();
    // }, (slide, engine, presentation) => {
    // 	this.stop = 1;
	// setTimeout(() => {
	//     slide.queryAll(".entier")[0].classList.toggle("putted");
	// }, 1000);
	// setTimeout(() => {
	//     slide.queryAll(".entier")[1].classList.toggle("putted");
	// }, 2000);
	// setTimeout(() => {
	//     slide.queryAll(".entier")[2].classList.toggle("putted");
	// }, 4000);
	// setTimeout(() => {
	//     slide.queryAll(".entier")[3].classList.toggle("putted");
	// }, 5000);
    },
], engine, () => {});
let cles = new Slide("cles", (slide) => {slide.query(".slide-container").style.display="block";}, [], engine);
let cles2 = new Slide("cles", (slide) => {slide.query(".slide-container").style.display="block";}, [(slide) => {
    this.canvas = slide.query(".background-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font="30px Arial";
    let sizeText = this.ctx.measureText("An algorithm defines a set");
    console.log("sizeText", sizeText);
    this.ctx.fillText("An algorithm defines a set",(1440-sizeText.width)/2,800);
    this.ctx.beginPath();
    this.ctx.moveTo(1440/3,820);
    this.ctx.lineTo(1440*2/3,820);
    this.ctx.moveTo(1440/3,826);
    this.ctx.lineTo(1440*2/3,826);
    this.ctx.moveTo(1440*2/3-20,814);
    this.ctx.lineTo(1440*2/3+10,823);
    this.ctx.moveTo(1440*2/3-20,832);
    this.ctx.lineTo(1440*2/3+10,823);
    this.ctx.stroke();
    slide.queryAll(".one").forEach((elem) => {elem.style.visibility = "visible";});
}, (slide, engine, presentation) => {
    this.ctx.beginPath();
    let englishText = "A set defines an algorithm*";
    let sizeText = this.ctx.measureText(englishText);
    console.log("sizeText", sizeText);
    this.ctx.fillText(englishText,(1440-sizeText.width)/2,800+140-20);
    this.ctx.moveTo(1440/3,820+140);
    this.ctx.lineTo(1440*2/3,820+140);
    this.ctx.moveTo(1440/3,826+140);
    this.ctx.lineTo(1440*2/3,826+140);
    this.ctx.moveTo(1440/3-10,823+140);
    this.ctx.lineTo(1440/3+20,814+140);
    this.ctx.moveTo(1440/3-10,823+140);
    this.ctx.lineTo(1440/3+20,832+140);
    this.ctx.stroke();
    slide.queryAll(".two").forEach((elem) => {elem.style.visibility = "visible";});
}, (slide, engine, presentation) => {
    slide.queryAll(".theorem").forEach((elem) => {elem.style.visibility = "visible";});
    engine.moveWindowRelative(0,0.5,0,0,1);
}], engine, (slide, engine, presentation) => {
    setTimeout(() => {slide.queryAll(".cm1").forEach((elem) => {elem.style.opacity = "";});}, 1000);
});

//////////////////////////////////////////////////////////////////////////////////
//              Action Slide Liens définissabilités                             //
//////////////////////////////////////////////////////////////////////////////////

// let lienDef = new Slide("lien-definissabilite", () => {}, [], engine);

//////////////////////////////////////////////////////////////////////////////////
//              Action Slide Définissabilités                                   //
//////////////////////////////////////////////////////////////////////////////////

let definissabilite = new Slide("definissabilite", (slide, engine, presentation) => {
}, [
    // (slide, engine, presentation) => {
    // 	slide.query(".c0").classList.remove("emphasize");
    // 	slide.query(".c1").classList.add("emphasize");
    // 	slide.query(".example1").style.left = "-150%";
    // 	slide.query(".example2").style.left = "0";
    // },
    (slide, engine, presentation) => {
	slide.query(".c0").classList.remove("emphasize");
	slide.queryAll(".c1").forEach((elem) => {elem.style.opacity = "1";});
	slide.query(".example1").style.left = "-150%";
	slide.query(".example3").style.left = "0";
    },
    (slide, engine, presentation) => {
	slide.query(".example3").style.left = "-150%";
	slide.query(".example4").style.left = "0";
    },
    (slide, engine, presentation) => {
	slide.query(".c1").classList.remove("emphasize");
	slide.queryAll(".c2").forEach((elem) => {elem.style.opacity = "1";});
	slide.query(".example4").style.left = "-150%";
	slide.query(".example5").style.left = "0";
    },
    (slide, engine, presentation) => {
	slide.query(".example5").style.left = "-150%";
	slide.query(".example6").style.left = "0";
    },
    (slide, engine, presentation) => {
	slide.queryAll(".c2")[1].classList.remove("emphasize");
	slide.queryAll(".c3").forEach((elem) => {elem.style.opacity = "1";});
	slide.query(".example6").style.left = "-150%";
	slide.query(".example7").style.left = "0";
    },
    (slide, engine, presentation) => {
	slide.query(".c3").classList.remove("emphasize");
	slide.queryAll(".c4").forEach((elem) => {elem.style.opacity = "1";});
	slide.query(".example7").style.left = "-150%";
	slide.query(".example8").style.left = "0";
    },
    (slide, engine, presentation) => {
	slide.query(".example").classList.toggle("remark");
	slide.query(".example").classList.toggle("example");
	slide.query(".example8").style.left = "-150%";
	slide.query(".example9").style.left = "0";
    },
    // (slide, engine, presentation) => {
    // 	slide.query(".example4").style.left = "-150%";
    // 	slide.query(".example5").style.left = "0";
    // },
    // (slide, engine, presentation) => {
    // 	slide.query(".example5").style.left = "-150%";
    // 	slide.query(".example6").style.left = "0";
    // }
], engine, (slide, engine, presentation) => {
    let i=2;
    let exampleNext, example = slide.query(".example1");
    while((exampleNext = slide.query(".example"+(i+1)))) {
	i++;
	let diff = example.offsetTop + example.offsetHeight/2 - (exampleNext.offsetTop + exampleNext.offsetHeight/2);
	exampleNext.style.top = (40+diff) + "px";
	example = exampleNext;
    }
});

//////////////////////////////////////////////////////////////////////////////////////:
/////// Slide sur les ordinaux, fonctions pour les dessiner                    ///////:
//////////////////////////////////////////////////////////////////////////////////////:

function drawIth(left, right, y, lengthBegin, lengthEnd, delay, N, canvas, callback, color) {
    let ctx = canvas.getContext("2d");
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color ? color : 'rgb(0, 0, 0)';
    ctx.moveTo(left, y-lengthBegin);
    ctx.lineTo(left, y+lengthBegin);
    ctx.stroke();
    ctx.restore();
    callback();
}
function drawTimesOmega(f, speeding) {
    speeding = (speeding ? speeding : 0.98);
    return function(left, right, y, lengthBegin, lengthEnd, delay, N, canvas, callback, color) {
	let ctx;
	if (canvas.getContext) {
	    ctx = canvas.getContext("2d");
	}
	let stop = 0;
	let step = (i) => {
	    if(i>N) callback();
	    else {
		// console.log("delay ====", delay);
		// console.log("speeding ====", speeding);
		let s =
		    f(right + ((left-right)*Math.pow(0.96,2*i)),                         // left
		      right + ((left-right)*Math.pow(0.96,2*i+2)),                       // right 
		      y,                                                                 // y 
		      lengthEnd + (lengthBegin-lengthEnd)*Math.pow(0.96,2*i),            // lengthBegin
		      (lengthEnd + (lengthBegin-lengthEnd)*Math.pow(0.96,2*i+2))/2,      // lengthEnd
		      delay*(speeding ? (Math.pow(speeding,i)) : 1),                     // delay
		      N/2,                                                               // N
		      canvas,                                                            // canvas
		      (() => {delay = delay*speeding;                                    // callback
			      if(!stop)
				  setTimeout(()=>{
				      step(i+1);
				  }, delay*(speeding ? speeding : 0.9));
			     }),
		      color                                                              // color
		     );
		if (stop)
		    if (s)
			s();
	    }
	};
	// let iter = (i) => {
	//     step(i);
	//     if(i<N && this.timeoutID) setTimeout(() => {iter(i+1);}, delay);
	//     else callback();
	// };
	if(delay>0)
	    step(0);
	else {
//	    console.log("delay = 0");
	    for(let i=0;i<=N;i++) {
		f(right + ((left-right)*Math.pow(0.96,2*i)),                         // left
		  right + ((left-right)*Math.pow(0.96,2*i+2)),                       // right 
		  y,                                                                 // y 
		  lengthEnd + (lengthBegin-lengthEnd)*Math.pow(0.96,2*i),            // lengthBegin
		  (lengthEnd + (lengthBegin-lengthEnd)*Math.pow(0.96,2*i+2))/2,      // lengthEnd
		  0, N/2, canvas, (() => {}), color);                                               // delay, N, canvas, callback
		// step(i);
	    }
	    callback();
	}
	return () => { stop = 1;};
    };
}
let drawOmega = drawTimesOmega(drawIth);
let drawOmegaNoSpeeding = drawTimesOmega(drawIth, 1);
let drawOmegaSquare = drawTimesOmega(drawOmega);

let tempsInfini = new Slide("temps-infini", (slide, engine, presentation) => {}, [
    (slide, engine, presentation) => {
	this.ctx = this.canvas.getContext("2d");
	this.ctx.beginPath();
	this.ctx.moveTo(0,150);
	this.ctx.lineTo(5000, 150);
	this.ctx.closePath();
	this.ctx.stroke();
	this.ctx.font = '38px serif';
	this.ctx.fillText("time:", 50, 50);
	this.continue = 1 ;
	this.nbTick = 1;
	this.intervalID = setInterval (() => {	    
	    drawIth(30*this.nbTick,0,150,15,10,0,1,this.canvas, () => {});
	    this.nbTick++;
	},150);
	this.timeoutID = setTimeout(() => {this.timeoutID = null; engine.moveWindowRelative(0,0,4,0,20);}, 2000);
    }, (slide, engine, presentation) => {
	if(this.timeoutID)
	    clearTimeout(this.timeoutID);
	else
	    engine.moveWindowRelative(0,0,-4,0,1);
	clearInterval(this.intervalID);
	this.timeoutID = setTimeout(() => {
	    this.ctx.clearRect(0,0,5000,300);
	    this.ctx.font = '38px serif';
	    // this.ctx.fillText("time:", 50, 50);
	    this.ctx.beginPath();
	    this.ctx.moveTo(0,150);
	    this.ctx.lineTo(1200, 150);
	    this.ctx.closePath();
	    this.ctx.stroke();
	    drawOmega(25.5,1000.5,150,30, 10,200,75, this.canvas, () => {});
	}, 100);
    }, (slide, engine, presentation) => {
	// if(this.timeoutID)
	//     clearTimeout(this.timeoutID);
	// this.ctx.clearRect(0,0,5000,300);
	// this.ctx.beginPath();
	// this.ctx.moveTo(0,150);
	// this.ctx.lineTo(1200, 150);
	// this.ctx.closePath();
	// this.ctx.stroke();
	// drawOmega(25.5,1000.5,150,30, 10,0,75, this.canvas, () => {});
	this.timeoutID = setTimeout(() => {
	    slide.query(".omega").style.visibility="visible";
	    this.canvas.style.top = "-100px";
	    slide.query(".omega").style.top = "300px";
	    slide.query(".omega").style.right = "600px";
	    setTimeout(()=> {
		slide.query(".omega").style.top = "60px";
		slide.query(".omega").style.right = "100px";
	    },1000);
	}, 000);
    }, (slide, engine, presentation) => {
	this.canvasPlusOne = slide.query('.omegaPlusOneCanvas');
	this.ctxPlusOne = this.canvasPlusOne.getContext("2d");
	this.ctxPlusOne.beginPath(); this.ctxPlusOne.moveTo(0,150); this.ctxPlusOne.lineTo(1200, 150); this.ctxPlusOne.closePath(); this.ctxPlusOne.stroke();
	drawOmega(25.5,1000.5,150,30, 10,100,75, this.canvasPlusOne, () => {drawIth(1000.5,0,150,30,0,0,0,this.canvasPlusOne,() => {

	});});
    }, (slide, engine, presentation) => {
	this.canvasPlusOne.style.top = "50px";
	slide.query(".omegaPlusOne").style.visibility = "visible";
	slide.query(".omegaPlusOne").style.top = "300px";
	slide.query(".omegaPlusOne").style.right = "600px";
	setTimeout(()=> {
	    slide.query(".omegaPlusOne").style.top = "220px";
	    slide.query(".omegaPlusOne").style.right = "0px";
	},1000);
    }, (slide, engine, presentation) => {
	this.canvasPlusOmega = slide.query('.omegaPlusOmegaCanvas');
	this.ctxPlusOmega = this.canvasPlusOmega.getContext("2d");
	this.ctxPlusOmega.beginPath(); this.ctxPlusOmega.moveTo(0,150); this.ctxPlusOmega.lineTo(1200, 150); this.ctxPlusOmega.closePath(); this.ctxPlusOmega.stroke();
	drawOmega(25.5,500.5,150,30, 10,50,70, this.canvasPlusOmega, () => {drawOmega(500.5,1000.5,150,30,10,50,70,this.canvasPlusOmega, () => {});});
    }, (slide, engine, presentation) => {
	// drawOrdinal(25.5,1000.5,150,30, 10,50,75, drawIth, this.canvas);
	this.canvasPlusOmega.style.top = "200px";
	slide.query(".omegaPlusOmega").style.visibility = "visible";
	slide.query(".omegaPlusOmega").style.top = "300px";
	slide.query(".omegaPlusOmega").style.right = "600px";
	setTimeout(()=> {
	    slide.query(".omegaPlusOmega").style.top = "380px";
	    slide.query(".omegaPlusOmega").style.right = "0px";
	},1000);
    }, (slide, engine, presentation) => {
	this.canvasTimesOmega = slide.query('.omegaSquareCanvas');
	this.ctxTimesOmega = this.canvasTimesOmega.getContext("2d");
	this.ctxTimesOmega.beginPath(); this.ctxTimesOmega.moveTo(0,150); this.ctxTimesOmega.lineTo(1200, 150); this.ctxTimesOmega.closePath(); this.ctxTimesOmega.stroke();
	// drawOrdinal(25.5,500.5,150,30, 10,50,75, (left, right, y, lB,lE,d,N,canvas,callback) => {drawOrdinal(left, right, y, lB, lE, d, N,drawIth, canvas, callback);}, this.canvasTimesOmega, () => {drawOrdinal(500.5,1000.5,150,30,10,50,75,drawIth,this.canvasTimesOmega, () => {});});
	// drawOrdinal(25.5,1000.5,150,30, 10,50,75, drawIth, this.canvas);
	drawOmegaSquare(25.5,1000.5,150,30, 10,20,70, this.canvasTimesOmega, () => {});
    }, (slide, engine, presentation) => {
	// drawOrdinal(25.5,1000.5,150,30, 10,50,75, drawIth, this.canvas);
	this.canvasTimesOmega.style.top = "350px";
	slide.query(".omegaSquare").style.visibility = "visible";
	slide.query(".omegaSquare").style.top = "600px";
	slide.query(".omegaSquare").style.right = "600px";
	setTimeout(()=> {
	    slide.query(".omegaSquare").style.top = "540px";
	    slide.query(".omegaSquare").style.right = "0px";
	},1000);
    }, (slide, engine, presentation) => {
	slide.query(".canvases-container").style.height = "600px";
	slide.query(".omegaExpOmega").style.top = "1050px";
	slide.query(".omegaExpOmega").style.opacity = "1";
	slide.query(".omega-exp-omega").style.opacity = "1";
	engine.moveWindowRelative(0,0.65,0,0,1);
    },    
], engine, (slide, engine, presentation) => {
    slide.queryAll(".omegaSymbol").forEach((elem) => {elem.style.visibility = "hidden";});
    setTimeout(() => {slide.queryAll(".cm1").forEach((elem) => {elem.style.opacity = "";});}, 00);
    this.canvas = slide.query('.omegaCanvas');
});

let tempsInfini2 = new Slide("temps-infini-2", (slide, engine, presentation) => {
    slide.query(".slide-container").style.display ="block";
}, [], engine, () => {});

let ittmsDef = new Slide("ittms-def", (slide, engine, presentation) => {
    turingMachine2 = new TuringMachine(transitionTable2, 0, 5);
    turingMachine2.setMemory([0,1,0,1,1,0]);
    this.ittmCanvas = slide.query(".canvas-ittm");
    this.ittmCtx = this.ittmCanvas.getContext("2d");
    this.ordinalCanvas = slide.query(".ordinalCanvas");
    this.ordinalCtx = this.ordinalCanvas.getContext("2d");
    this.ordinalCtx.beginPath(); this.ordinalCtx.moveTo(0,50); this.ordinalCtx.lineTo(1200, 50);this.ordinalCtx.stroke();
    this.ordinalCtx.strokeStyle = "red";
    drawOmega(25.5,500.5,50,30, 10,0,70, this.ordinalCanvas, () => {drawOmega(500.5,1000.5,50,30,10,50,70,this.ordinalCanvas, () => {}, "lightgrey");}, "lightgrey");
    drawGraph2();
    drawMem(["0", "1", "0", "1", "1", "0"], 250, 600, 0, this.ittmCanvas);
}, [
    (slide, engine, presentation) => {
    // this.ittmCanvas = slide.query(".canvas-ittm");
    // this.ittmCtx = this.ittmCanvas.getContext("2d");
    // this.ordinalCanvas = slide.query(".ordinalCanvas");
    // this.ordinalCtx = this.ordinalCanvas.getContext("2d");
    // this.ordinalCtx.beginPath(); this.ordinalCtx.moveTo(0,50); this.ordinalCtx.lineTo(1200, 50);this.ordinalCtx.stroke();
    // this.ordinalCtx.strokeStyle = "red";
    // drawOmega(25.5,500.5,50,30, 10,0,70, this.ordinalCanvas, () => {drawOmega(500.5,1000.5,50,30,10,50,70,this.ordinalCanvas, () => {}, "lightgrey");}, "lightgrey");
    this.ittm = new DrawTuringMachine2(turingMachine2, 500, () => {}, this.ittmCanvas);
    }, (slide, engine, presentation) => {
    let omegaWriting = drawTimesOmega((left, right, y, lengthBegin, lengthEnd, delay, N, canvas, callback) => { this.ittm.step(delay/2) ; drawIth(left, right, y, lengthBegin, lengthEnd, delay, N, canvas, callback); }, 0.985);
    omegaWriting(25.5,500.5,50,30, 10,250,800, this.ordinalCanvas,() => {
	drawGraph2(null, null, null);
	this.ittmCtx.clearRect(0, 590, 1000, 1000);
	drawMem(["?", "?", "?", "?", "?", "?"], 250, 600, -1, this.ittmCanvas);
	drawIth(500.5,0,50,30,0,0,0,this.ordinalCanvas,() => {});
    });
    }, (slide, engine, presentation) => {
	this.ittmCtx.clearRect(0, 0, 1000, 590);
	drawGraph2(4, null, null);
    }, (slide, engine, presentation) => {
	this.ittmCtx.clearRect(0, 590, 1000, 1000);
	drawMem(["?", "?", "?", "?", "?", "?"],250,600, 0, this.ittmCanvas);
    }, (slide, engine, presentation) => {
	this.ittmCtx.clearRect(0, 590, 1000, 1000);
	drawMem(["0", "?", "1", "1", "1", "0"],250,600, 0, this.ittmCanvas);
    }, (slide, engine, presentation) => {
	this.ittm.setLimit();
	this.ittm.tm.setMemory([0,1,1,1,1,0]);
	this.ittm.drawCurrent();
    }, (slide, engine, presentation) => {
	let omegaWriting = drawTimesOmega((left, right, y, lengthBegin, lengthEnd, delay, N, canvas, callback) => { this.ittm.step(delay/2) ; drawIth(left, right, y, lengthBegin, lengthEnd, delay, N, canvas, callback); }, 0.985);
	this.stop = omegaWriting(500.5,1000.5,50,30, 10,50,70, this.ordinalCanvas,() => {
	    this.ittm.setLimit();
	    this.ittm.tm.setMemory([0,1,1,1,1,0]);
	    this.ittm.drawCurrent();
	    drawIth(1000.5,0,50,30,0,0,0,this.ordinalCanvas,() => {});
	    
	});
    }, (slide, engine, presentation) => {
	this.stop();
	let omegaWriting = drawTimesOmega((left, right, y, lengthBegin, lengthEnd, delay, N, canvas, callback) => { this.ittm.step(delay/2) ; drawIth(left, right, y, lengthBegin, lengthEnd, delay, N, canvas, callback); }, 0.985);
	let omega2Writing = drawTimesOmega((left, right, y, lengthBegin, lengthEnd, delay, N, canvas, callback) => {
	    omegaWriting(left, right, y, lengthBegin, lengthEnd, delay, N, canvas, () => {
		this.ittm.setLimit();
		this.ittm.tm.setMemory([0,1,1,1,1,0]);
		this.ittm.drawCurrent();
		callback();
	    });
	    // setTimeout(() => omegaWriting(left, right, y, lengthBegin, lengthEnd, delay, N, canvas, callback), 1000);
	}, 0.985);
	this.ordinalCtx.clearRect(0, 0, 2000, 2000);
	this.ordinalCtx.strokeStyle = "black";
	this.ordinalCtx.beginPath(); this.ordinalCtx.moveTo(0,50); this.ordinalCtx.lineTo(1200, 50);this.ordinalCtx.stroke();
	drawOmegaSquare(25.5,1000.5,50,30, 10,0,70, this.ordinalCanvas, () => {}, "lightgrey");
	this.stop = omega2Writing(25.5,1000.5,50,30, 10,30,60, this.ordinalCanvas,() => {
	    this.ittm.setLimit();
	    this.ittm.tm.setMemory([1,1,1,1,1,0]);
	    this.ittm.drawCurrent();
	    drawIth(1000.5,0,50,30,0,0,0,this.ordinalCanvas,() => {
		// this.ittm.step(1000);
	    });
	});
    }, (slide, engine, presentation) => {
	this.d1 = ((slide.query(".ittm-defi").offsetHeight+slide.query(".ittm-defi").offsetTop)/1080 -1+0.0125) * slide.scale;
	engine.moveWindowRelative(0,this.d1,0,0,1);
    }, (slide, engine, presentation) => {
	this.d2 = -this.d1;
	engine.moveWindowRelative(0,this.d2,0,0,1);
    }, (slide, engine, presentation) => {
	drawIth(1005.5,0,50,30,0,0,0,this.ordinalCanvas,() => {
	    this.ittm.step(500);
	});
    }, (slide, engine, presentation) => {
	this.d3 = ((slide.query(".three-levels").offsetTop)/1080 -0.0125)*slide.scale;
	engine.moveWindowRelative(0,this.d3,0,0,1);
    }, (slide, engine, presentation) => {
	slide.query(".lambda-zeta-sigma").style.opacity = "1";
    }, (slide, engine, presentation) => {	
	slide.query(".lambda-zeta-sigma").style.display = "none";
	slide.query(".lambda-zeta-sigma-2").style.display = "block";
	// engine.moveWindowRelative(0,0.2,0,0,1);
    }, (slide, engine, presentation) => {
	slide.query(".cm1").style.opacity = "1";
	this.d4 = ((slide.query(".cm1").offsetTop+slide.query(".cm1").offsetHeight)/1080-1+0.0125)*slide.scale -(this.d1 + this.d2 + this.d3) ;
	engine.moveWindowRelative(0,this.d4,0,0,1);
	slide.query(".relation-alpha").style.opacity = "1";
    }
], engine, () => {});
let higherDef = new Slide("higher-def", (slide, engine, presentation) => {}, [
    (slide, engine, presentation) => {
    	this.canvas = slide.query(".omegaCK");
	slide.query(".c1").style.opacity = "1";
    }, (slide, engine, presentation) => {
	slide.query(".c2").style.opacity = "1";
    }, (slide, engine, presentation) => {
	slide.queryAll(".relativement").forEach((elem) => {elem.style.display = "inline";});
	slide.queryAll(".non-relativement").forEach((elem) => {elem.style.display = "none";});
    }, (slide, engine, presentation) => {
	this.d1 = ((slide.query(".c3").offsetTop+slide.query(".c3").offsetHeight)/1080 -1 +0.0125) * slide.scale;
	engine.moveWindowRelative(0,this.d1,0,0,1);
	slide.query(".c25").style.opacity = "1";
	drawOmegaNoSpeeding(25.5,500.5,50,30, 10,700,70, this.canvas, () => {});
	setTimeout(() => {drawOmegaNoSpeeding(500.5,1000.5,50,30,10,700,70,this.canvas, () => {});}, 350);
    }, (slide, engine, presentation) => {
	slide.query(".c4").style.opacity = "1";
    }, (slide, engine, presentation) => {
	slide.query(".c3").style.opacity = "1";
    // }, (slide, engine, presentation) => {
    // 	engine.moveWindowRelative(0,0.1,0,0,1);
    // 	slide.query(".c4").style.opacity = "1";
    // }, (slide, engine, presentation) => {
    // 	engine.moveWindowRelative(0,0.1,0,0,1);
    // 	slide.query(".c5").style.opacity = "1";
    }, (slide, engine, presentation) => {
	slide.queryAll(".relativement-2").forEach((elem) => {elem.style.display = "inline";});
	slide.queryAll(".non-relativement-2").forEach((elem) => {elem.style.display = "none";});	
    }], engine, () => {});

let alphaRecDef = new Slide("alpha-rec-def", (slide, engine, presentation) => {
}, [
    (slide, engine, presentation) => {
	// drawOmega(25.5,1000.5,150,30, 10,200,75, this.canvas, () => {});
	slide.query(".i-a-i-plus-un").style.display = "none";
	slide.query(".c1prime").style.opacity = "1";
	slide.query(".c1").classList.add("emphasize");
	slide.query(".lambda-a-beta").style.display = "inline";
	slide.query(".lambda-a-beta").classList.add("emphasize");
	this.canvas.getContext("2d").lineWidth = 1;
	drawOmega(500.5,1000.5,50,30,10,0,70,this.canvas, () => {});
    }, (slide, engine, presentation) => {
	this.canvas.getContext("2d").lineWidth = 2;
	drawIth(500.5,1000.5,50,30,10,0,70,this.canvas, () => {}, "red");
	slide.query(".lambda-a-beta").classList.remove("emphasize");
	slide.query(".c1").classList.remove("emphasize");
	slide.query(".c2prime").style.opacity = "1";
	slide.query(".c2").classList.add("emphasize");
	slide.query(".regle").style.display = "none";
	slide.query(".formule").style.display = "inline";
	slide.query(".formule").classList.add("emphasize");
    }, (slide, engine, presentation) => {
	this.d1 = ((slide.query(".c4").offsetTop + slide.query(".c4").offsetHeight)/1080 -1 +0.0125)*slide.scale;
	engine.moveWindowRelative(0,this.d1,0,0,1);
	slide.query(".c3").style.opacity = "1";	
	slide.query(".c4").style.opacity = "1";	
    }, (slide, engine, presentation) => {
    	this.canvasP = slide.query(".omegaForPlusUn");
	this.d2 = ((slide.query(".c7").offsetTop + slide.query(".c7").offsetHeight)/1080 -1 +0.0125)*slide.scale -this.d1;
	engine.moveWindowRelative(0,this.d2,0,0,1);
	drawOmega(25.5,1000.5,50,30, 10,0,70, this.canvasP, () => {drawIth(1000.5,1000.5,50,30,10,0,70,this.canvasP, () => {});});
	slide.query(".c6").style.opacity = "1";	
    }, (slide, engine, presentation) => {
	slide.query(".c7").style.opacity = "1";	
    // }, (slide, engine, presentation) => {
    // }, (slide, engine, presentation) => {
    }], engine, (slide, engine, presentation) => {
    	this.canvas = slide.query(".omegaForAlpha");
	drawOmega(25.5,500.5,50,30, 10,0,70, this.canvas, () => {drawOmega(500.5,1000.5,50,30,10,0,70,this.canvas, () => {}, "lightgrey");});
	slide.queryAll(".c0").forEach((elem) => {elem.style.opacity = "1";});
    });

//////////////////////////////////////////////////////////////////////////////////
//              Action Slide Hindman itself                                     //
//////////////////////////////////////////////////////////////////////////////////

let hindmanItself = new Slide("hindman-itself", (slide, engine, presentation) => {
    // Fonction d'entrée : On remet tous les entiers à noir.
    slide.queryAll(".number").forEach((number) => {
	number.style.color = "black";
    });	
    slide.query(".coloring").style.visibility = "hidden";
}, [
    // 1 : Premier exemple de coloriage
    (slide, engine, presentation) => {
	slide.query(".color-word").classList.add("emphasize");
	slide.query(".list-color").innerHTML = "in <span style=\"color:red\">red</span> and <span style=\"color:blue\">blue</span>";
	slide.queryAll(".number").forEach((number) => {
	    number.style.color = ["blue", "red"][Math.floor(Math.random()*2)];
	});	
	slide.query(".coloring").style.visibility = "visible";
    },
    // 2 : Deuxième exemple de coloriage
    (slide, engine, presentation) => {
	slide.query(".list-color").innerHTML = "in <span style=\"color:red\">red</span>, <span style=\"color:blue\">blue</span> and <span style=\"color:darkgreen\">green</span>";
	slide.queryAll(".number").forEach((number) => {
	    number.style.color = ["blue", "red", "darkgreen"][Math.floor(Math.random()*3)];
	});	
    },
    // 3 : Exemple pour la suite
    (slide, engine, presentation) => {
	slide.query(".list-color").innerHTML = "in <span style=\"color:red\">red</span> and <span style=\"color:blue\">blue</span>";
	slide.queryAll(".number").forEach((number, index) => {
	    number.style.color = ['blue', 'blue', 'red', 'red',  'red',  'red', 'blue', 'blue', 'blue', 'red',  'blue', 'blue', 'blue', 'red',  'blue', 'red',  'blue', 'blue', 'blue', 'blue', 'red',  'blue', 'blue', 'blue', 'red',  'red',  'blue', 'red', 'blue', 'blue', 'blue', 'red',  'red'][number.classList[1].slice(1)];
	});	
    },
    // 4 : Apparition de H
    (slide, engine, presentation) => {
	slide.query(".color-word").classList.remove("emphasize");
	slide.query(".hach").classList.add("emphasize");
	slide.query(".clone").style.transform = "";
	slide.query(".clone").style.top = (-slide.query(".clone").offsetTop+slide.query(".original").offsetTop)+"px";
	slide.query(".clone").style.transition = "top 1s";
	slide.query(".clone").style.visibility = "visible";
	slide.query(".clone").style.top = "0";
    },
    // 5 : focus sur les sommes finies
    (slide, engine, presentation) => {
	slide.query(".hach").classList.remove("emphasize");
	slide.query(".sommes").classList.add("emphasize");
    },
    // 6 : Apparition des sommes finies (1+6)
    (slide, engine, presentation) => {
	slide.query(".cloneclone").querySelectorAll(".number").forEach((elem) => {elem.style.visibility="hidden";});
	slide.query(".cloneclone").querySelectorAll(".number")[1].style.visibility="visible";
	slide.query(".cloneclone").querySelectorAll(".number")[6].style.visibility="visible";
	slide.query(".sigma-container").style.opacity = "0";
	slide.query(".sigma-value").innerText = 7;
	slide.query(".sigma").innerHTML = "<span style='color:blue'>1</span> + <span style='color:blue'>6</span> ";
	slide.query(".sigma-value").style.color = "blue";
	slide.query(".cloneclone").style.transition = "";
	slide.query(".cloneclone").style.top = (-slide.query(".cloneclone").offsetTop+slide.query(".clone").offsetTop)+"px";
	slide.query(".cloneclone").style.transition = "top 1s";
	slide.query(".cloneclone").style.visibility = "visible";
	slide.query(".sigma-container").style.visibility = "visible";
	slide.query(".sigma-container").style.left= "30%";
	setTimeout(() => { slide.query(".cloneclone").style.top = "0"; },0);
	slide.query(".sigma-container").style.opacity = "1";
    },
    // 7 : Apparition des sommes finies (7+10)
    (slide, engine, presentation) => {
	slide.query(".cloneclone").querySelectorAll(".number").forEach((elem) => {elem.style.visibility="hidden";});
	slide.query(".cloneclone").querySelectorAll(".number")[7].style.visibility="visible";
	slide.query(".cloneclone").querySelectorAll(".number")[10].style.visibility="visible";
	slide.query(".sigma").innerHTML = "<span style='color:blue'>7</span> + <span style='color:blue'>10</span> ";
	slide.query(".sigma-value").innerText = 17;
	slide.query(".sigma-value").style.color = "blue";
	slide.query(".cloneclone").style.transition = "";
	slide.query(".cloneclone").style.top = (-slide.query(".cloneclone").offsetTop+slide.query(".clone").offsetTop)+"px";
	console.log((slide.query(".cloneclone").offsetTop-slide.query(".clone").offsetTop)+"px");
	slide.query(".cloneclone").style.visibility = "visible";
	// slide.query(".sigma-container").style.top= "42px";
	// slide.query(".sigma-container").style.left= "304px";
	slide.query(".cloneclone").style.transition = "top 1s";
	slide.query(".cloneclone").style.top = "0";	
    },
    // 8 : Apparition des sommes finies (0+1+6+16)
    (slide, engine, presentation) => {
	slide.query(".cloneclone").querySelectorAll(".number").forEach((elem) => {elem.style.visibility="hidden";});
	slide.query(".cloneclone").querySelectorAll(".number")[0].style.visibility="visible";
	slide.query(".cloneclone").querySelectorAll(".number")[1].style.visibility="visible";
	slide.query(".cloneclone").querySelectorAll(".number")[6].style.visibility="visible";
	slide.query(".cloneclone").querySelectorAll(".number")[16].style.visibility="visible";
	slide.query(".sigma").innerHTML = "<span style='color:blue'>0</span> + <span style='color:blue'>1</span> + <span style='color:blue'>6</span> + <span style='color:blue'>16</span> ";
	slide.query(".sigma-value").innerText = 23;
	slide.query(".sigma-value").style.color = "blue";
	slide.query(".cloneclone").style.transition = "";
	slide.query(".cloneclone").style.top = (-slide.query(".cloneclone").offsetTop+slide.query(".clone").offsetTop)+"px";
	console.log((slide.query(".cloneclone").offsetTop-slide.query(".clone").offsetTop)+"px");
	slide.query(".cloneclone").style.transition = "top 1s";
	slide.query(".cloneclone").style.visibility = "visible";
	slide.query(".cloneclone").style.top = "0";
	// slide.query(".sigma-container").style.top= "42px";
	// slide.query(".sigma-container").style.left= "304px";
    },
    // 9 : focus sur "pour tout" "il existe"
    (slide, engine, presentation) => {
	slide.query(".sommes").classList.remove("emphasize");
	slide.query(".exists").classList.add("emphasize");
	slide.query(".forall").classList.add("emphasize");
	slide.query(".cloneclone").style.visibility = "hidden";
	slide.queryAll(".cloneclone .number").forEach((elem) => {elem.style.visibility = "hidden";});
	slide.query(".list-color").innerHTML = "in <span style=\"color:red\">red</span>, <span style=\"color:blue\">blue</span> and <span style=\"color:darkgreen\">green</span>";
	slide.query(".myexample").innerText = "Coloring examples";
	slide.query(".sigma-container").style.visibility="hidden";
	let newColoring = () => {
	    let tabColor = [];
	    for(let i=0; i<21;i++) {
		tabColor.push(["blue", "red", "darkgreen"][Math.floor(Math.random()*3)]);
		slide.queryAll(".n"+i).forEach((number) => { number.style.color = tabColor[i]; });	
	    }
	    let myOne = 10+Math.floor(Math.random()*9);
	    let myColor = tabColor[myOne]; //["blue", "red", "darkgreen"][Math.floor(Math.random()*3)];
	    for(let i=0; i<22;i++) {
		slide.query(".clone .n"+i).style.visibility = "hidden";
	    }
	    slide.query(".clone").style.visibility = "hidden";
	    let update = 1;
	    setTimeout(() => {
		slide.query(".clone").style.visibility = "visible";
		for(let i=10; i<21;i++) {
		    if((tabColor[i]==myColor && Math.random() < 0.5) || i == myOne)
			slide.query(".clone .n"+i).style.visibility = "visible";
		}
		slide.query(".infinity").style.color = myColor;
	    }, 1000);
	};
	newColoring();
	setInterval(newColoring,2000);
    }
], engine);


let hindmanProof = new Slide("hindman-proof", (slide, engine, presentation) => {
    this.nNumber = 150;
    this.populate = (nNumber, nContainer) => {
	for(let i=0; i<nNumber; i++) {
	    let elem = document.createElement("div");
	    elem.classList.add("n"+i);
	    elem.classList.add("number");
	    elem.innerText = i;
	    nContainer.appendChild(elem);
	}
	let dots = document.createElement("div");
	dots.classList.add("number","suspension");
	dots.innerText = "...";
	nContainer.appendChild(dots);
    };
    this.populate(this.nNumber, slide.query(".number-container"));
    this.coloriage = [];
    this.setH = new Set();
    // this.kept = [];
    for(let i=0; i<1000; i++) {
	    this.coloriage.push(["red", "blue"][Math.floor(Math.random()*1.999)]);
	    // this.kept.push(1);
	}
    refresh();
    slide.query(".refresh").addEventListener("click", (ev) => {
	this.coloriage = [];
	this.setH = new Set();
	// this.kept = [];
	for(let i=0; i<1000; i++) {
	    this.coloriage.push(["red", "blue"][Math.floor(Math.random()*1.999)]);
	    // this.kept.push(1);
	}
	refresh();
    });
    this.setH = new Set();
    slide.queryAll(".number-container.original .number").forEach((elem, index) => {
	elem.addEventListener("click", (ev) => {
	    if(this.setH.has(index))
		this.setH.delete(index);
	    else if(checkGood(Array.from(this.setH), index, this.coloriage))
		this.setH.add(index);
	    console.log(this.setH);
	    refresh();
	});
    });
    function refresh() {
	for(let i=0;i<this.nNumber;i++) {
	    slide.queryAll(".number-container .n"+i).forEach((number) => {
		number.style.color = this.coloriage[i];
		if(this.setH.has(i)) {
		    number.classList.add("selected");
		    number.classList.remove("removed");
		}
		else if(checkGood(Array.from(this.setH), i, this.coloriage)) {
		number.classList.remove("selected");
		number.classList.remove("removed");
		}
		else {
		    number.classList.remove("selected");
		    number.classList.add("removed");		
		}
	    });
	}
    }
    this.refresh = refresh;
}, [
    (slide, engine, presentation) => {
	slide.query(".c1").style.opacity = "1";
    }, (slide, engine, presentation) => {
	this.d1 = (slide.query(".c2").offsetTop+slide.query(".c2").offsetHeight)/1080 -1 +0.0125;
	engine.moveWindowRelative(0,this.d1,0,0,1);
	// slide.querySelector(".large-infinite").addEventListener
	this.coloriage = [];
	for(let i=0; i<1000; i++)
	    this.coloriage.push(["red", "blue"][i%2]);
	this.setH = new Set();
	// this.coloriage[0] = "blue";
	this.refresh();
	slide.query(".c2").style.opacity = "1";
	slide.query(".large-infini").classList.add("emphasize");
    }, (slide, engine, presentation) => {
	slide.query(".large-infini").classList.remove("emphasize");
	slide.query(".large-infini").classList.add("barre");
	slide.query(".large-hindman").classList.add("emphasize");
	slide.query(".c3").style.opacity = "1";
    }, (slide, engine, presentation) => {
	slide.query(".large-hindman").classList.remove("emphasize");
	slide.query(".large-hindman").classList.add("barre");
	slide.query(".large-baumgartner").classList.add("emphasize");
	slide.query(".large-ultrafilter").classList.add("emphasize");
	slide.query(".c4").style.opacity = "1";
	slide.query(".c5").style.opacity = "1";
    }, (slide, engine, presentation) => {
	this.d2 = (slide.query(".c1").offsetTop)/1080 -0.0125 - this.d1;
	engine.moveWindowRelative(0,this.d2,0,0,1);
    }, (slide, engine, presentation) => {
	slide.query(".c6").style.opacity = "1";
    }, (slide, engine, presentation) => {
	this.coloriage = [];
	this.setF = new Set();
	this.setH = new Set();
	this.d3 = (slide.query(".fm-def").offsetTop+410)/1080 -1 - this.d2 -this.d1;
	engine.moveWindowRelative(0,this.d3,0,0,1);
	// this.kept = [];
	for(let i=0; i<1000; i++) {
	    this.coloriage.push(["red", "blue"][Math.floor(Math.random()*1.999)]);

	}
	slide.queryAll(".number-container.clone").forEach((nContainer) => {
	    this.populate(60, nContainer);
	    let dots = document.createElement("div");
	    dots.classList.add("number","suspension");
	    dots.innerText = "...";
	    nContainer.appendChild(dots);
	    this.refresh();
	});
	function refresh() {
	    slide.queryAll(".number-container.clone .number").forEach((number, index) => {
		number.classList.remove("selected2", "candidate", "removed");
		if(this.setF.has(index))
		    number.classList.add("selected2");
		else if (typeof (Array.from(this.setF).find((n) => { return checkGood([n], index, this.coloriage);})) == "undefined")
		    number.classList.add("removed");
	    });
	}
	this.refresh2 = refresh;
	slide.queryAll(".number-container.clone .number").forEach((number, index) => {
	    number.addEventListener("click", (ev) => {
		if (this.setF.has(index)) {
		    this.setF.delete(index);
		}
		else {
		    this.setF.add(index);
		}
		console.log("this.setF",this.setF);
		refresh();
	    });
	});
	refresh();
    }, (slide, engine, presentation) => {
	let setFArray = Array.from(this.setF);
	console.log("setFArray",setFArray, setFArray[0], setFArray[1]);
	let a0 = (typeof setFArray[0] != "undefined") ? setFArray[0] : 1;
	let a1 = (typeof setFArray[1] != "undefined") ? setFArray[1] :  ((a0==1) ? 2 : 1);
	this.setF.add(a0);
	this.setF.add(a1);
	this.refresh2();
	// let a1 = setFArray[1] || ((a0==1) ? 2 : 1);
	console.log(a0, a1);
	slide.queryAll(".number-container.clone .number").forEach((number, index) => {
	    // number.classList.remove("selected", "candidate", "removed");
	    if(index == a0) {
		number.classList.add("left");
	    }
	    if(index == a1) {
		number.classList.add("right");
	    }
	    else if (checkGood([a0], index, this.coloriage))
		number.classList.add("left");
	    else if (checkGood([a1], index, this.coloriage))
		number.classList.add("right");
	});
	slide.queryAll(".number-container.clone .suspension")[0].classList.remove("removed", "left", "right");
	slide.queryAll(".number-container.clone .suspension")[0].classList.add("right");
	slide.queryAll(".number-container.clone .suspension")[1].classList.remove("removed", "left", "right");
	slide.queryAll(".number-container.clone .suspension")[1].classList.add("left");
	// slide.queryAll(".number-container.clone .number").forEach((number) => {
	//     number.classList.add(["left", "right", "removed"][Math.floor(Math.random()*2.999)]);
	// });
    }, (slide, engine, presentation) => {
	this.d4 = (slide.query(".tree-canvas").offsetTop+slide.query(".tree-canvas").offsetHeight-30)/1080 -1 -(this.d1 + this.d2 + this.d3);
	engine.moveWindowRelative(0,this.d4,0,0,1);
    }, (slide, engine, presentation) => {
	this.treeCanvas = slide.query(".tree-canvas");
	this.treeCtx = this.treeCanvas.getContext("2d");
	this.treeCtx.font= "30px Arial";
	// this.treeCtx.font = "30px Arial";
	this.p0 = {x:500, y:100-80};
	this.p1 = {x:300, y:200-80};
	this.p2 = {x:700, y:200-80};
	this.p3 = {x:600, y:300-80};
	this.p4 = {x:700, y:300-80};
	this.p5 = {x:800, y:300-80};
	this.p6 = {x:300, y:300-80};
	this.p7 = {x:700, y:400-80};
	this.p8 = {x:800, y:400-80};
	this.p9 = {x:900, y:400-80};
	this.p10 = {x:700, y:500-80};
	this.p11 = {x:800, y:500-80};
	this.p12 = {x:900, y:500-80};
	this.treeCtx.fillText("Full-Match", 1000, 200-80);
	drawNode(this.p0, 10, this.treeCanvas, "", "black");
	drawNode(this.p1, 10, this.treeCanvas, "", "black");
	drawNode(this.p2, 10, this.treeCanvas, "", "black");
	myQuadraticCurveArrowHeads(this.p0, 0, 0, this.p1, 15, 15, false, true, this.treeCtx, "black");
	myQuadraticCurveArrowHeads(this.p0, 0, 0, this.p2, 15, 15, false, true, this.treeCtx, "black");
    }, (slide, engine, presentation) => {
	drawNode(this.p3, 10, this.treeCanvas, "", "black");
	drawNode(this.p4, 10, this.treeCanvas, "", "black");
	drawNode(this.p5, 10, this.treeCanvas, "", "black");
	drawNode(this.p6, 10, this.treeCanvas, "", "black");
	this.treeCtx.fillText("Full-Match", 1000, 300-80);
	myQuadraticCurveArrowHeads(this.p2, 0, 0, this.p3, 15, 15, false, true, this.treeCtx, "black");
	myQuadraticCurveArrowHeads(this.p2, 0, 0, this.p4, 15, 15, false, true, this.treeCtx, "black");
	myQuadraticCurveArrowHeads(this.p2, 0, 0, this.p5, 15, 15, false, true, this.treeCtx, "black");
	myQuadraticCurveArrowHeads(this.p1, 0, 0, this.p6, 15, 15, false, true, this.treeCtx, "black");
    }, (slide, engine, presentation) => {
	drawNode(this.p7, 10, this.treeCanvas, "", "black");
	drawNode(this.p8, 10, this.treeCanvas, "", "black");
	drawNode(this.p9, 10, this.treeCanvas, "", "black");
	this.treeCtx.fillText("Full-Match", 1000, 400-80);
	myQuadraticCurveArrowHeads(this.p4, 0, 0, this.p7, 15, 15, false, true, this.treeCtx, "black");
	this.treeCtx.fillText("Full-Match", 1000, 500-80);
	myQuadraticCurveArrowHeads(this.p5, 0, 0, this.p8, 15, 15, false, true, this.treeCtx, "black");
	myQuadraticCurveArrowHeads(this.p5, 0, 0, this.p9, 15, 15, false, true, this.treeCtx, "black");
	this.treeCtx.setLineDash([5]);
	myQuadraticCurveArrowHeads(this.p7, 0, 0, this.p10, 15, 15, false, false, this.treeCtx, "black");
	// myQuadraticCurveArrowHeads(this.p8, 0, 0, this.p11, 15, 15, false, false, this.treeCtx, "black");
	myQuadraticCurveArrowHeads(this.p9, 0, 0, this.p12, 15, 15, false, false, this.treeCtx, "black");
    }, (slide, engine, presentation) => {
	this.treeCtx.setLineDash([0]);
	this.treeCtx.lineWidth = 3;
	myQuadraticCurveArrowHeads(this.p0, 0, 0, this.p2, 15, 15, false, true, this.treeCtx, "red");
	myQuadraticCurveArrowHeads(this.p2, 0, 0, this.p4, 15, 15, false, true, this.treeCtx, "red");
	myQuadraticCurveArrowHeads(this.p4, 0, 0, this.p7, 15, 15, false, true, this.treeCtx, "red");
	this.treeCtx.setLineDash([5]);
	myQuadraticCurveArrowHeads(this.p7, 0, 0, this.p10, 15, 15, false, false, this.treeCtx, "red");
    }, (slide, engine, presentation) => {
	this.d5 = (slide.query(".conclusion").offsetTop)/1080 -(this.d1+this.d2+this.d3+this.d4)-0.0125;
	engine.moveWindowRelative(0,this.d5,0,0,1);
    }, (slide, engine, presentation) => {
	slide.query(".c7").style.opacity = "1";
    }, (slide, engine, presentation) => {
	slide.query(".c8").style.opacity = "1";
    }, (slide, engine, presentation) => {
	this.d6 = (slide.query(".c9").offsetHeight+slide.query(".c9").offsetTop)/1080 -(this.d1+this.d2+this.d3+this.d4+this.d5)+0.0125;
	slide.query(".c9").style.opacity = "1";
	engine.moveWindowRelative(0,0.07,0,0,1);
    }], engine, () => {});

function checkGood(debH, n, coloring) {
    // console.log(debH, n, coloring);
    if(debH.length == 0)
	return true;
    let a = debH[0];
    if(coloring[a] != coloring[n] || coloring[n+a] != coloring[n] || coloring[a] != coloring[n+a])
	return false;
    return((checkGood(debH.slice(1), n, coloring)) && checkGood(debH.slice(1), n+a, coloring));
}
// let hindmanExamples = new Slide("hindman-examples");

let hindmanRM = new Slide("hindman-rm", (slide, engine, presentation) => {}, [
    (slide, engine, presentation) => {
	slide.query(".c1").style.opacity = "1";
    }, (slide, engine, presentation) => {
	slide.query(".c2").style.opacity = "1";
    }, (slide, engine, presentation) => {
	// engine.moveWindowRelative(0,0.05,0,0,1);
	slide.query(".c3").style.opacity = "1";
    }], engine, (slide, engine, presentation) => {
	setTimeout(() => {slide.queryAll(".cm1").forEach((elem) => {elem.style.opacity = "";});}, 000);
    });

let randomnessIntro = new Slide("randomness-intro", (slide, engine, presentation) => {}, [
    (slide, engine, presentation) => {
	slide.query(".banana").style.opacity = "1";
	this.coinRandoms = slide.queryAll(".js-random .coin-container .coin");
	// this.coinRandoms.forEach((coin) => {
	//     coin.classList.add(["heads", "tails"][Math.floor(Math.random()*1.999)]);
	// });
	this.coinHeads = slide.queryAll(".all-zeros .coin-container .coin");
	let continueID = 0;
	let step = (i, id) => {
	    if(continueID == id) {
		if(i==0)
		{
		    for(let j = 0; j< this.coinRandoms.length; j++)
			slide.queryAll(".equal-container").forEach((elem) => elem.classList.remove("proba-"+(j)));
		    this.coinRandoms.forEach((elem) => elem.classList.remove("heads", "tails"));
		    this.coinHeads.forEach((elem) => elem.classList.remove("heads", "tails"));
		}
		if(i<this.coinRandoms.length) {
		    slide.queryAll(".equal-container").forEach((elem) => elem.classList.remove("proba-"+(i)));
		    slide.queryAll(".equal-container").forEach((elem) => elem.classList.add("proba-"+(i+1)));
		    this.coinRandoms[i].classList.add(["heads", "tails"][Math.floor(Math.random()*1.999)]);
		    this.coinHeads[i].classList.add("heads");
		    
		    setTimeout(() => {step(i+1, id);}, 750);
		}
	    }
	};
	step(0, continueID);
	slide.query(".coin-container").addEventListener("click", (ev) => { continueID++; step(0, continueID);});
	// this.coinHeads.forEach((coin) => {
	//     coin.classList.add("heads");
	// });
    }, (slide, engine, presentation) => {
	slide.query(".c1").style.opacity = "1";
    }, (slide, engine, presentation) => {
	slide.query(".c2").style.opacity = "1";
    }, (slide, engine, presentation) => {
	// slide.query(".article").innerText = "A";
	// slide.query(".objet").innerText = "sequence of letters";
	// slide.query(".condition").innerText = "if";
	// slide.query(".discriminante").innerText = "way to describe it";
	// slide.query(".et").style.display = "none";
	// slide.query(".simple").innerText = "in few words";
	slide.query(".resolution").innerHTML = '<span class="article">A</span> <span class="objet">sequence of letters</span> is random <span class="condition">if</span> there is no <span class="discriminante">way to describe it</span> <span class="et"></span> <span class="simple">in few words</span>.';
	
    }, (slide, engine, presentation) => {
	// slide.query(".et").style.display = "inline-block";
	// slide.query(".article").innerText = "A";
	// slide.query(".condition").innerText = "if";
	// slide.query(".objet").innerText = "real";
	// slide.query(".discriminante").innerText = "of measure 0";
	// slide.query(".simple").innerText = "with simple logical complexity";
	slide.query(".resolution").innerHTML = '<span class="article">A</span> <span class="objet">real</span> is random <span class="condition">if</span> it has no <span class="simple">logically simple</span> property of <span class="discriminante">measure 0</span>.';
    }, (slide, engine, presentation) => {
	engine.moveWindowRelative(0,0.65,0,0,1);
	slide.query(".c3").style.opacity = "1";
    }, (slide, engine, presentation) => {
	slide.query(".c4").style.opacity = "1";
    }, (slide, engine, presentation) => {
	slide.query(".c5").style.opacity = "1";

    }], engine, () => {});

let reverseMathIntro = new Slide("reverse-math-intro", (slide, engine, presentation) => {}, [
    (slide, engine, presentation) => {
	// v0
    }, (slide, engine, presentation) => {
	// v1
    }, (slide, engine, presentation) => {
	// v2
	let def = slide.query(".v3.definition");
	this.d1 = (def.offsetTop + def.offsetHeight)/1080 -1+ 0.01;
	engine.moveWindowRelative(0,this.d1,0,0,1);
    }, (slide, engine, presentation) => {	
	let title = slide.query(".v3");
	this.d2 = (title.offsetTop)/1080 - 0.01 - this.d1;
	engine.moveWindowRelative(0,this.d2,0,0,1);
    }, (slide, engine, presentation) => {	
	let duality = slide.query(".v5");
	this.d3 = (duality.offsetTop+duality.offsetHeight)/1080 -1 + 0.01 - this.d1 -this.d2;
	engine.moveWindowRelative(0,this.d3,0,0,1);
	// engine.moveWindowRelative(0,0.175,0,0,1);
    }], engine, () => {});

let weihrauchIntro = new Slide("weihrauch-intro", (slide, engine, presentation) => {
    	let solQ = slide.query(".sol-Q");
	let solP = slide.query(".sol-P");
	let solF = slide.query(".sol-f");
	let solG = slide.query(".sol-g");
	let i00 = slide.query(".i00");
	let i01 = slide.query(".i01");
	let s0 = slide.query(".s0");
	let s1 = slide.query(".s1");
	let i1 = slide.query(".i1");
	let lLines = slide.queryAll(".link");
	let curve = slide.query(".link-curved");
	solQ.style.left = ((solQ.offsetParent.offsetWidth-solQ.offsetWidth)/2)+"px";
	solQ.style.top = ((solQ.offsetParent.offsetHeight-solQ.offsetHeight)/2)+"px";
	solF.style.left = (solF.offsetParent.offsetWidth/5-solF.offsetWidth/2)+"px";
	solF.style.top = ((solF.offsetParent.offsetHeight-solF.offsetHeight)/2)+"px";
	solG.style.left = (4*solG.offsetParent.offsetWidth/5-solG.offsetWidth/2)+"px";
	solG.style.top = ((solG.offsetParent.offsetHeight-solG.offsetHeight)/2)+"px";
	lLines[0].style.top = ((lLines[0].offsetParent.offsetHeight-lLines[0].offsetHeight)/2)+"px";
	lLines[0].style.left = (solF.offsetLeft+solF.offsetWidth)+"px";
	lLines[0].style.width = (solQ.offsetLeft -(solF.offsetLeft+ solF.offsetWidth))+"px";
	lLines[1].style.top = ((lLines[1].offsetParent.offsetHeight-lLines[1].offsetHeight)/2)+"px";
	lLines[1].style.left = "10px";
	lLines[1].style.width = (solF.offsetLeft - 14)+"px";
	lLines[2].style.top = ((lLines[2].offsetParent.offsetHeight-lLines[2].offsetHeight)/2)+"px";
	lLines[2].style.left = (solQ.offsetLeft+solQ.offsetWidth)+"px";
	lLines[2].style.width = (solG.offsetLeft -(solQ.offsetLeft+ solQ.offsetWidth))+"px";
	lLines[3].style.top = ((lLines[1].offsetParent.offsetHeight-lLines[1].offsetHeight)/2)+"px";
	lLines[3].style.left = (solG.offsetLeft+solG.offsetWidth)+"px";
	lLines[3].style.width = (solF.offsetParent.offsetWidth - (solG.offsetLeft+solG.offsetWidth))+"px";
	solP.style.width = "90%";
	solP.style.height = (3*solQ.offsetHeight)+"px";
	solP.style.left = ((solP.offsetParent.offsetWidth-solP.offsetWidth)/2)+"px";
	solP.style.top = ((solP.offsetParent.offsetHeight-solP.offsetHeight)/2)+"px";
	curve.style.top = ((curve.offsetParent.offsetHeight)/2)+"px";
	curve.style.left = (solG.offsetLeft-curve.offsetWidth+solG.offsetWidth/2)+"px";
	i00.style.left = (lLines[1].offsetLeft+10)+"px";
	i00.style.top = (lLines[1].offsetTop-40)+"px";
	i01.style.left = (lLines[1].offsetLeft+10)+"px";
	i01.style.top = (lLines[1].offsetTop-40)+"px";
	i1.style.left = (solF.offsetLeft+solF.offsetWidth+10)+"px";
	i1.style.top = (lLines[1].offsetTop-40)+"px";
	s1.style.left = (solQ.offsetLeft+solQ.offsetWidth+10)+"px";
	s1.style.top = (lLines[1].offsetTop-40)+"px";
	s0.style.left = (solG.offsetLeft+solG.offsetWidth+10)+"px";
	s0.style.top = (lLines[1].offsetTop-40)+"px";

}, [
    (slide, engine, presentation) => {
	slide.queryAll(".cm5").forEach((elem) => {elem.style.opacity = "1";});
	slide.queryAll(".c1").forEach((elem) => {elem.style.opacity = "1";});
    }, (slide, engine, presentation) => {
	engine.moveWindowRelative(0,0.7,0,0,1);
	slide.queryAll(".c2").forEach((elem) => {elem.style.opacity = "1";});
    }, (slide, engine, presentation) => {
	slide.query(".e0").classList.add("emphasize");
	let solQ = slide.query(".sol-Q");
	let solP = slide.query(".sol-P");
	let solF = slide.query(".sol-f");
	let solG = slide.query(".sol-g");
	let i00 = slide.query(".i00");
	let i01 = slide.query(".i01");
	let s0 = slide.query(".s0");
	let s1 = slide.query(".s1");
	let i1 = slide.query(".i1");
	let lLines = slide.queryAll(".link");
	let curve = slide.query(".link-curved");
	i00.style.left = (solF.offsetLeft-40)+"px";
	i01.style.left = (solF.offsetLeft-40)+"px";
	setTimeout(() => {
	    i01.style.left = (solF.offsetLeft-60)+"px";
	    i01.style.top = (curve.offsetTop+curve.offsetHeight-50)+"px";
	    setTimeout(() => {
		i01.style.left = (solG.offsetLeft+solG.offsetWidth/2-40)+"px";		
		setTimeout(() => {
		    i01.style.top = (solG.offsetTop+solG.offsetHeight+10)+"px";		
		}, 600);
	    }, 600);
	}, 500);
    }, (slide, engine, presentation) => {
	slide.query(".e0").classList.remove("emphasize");
	slide.query(".e1").classList.add("emphasize");
	let solQ = slide.query(".sol-Q");
	let i1 = slide.query(".i1");
	i1.style.opacity = "1";
	setTimeout(() => { i1.style.left = (solQ.offsetLeft - 40) + "px";}, 200);
    }, (slide, engine, presentation) => {
	slide.query(".e1").classList.remove("emphasize");
	slide.query(".e2").classList.add("emphasize");
	let solG = slide.query(".sol-g");
	let s1 = slide.query(".s1");
	s1.style.opacity = "1";
	setTimeout(() => { s1.style.left = (solG.offsetLeft - 40) + "px";}, 200);
    }, (slide, engine, presentation) => {
	slide.query(".e2").classList.remove("emphasize");
	slide.query(".e3").classList.add("emphasize");
	let solG = slide.query(".sol-g");
	let s0 = slide.query(".s0");
	s0.style.opacity = "1";
	setTimeout(() => { s0.style.left = (solG.offsetParent.offsetWidth - s0.offsetWidth - 10) + "px";}, 200);
    }, (slide, engine, presentation) => {
	engine.moveWindowRelative(0,1.05,0,0,1);
    }, (slide, engine, presentation) => {
	slide.queryAll(".ai").forEach((elem, index) => {
	    elem.style.visibility = "visible";
	    elem.style.top = (50+index*100)+"px";
	});
	slide.query(".enumeration").style.visibility = "visible";
	slide.query(".ac-2").classList.remove("emphasize");
	slide.query(".instance-ac-2").classList.add("emphasize");
	let gauche = 775, droite = 850;
	this.p1p = {x: gauche, y:50+20};
	this.p2p = { x: droite, y: (50+20)};
	this.p3p = { x: gauche, y: (50+20+100)};
	this.p4p = { x: droite, y: (50+20+100)};
	this.p5p = { x: gauche, y: (50+20+2*100)};
	this.p6p = { x: droite, y: (50+20+2*100)};
	this.p7p = { x: gauche, y: (50+20+3*100)};
	this.p8p = { x: droite, y: (50+20+3*100)};
	this.p9p = { x: gauche, y: (50+20+4*100)};
	this.p10p = { x: droite, y: (50+20+4*100)};
	this.p11p = { x: gauche, y: (50+20+5*100)};
	this.p12p = { x: droite, y: (50+20+5*100)};
	this.p13p = { x: gauche, y: (50+20+6*100)};
	this.p14p = { x: droite, y: (50+20+6*100)};
	this.p1p.elem = addPoint(this.p1p);
	this.p2p.elem = addPoint(this.p2p);
	this.p3p.elem = addPoint(this.p3p);
	this.p4p.elem = addPoint(this.p4p);
	this.p5p.elem = addPoint(this.p5p);
	this.p6p.elem = addPoint(this.p6p);
	this.p7p.elem = addPoint(this.p7p);
	this.p8p.elem = addPoint(this.p8p);
	this.p9p.elem = addPoint(this.p9p);
	this.p10p.elem = addPoint(this.p10p);
	this.p11p.elem = addPoint(this.p11p);
	this.p12p.elem = addPoint(this.p12p);
	this.p13p.elem = addPoint(this.p13p);
	this.p14p.elem = addPoint(this.p14p);
    }, (slide, engine, presentation) => {
	setTimeout(() => {
	    this.p13p.elem.style.borderColor = "lightGrey";
	}, 000);
	setTimeout(() => {
	    this.p10p.elem.style.borderColor = "lightGrey";
	}, 500);
	setTimeout(() => {
	    // this.p9p.elem.style.borderColor = "lightGrey";
	}, 1000);
	setTimeout(() => {
	    this.p8p.elem.style.borderColor = "lightGrey";
	}, 1000);
	setTimeout(() => {
	    // this.p7p.elem.style.borderColor = "lightGrey";
	}, 1500);
	setTimeout(() => {
	    // this.p3p.elem.style.borderColor = "lightGrey";
	}, 1500);
	setTimeout(() => {
	    this.p4p.elem.style.borderColor = "lightGrey";
	}, 2000);
	setTimeout(() => {
	    this.p1p.elem.style.borderColor = "lightGrey";
	}, 2000);
	
    }, (slide, engine, presentation) => {
	slide.query(".instance-ac-2").classList.remove("emphasize");
	slide.query(".solution-ac-2").classList.add("emphasize");
	this.p2p.elem.style.borderColor = "red";
	this.p5p.elem.style.borderColor = "red";
	this.p12p.elem.style.borderColor = "red";
	this.p4p.elem.style.borderColor = "red";
	this.p7p.elem.style.borderColor = "red";
	this.p9p.elem.style.borderColor = "red";
	this.p14p.elem.style.borderColor = "red";

    }, (slide, engine, presentation) => {
	slide.query(".def-ac-2").style.display = "none";
	slide.query(".def-dc-2").style.display = "block";
	slide.query(".enumeration").style.visibility = "hidden";
	slide.queryAll(".ai").forEach((elem) => {elem.style.visibility = "hidden";});
	this.p1p.elem.parentNode.removeChild(this.p1p.elem);
	this.p2p.elem.parentNode.removeChild(this.p2p.elem);
	this.p3p.elem.parentNode.removeChild(this.p3p.elem);
	this.p4p.elem.parentNode.removeChild(this.p4p.elem);
	this.p5p.elem.parentNode.removeChild(this.p5p.elem);
	this.p6p.elem.parentNode.removeChild(this.p6p.elem);
	this.p7p.elem.parentNode.removeChild(this.p7p.elem);
	this.p8p.elem.parentNode.removeChild(this.p8p.elem);
	this.p9p.elem.parentNode.removeChild(this.p9p.elem);
	this.p10p.elem.parentNode.removeChild(this.p10p.elem);
	this.p11p.elem.parentNode.removeChild(this.p11p.elem);
	this.p12p.elem.parentNode.removeChild(this.p12p.elem);
	this.p13p.elem.parentNode.removeChild(this.p13p.elem);
	this.p14p.elem.parentNode.removeChild(this.p14p.elem);
    }, (slide, engine, presentation) => {
	slide.query(".enumeration").style.visibility = "visible";
	slide.query(".dc-2").classList.remove("emphasize");
	slide.query(".instance-dc-2").classList.add("emphasize");
	this.tab = [];
	let h=100;
	let d = 100;
	this.p0 = {x:200, y:50};
	this.p1 = {x:this.p0.x-d, y:this.p0.y+h};
	this.p2 = {x:this.p0.x+d, y:this.p0.y+h};
	this.p3 = {x:this.p1.x-d/2, y:this.p1.y+h};
	this.p4 = {x:this.p1.x+d/2, y:this.p1.y+h};
	this.p5 = {x:this.p2.x-d/2, y:this.p2.y+h};
	this.p6 = {x:this.p2.x+d/2, y:this.p2.y+h};
	this.p7 = {x:this.p3.x-d/4, y:this.p3.y+h};
	this.p8 = {x:this.p3.x+d/4, y:this.p3.y+h};
	this.p9 = {x:this.p4.x-d/4, y:this.p4.y+h};
	this.p10 = {x:this.p4.x+d/4, y:this.p4.y+h};
	this.p11 = {x:this.p5.x-d/4, y:this.p5.y+h};
	this.p12 = {x:this.p5.x+d/4, y:this.p5.y+h};
	this.p13 = {x:this.p6.x-d/4, y:this.p6.y+h};
	this.p14 = {x:this.p6.x+d/4, y:this.p6.y+h};
	this.tab["0-1"] = addLine(this.p0, this.p1);
	this.tab["0-2"] = addLine(this.p0, this.p2);
	this.tab["1-3"] = addLine(this.p1, this.p3);
	this.tab["1-4"] = addLine(this.p1, this.p4);
	this.tab["2-5"] = addLine(this.p2, this.p5);
	this.tab["2-6"] = addLine(this.p2, this.p6);
	this.tab["3-7"] = addLine(this.p3, this.p7);
	this.tab["3-8"] = addLine(this.p3, this.p8);
	this.tab["4-9"] = addLine(this.p4, this.p9);
	this.tab["4-10"] = addLine(this.p4, this.p10);
	this.tab["5-11"] = addLine(this.p5, this.p11);
	this.tab["5-12"] = addLine(this.p5, this.p12);
	this.tab["6-13"] = addLine(this.p6, this.p13);
	this.tab["6-14"] = addLine(this.p6, this.p14);
	// console.log(tab.length);
	this.p0.elem = addPoint(this.p0);
	this.p1.elem = addPoint(this.p1);
	this.p2.elem = addPoint(this.p2);
	this.p3.elem = addPoint(this.p3);
	this.p4.elem = addPoint(this.p4);
	this.p5.elem = addPoint(this.p5);
	this.p6.elem = addPoint(this.p6);
	this.p7.elem = addPoint(this.p7);
	this.p8.elem = addPoint(this.p8);
	this.p9.elem = addPoint(this.p9);
	this.p10.elem = addPoint(this.p10);
	this.p11.elem = addPoint(this.p11);
	this.p12.elem = addPoint(this.p12);
	this.p13.elem = addPoint(this.p13);
	this.p14.elem = addPoint(this.p14);
	slide.queryAll(".ppp").forEach((elem, index) => {
	    elem.style.left = (25+25/3+50*index)+"px";
	    elem.style.visibility = "visible";
	});
	// this.p7 = addPoint(400, 50);
	// this.l0 = addLine();
    }, (slide, engine, presentation) => {
	setTimeout(() => {
	    this.p13.elem.style.borderColor = "lightGrey";
	    this.tab["6-13"].style.borderColor = "lightGrey";
	    slide.query(".p6.ppp").style.color = "lightGrey";
	}, 000);
	setTimeout(() => {
	    this.p10.elem.style.borderColor = "lightGrey";
	    slide.query(".p3.ppp").style.color = "lightGrey";
	    this.tab["4-10"].style.borderColor = "lightGrey";
	}, 500);
	setTimeout(() => {
	    this.p9.elem.style.borderColor = "lightGrey";
	    slide.query(".p2.ppp").style.color = "lightGrey";
	    this.tab["4-9"].style.borderColor = "lightGrey";
	}, 1000);
	setTimeout(() => {
	    this.p8.elem.style.borderColor = "lightGrey";
	    slide.query(".p1.ppp").style.color = "lightGrey";
	    this.tab["3-8"].style.borderColor = "lightGrey";
	}, 1000);
	setTimeout(() => {
	    this.p7.elem.style.borderColor = "lightGrey";
	    slide.query(".p0.ppp").style.color = "lightGrey";
	    this.tab["3-7"].style.borderColor = "lightGrey";
	}, 1500);
	setTimeout(() => {
	    this.p3.elem.style.borderColor = "lightGrey";
	    this.tab["1-3"].style.borderColor = "lightGrey";
	}, 1500);
	setTimeout(() => {
	    this.p4.elem.style.borderColor = "lightGrey";
	    this.tab["1-4"].style.borderColor = "lightGrey";
	}, 2000);
	setTimeout(() => {
	    this.p1.elem.style.borderColor = "lightGrey";
	    this.tab["0-1"].style.borderColor = "lightGrey";
	}, 2000);
	
    }, (slide, engine, presentation) => {
	slide.query(".instance-dc-2").classList.remove("emphasize");
	slide.query(".solution-dc-2").classList.add("emphasize");

	this.p0.elem.style.borderColor = "red";
	this.tab["0-2"].style.borderColor = "red";
	this.p2.elem.style.borderColor = "red";
	this.tab["2-5"].style.borderColor = "red";
	this.p5.elem.style.borderColor = "red";
	this.tab["5-12"].style.borderColor = "red";
	this.p12.elem.style.borderColor = "red";

	// this.p4.elem.style.borderColor = "red";
	// this.tab["1-4"].style.borderColor = "red";
	// this.p7.elem.style.borderColor = "red";
	// this.tab["3-7"].style.borderColor = "red";
	// this.p9.elem.style.borderColor = "red";
	// this.tab["4-9"].style.borderColor = "red";

	slide.query(".p5.ppp").style.color = "red";

    }, (slide, engine, presentation) => {
	slide.query(".def-dc-2").style.display = "none";
	slide.query(".ac-vs-dc-2").style.display = "block";

	slide.queryAll(".line").forEach((elem) => {
	    elem.style.borderColor = "black";
	});
	slide.queryAll(".point").forEach((elem) => {
	    elem.style.borderColor = "black";
	});
	slide.queryAll(".ppp").forEach((elem) => {
	    elem.style.color = "black";
	});
	slide.queryAll(".ai").forEach((elem) => {
	    elem.style.visibility = "visible";
	});

    }, (slide, engine, presentation) => {
	setTimeout(() => {
	    this.p13.elem.style.borderColor = "lightGrey";
	    this.tab["6-13"].style.borderColor = "lightGrey";
	    slide.query(".p6.ppp").style.color = "lightGrey";
	}, 000);
	setTimeout(() => {
	    this.p10.elem.style.borderColor = "lightGrey";
	    slide.query(".p3.ppp").style.color = "lightGrey";
	    this.tab["4-10"].style.borderColor = "lightGrey";
	}, 500);
	setTimeout(() => {
	    this.p9.elem.style.borderColor = "lightGrey";
	    slide.query(".p2.ppp").style.color = "lightGrey";
	    this.tab["4-9"].style.borderColor = "lightGrey";
	}, 1000);
	setTimeout(() => {
	    this.p8.elem.style.borderColor = "lightGrey";
	    slide.query(".p1.ppp").style.color = "lightGrey";
	    this.tab["3-8"].style.borderColor = "lightGrey";
	}, 1000);
	setTimeout(() => {
	    this.p7.elem.style.borderColor = "lightGrey";
	    slide.query(".p0.ppp").style.color = "lightGrey";
	    this.tab["3-7"].style.borderColor = "lightGrey";
	}, 1500);
	setTimeout(() => {
	    this.p3.elem.style.borderColor = "lightGrey";
	    this.tab["1-3"].style.borderColor = "lightGrey";
	}, 1500);
	setTimeout(() => {
	    this.p4.elem.style.borderColor = "lightGrey";
	    this.tab["1-4"].style.borderColor = "lightGrey";
	}, 2000);
	setTimeout(() => {
	    this.p1.elem.style.borderColor = "lightGrey";
	    this.tab["0-1"].style.borderColor = "lightGrey";
	}, 2000);
	
    }, (slide, engine, presentation) => {
	let gauche = "775px", droite = "850px";
	this.p1.elem.style.left = gauche;
	this.p1.elem.style.top = (50+20)+"px";
	this.p2.elem.style.left = droite;
	this.p2.elem.style.top = (50+20)+"px";
	this.p3.elem.style.left = gauche;
	this.p3.elem.style.top = (50+20+100)+"px";
	this.p4.elem.style.left = droite;
	this.p4.elem.style.top = (50+20+100)+"px";
	this.p5.elem.style.left = gauche;
	this.p5.elem.style.top = (50+20+2*100)+"px";
	this.p6.elem.style.left = droite;
	this.p6.elem.style.top = (50+20+2*100)+"px";
	this.p7.elem.style.left = gauche;
	this.p7.elem.style.top = (50+20+3*100)+"px";
	this.p8.elem.style.left = droite;
	this.p8.elem.style.top = (50+20+3*100)+"px";
	this.p9.elem.style.left = gauche;
	this.p9.elem.style.top = (50+20+4*100)+"px";
	this.p10.elem.style.left = droite;
	this.p10.elem.style.top = (50+20+4*100)+"px";
	this.p11.elem.style.left = gauche;
	this.p11.elem.style.top = (50+20+5*100)+"px";
	this.p12.elem.style.left = droite;
	this.p12.elem.style.top = (50+20+5*100)+"px";
	this.p13.elem.style.left = gauche;
	this.p13.elem.style.top = (50+20+6*100)+"px";
	this.p14.elem.style.left = droite;
	this.p14.elem.style.top = (50+20+6*100)+"px";
    }, (slide, engine, presentation) => {
	slide.queryAll(".line").forEach((elem) => {
	    elem.style.borderColor = "black";
	});
	slide.queryAll(".point").forEach((elem) => {
	    elem.style.borderColor = "black";
	});
    }, (slide, engine, presentation) => {
	setTimeout(() => {
	    this.p13.elem.style.borderColor = "lightGrey";
	    this.tab["6-13"].style.borderColor = "lightGrey";
	    slide.query(".p6.ppp").style.color = "lightGrey";
	}, 0000);
	setTimeout(() => {
	    this.p10.elem.style.borderColor = "lightGrey";
	    slide.query(".p3.ppp").style.color = "lightGrey";
	    this.tab["4-10"].style.borderColor = "lightGrey";
	}, 0500);
	setTimeout(() => {
	    this.p9.elem.style.borderColor = "purple";
	    slide.query(".p2.ppp").style.color = "lightGrey";
	    this.tab["4-9"].style.borderColor = "lightGrey";
	}, 1000);
	setTimeout(() => {
	    this.p8.elem.style.borderColor = "lightGrey";
	    slide.query(".p1.ppp").style.color = "lightGrey";
	    this.tab["3-8"].style.borderColor = "lightGrey";
	}, 1000);
	setTimeout(() => {
	    this.p7.elem.style.borderColor = "purple";
	    slide.query(".p0.ppp").style.color = "lightGrey";
	    this.tab["3-7"].style.borderColor = "lightGrey";
	}, 1500);
	setTimeout(() => {
	    this.p3.elem.style.borderColor = "lightGrey";
	    this.tab["1-3"].style.borderColor = "lightGrey";
	}, 1500);
	setTimeout(() => {
	    this.p4.elem.style.borderColor = "purple";
	    this.tab["1-4"].style.borderColor = "lightGrey";
	}, 2000);
	setTimeout(() => {
	    this.p1.elem.style.borderColor = "lightGrey";
	    this.tab["0-1"].style.borderColor = "lightGrey";
	}, 2000);
	
    }, (slide, engine, presentation) => {
	this.p0.elem.style.borderColor = "red";
	this.tab["0-2"].style.borderColor = "red";
	this.p2.elem.style.borderColor = "red";
	this.tab["2-5"].style.borderColor = "red";
	this.p5.elem.style.borderColor = "red";
	this.tab["5-12"].style.borderColor = "red";
	this.p12.elem.style.borderColor = "red";

	this.p4.elem.style.borderColor = "red";
	this.tab["1-4"].style.borderColor = "red";
	this.p7.elem.style.borderColor = "red";
	this.tab["3-7"].style.borderColor = "red";
	this.p9.elem.style.borderColor = "red";
	this.tab["4-9"].style.borderColor = "red";

	slide.query(".p5.ppp").style.color = "red";
    }, (slide, engine, presentation) => {
	this.p1.elem.style.left = this.p1.x+"px";
	this.p1.elem.style.top = this.p1.y+"px";
	this.p2.elem.style.left = this.p2.x+"px";
	this.p2.elem.style.top = this.p2.y+"px";
	this.p3.elem.style.left = this.p3.x+"px";
	this.p3.elem.style.top = this.p3.y+"px";
	this.p4.elem.style.left = this.p4.x+"px";
	this.p4.elem.style.top = this.p4.y+"px";
	this.p5.elem.style.left = this.p5.x+"px";
	this.p5.elem.style.top = this.p5.y+"px";
	this.p6.elem.style.left = this.p6.x+"px";
	this.p6.elem.style.top = this.p6.y+"px";
	this.p7.elem.style.left = this.p7.x+"px";
	this.p7.elem.style.top = this.p7.y+"px";
	this.p8.elem.style.left = this.p8.x+"px";
	this.p8.elem.style.top = this.p8.y+"px";
	this.p9.elem.style.left = this.p9.x+"px";
	this.p9.elem.style.top = this.p9.y+"px";
	this.p10.elem.style.left = this.p10.x+"px";
	this.p10.elem.style.top = this.p10.y+"px";
	this.p11.elem.style.left = this.p11.x+"px";
	this.p11.elem.style.top = this.p11.y+"px";
	this.p12.elem.style.left = this.p12.x+"px";
	this.p12.elem.style.top = this.p12.y+"px";
	this.p13.elem.style.left = this.p13.x+"px";
	this.p13.elem.style.top = this.p13.y+"px";
	this.p14.elem.style.left = this.p14.x+"px";
	this.p14.elem.style.top = this.p14.y+"px";
    }, (slide, engine, presentation) => {
	// slide.query(".custom-canvas").style.display = "none";
	slide.query(".question-ac-vs-dc-n").style.display = "block";
	slide.query(".custom-canvas").querySelectorAll("div").forEach((elem) => {
	    // if(elem.classList.contains("aj"))
		elem.style.display = "none";
	});
    }, (slide, engine, presentation) => {
	slide.query(".custom-canvas .aj").style.display = "block";
	slide.query(".custom-canvas .aj").style.visibility = "visible";
	slide.query(".custom-canvas .aj").style.opacity = "1";
	let h = 50;
	this.p1p = {x: 160 + 80*0, y:h};
	this.p2p = {x: 160 + 80*1, y:h};
	this.p3p = {x: 160 + 80*2, y:h};
	this.p4p = {x: 160 + 80*3, y:h};
	this.p5p = {x: 160 + 80*4, y:h};
	this.p6p = {x: 160 + 80*5, y:h};
	this.p7p = {x: 160 + 80*6, y:h};
	this.p8p = {x: 160 + 80*7, y:h};
	this.p9p = {x: 160 + 80*8, y:h};
	this.p10p = {x: 160 + 80*9, y:h};
	this.p11p = {x: 160 + 80*10, y:h};
	this.p12p = {x: 160 + 80*11, y:h};
	this.p13p = {x: 160 + 80*12, y:h};
	this.p14p = {x: 160 + 80*13, y:h};
	this.p15p = {x: 160 + 80*14, y:h};
	this.p16p = {x: 160 + 80*15, y:h};
	this.p17p = {x: 160 + 80*16, y:h};
	this.p1p.elem = addPoint(this.p1p);
	this.p2p.elem = addPoint(this.p2p);
	this.p3p.elem = addPoint(this.p3p);
	this.p4p.elem = addPoint(this.p4p);
	this.p5p.elem = addPoint(this.p5p);
	this.p6p.elem = addPoint(this.p6p);
	this.p7p.elem = addPoint(this.p7p);
	this.p8p.elem = addPoint(this.p8p);
	this.p9p.elem = addPoint(this.p9p);
	this.p10p.elem = addPoint(this.p10p);
	this.p11p.elem = addPoint(this.p11p);
	this.p12p.elem = addPoint(this.p12p);
	this.p13p.elem = addPoint(this.p13p);
	this.p14p.elem = addPoint(this.p14p);
	this.p15p.elem = addPoint(this.p15p);
	this.p16p.elem = addPoint(this.p16p);
	this.p17p.elem = addPoint(this.p17p);
    }, (slide, engine, presentation) => {
	setTimeout(() => { this.p1p.elem.style.borderColor = "lightGrey";}, 1*500-500);
	setTimeout(() => { this.p2p.elem.style.borderColor = "lightGrey";}, 2*500-500);
	setTimeout(() => { this.p3p.elem.style.borderColor = "lightGrey";}, 3*500-500);
	setTimeout(() => { this.p4p.elem.style.borderColor = "lightGrey";}, 4*500-500);
	setTimeout(() => { this.p5p.elem.style.borderColor = "lightGrey";}, 5*500-500);
	setTimeout(() => { this.p6p.elem.style.borderColor = "lightGrey";}, 6*500-500);
	setTimeout(() => { this.p7p.elem.style.borderColor = "lightGrey";}, 7*500-500);
	setTimeout(() => { this.p8p.elem.style.borderColor = "lightGrey";}, 8*500-500);
	setTimeout(() => { this.p9p.elem.style.borderColor = "lightGrey";}, 9*500-500);
	setTimeout(() => { this.p10p.elem.style.borderColor = "lightGrey";}, 10*500-500);
	setTimeout(() => { this.p11p.elem.style.borderColor = "lightGrey";}, 11*500-500);
	setTimeout(() => { this.p12p.elem.style.borderColor = "lightGrey";}, 12*500-500);
	setTimeout(() => { this.p13p.elem.style.borderColor = "lightGrey";}, 13*500-500);
	setTimeout(() => { this.p14p.elem.style.borderColor = "lightGrey";}, 14*500-500);
	setTimeout(() => { this.p15p.elem.style.borderColor = "lightGrey";}, 15*500-500);
	setTimeout(() => { this.p16p.elem.style.borderColor = "lightGrey";}, 16*500-500);
	setTimeout(() => { this.p17p.elem.style.borderColor = "lightGrey";}, 17*500-500);
	
    }, (slide, engine, presentation) => {
	slide.query(".custom-canvas").style.display = "none";
	slide.query(".th-1").style.opacity = "1";
    }, (slide, engine, presentation) => {
	engine.moveWindowRelative(0,0.45,0,0,1);	    
	slide.query(".th-2").style.opacity = "1";
	
    }, (slide, engine, presentation) => {
	engine.moveWindowRelative(-1.5,-0.95,0,0,1);	    
	setTimeout(() => {
	    engine.moveWindowRelative(0,0,7,0,3);
	    setTimeout(() => {
		document.querySelector("#thanks").classList.add("placed");
		document.querySelector("#fo").classList.add("placed");
	    }, 3000);
	}, 500);
    }], engine, (slide, engine, presentation) => {
	engine.moveWindowRelative(0,-0.3,0,0,1);
	slide.queryAll(".v0").forEach((elem) => { elem.style.opacity = "1";});
	document.querySelector("#thanks").style.visibility = "visible";
	document.querySelector("#fo").style.visibility = "visible";
    });


let randomnessITTM = new Slide("randomness-ittm", (slide, engine, presentation) => {}, [
    (slide, engine, presentation) => {
    	slide.query(".c1").style.opacity = "1";	
    }, (slide, engine, presentation) => {
    	slide.query(".c2").style.opacity = "1";
    	this.d1 = (slide.query(".c2").offsetTop + slide.query(".c2").offsetHeight)/1080 -1+0.05;
	engine.moveWindowRelative(0,this.d1,0,0,1);
    }, (slide, engine, presentation) => {
	this.d2 = (slide.query(".c5").offsetTop+slide.query(".c5").offsetHeight)/1080 -1 +0.025 -this.d1;
	engine.moveWindowRelative(0,this.d2,0,0,1);
    }, (slide, engine, presentation) => {
    	slide.query(".c3").style.opacity = "1";
    }, (slide, engine, presentation) => {
    	slide.query(".c4").style.opacity = "1";
    }, (slide, engine, presentation) => {
    	slide.query(".c5").style.opacity = "1";
    }, (slide, engine, presentation) => {
	this.d3 = (slide.query(".c2").offsetTop)/1080 -0.05 -this.d2 -this.d1;
	engine.moveWindowRelative(0,this.d3,0,0,1);
    }, (slide, engine, presentation) => {
	let inclusion = slide.query(".higher-theorem");
	let ghost = slide.query(".higher-theorem-ghost");
	inclusion.style.position = "relative";
	inclusion.style.top = "0";
	console.log(ghost, inclusion);
	console.log((ghost.offsetTop - inclusion.offsetTop));
	setTimeout(() => {inclusion.style.top = (ghost.offsetTop - inclusion.offsetTop)+"px";}, 0);
	this.d4 = 1;
	engine.moveWindowRelative(0,this.d4,0,0,1);
    }, (slide, engine, presentation) => {
	slide.query(".c6").style.opacity="1";
    }, (slide, engine, presentation) => {
	this.d4prime = -1;
	engine.moveWindowRelative(0,this.d4prime,0,0,1);
    }, (slide, engine, presentation) => {
	let inclusion = slide.query(".inclusions");
	let ghost = slide.query(".inclusions-ghost");
	inclusion.style.position = "relative";
	inclusion.style.top = "0";
	console.log(ghost, inclusion);
	setTimeout(() => slide.query(".inclusions").style.top = (ghost.offsetTop - inclusion.offsetTop)+"px");
	this.d5 = 1.5;
	this.d5 = (slide.query(".c7").offsetTop+slide.query(".c7").offsetHeight)/1080 -1 - (this.d1+this.d2+this.d3+this.d4+this.d4prime) + 0.0125;
	engine.moveWindowRelative(0,this.d5,0,0,1);
    }, (slide, engine, presentation) => {
	slide.query(".c7").style.opacity="1";
    }, (slide, engine, presentation) => {
	this.d6 = 0.55;
	this.d6 = (slide.queryAll(".c9")[1].offsetTop+slide.queryAll(".c9")[1].offsetHeight)/1080 -1 - (this.d1+this.d2+this.d3+this.d4+this.d4prime+this.d5)-0.0125;
	engine.moveWindowRelative(0,this.d6,0,0,1);
	slide.query(".c8").style.opacity="1";
    }, (slide, engine, presentation) => {
	slide.queryAll(".c9").forEach((elem) => elem.style.opacity="1");
    }, (slide, engine, presentation) => {
	slide.query(".c10").style.opacity="1";
	this.d7 = 0.9;
	this.d7 = (slide.query(".c11").offsetTop+slide.query(".c11").offsetHeight)/1080 -1 - (this.d1+this.d2+this.d3+this.d4+this.d4prime+this.d5+this.d6)+0.0125;
	engine.moveWindowRelative(0,this.d7,0,0,1);
	let q2Ghost = slide.query(".question-2-ghost");
	let q2 = slide.query(".question-2");
	q2.style.position = "relative";
	q2.style.top = "0";
	setTimeout(() => {q2.style.top = (q2Ghost.offsetTop - q2.offsetTop)+"px";});
    }, (slide, engine, presentation) => {
	slide.query(".c11").style.opacity="1";
    }, (slide, engine, presentation) => {
	this.d8 = 0.5;
	this.d8 = (slide.query(".c13").offsetTop+slide.query(".c13").offsetHeight)/1080 -1 - (this.d1+this.d2+this.d3+this.d4+this.d4prime+this.d5+this.d6+this.d7)+0.0125;
	engine.moveWindowRelative(0,this.d8,0,0,1);
	slide.query(".c12").style.opacity="1";
    }, (slide, engine, presentation) => {
	slide.query(".c13").style.opacity="1";
    }], engine, (slide, engine, presentation) => {
	slide.queryAll(".cm2").forEach((elem) => {elem.style.opacity = "1";});
    });

let beamerTitle = new Slide("beamer-title", (slide, engine, presentation) => {}, [], engine, () => {});
let endSlide = new Slide("fin", (slide, engine, presentation) => {}, [], engine, () => {});

let tempsInfini3 = new Slide("temps-infini-2", (slide, engine, presentation) => {
    slide.query(".slide-container").style.display ="block";
}, [(slide, engine, presentation) => {
    engine.moveWindowRelative(0,0.55,0,0,1);
    slide.query(".c1").style.opacity = "1";
    slide.element.style.zIndex=10;
// }, (slide, engine, presentation) => {
    
}], engine, (slide, engine, presentation) => {});


let presentation = new Presentation([
    beamerTitle,
    title,
    cles,
    calcul,
    definissabilite,
    cles2,
    tempsInfini,
    tempsInfini2,
    alphaRecDef,
    higherDef,
    ittmsDef,
    tempsInfini3,
    // lienDef,
    randomnessIntro,
    randomnessITTM,
    reverseMathIntro,
    hindmanItself,
    hindmanRM,
    hindmanProof,
    weihrauchIntro,
    // endSlide,
], engine);

let controller = new Controller(engine, presentation);
// engine.setPresentation(presentation);


function getAnchor() {
    var currentUrl = document.URL,
	urlParts   = currentUrl.split('#');
		
    return (urlParts.length > 1) ? urlParts[1] : null;
}
let anchor = parseInt(getAnchor());
if(anchor) {
    for(let i=0;i<anchor; i++) {
	presentation.next();
    }
}
