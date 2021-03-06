/*
Objet Pixel : il compose les tetriminos

*/

function Pixel(conteneur,taille,position,couleur,id){
	var border=0.2;
	this.id=id;
	this.height=taille[1];
	this.width=taille[0];
	this.conteneur=conteneur;

	var newLink = document.createElement("div");
	newLink.id = this.id;
	newLink.style.backgroundColor=couleur;
	newLink.style.width = taille[0]*(1-border*2)+'px';
	newLink.style.height = taille[1]*(1-border*2)+'px';
	newLink.style.border =taille[0]*border+"px "+couleur+" outset";
	newLink.style.position  = 'absolute';
	newLink.style.left = position[0]+'px';
	newLink.style.top = position[1]+'px';
	document.getElementById(conteneur).appendChild(newLink);
    
	// controle si il y a contact entre deux pixels dans une position future
	this.contact=function(pixel,pos){
		var pos = this.futureMove(pos);
		var posX=pos[0];
		var posY=pos[1];
		//console.log(pos);
		
		pos = pixel.position(pos);
		var posX2=pos[0];
		var posY2=pos[1];			
		
		
		if(( posX2>=(posX+this.width)) 
			|| ((posX2+pixel.width) <= posX)
			|| ( posY2 >=posY+this.height)
			|| ((posY2+pixel.height)<=posY)){			
			return false;
		}else{
			if(( posY2 <posY+this.height)
			|| ((posY2+pixel.height)>posY)){
				return "bas";
			}else{
				return "cote";
			}
		}
		
	}
	
	// déplace le pixel
	this.move=function(position){		
		var link=document.getElementById(this.id);
		var newPos=this.futureMove(position);
		link.style.left=newPos[0]+'px';
		link.style.top=newPos[1]+'px';
	}
	
	// calcul la future position du pixel
	this.futureMove=function(position){
		var link=document.getElementById(this.id);
		var newPosX=parseInt(link.style.left.split('px')[0])+position[0];
		var newPosY=parseInt(link.style.top.split('px')[0])+position[1];
		return [newPosX,newPosY]
	}
	
	// retourne la position actuelle du pixel
	this.position=function(){
		var link=document.getElementById(this.id);
		var newPosX=parseInt(link.style.left.split('px')[0]);
		var newPosY=parseInt(link.style.top.split('px')[0]);
		return [newPosX,newPosY]
	}
	
	this.delete=function(){
		var link = document.getElementById(this.id);
		link.parentNode.removeChild(link);
	}
}
