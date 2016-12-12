function Tetrimino(conteneur,maxPos){
	var heightPixel=30;
	var widthPixel=heightPixel;
	this.conteneur=conteneur;
	this.idPixel=[];
	this.maxHeight=[maxPos[1],maxPos[3]];
	this.maxWidth=[maxPos[0],maxPos[2]];
	this.tetrimino='';
	this.id='';
	this.counter=0;
	
	this.list=['O','I','T','L','J','Z','S'];
	this.create=function(tetrimino,id,pos){
		this.tetrimino=tetrimino;
		this.id=id;
		if(tetrimino=='O'){this.O(id,pos);return;}
		if(tetrimino=='I'){this.I(id,pos);return;}
		if(tetrimino=='T'){this.T(id,pos);return;}
		if(tetrimino=='L'){this.L(id,pos);return;}
		if(tetrimino=='J'){this.J(id,pos);return;}
		if(tetrimino=='Z'){this.Z(id,pos);return;}
		if(tetrimino=='S'){this.S(id,pos);return;}
	}

	// deplace le tetrimini en vérifiant si il n'y a pas contact avec les autres tetrimino et si le tetrimino n'est pas arrivé en bas
	this.move=function(pos,listTetrimino){
		if(listTetrimino){			
			for (var i=0; i<listTetrimino.length; i++){
				var returnValue=this.contact(listTetrimino[i],pos);
				if(returnValue!=false){					
					return returnValue;
				}
			}
		}
		for (var i=0; i<this.idPixel.length; i++){
			var position =this.idPixel[i].futureMove(pos);
			if (position[0]<this.maxWidth[0])
				return false;
			if (position[0]+widthPixel>this.maxWidth[1])
				return false;
			if (position[1]+widthPixel>this.maxHeight[1])
				return "bas";
		}
		for (var i=0; i<this.idPixel.length; i++){
			this.idPixel[i].move(pos);		
		}
		return true;
	}
	
	// controle si il y a contact entre ce tetrimino et les autres dans la position future
	this.contact=function(tetrimino,pos){
		for (var i=0; i<this.idPixel.length; i++){
			for (var j=0; j<tetrimino.idPixel.length; j++){
				var contact=this.idPixel[i].contact(tetrimino.idPixel[j],pos)
				if(contact!=false)
					return contact;
			}
		}
		return false;
	}
	
	// supprime un pixel du tetrimino, utilisé pour supprimé une ligne
	this.deletePixel=function(id){
		this.idPixel[id].delete();
		this.idPixel.splice(id,1);
	}
	
	// suprime tout le tétrimino
	this.delete=function(){
		for(var id=this.idPixel.length;id>=0;id--){
			this.idPixel[id].delete();
			this.idPixel.splice(id,1);
		}
	}
	
	/*
	Methode qui permet de tourner le tetrimini
	*/
	
	this.turn=function(){
		switch(this.tetrimino){
			case 'O':				
				break;
			case 'I':
				if(this.counter==0){
					this.idPixel[0].move([2*widthPixel,-2*heightPixel]);
					this.idPixel[1].move([widthPixel,-heightPixel]);
					this.idPixel[3].move([-widthPixel,heightPixel]);
					this.counter++;
				}else{
					this.idPixel[0].move([-2*widthPixel,+2*heightPixel]);
					this.idPixel[1].move([-widthPixel,+heightPixel]);
					this.idPixel[3].move([+widthPixel,-heightPixel]);
					this.counter=0;
				}				
				break;
			case 'T':
				if(this.counter==0){
					this.idPixel[2].move([-widthPixel,-heightPixel]);
					this.counter++;
				}
				else if(this.counter==1){
					this.idPixel[3].move([+widthPixel,-heightPixel]);
					this.counter++;
				}
				else if(this.counter==2){
					this.idPixel[0].move([+widthPixel,heightPixel]);
					this.counter++;
				}else if(this.counter==3){
					this.idPixel[0].move([-widthPixel,-heightPixel]);
					this.idPixel[2].move([widthPixel,heightPixel]);
					this.idPixel[3].move([-widthPixel,heightPixel]);
					this.counter=0;
				}
				break;
			case 'L':
				if(this.counter==0){
					this.idPixel[0].move([+widthPixel,-heightPixel]);
					this.idPixel[2].move([-widthPixel,heightPixel]);
					this.idPixel[3].move([0,-2*heightPixel]);
					this.counter++;
				}
				else if(this.counter==1){
					this.idPixel[0].move([+widthPixel,0]);
					this.idPixel[2].move([widthPixel,-heightPixel]);
					this.idPixel[3].move([0,heightPixel]);
					this.counter++;
				}
				else if(this.counter==2){
					this.idPixel[0].move([-widthPixel,0]);
					this.idPixel[2].move([0,+heightPixel]);
					this.idPixel[3].move([widthPixel,heightPixel]);
					this.counter++;
				}else if(this.counter==3){
					this.idPixel[0].move([-widthPixel,heightPixel]);
					this.idPixel[2].move([0,-heightPixel]);
					this.idPixel[3].move([-widthPixel,0]);
					this.counter=0;
				}
				break;
			case 'J':
				if(this.counter==0){
					this.idPixel[0].move([+widthPixel,-heightPixel]);
					this.idPixel[2].move([-widthPixel,heightPixel]);
					this.idPixel[3].move([-2*widthPixel,0]);
					this.counter++;
				}
				else if(this.counter==1){
					this.idPixel[0].move([-widthPixel,0]);
					this.idPixel[2].move([widthPixel,-heightPixel]);
					this.idPixel[3].move([0,-heightPixel]);
					this.counter++;
				}
				else if(this.counter==2){
					this.idPixel[0].move([widthPixel,0]);
					this.idPixel[2].move([0,-heightPixel]);
					this.idPixel[3].move([widthPixel,heightPixel]);
					this.counter++;
				}else if(this.counter==3){
					this.idPixel[0].move([-widthPixel,heightPixel]);
					this.idPixel[2].move([0,+heightPixel]);
					this.idPixel[3].move([widthPixel,0]);
					this.counter=0;
				}
				break;
			case 'Z':
				if(this.counter==0){
					this.idPixel[0].move([0,heightPixel]);
					this.idPixel[3].move([-2*widthPixel,heightPixel]);
					this.counter++;
				}else if(this.counter==1){
					this.idPixel[0].move([0,-heightPixel]);
					this.idPixel[3].move([2*widthPixel,-heightPixel]);
					this.counter=0;
				}
				break;
			case 'S':
				if(this.counter==0){
					this.idPixel[1].move([0,heightPixel]);
					this.idPixel[2].move([2*widthPixel,+heightPixel]);
					this.counter++;
				}else if(this.counter==1){
					this.idPixel[1].move([0,-heightPixel]);
					this.idPixel[2].move([-2*widthPixel,-heightPixel]);
					this.counter=0;
				}
				break;
		}
		return true;
	}
	/*
	Créer le tétrimino, composé de pixel
	*/
	this.O=function(id,pos){
		couleur="yellow";
		id=id+"O";
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],pos,couleur,id+"0"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0],pos[1]+heightPixel],couleur,id+"1"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel,pos[1]],couleur,id+"2"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel,pos[1]+heightPixel],couleur,id+"3"));
	}
	
	this.T=function(id,pos){
		couleur="purple";
		id=id+"T";
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],pos,couleur,id+"0"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel,pos[1]],couleur,id+"1"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel*2,pos[1]],couleur,id+"2"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel,pos[1]+heightPixel],couleur,id+"3"));
	}
	
	this.L=function(id,pos){
		couleur="orange";
		id=id+"L";
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],pos,couleur,id+"0"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel,pos[1]],couleur,id+"1"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel*2,pos[1]],couleur,id+"2"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0],pos[1]+heightPixel],couleur,id+"3"));
	}
	
	this.J=function(id,pos){
		couleur="blue";
		id=id+"J";
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],pos,couleur,id+"0"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel,pos[1]],couleur,id+"1"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel*2,pos[1]],couleur,id+"2"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel*2,pos[1]+heightPixel],couleur,id+"3"));
	}
	
	this.I=function(id,pos){
		couleur="Aqua";
		id=id+"I";
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],pos,couleur,id+"0"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel,pos[1]],couleur,id+"1"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel*2,pos[1]],couleur,id+"2"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel*3,pos[1]],couleur,id+"3"));
	}
	
	this.Z=function(id,pos){
		couleur="red";
		id=id+"Z";
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],pos,couleur,id+"0"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel,pos[1]],couleur,id+"1"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel*1,pos[1]+heightPixel],couleur,id+"2"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel*2,pos[1]+heightPixel],couleur,id+"3"));
	}
	
	this.S=function(id,pos){
		couleur="Lime";
		id=id+"S";
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel*1,pos[1]],couleur,id+"0"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel*2,pos[1]],couleur,id+"1"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel*0,pos[1]+heightPixel],couleur,id+"2"));
		this.idPixel.push(new Pixel(this.conteneur,[widthPixel,heightPixel],[pos[0]+widthPixel*1,pos[1]+heightPixel],couleur,id+"3"));
	}
}
