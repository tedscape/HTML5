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
	
var GameLoop = function(){
	clear();
	MoveCircles(5);
	DrawCircles();
	gLoop = setTimeout(GameLoop, 1000 / 50);
}

GameLoop();
