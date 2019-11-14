function drawMem(mem, x, y, pointer, canvas) {
    let ctx = canvas.getContext("2d");
    mem.forEach((cell, index) => {
	ctx.strokeRect(x+index*70, y, 70, 70);
	ctx.fillText(cell+"",x+index*70+23, y+49);
    });
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x+mem.length*70, y);
    ctx.setLineDash([10]);
    ctx.lineTo(x+mem.length*70+35+70, y);
    ctx.stroke();
    ctx.moveTo(x+mem.length*70, y+70);
    ctx.lineTo(x+mem.length*70+35+70, y+70);
    ctx.stroke();
    ctx.restore();
    ctx.beginPath();
    ctx.moveTo(x+70*pointer+35, y+70+70);
    ctx.lineTo(x+70*pointer+35, y+70);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x+70*pointer+35, y+70);
    ctx.lineTo(x+70*pointer+35+15, y+70+35);
    ctx.lineTo(x+70*pointer+35-15, y+70+35);
    ctx.lineTo(x+70*pointer+35, y+70);
    ctx.fill();
    ctx.stroke();
}
function drawNode(p,r,canvas, strokeStyle, fillStyle) {
    let ctx = canvas.getContext("2d");
    ctx.save();
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
    if(fillStyle){
	ctx.fillStyle = fillStyle;
	ctx.fill();
    } else {
	if(strokeStyle)
	    ctx.strokeStyle = fillStyle;
	ctx.stroke();
    }
    ctx.restore();
}


// Usage:
// var p0={x:50,y:100};
// var p1={x:100,y:0};
// var p2={x:200,y:200};
// var p3={x:300,y:100};

// cubicCurveArrowHeads(p0, p1, p2, p3, 15, true, true);

// quadraticCurveArrowHeads(p0, p1, p2, 15, true, true);

// // or use defaults true for both ends with arrow heads
// cubicCurveArrowHeads(p0, p1, p2, p3, 15);

// quadraticCurveArrowHeads(p0, p1, p2, 15);



// draws both cubic and quadratic bezier
function bezWithArrowheads(p0, p1, p2, p3, arrowLength, hasStartArrow, hasEndArrow, ctx) {
    var x, y, norm, ex, ey;
    function pointsToNormalisedVec(p,pp){
        var len;
        norm.y = pp.x - p.x;
        norm.x = -(pp.y - p.y);
        len = Math.sqrt(norm.x * norm.x + norm.y * norm.y);
        norm.x /= len;
        norm.y /= len;
        return norm;
    }
        
    var arrowWidth = arrowLength / 2;
    norm = {};
    // defaults to true for both arrows if arguments not included
    hasStartArrow = hasStartArrow === undefined || hasStartArrow === null ? true : hasStartArrow;
    hasEndArrow = hasEndArrow === undefined || hasEndArrow === null ? true : hasEndArrow;
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    if (p3 === undefined) {
        ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
        ex = p2.x;  // get end point
        ey = p2.y;
        norm = pointsToNormalisedVec(p1,p2);
    } else {
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
        ex = p3.x; // get end point
        ey = p3.y;
        norm = pointsToNormalisedVec(p2,p3);
    }
    if (hasEndArrow) {
        x = arrowWidth * norm.x + arrowLength * -norm.y;
        y = arrowWidth * norm.y + arrowLength * norm.x;
        ctx.moveTo(ex + x, ey + y);
        ctx.lineTo(ex, ey);
        x = arrowWidth * -norm.x + arrowLength * -norm.y;
        y = arrowWidth * -norm.y + arrowLength * norm.x;
        ctx.lineTo(ex + x, ey + y);
    }
    if (hasStartArrow) {
        norm = pointsToNormalisedVec(p0,p1);
        x = arrowWidth * norm.x - arrowLength * -norm.y;
        y = arrowWidth * norm.y - arrowLength * norm.x;
        ctx.moveTo(p0.x + x, p0.y + y);
        ctx.lineTo(p0.x, p0.y);
        x = arrowWidth * -norm.x - arrowLength * -norm.y;
        y = arrowWidth * -norm.y - arrowLength * norm.x;
        ctx.lineTo(p0.x + x, p0.y + y);
    }

    ctx.stroke();
}

