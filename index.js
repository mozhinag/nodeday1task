const fs=require('fs');
const cors=require('cors');
const express=require("express");
const app=express();

app.use(cors());


app.get("/", (request, response) => {
    response.send("NODE.JS FILE SYSTEM TASK  ");
    response.json({
        createMessage: `/create->To CREATE .txt file`,
        readMessage: `/->To READ .txt file`
        })
  });
    


app.get("/create",function (req,res){
    var timestamp=new Date();
    var filename=timestamp.getDate()+"-"+timestamp.getHours()+timestamp.getMinutes()+timestamp.getSeconds();    
    fs.writeFile(`${filename}.txt`,`${timestamp}`,()=>{
        console.log("File Creation Done Sucessfully")
    }
    );
    res.json({ message:`${filename}.txt File Created `,
               filename:`${filename}.txt`,
            })
    
})


app.get("/read",function (req,res){
    var txt_files=[];
    fs.readdir(__dirname, function (err, files) {
        //error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        
        files.forEach(function (file) {
            if(file.endsWith(".txt")){
                txt_files.push(file);
            }     
        });
        res.json({
            file_names:txt_files
        })
    });
    
})

app.listen(process.env.PORT||3005,()=>{
    console.log("App listening at port-3005 ");
})