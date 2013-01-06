// Global Variables

var oldX = 30;
var oldY = 30;
var newX = 0;
var newY = 0;
var dragByClassName;
var ZValue = 0;

var isMouseDown = false;



function Init()
{
  document.onmousedown = OnMouseDown;
	document.onmouseup = OnMouseUp;
	
	
	//alert("working");
}


function OnMouseDown(e)
{

	var target = e.target != null ? e.target : e.srcElement; // required for IE


	//IE left click is 1, firefox its 0 
	if ((e.button == 1 && window.event != null || e.button == 0) && target.className == 'note')
	{
		//get mouse pos
		oldX = e.clientX;
		oldY = e.clientY;

		//get sticky notes position
		newX = ExtractNumber(target.style.left);
		newY = ExtractNumber(target.style.top);

		//bring note to front when dragged (for when multiple notes will be implemented)
		ZValue = target.style.zIndex;
		target.style.zIndex = 1;

		dragByClassName = target;

		document.onmousemove = OnMouseMove;

		document.body.focus();
		document.onselectstart = function() {return false; };
		target.ondragstart = function() { return false;};

		return false;
	}
}

function OnMouseMove(e)
{
	if (e == null)
	{
		e = window.event;
	}



	dragByClassName.style.left = (newX + e.clientX - oldX) + 'px';
	dragByClassName.style.top = (newY + e.clientY - oldY) + 'px';

	
}

function OnMouseUp(e)
{
	if (dragByClassName != null)
	{
		dragByClassName.style.zIndex = ZValue;

		document.onmousemove = null;
		document.onselectstart = null;
		dragByClassName.ondragstart = null;

		dragByClassName = null;

		
	}
}

function ExtractNumber(value)
{
    var n = parseInt(value);
	
    return n == null || isNaN(n) ? 0 : n;
}

function $(id)
{
    return document.getElementById(id);
}

window.addEventListener("load", Init, false);
window.addEventListener("load", MouseCoords, false);
