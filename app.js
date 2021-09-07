const express = require("express");
const bodyParser = require("body-parser");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended: true}))
app.get("/",function(req, res){
  res.sendFile(__dirname+"/index.html")

})

app.post("/",function(req, res){
  const cityname=req.body.wd;
  var url="https://api.weatherapi.com/v1/current.json?key=e0772e2fa4864b7285e53041210807&q="+cityname+"&aqi=yes&unit=matric";
  https.get(url,function(response){
    response.on("data",function(data){
      var weatherdata=JSON.parse(data);
      const temp=weatherdata.current.temp_c;
      res.write("<p>The weather is currently "+weatherdata.current.condition.text+"</p>")
      res.write("<h1>Temprature of "+cityname+" is : "+temp+" degree celcius</h1>");
      res.write("<img src="+weatherdata.current.condition.icon+">")
      res.send();

    })
  })

})



app.listen(4000,function(req,res){
  console.log("server is running on port 4000");
})

// var url="https://api.weatherapi.com/v1/current.json?key=e0772e2fa4864b7285e53041210807&q=bhagalpur&aqi=yes&unit=matric"
// https.get(url,function(response){
//   response.on("data",function(data){
//     var weatherdata=JSON.parse(data);
//     console.log(weatherdata.current.temp_c);
//   })
// })
