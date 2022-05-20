const s = 2; /* size - the bigger the faster (lower quality) */
const canvas = document.getElementById("canvas");
canvas.width = w = Math.floor(innerWidth/s);
canvas.height = h = Math.floor(innerHeight/s);
canvas.style.width = '100%';
canvas.style.height = '100%';
const c = canvas.getContext("2d");
	

//let buffer1 = Array(w).fill().map(_=>Array(h).fill().map(_=>Array(3).fill(0)));

let defa = (255 << 24);

let buffer1 = Array(w).fill().map(_=>new Uint32Array(h).fill(defa));

//let buffer2 = Array(w).fill().map(_=>Array(h).fill().map(_=>Array(3).fill(0)));
let buffer2 = Array(w).fill().map(_=>new Uint32Array(h).fill(defa));
const damping = 0.99999;
let temp;


function animation(){
	
	for(let i = 1; i < w-1; i++){
		for(let j = 1; j < h-1; j++){

			buffer2[i][j] = operation(buffer1[i-1][j], buffer1[i+1][j], buffer1[i][j-1], buffer1[i][j+1], damping);


			/*
			// morph red
			buffer2[i][j][0] = ((buffer1[i-1][j][0] +
								 buffer1[i+1][j][0] +
								 buffer1[i][j-1][0] +
								 buffer1[i][j+1][0]) / 2  - buffer2[i][j][0] * damping);

			// morph green
			buffer2[i][j][1] = ((buffer1[i-1][j][1] +
								 buffer1[i+1][j][1] +
								 buffer1[i][j-1][1] +
								 buffer1[i][j+1][1]) / 2  - buffer2[i][j][1] * damping);

			//morph blue
			buffer2[i][j][2] = ((buffer1[i-1][j][2] +
								 buffer1[i+1][j][2] +
								 buffer1[i][j-1][2] +
								 buffer1[i][j+1][2]) / 2  - buffer2[i][j][2] * damping);
			*/
		}

	}

	let img = new ImageData(w, h)
	let buf = new ArrayBuffer(img.data.length);
	let buf8 = new Uint8ClampedArray(buf);
	let data = new Uint32Array(buf);

	for(let i = 0; i < buffer1.length; i++){
		for(let j = 0; j < buffer1[0].length; j++){
			let index = (j * buffer1.length + i);

			data[index] = buffer1[i][j];

		}
	}

	img.data.set(buf8);

	/*let img = new ImageData(w, h)

	for(let i = 0; i < buffer1.length; i++){
		for(let j = 0; j < buffer1[0].length; j++){
			let index = (j * buffer1.length + i) * 4
			img.data[index] = buffer2[i][j][0]
			img.data[index+1] = buffer2[i][j][1]
			img.data[index+2] = buffer2[i][j][2]
			img.data[index+3] = 255
		}
	}

	 */
	
	c.putImageData(img,0,0)
	
	temp = buffer2;
	buffer2 = buffer1;
	buffer1 = temp;
	requestAnimationFrame(animation);
}

animation();



function ripple(x, y, color){

	let bin = (255 << 24) | (color.getBlueTimesTwo() << 16) | (color.getGreenTimesTwo() << 8 | color.getRedTimesTwo);

	let xDebug = 200;
	let yDebug = 200;

	buffer1[xDebug][yDebug] = bin;
	//buffer1[x+1][y]= bin;
	//buffer1[x][y+1] = bin;
	//buffer1[x+1][y+1] = bin;

}


function operation(buf1, buf2, buf3, buf4, damping){
	let red = (buf1 & 0xff) + (buf2 & 0xff) + (buf3 & 0xff) + (buf4 & 0xff);
	let green = ((buf1 >> 8) & 0xff) + ((buf2 >> 8) & 0xff) + ((buf3 >> 8) & 0xff) + ((buf4 >> 8) & 0xff);
	let blue = ((buf1 >> 16) & 0xff) + ((buf2 >> 16) & 0xff) + ((buf3 >> 16) & 0xff) + ((buf4 >> 16) & 0xff);
	let alpha = 255;

	if(red > 255) red = 255;
	if(blue > 255) blue = 255;
	if(green > 255) green = 255;

	red = Math.floor((red / 2) * damping);
	blue = Math.floor((blue / 2) * damping)
	green = Math.floor((green / 2) * damping);

	let ret = (alpha << 24) | (blue << 16) | (green << 8) | red;
	return ret;
}
