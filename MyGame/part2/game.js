var width = 320, 
	height = 500,
	gLoop,
	c = document.getElementById('c'), 
	ctx = c.getContext('2d');
			
	c.width = width;
	c.height = height, circles=[], howManyCircles =10;
for(var i=0;i<howManyCircles;i++)
		circles.push([Math.random()*width, Math.random()*height, Math.random()*100, Math.random() /2]);	
	


var clear = function()
{
	ctx.fillStyle ="#d0e6d8";
	ctx.clearRect(0,0,width,height);
	ctx.beginPath();
	ctx.rect(0,0,width,height);
	ctx.closePath();
	ctx.fill();
}

var MoveCircles = function(moveBy){
	for(var i=0;i<howManyCircles;i++)
	{
		if(circles[i][1]-height > 0)
			circles[i][1] = 0-Math.random()*width + 10;
		else
			circles[i][1]+=moveBy;
	}
}

var DrawCircles = function(){
for(var i=0; i<howManyCircles;i++)
	{
	
		ctx.fillStyle  ="rgba(255,255,255,"+ circles[i][3]+")";
		ctx.beginPath();
		ctx.arc(circles[i][0], circles[i][1], circles[i][2],0,Math.PI *2 , true);
		ctx.closePath();
		ctx.fill();
	}
}	
	//Adding a player to the screen
var player = new (function(){
	var that= this;
	that.image= new Image();
	that.image.src = "angel.png";
	that.width= 65;
	that.height=95;
	that.frames =1;
	that.actualFrame =0;
	that.X = 0;
	that.Y = 0;
	that.up =true;
	that.jumpSpeed =20;
	that.fallSpeed=10;
	that.mouseX = 0;
	
	that.setPosition = function(){
	document.querySelector("#messageX").innerText =that.X;
	document.querySelector("#messageY").innerText =that.Y;
		
		//that.Y = 250;
		if(that.Y <= 250){
			that.fallSpeed=10;
			that.up=false;
			}
		if(that.Y>=390){
		that.jumpSpeed =20;
			that.up=true;
			}
		if(that.up){
			that.Y= that.Y-that.fallSpeed;
			that.fallSpeed+=1.5;
			
			}
		else {
			that.Y= that.Y- that.jumpSpeed;
			that.jumpSpeed-=1.5;
			}
		
	}
	that.interval = 0;
	that.draw = function(){
		try{
		//that.setPosition();
		//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
		//sx - source x
		//sy - source y
		//dx - destination x
		//dy - destination y
		//dWidth - width of image on canvas
		//dHeight - height of image on canvas
			ctx.drawImage(that.image, 0, that.height * that.actualFrame, that.width, that.height, that.X, that.Y, that.width, that.height);
		}
		catch(e){};
		if(that.interval == 6){
			if(that.actualFrame ==that.frames)
				that.actualFrame =0;
			else
				that.actualFrame++;
			that.interval = 0;
		}
		that.interval++;
			
	}
	
	that.moveLeft =  function(){
		if(that.X>=0)
		that.X-=2;
		
	}
	that.moveRight = function(){
		if(that.X<=250)
		that.X+=2;
	}
	
})();


document.onmousemove = function(e){
document.querySelector("#messageX").innerText=c.offsetLeft;
	player.mouseX = c.offsetLeft;
	if (player.X + c.offsetLeft > e.pageX) {
		player.moveLeft();
	} else if (player.X + c.offsetLeft < e.pageX) {
		player.moveRight();
	}
	
}
	
var GameLoop = function(){
	clear();
	MoveCircles(5);
	DrawCircles();
	player.draw();
	player.setPosition();
	gLoop = setTimeout(GameLoop, 1000 / 50);
}

GameLoop();
//Creating the player
//player.setPosition(~~((width-player.width)/2),~~((height - player.height)/2));