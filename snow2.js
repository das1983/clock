/*!
// Snow.js - v0.0.3
// kurisubrooks.com
*/

// Amount of Snowflakes
var snowMax = -1;

// Thresholds based on sunrise & sunset:
var brightnessMap = {
	0:[8,16],
	1:[7,17],
	2:[6,19],
	3:[5,20],
	4:[4,22],
	5:[4,22],
	6:[4.22],
	7:[5,21],
	8:[6,20],
	9:[7,19],
	10:[8,16],
	11:[9,16]
}

// Snowflake Colours
var snowColor = ["#654", "#543", "#432", "#321"]
var snowColorBright = ["#FFF", "#BBB", "#CCC", "#DDD", "#EEE", "#FFF"];

// Qualifiers
var today = new Date();
var thisMonth = today.getMonth();
var thisHour = today.getHours();

// snow only in december - february
if([0,1,11].includes(thisMonth)){
	snowMax = 60;
}

// full brightness during day:
if (brightnessMap[thisMonth][0] <= thisHour && thisHour <= brightnessMap[thisMonth][1]){
	snowColor = snowColorBright;
}


// Snow Entity
var snowEntity = "*";

// Falling Velocity
var snowSpeed = 0.75;

// Minimum Flake Size
var snowMinSize = 12;

// Maximum Flake Size
var snowMaxSize = 64;

// Refresh Rate (in milliseconds)
var snowRefresh = 100;

// Additional Styles
var snowStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";

/*
// End of Configuration
// ----------------------------------------
// Do not modify the code below this line
*/

var snow = [],
	pos = [],
	coords = [],
	lefr = [],
	marginBottom,
	marginRight;

function randomise(range) {
	rand = Math.floor(range * Math.random());
	return rand;
}

function initSnow() {
	var snowSize = snowMaxSize - snowMinSize;
	marginBottom = document.body.scrollHeight;
	marginRight = document.body.clientWidth - 1;

	for (i = 0; i <= snowMax; i++) {
		coords[i] = 0;
		lefr[i] = Math.random() * 15;
		pos[i] = 0.03 + Math.random() / 10;
		snow[i] = document.getElementById("flake" + i);
		snow[i].style.fontFamily = "inherit";
		snow[i].size = randomise(snowSize) + snowMinSize;
		snow[i].style.fontSize = snow[i].size + "px";
		snow[i].style.color = snowColor[randomise(snowColor.length)];
		snow[i].style.zIndex = 1000;
		snow[i].sink = snowSpeed * snow[i].size / 5;
		snow[i].posX = randomise(marginRight - snow[i].size);
		snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size);
		snow[i].style.left = snow[i].posX + "px";
		snow[i].style.top = snow[i].posY + "px";
	}

	moveSnow();
}

function resize() {
	marginBottom = document.body.scrollHeight;
	marginRight = document.body.clientWidth - 1;
}

function moveSnow() {
	for (i = 0; i <= snowMax; i++) {
		coords[i] += pos[i];
		snow[i].posY += snow[i].sink;
		snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
		snow[i].style.top = snow[i].posY + "px";

		if (snow[i].posY >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i])) {
			snow[i].posX = randomise(marginRight - snow[i].size);
			snow[i].posY = 0;
		}
	}

	setTimeout("moveSnow()", snowRefresh);
}

for (i = 0; i <= snowMax; i++) {
	document.write("<span id='flake" + i + "' style='" + snowStyles + "position:absolute;top:-" + snowMaxSize + "'>" + snowEntity + "</span>");
}

window.addEventListener('resize', resize);
window.addEventListener('load', initSnow);
