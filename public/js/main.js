//Font Convert
const conver = {
	unicode: unicode,
	zawgyi: zawgyi
}

//font converter
function fontReplace(output) {
	let rules = conver.zawgyi;
	rules.forEach(rule => {
		let from = rule.from;
		let to = rule.to;

		let reg = new RegExp(from, "g");
		output = output.replace(reg, to);
	})

	return output;
}

//Event
$('#files').on('input',(e)=>{
	let files = e.target.files;
	if(files.length > 50){
		return window.alert('please only choose  50 files!');
	}
	for (let i = 0; i < files.length;i++){
		if (files[i].type !== 'text/plain'){
			document.querySelector('#list-result').append('this is only one txt file! '+files[i].name);
		}else{
			readFile(files[i], (file) => {
				sendFileServer(file);
			})
		}
		
	}

})


///read Files
function readFile(file,done){
	let data = {};
	let r = new FileReader();

	r.onload = function (e){
		//conver font
		data.name = fontReplace(file.name);
		data.body = fontReplace(e.target.result);
		//done
		done(data);
	}
	r.readAsText(file);

}


function sendFileServer (file){
		const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	axios.post('/', file, config)
		.then(({ data }) => {
			document.querySelector('#list-result').innerHTML += `<li>${data}</li>`
		})

}