function cubicCurveArrowHeads(p0, p1, p2, p3, arrowLength, hasStartArrow, hasEndArrow, ctx) {
    bezWithArrowheads(p0, p1, p2, p3, arrowLength, hasStartArrow, hasEndArrow, ctx);
}
function quadraticCurveArrowHeads(p0, p1, p2, arrowLength, hasStartArrow, hasEndArrow, ctx) {
    bezWithArrowheads(p0, p1, p2, undefined, arrowLength, hasStartArrow, hasEndArrow, ctx);
}
function myQuadraticCurveArrowHeads(p0, dx, dy, p2, r, arrowLength, hasStartArrow, hasEndArrow, ctx, color) {
    ctx.save();
    ctx.strokeStyle = color;
    let np0 = {}, np1 = {}, np2 = {};
    if(p0.x< p2.x) {
	np0.x = p0.x + r;
	np2.x = p2.x - r;
    }
    else if(p0.x > p2.x) {
	np0.x = p0.x - r;
	np2.x = p2.x + r;
    }
    else {
	np0.x = p0.x ;
	np2.x = p2.x ;	
	if(dx>0) {  
	    np0.x += r;
	    np2.x += r;
	}
	if (dx<0) {
	    np0.x -= r;
	    np2.x -= r;
	}
    }
    np1.x = (np2.x+np0.x)/2+dx;
    if(p0.y< p2.y) {
	np0.y = p0.y + r;
	np2.y = p2.y - r;
    }
    else if(p0.y > p2.y) {
	np0.y = p0.y - r;
	np2.y = p2.y + r;
    }
    else {
	np0.y = p0.y ;
	np2.y = p2.y ;	
	if(dy>0) {  
	    np0.y += r;
	    np2.y += r;
	}
	if (dy<0) {
	    np0.y -= r;
	    np2.y -= r;
	}
    }
    np1.y = (np2.y+np0.y)/2+dy;
    // console.log(r, np0, np1, np2);
    bezWithArrowheads(np0, np1, np2, undefined, arrowLength, hasStartArrow, hasEndArrow, ctx);
    ctx.restore();
}

let placeText = (text, x, y, dx, dy, radian, ctx) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(radian);
    let sizeText = ctx.measureText(text).width;
    ctx.fillText(text, dx-sizeText/2, dy);
    ctx.restore();
};

function drawGraph1 (nord, sud, ouest, est, r, currentState, currentTransition, canvas, notBlue) {
    // console.log(currentState, currentTransition);
    let p2 = { x:ouest, y:nord};
    let p3 = { x:est, y:nord};
    let p0 = { x:ouest, y:sud};
    let p1 = { x:est, y:sud};
    let ctx = canvas.getContext("2d");
    drawNode(p0,r,canvas,"", (currentState == 0 ? "red" : "black"));
    drawNode(p1,r,canvas,"", (currentState == 1 ? "red" : "black"));
    drawNode(p2,r,canvas,"", (currentState == 2 ? "red" : "black"));
    drawNode(p3,r+8,canvas,"", "blue");
    if(currentState == 3)
	drawNode(p3,r,canvas,"", "red");
    ctx.fillStyle = "black";
    // drawNode({x:p2.x-(est-ouest)/5, y:(p0.y+p2.y)/2},r,canvas,"","black");
    // quadraticCurveArrowHeads({x:p0.x-r, y:p0.y-r}, {x:p2.x-(est-ouest)/5, y:(p0.y+p2.y)/2}, {x:p2.x-r, y:p2.y+r}, 25, false, true, canvas.getContext("2d"));
    myQuadraticCurveArrowHeads(p0, (ouest-est)/4, 0, p2, 25, 25, false, true, ctx, currentTransition == "02"? "red" : "black");
    myQuadraticCurveArrowHeads(p2, 0, 0, p0, 30, 25, false, true, ctx, currentTransition == "20"? "red" : "black");
    myQuadraticCurveArrowHeads(p0, 0, 0, p1, 35, 25, false, true, ctx, currentTransition == "01"? "red" : "black");
    myQuadraticCurveArrowHeads(p1, 0, 0, p2, 25, 25, false, true, ctx, currentTransition == "12"? "red" : "black");
    myQuadraticCurveArrowHeads(p1, 0, 0, p3, 45, 25, false, true, ctx, currentTransition == "13"? "red" : "black");
    if(notBlue)
	myQuadraticCurveArrowHeads(p3, 0, 0, p0, 45, 25, false, true, ctx, currentTransition == "30"? "red" : "black");
    myQuadraticCurveArrowHeads({x:p0.x-120, y:p0.y+120}, 0, 0, p0, 25, 25, false, true, ctx, currentTransition == "0"? "red" : "black");
    ctx.strokeStyle = "black";
    ctx.font = "35px Arial";
    placeText("0,→,1", ouest, sud, (sud - nord)/2, -100, -0.5*Math.PI, ctx);
    placeText("0,→,0", ouest, nord, (sud - nord)/2, -25, 0.5*Math.PI, ctx);
    placeText("1,←,0", ouest, nord, (sud - nord)/2, -65, 0.5*Math.PI, ctx);
    placeText("1,→,0", ouest, sud, (est - ouest)/2, -25, 0, ctx);
    placeText("0,→,1", ouest, nord, (est - ouest)*Math.sqrt(2)/2, -25, 0.25*Math.PI, ctx);
    placeText("1,→,0", est, nord, (est - ouest)/2, -25, 0.5*Math.PI, ctx);
}


