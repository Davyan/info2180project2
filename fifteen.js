var tiles;
var whiteSpaceX;
var whiteSpaceY;
var blink;
var timer;
var px = 'px'

window.onload = function ()
{
	var puzzlearea = document.getElementById('puzzlearea'); 
	tiles = puzzlearea.getElementsByTagName('div');
	
	for (var i=0; i<tiles.length; i++)
	{
		tiles[i].className = 'puzzlepiece';
		tiles[i].style.left = (i%4*100)+'px';
		tiles[i].style.top = (parseInt(i/4)*100) + 'px';
				
		tiles[i].style.backgroundPosition= '-' + tiles[i].style.left + ' ' + '-' + tiles[i].style.top;
		
		
		tiles[i].onclick= function()
		{
			if (canMove(parseInt(this.innerHTML)))
			{
				swap(this.innerHTML-1);
				if (checkFinish())
				{
					youWin();
				}
				return;
			} 
		};	
		
		tiles[i].onmouseout = function()
		{
			this.style.border = "2px solid black";
		    this.style.color = "#99FFFF";
	    };
		
		tiles[i].onmouseover  = function()
		{
			if(canMove(parseInt(this.innerHTML)))
			{
				this.style.border = "2px solid blue";
				this.style.color = "#FF00CC";
		    }
		};	
		
	}
	whiteSpaceX = '300px';
	whiteSpaceY = '300px';

	
	var shufflebutton = document.getElementById('shufflebutton');
	shufflebutton.onclick = function()
	{
		for(var i=0; i<250; i++)
	    {
			var rand = parseInt(Math.random()* 100) %4;
			if (rand == 0)
			{
				var tmp = calUp(whiteSpaceX, whiteSpaceY);
				if ( tmp != -1)
				{
					swap(tmp);
				}
				}
			if (rand == 1)
			{
				var tmp = calDown(whiteSpaceX, whiteSpaceY);
				if ( tmp != -1) 
				{
					swap(tmp);
				}
			}

			if (rand == 2)
			{
				var tmp = calLeft(whiteSpaceX, whiteSpaceY);
				if ( tmp != -1)
				{
					swap(tmp);
				}
			}

			if (rand == 3)
			{
				var tmp = calRight(whiteSpaceX, whiteSpaceY);
				if (tmp != -1)
				{
				 swap(tmp);
				}
			}
		}
	};
};

function canMove(pos)
{
	if (calLeft(whiteSpaceX, whiteSpaceY) == (pos-1))
	{
		return true;
	}

	if (calDown(whiteSpaceX, whiteSpaceY) == (pos-1))
	{
		return true;
	}

	if (calUp(whiteSpaceX, whiteSpaceY) == (pos-1))
	{
		return true;
	}

	if (calRight(whiteSpaceX, whiteSpaceY) == (pos-1))
	{
		return true;
	}
}


function swap (pos) {
	var temp = tiles[pos].style.top;
	tiles[pos].style.top = whiteSpaceY;
	whiteSpaceY = temp;

	temp = tiles[pos].style.left;
	tiles[pos].style.left = whiteSpaceX;
	whiteSpaceX = temp;
}






function calLeft(x, y)
{
	var horizontal = parseInt(x);
	var vertical = parseInt(y);

	if (horizontal > 0)
	{
		for (var i = 0; i < tiles.length; i++) 
		{
			if (parseInt(tiles[i].style.left) + 100 == horizontal && parseInt(tiles[i].style.top) == vertical)
			{
				return i;
			} 
		}
	}
	else 
	{
		return -1;
	}
}

function calRight (x, y) 
{
	var horizontal = parseInt(x);
	var vertical = parseInt(y);
	if (horizontal < 300)
	{
		for (var i =0; i<tiles.length; i++)
		{
			if (parseInt(tiles[i].style.left) - 100 == horizontal && parseInt(tiles[i].style.top) == vertical) 
			{
				return i;
			}
		}
	}
	else{
		return -1;
	} 
}

function calUp (x, y) 
{
	var horizontal = parseInt(x);
	var vertical = parseInt(y);
	if (vertical > 0)
	{
		for (var i=0; i<tiles.length; i++)
		{
			if (parseInt(tiles[i].style.top) + 100 == vertical && parseInt(tiles[i].style.left) == horizontal) 
			{
				return i;
			}
		} 
	}
	else {
		return -1;
	}
}

function calDown (x, y)
{
	var horizontal = parseInt(x);
	var vertical = parseInt(y);
	if (vertical < 300)
	{
		for (var i=0; i<tiles.length; i++)
		{
			if (parseInt(tiles[i].style.top) - 100 == vertical && parseInt(tiles[i].style.left) == horizontal) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

function Blink()
{
	blink --;
	if (blink == 0)
	{
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#FFFFFF";
		alert('you win');
		return;
	}
	if (blink % 2)
	{
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#FF0000"; 
	}
	else
	{
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#33FF33";
	}
	timer = setTimeout(Blink, 100);
}


function youWin()
{
	 var body = document.getElementsByTagName('body');
	 body[0].style.backgroundColor = "#0000CC";
	 blink = 10;
	 timer = setTimeout(Blink, 100);
}


function checkFinish()
{
	var flag = true;
	for (var i = 0; i < tiles.length; i++) 
	{
		var y = parseInt(tiles[i].style.top);
		var x = parseInt(tiles[i].style.left);

		if (x != (i%4*100) || y != parseInt(i/4)*100)
		{
			flag = false;
			break;
		}
	}
	return flag;
}