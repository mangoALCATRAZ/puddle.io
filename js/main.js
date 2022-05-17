const s = 2; /* size - the bigger the faster (lower quality) */
const canvas = document.getElementById("canvas");
canvas.width = w = Math.floor(innerWidth/s);
canvas.height = h = Math.floor(innerHeight/s);
canvas.style.width = '100%';
canvas.style.height = '100%';
const c = canvas.getContext("2d");
	
//let buffer1 = Array(w).fill().map(_=>Array(h).fill(0));
let buffer1 = Array(w).fill().map(_=>Array(h).fill().map(_=>Array(3).fill(0)));

//let buffer2 = Array(w).fill().map(_=>Array(h).fill(0));
let buffer2 = Array(w).fill().map(_=>Array(h).fill().map(_=>Array(3).fill(0)));

const damping = 0.999999;
let temp;

let red = 510;
let blue = 0;
let green = 0;

function animation(){
	
	for(let i = 1; i < w-1; i++){
		for(let j = 1; j < h-1; j++){
			/*buffer2[i][j] = ((buffer1[i-1][j] +
											 buffer1[i+1][j] +
											 buffer1[i][j-1] +
											 buffer1[i][j+1]) / 2 - buffer2[i][j]) * damping;
			*/

			// morph red
			buffer2[i][j][0] = ((buffer1[i-1][j][0] +
								 buffer1[i+1][j][0] +
								 buffer1[i][j-1][0] +
								 buffer1[i][j+1][0]) / 2  - buffer2[i][j][0]);

			// morph green
			buffer2[i][j][1] = ((buffer1[i-1][j][1] +
								 buffer1[i+1][j][1] +
								 buffer1[i][j-1][1] +
								 buffer1[i][j+1][1]) / 2  - buffer2[i][j][1]);

			//morph blue
			buffer2[i][j][2] = ((buffer1[i-1][j][2] +
								 buffer1[i+1][j][2] +
								 buffer1[i][j-1][2] +
								 buffer1[i][j+1][2]) / 2  - buffer2[i][j][2]);
		}
	}
	
	let img = new ImageData(w, h)
	
	for(let i = 0; i < buffer1.length; i++){
		for(let j = 0; j < buffer1[0].length; j++){
			let index = (j * buffer1.length + i) * 4
			img.data[index] = buffer2[i][j][0]
			img.data[index+1] = buffer2[i][j][1]
			img.data[index+2] = buffer2[i][j][2]

			//img.data[index] = buffer2[i][j]
			//img.data[index+1] = buffer2[i][j]
			//img.data[index+2] = buffer2[i][j]
			img.data[index+3] = 255
		}
	}
	
	c.putImageData(img,0,0)
	
	temp = buffer2;
	buffer2 = buffer1;
	buffer1 = temp;
	requestAnimationFrame(animation);
}

animation();

function ripple(e){
	let x = Math.floor(e.clientX/s);
	let y = Math.floor(e.clientY/s);
	if(red == 510) red = 0;
	else if(red == 0) red = 510;
	if(blue == 0) blue = 510;
	else if(blue == 510) blue = 0



	//red test
/*
	for(let i = 0; i < 1; i++){
		buffer1[x + i][y+i][0] = red;
		buffer1[x+i][y+i][1] = green;
		buffer1[x+i][y+i][i] = blue;


	}

 */




	buffer1[x][y][0] = red; // R
	buffer1[x+1][y][0] = red; // R
	buffer1[x][y+1][0] = red; // R
	buffer1[x+1][y+1][0] = red; // R


	buffer1[x][y][1] = green; // G
	buffer1[x+1][y][1] = green; // G
	buffer1[x][y+1][1] = green; // G
	buffer1[x+1][y+1][1] = green; // G

	buffer1[x][y][2] = blue; // B
	buffer1[x+1][y][2] = blue; // B
	buffer1[x][y+1][2] = blue; // B
	buffer1[x+1][y+1][2] = blue; // B





	//buffer1[x][y] = 500;
}

document.addEventListener("click", ripple  );

//document.addEventListener("mousemove", ripple  );

window.addEventListener("resize",function(){
	location.reload();
});


//debug test click immediately after script execution
document.elementFromPoint(0, 0).click();