function drawTuringMachine1(tm, delay, callback, notBlue) {
    let cv = document.querySelector("#canvas-tm1");
    let ctx = cv.getContext("2d");
    ctx.lineWidth = 3;
    drawGraph1(100, 500, 300, 700, 25, null, "0", cv, notBlue);
    drawMem(tm.getMemory(), 250,600, tm.getPointer(), cv);
    let step = () => {
	let currentState = tm.getState();
	let currentPointer = tm.getPointer();
	// console.log("currentState", tm.getState(), tm.getMemory(), tm.getPointer());
	if("finished" == tm.next()) {
	    callback();
	    return;
	}
	ctx.clearRect(0,0,1000,1000);
	drawGraph1(100, 500, 300, 700, 25, null, currentState+""+tm.getState(), cv, notBlue);
	drawMem(tm.getMemory(), 250,600, currentPointer+(tm.getPointer()-currentPointer)/2, cv);
	ctx.clearRect(250+currentPointer*70+1, 801, 68,68);
	setTimeout(() => {
	    ctx.clearRect(0,0,1000,1000);
	    drawGraph1(100, 500, 300, 700, 25, tm.getState(), null, cv, notBlue);
	    drawMem(tm.getMemory(), 250,600, tm.getPointer(), cv);
	    setTimeout(step, delay);
	}, delay);
	return;
    };
    setTimeout(() => {
	ctx.clearRect(0,0,1000,1000);
	drawGraph1(100, 500, 300, 700, 25, 0, null, cv, notBlue);	
	drawMem(tm.getMemory(), 250,600, tm.getPointer(), cv);
	setTimeout(step, delay);
    },delay);
}

function distancePoint(p0, p1) {
    return Math.sqrt((p0.x-p1.x)*(p0.x-p1.x)+(p0.y-p1.y)*(p0.y-p1.y));
}

