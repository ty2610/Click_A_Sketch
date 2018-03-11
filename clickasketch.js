"use strict";
/*
 Tyler Green
 CISC 131
 9-15-2014
 Template
*/

var applyColor    //global

window.onload=function()
{
	var i;
	var count;
	var element;
	createColorChoices("drawingColorPalette","box",["red","yellow","blue","green",getRandomRGB()],updateCurrentColor,setColorChoice);
	createColorChoices("canvasColorPalette","square",["red","yellow","blue","green",getRandomRGB()],updateCanvasColor,setColorChoice);
	document.getElementById("drawingArea").innerHTML=createDrawingArea("littleBox", 100, 100, "little", "front");
    count=countElementWithIdOf("littleBox");
    for(i=0;i<count;i++)
    {
		element=document.getElementById("littleBox"+i);
		element.onmouseover=function(){colorTheBox(this,getCurrentColor())};
		element.onclick=function(){setColoringMode(!coloringIsTurnedOn())};
	}
	setColoringMode(false);
};

function setColoringMode(turnt)    //mutator
{
	applyColor=turnt;
}

function coloringIsTurnedOn()   //accessor
{
	return applyColor
}

function colorTheBox(boxid,color)
{
	if(coloringIsTurnedOn()===true)
	{
	    boxid.style.backgroundColor=color;
    }
}

function createColorChoices(id,prefix,array,functionReference,promptReference)
{
	var i;
	var element;
	for(i=0;i<array.length;i++)
		{
			    document.getElementById(id).innerHTML=document.getElementById(id).innerHTML+createHTMLElement("div", prefix+i, "box", null);
		}
	for (i=0;i<array.length;i++)
	    {
			    element=document.getElementById(prefix+i);
			    element.style.backgroundColor=array[i];
			    element.onmouseover=functionReference;
			    element.onclick=promptReference;
		}
}

function createDrawingArea(prefix,rows,columns,originals,classFront)
{
	var i;
	var count;
	var j;
	var classInfo
	var html;
	i=0;
	count=0
	html="";
	while(i<rows)
	{

		classInfo=originals+ " "+classFront;
		j=0;
		while(j<columns)
		{
			html=html+createHTMLElement("div", prefix+count, classInfo, null);
			classInfo=originals;
			count=count+1;
			j=j+1;
		}
		i=i+1;
	}
	return html;

}


function setColorChoice()
{
	var result;
	var origColor
	origColor=this.style.backgroundColor
	result=window.prompt("What color would you like",origColor);
	if(result!=="")
	{
		this.style.backgroundColor=result;
	}
}

function updateCanvasColor()
{
	document.getElementById("drawingArea").style.backgroundColor=this.style.backgroundColor;
}

function updateCurrentColor()
{
	document.getElementById("currentColor").style.backgroundColor=this.style.backgroundColor;
}

function getCurrentColor()
{
	var element;
	element=document.getElementById("currentColor");
	return(element.style.backgroundColor);
}

function getRandomInteger(upperLimit)
{
	var result;
	return Math.floor(Math.random()*(upperLimit+1));
    return result;
}

function getRandomRGB()
{
	var red;
	var blue;
	var green;
	red= getRandomInteger(255);
	blue= getRandomInteger(255);
	green= getRandomInteger(255);


	return"rgb(" + red + "," + green + "," + blue + ")";
};

function createHTMLElement(elementType, id, classInfo, content)
{
	if(elementType===null)  //div or span
	{
		elementType="";
	}
	else
	{
		elementType=trim(elementType);
	}

	if(trim(id)===null)  //id
	{
		id="";
	}
	else
	{
		id=" id=" + '"' + trim(id)+ '"';
		if(trim(id).length===0)
		{
			id="";
		}
	}
	if(trim(classInfo)===null)   //classinfo
	{
		classInfo="";
	}
	else
	{
        classInfo=" class=" + '"' + trim(classInfo)+ '"';
		if(trim(classInfo).length===0)
		{
			classInfo="";
		}
	}
	if(content===null)     //content
    {
		content="";
	}
	return ("<" + elementType + id + classInfo + ">" + content +"</" + elementType + ">");
}

function trim(data)
{
	var whitespace;
	var start;
	var end;
	var result;
    if(typeof data==="string")   //first if
    {
		whitespace=" \n\r\t\f";
		start=0;
		while(start<data.length && whitespace.indexOf(data.charAt(start))>=0) //first while
		{
			start=start+1;
		}
		end=data.length-1;
		while(end>=0 && whitespace.indexOf(data.charAt(end))>=0)   //second while
		{
			end=end-1;
		}
		if(end<start)    //second if
		{
			result="";
		}
		else         //else to second if
		{
			result= data.substring(start,end+1);
		}

	}
	else
	{
		result=data;
	}
return result;
}

function countElementWithIdOf(prefix)
{
	var count;
	var element;
	count=0;
	element= document.getElementById(prefix+count);
	while(element !== null)
	{
		count = count+1;
		element = document.getElementById(prefix + count);
	}

	return count;
}