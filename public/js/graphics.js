const canvas = document.getElementById("canvas");
const s = size_adjuster(innerWidth, innerHeight); /* size - the bigger the faster (lower quality) */
canvas.width = w = Math.floor(innerWidth/s);
canvas.height = h = Math.floor(innerHeight/s);
canvas.style.width = '100%';
canvas.style.height = '100%';
const c = canvas.getContext("2d");
	
//let buffer1 = Array(w).fill().map(_=>Array(h).fill(0));
let buffer1 = Array(w).fill().map(_=>Array(h).fill().map(_=>Array(3).fill(0)));

//let buffer2 = Array(w).fill().map(_=>Array(h).fill(0));
let buffer2 = Array(w).fill().map(_=>Array(h).fill().map(_=>Array(3).fill(0)));

const damping = 0.99998;
//const damping = 1;
let temp;


function size_adjuster(width, height){ //returns higher size for larger canvas size to increase performance
	if(width >= 1280 && height >= 720){ // a quick fix that should be retired once optimizations are made
		return 3.5;
	}

	else return 2;
}


function animation(){
	for(let i = 1; i < w-1; i++){
		for(let j = 1; j < h-1; j++){
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
		}
	}
	
	let img = new ImageData(w, h)
	
	for(let i = 0; i < buffer1.length; i++){
		for(let j = 0; j < buffer1[0].length; j++){
			let index = (j * buffer1.length + i) * 4
			img.data[index] = buffer2[i][j][0]
			img.data[index+1] = buffer2[i][j][1]
			img.data[index+2] = buffer2[i][j][2]
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



function ripple(x, y, color){



	buffer1[x][y][0] = color.getRedTimesTwo(); // R
	buffer1[x+1][y][0] = color.getRedTimesTwo(); // R
	buffer1[x][y+1][0] = color.getRedTimesTwo(); // R
	buffer1[x+1][y+1][0] = color.getRedTimesTwo(); // R


	buffer1[x][y][1] = color.getGreenTimesTwo(); // G
	buffer1[x+1][y][1] = color.getGreenTimesTwo(); // G
	buffer1[x][y+1][1] = color.getGreenTimesTwo(); // G
	buffer1[x+1][y+1][1] = color.getGreenTimesTwo(); // G

	buffer1[x][y][2] = color.getBlueTimesTwo(); // B
	buffer1[x+1][y][2] = color.getBlueTimesTwo(); // B
	buffer1[x][y+1][2] = color.getBlueTimesTwo(); // B
	buffer1[x+1][y+1][2] = color.getBlueTimesTwo(); // B



}
