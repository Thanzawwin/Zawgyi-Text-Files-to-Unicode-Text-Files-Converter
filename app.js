const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const fs = require('fs');


//init
const app = express();

//middleware
app.use(express.json({ limit: '20mb' }));

//static
app.use(express.static(path.join(__dirname, 'public')));

//use file
app.use(fileUpload());

//@Get
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'/public/index.html'))
})


//@Post Change File
app.post('/',(req,res)=>{
	let file = req.body;
	fileCreate(file.name, file.body);
	// //save
	res.json(file.name);


})

//server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));


//file create
function fileCreate (name,body){
	let url = path.join(__dirname, '/public/unicode_files/');

	fs.writeFile(url+name,body,(err)=>{
		if(err){
			console.log(err);
		}
	})
}
