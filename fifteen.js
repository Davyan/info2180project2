"use strict";

var tile;
var blink;
var timer;
var whiteSpaceX = '300px';
var whiteSpaceY = '300px';
var px = 'px';

window.onload = function ()
{
	var puzzlearea = document.getElementById('puzzlearea'); 
	tile = puzzlearea.getElementsByTagName('div');
	
	for (var i=0; i<tile.length; i++)
	{
		tile[i].className = 'puzzlepiece';
		tile[i].style.left = (i%4*100)+'px';
		tile[i].style.top = (parseInt(i/4)*100) + 'px';
				
		tile[i].style.backgroundPosition= '-' + tile[i].style.left + ' ' + '-' + tile[i].style.top;
		
		
		tile[i].onclick= function()
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
		tile[i].onmouseout = function()
		{
			this.style.border = "2px solid black";
		    this.style.color = "#99FFFF";
	    };
		tile[i].onmouseover  = function()
		{
			if(canMove(parseInt(this.innerHTML)))
			{
				this.style.border = "2px solid blue";
				this.style.color = "#FF00CC";
		    }
		};	
	}
	
function canMove(pos)
{
	if (callLeft(whiteSpaceX, whiteSpaceY) == (pos-1))
	{
		return true;
	}

	if (callDown(whiteSpaceX, whiteSpaceY) == (pos-1))
	{
		return true;
	}

	if (callUp(whiteSpaceX, whiteSpaceY) == (pos-1))
	{
		return true;
	}

	if (callRight(whiteSpaceX, whiteSpaceY) == (pos-1))
	{
		return true;
	}
}

function swap (pos) {
	var temp = tile[pos].style.top;
	tile[pos].style.top = whiteSpaceY;
	whiteSpaceY = temp;

	temp = tile[pos].style.left;
	tile[pos].style.left = whiteSpaceX;
	whiteSpaceX = temp;
}
	var shuffleButton = document.getElementById('shufflebutton');
	shuffleButton.onclick = function()
	{
		for(var i=0; i<250; i++)
	    {
			var rand = parseInt(Math.random()* 100) %4;
			if (rand == 0)
			{
				var temp = callUp(whiteSpaceX, whiteSpaceY);
				if ( temp != -1)
				{
					swap(temp);
				}
				}
			if (rand == 1)
			{
				var temp = callDown(whiteSpaceX, whiteSpaceY);
				if ( temp != -1) 
				{
					swap(temp);
				}
			}

			if (rand == 2)
			{
				var temp = callLeft(whiteSpaceX, whiteSpaceY);
				if ( temp != -1)
				{
					swap(temp);
				}
			}
			if (rand == 3)
			{
				var temp = callRight(whiteSpaceX, whiteSpaceY);
				if (temp != -1)
				{
				 swap(temp);
				}
			}
		}
	};
};

function callLeft(x, y)
{
	var horizontal = parseInt(x);
	var vertical = parseInt(y);

	if (horizontal > 0)
	{
		for (var i = 0; i < tile.length; i++) 
		{
			if (parseInt(tile[i].style.left) + 100 == horizontal && parseInt(tile[i].style.top) == vertical)
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

function callRight (x, y) 
{
	var horizontal = parseInt(x);
	var vertical = parseInt(y);
	if (horizontal < 300)
	{
		for (var i =0; i<tile.length; i++)
		{
			if (parseInt(tile[i].style.left) - 100 == horizontal && parseInt(tile[i].style.top) == vertical) 
			{
				return i;
			}
		}
	}
	else{
		return -1;
	} 
}

function callUp (x, y) 
{
	var horizontal = parseInt(x);
	var vertical = parseInt(y);
	if (vertical > 0)
	{
		for (var i=0; i<tile.length; i++)
		{
			if (parseInt(tile[i].style.top) + 100 == vertical && parseInt(tile[i].style.left) == horizontal) 
			{
				return i;
			}
		} 
	}
	else {
		return -1;
	}
}

function callDown (x, y)
{
	var horizontal = parseInt(x);
	var vertical = parseInt(y);
	if (vertical < 300)
	{
		for (var i=0; i<tile.length; i++)
		{
			if (parseInt(tile[i].style.top) - 100 == vertical && parseInt(tile[i].style.left) == horizontal) 
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

function youWin()
{
	 var body = document.getElementsByTagName('body');
	 body[0].style.backgroundColor = "#0000CC";
	 blink = 10;
	 timer = setTimeout(Blink, 100);
}

function Blink()
{
	blink --;
	if (blink == 0)
	{
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#FFFFFF";
		alert('You have won the game!!!');
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
		body[0].style.backgroundColor = "#33FF36";
	}
	timer = setTimeout(Blink, 100);
}

function checkFinish()
{
	var flag = true;
	for (var i = 0; i < tile.length; i++) 
	{
		var y = parseInt(tile[i].style.top);
		var x = parseInt(tile[i].style.left);

		if (x != (i%4*100) || y != parseInt(i/4)*100)
		{
			flag = false;
			break;
		}
	}
	return flag;
}
