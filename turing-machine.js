let TuringMachine = function (transitionTableArg, initialState, finalState) {
    let transitionTable = transitionTableArg;
    let pointer = 0;
    this.getPointer = () => pointer;
    this.setPointer = (p) => pointer = p;
    let memory = [];
    this.pointerLeft = () =>  pointer = Math.max(--pointer,0);
    this.pointerRight = () => ++pointer;
    this.getMemory = () => memory;
    this.setMemory = (m) => memory = m;
    let state = initialState;
    this.getState = () => state;
    this.setState = (s) => state = s;
    this.getCell = (i) => {
	if(memory.length >= i)
	    return memory[i];
	memory.push(0);
	return this.getCell(i);
    };
    this.setCurrentCell = (i) => memory[pointer] = i;
    this.next = () => {
	if(state == finalState)
	    return "finished";
	let transition = transitionTable[state][this.getCell(pointer)];
	this.setCurrentCell(transition[2]);
	this.setState(transition[0]);
	switch(transition[1]) {
	case "l" :
	    this.pointerLeft();
	    break;
	case "r" :
	    this.pointerRight();
	}
	return "unfinished";
    };
};

let transitionTable1 =
    [
	// Etat 0
	[ 
	    [2,"r",1], // 0 sur la bande
	    [1,"r",0]  // 1 sur la bande
	],
	// Etat 1
	[ 
	    [2,"r",1], // 0 sur la bande
	    [3,"r",0]  // 1 sur la bande
	],
	// Etat 2
	[ 
	    [0,"r",0], // 0 sur la bande
	    [0,"l",0]  // 1 sur la bande
	],
    ];

let turingMachine1 = new TuringMachine(transitionTable1, 0, 3);
turingMachine1.setMemory([0,1,0,1,1,0]);
let transitionTable2 =
    [
	// Etat 0
	[ 
	    [1,"r",0], // 0 sur la bande
	    [1,"r",0]  // 1 sur la bande
	],
	// Etat 1
	[ 
	    [2,"r",0], // 0 sur la bande
	    [2,"r",0]  // 1 sur la bande
	],
	// Etat 2
	[ 
	    [3,"l",1], // 0 sur la bande
	    [3,"l",1]  // 1 sur la bande
	],	
	// Etat 3
	[ 
	    [0,"l",1], // 0 sur la bande
	    [0,"l",1]  // 1 sur la bande
	],	
	// Etat 4
	[ 
	    [1,"r",1], // 0 sur la bande
	    [5,"r",0]  // 1 sur la bande
	],	
	// Etat 5
	[ 
	    [0,"r",0], // 0 sur la bande
	    [3,"r",1]  // 1 sur la bande
	],	
    ];
let turingMachine2 = new TuringMachine(transitionTable2, 0, 5);
turingMachine2.setMemory([0,1,0,1,1,0]);
