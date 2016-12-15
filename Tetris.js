function Tetris(conteneur){
	var height=18;
	var width=10;
	var heightPixel=30;
	var widthPixel=heightPixel;
	var screenID="screen"
	var vitesseNormal=200;
	var vitesseRapide=vitesseNormal/3;
	var vitesse=vitesseNormal;

	var conteneur="";
	var tetriminoCourant=0;
	var listTetrimino=[];
	var step=0;
	var deplacement=0;
	var stop=false;
	var moveMax=false;
	var tempTetriminotempTetrimino=null;
	var create=false;
	
	this.next=null;
	this.score=null;
	var coup=null;
	
	this.scoreValue=0;
	this.nextTetrimino=0;
	var nextTetriminoObjet=null;
	var nbCycleAffichage=10;
	
	
	var nameCoup=["simple", "double", "triple", "tetris"];
	var valueCoup=[10, 30, 50, 100];
	
	document.onkeydown = applyKey;
	document.onkeyup  = applyKeyUp;
	
	this.setNext=function(nextConteneur){
		this.next=nextConteneur;
	}
	this.setScore=function(scoreConteneur){
		this.score=scoreConteneur;
	}
	this.setCoup = function(coupConteneur){
		coup=coupConteneur;
	}
	
	this.init=function(conteneur){
	
		var newLink = document.createElement("div");
		newLink.id = screenID;
        newLink.style.backgroundColor='black';
		newLink.style.width = width*widthPixel+'px';
		newLink.style.height = height*heightPixel+'px';		
		newLink.style.position  = 'relative';
		document.getElementById(conteneur).appendChild(newLink);
		
		/*var pixel=new Pixel()
		new Pixel().init(screenID,heightPixel,[0,0],"red","idPixel");
		pixel.init(screenID,heightPixel,[widthPixel,0],"red","idPixel");*/
		listTetrimino.push( new Tetrimino(screenID,[0,0,width*widthPixel,height*heightPixel]));		
		listTetrimino[tetriminoCourant].create(listTetrimino[tetriminoCourant].list[Math.round(Math.random()*6)],'T0',([this.initPos(),0]));
		this.nextTetrimino=Math.round(Math.random()*6);
		this.updateScore();
		this.updateNext();
		this.anim();
    } 
	
	this.initPos=function(){
		var pos=Math.round(width*widthPixel/2);
		for (var i=0; i<width*widthPixel; i=i+widthPixel){
			if(pos<i)
				return i-widthPixel*2;
		}
		return 0;
	}
	this.ligneComplete=function(){
		var pixelLigne=[];
		var nbLigne = 0;
		for(var i=0; i<height;i++){
			pixelLigne.push(0);
		}
		// chercher les lignes completes
		for(var i=0;i<listTetrimino.length; i++){
			var tempTetrimino=listTetrimino[i];
			for(var j=0; j<tempTetrimino.idPixel.length;j++){
				var pos=tempTetrimino.idPixel[j].position();
				var posLigne=pos[1]/heightPixel;
				pixelLigne[posLigne]++;
			}
		}
		
		for(var ligne=0; ligne<height;ligne++){
			if(pixelLigne[ligne]==width){
				console.log("ligne complete");
				nbLigne=nbLigne+1;
				
				//supprime les lignes
				for(var i=0;i<listTetrimino.length; i++){
					var tempTetrimino=listTetrimino[i];
					var elementSuprimer=[];
					for(var j=0; j<tempTetrimino.idPixel.length;j++){
						var pos=tempTetrimino.idPixel[j].position();
						var posLigne=pos[1]/heightPixel;
						if(posLigne==ligne){
							elementSuprimer.push(j);							
						}
					}
					for(var j=elementSuprimer.length-1; j>=0;j--){
						tempTetrimino.deletePixel(elementSuprimer[j]);
					}
				}
				// descend les autres tetrimino
				for(var i=0;i<listTetrimino.length; i++){
					var tempTetrimino=listTetrimino[i];
					var elementDescendre=[];
					for(var j=0; j<tempTetrimino.idPixel.length;j++){
						var pos=tempTetrimino.idPixel[j].position();
						var posLigne=pos[1]/heightPixel;
						if(posLigne<ligne){
							elementDescendre.push(j);							
						}
					}
					for(var j=elementDescendre.length-1; j>=0;j--){
						tempTetrimino.idPixel[j].move([0,heightPixel]);
					}
				}
			}
		}
		return nbLigne;
	}

	this.updateScore=function(){		
		//console.log("score : "+this.scoreValue);
		if(this.score==null) return;
		document.getElementById(this.score).innerHTML=this.scoreValue;
	}
	
	this.updateNext=function(){
		if(this.next==null) return;
		var myNode = document.getElementById(this.next);
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
		nextTetriminoObjet = new Tetrimino(this.next,[4*widthPixel,2*heightPixel]).create(listTetrimino[tetriminoCourant].list[this.nextTetrimino],'T',[0,0]);
	}

	this.setText = function(texte){
		if(coup==null) return;
		document.getElementById(coup).innerHTML=texte;
	}
	
	var  nbCycle=0;
	Tetris.prototype.anim=function() {
		//console.log("move "+step);
		tempTetrimino=listTetrimino[tetriminoCourant];		
		var newListTetrimino=listTetrimino.slice(0);		
		newListTetrimino.splice(tetriminoCourant,1)					
		var returnValue=tempTetrimino.move([deplacement,10],newListTetrimino);
		if(nbCycle>0){
			nbCycle--;
			if(nbCycle==0)	this.setText("");
		}
		if(returnValue!=true)
			console.log(returnValue);
		if(returnValue=="bas" && create==true){
			this.stop=true;
		}
		else if(returnValue=="bas" ){			
			moveMax=false;
			var nbLigne = this.ligneComplete();
			if(nbLigne>0){
				console.log(nameCoup[nbLigne-1]);
				this.scoreValue=this.scoreValue+valueCoup[nbLigne-1];
				this.updateScore();
				vitesse=vitesse-this.scoreValue/10;
				this.setText(nameCoup[nbLigne-1]);
				nbCycle=nbCycleAffichage;
			}
			
			//listTetrimino[tetriminoCourant].deletePixel(0);
			tetriminoCourant++;
			listTetrimino.push( new Tetrimino(screenID,[0,0,width*widthPixel,height*heightPixel]));
			listTetrimino[tetriminoCourant].create(listTetrimino[tetriminoCourant].list[this.nextTetrimino],'T'+tetriminoCourant,([this.initPos(),0]));
			this.nextTetrimino=Math.round(Math.random()*6);
			this.updateNext();
			create=true;						
		}
		else if(moveMax==true){		
				(function() {this.anim();}).bind(this)
			}
		else{
			create=false;
		}
		deplacement=0;
		step=step+1;
		
		if (!this.stop) {
			window.setTimeout((function() {this.anim();}).bind(this), vitesse);
		}
	}
	function turn(){
		listTetrimino[tetriminoCourant].turn();
	}
	
	KEY_DOWN	= 40;
	KEY_UP		= 38;
	KEY_LEFT	= 37;
	KEY_RIGHT	= 39;

	KEY_END		= 35;
	KEY_BEGIN	= 36;



	KEY_BACK_TAB 	= 8;
	KEY_TAB				= 9;
	KEY_SH_TAB  	= 16;
	KEY_ENTER			= 13;
	KEY_ESC				= 27;
	KEY_SPACE			= 32;
	KEY_DEL				= 46;

	REMAP_KEY_T	= 5019;
	
	function checkEventObj ( _event_ ){
		// --- IE explorer
		if ( window.event )
			return window.event;
		// --- Netscape and other explorers
		else
			return _event_;
	}
	function applyKey (_event_){
	
		// --- Retrieve event object from current web explorer
		var winObj = checkEventObj(_event_);
		
		var intKeyCode = winObj.keyCode;
		var intAltKey = winObj.altKey;
		var intCtrlKey = winObj.ctrlKey;			
			
		if ( intKeyCode == KEY_RIGHT ){

			deplacement=widthPixel;
			
			// 3° --- Map the keyCode in another keyCode not used
			winObj.keyCode = intKeyCode = REMAP_KEY_T;
			winObj.returnValue = false;
			return false;
		}			
		else if ( intKeyCode == KEY_LEFT ){
			
			deplacement=widthPixel*-1;
			
			// 3° --- Map the keyCode in another keyCode not used
			winObj.keyCode = intKeyCode = REMAP_KEY_T;
			winObj.returnValue = false;
			return false;
		}
		else if ( intKeyCode == KEY_UP ){
			turn();			
			// 3° --- Map the keyCode in another keyCode not used
			winObj.keyCode = intKeyCode = REMAP_KEY_T;
			winObj.returnValue = false;
			return false;
		}	
		else if(intKeyCode == KEY_SH_TAB || intKeyCode == KEY_DOWN){
			vitesse=vitesseRapide;
			// 3° --- Map the keyCode in another keyCode not used
			winObj.keyCode = intKeyCode = REMAP_KEY_T;
			winObj.returnValue = false;
			return false;
		}else if(intKeyCode == KEY_SPACE){
			moveMax=true;
			// 3° --- Map the keyCode in another keyCode not used
			winObj.keyCode = intKeyCode = REMAP_KEY_T;
			winObj.returnValue = false;
			return false;
		}
	}
	
	function applyKeyUp (_event_){
	
		// --- Retrieve event object from current web explorer
		var winObj = checkEventObj(_event_);
		
		var intKeyCode = winObj.keyCode;
		var intAltKey = winObj.altKey;
		var intCtrlKey = winObj.ctrlKey;			
			
		if(intKeyCode == KEY_SH_TAB || intKeyCode == KEY_DOWN){
			vitesse=vitesseNormal;
			// 3° --- Map the keyCode in another keyCode not used
			winObj.keyCode = intKeyCode = REMAP_KEY_T;
			winObj.returnValue = false;
			return false;
		}
	}

}