function drawGraph2(currentState, currentTransition, callback) {
    let cv = document.querySelector(".canvas-ittm");
    let ctx = cv.getContext("2d");
    ctx.lineWidth = 3;
    let p0 = {x: 200 ,y: 300};
    let p1 = {x: 400 ,y: 500};
    let p2 = {x: 600, y: 300};
    let p3 = {x: 400, y: 100};
    let p4 = {x: 400+Math.sqrt(2)*200, y: 500};
    let p5 = {x: 400+2*Math.sqrt(2)*200, y: 500};
    drawNode(p0, 25, cv, "", currentState == 0 ? "red" : "black");
    drawNode(p1, 25, cv, "", currentState == 1 ? "red" : "black");
    drawNode(p2, 25, cv, "", currentState == 2 ? "red" : "black");
    drawNode(p3, 25, cv, "", currentState == 3 ? "red" : "black");
    drawNode(p4, 35, cv, "", "darkgreen");
    if(currentState == 4)
	drawNode(p4, 25, cv, "", "red");
    drawNode(p5, 35, cv, "", "blue");
    if(currentState == 5)
	drawNode(p5, 25, cv, "", "red");
    myQuadraticCurveArrowHeads(p0, 0, 0, p1, 30, 25, false, true, ctx, (currentTransition == "01" ? "red" : "black"));
    myQuadraticCurveArrowHeads({x:p0.x-200, y:p0.y}, 0, 0, p0, 30, 25, false, true, ctx, (currentTransition == "0" ? "red" : "black"));
    myQuadraticCurveArrowHeads(p1, 0, 0, p2, 30, 25, false, true, ctx, (currentTransition == "12" ? "red" : "black"));
    myQuadraticCurveArrowHeads(p2, 0, 0, p3, 30, 25, false, true, ctx, (currentTransition == "23" ? "red" : "black"));
    myQuadraticCurveArrowHeads(p3, 0, 0, p0, 30, 25, false, true, ctx, (currentTransition == "30" ? "red" : "black"));
    myQuadraticCurveArrowHeads(p4, 0, 0, p1, 45, 25, false, true, ctx, (currentTransition == "41" ? "red" : "black"));
    myQuadraticCurveArrowHeads(p4, 0, 0, p5, 45, 25, false, true, ctx, (currentTransition == "45" ? "red" : "black"));
    ctx.font = "35px Arial";
    placeText("0,→,0", p0.x, p0.y, (distancePoint(p0, p1))/2, 35, 0.25*Math.PI, ctx);
    placeText("1,→,0", p0.x, p0.y, (distancePoint(p0, p1))/2, -25, 0.25*Math.PI, ctx);
    placeText("0,→,0", p1.x, p1.y, (distancePoint(p1, p2))/2, -25, -0.25*Math.PI, ctx);
    placeText("1,→,0", p1.x, p1.y, (distancePoint(p1, p2))/2, 35, -0.25*Math.PI, ctx);
    placeText("0,←,1", p3.x, p3.y, (distancePoint(p3, p2))/2, -25, 0.25*Math.PI, ctx);
    placeText("1,←,1", p3.x, p3.y, (distancePoint(p3, p2))/2, 35, 0.25*Math.PI, ctx);
    placeText("0,←,1", p0.x, p0.y, (distancePoint(p1, p2))/2, -25, -0.25*Math.PI, ctx);
    placeText("1,←,1", p0.x, p0.y, (distancePoint(p1, p2))/2, 35, -0.25*Math.PI, ctx);

    placeText("0,→,1", p1.x, p1.y, (distancePoint(p1, p4))/2, 35, 0, ctx);
    placeText("1,→,0", p4.x, p4.y, (distancePoint(p4, p5))/2, 35, 0, ctx);
}


function DrawTuringMachine2(tm, delay, callback, canvas) {
    this.tm = tm;
    let cv = canvas;
    let ctx = cv.getContext("2d");
    ctx.lineWidth = 3;
    drawGraph2(null, "0", cv);
    drawMem(tm.getMemory(), 250,600, tm.getPointer(), cv);
    this.drawCurrent = () => {
	    ctx.clearRect(0,0,1000,1000);
	    drawGraph2( tm.getState(), null, cv);
	    drawMem(tm.getMemory(), 250,600, tm.getPointer(), cv);	
    };
    this.step = (delay) => {
	let currentState = tm.getState();
	let currentPointer = tm.getPointer();
	// console.log("currentState", tm.getState(), tm.getMemory(), tm.getPointer());
	if("finished" == tm.next()) {
	    callback();
	    return;
	}
	ctx.clearRect(0,0,1000,1000);
	drawGraph2(null, currentState+""+tm.getState(), cv);
	drawMem(tm.getMemory(), 250,600, currentPointer+(tm.getPointer()-currentPointer)/2, cv);
	ctx.clearRect(250+currentPointer*70+1, 801, 68,68);
	setTimeout(() => {
	    this.drawCurrent();
	    // setTimeout(step, delay);
	}, delay);
	return;
    };
    setTimeout(() => {
	ctx.clearRect(0,0,1000,1000);
	drawGraph2( 0, null, cv);	
	drawMem(tm.getMemory(), 250,600, tm.getPointer(), cv);
	// setTimeout(this.step, delay);
    },delay);
    this.setLimit = () => {
	tm.setState(4);
	tm.setPointer(0);
    };
}
