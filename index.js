var exp=require('express')
var request=require("request")
var bp=require("body-parser")


var app=exp()
app.set('view engine','ejs')
app.use(bp.urlencoded({extended:true}))

var city="Gwalior"
var url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`

app.get('/',function(req,res){
    request(url,function(error,response,body){
        if(error) throw error
        data=JSON.parse(body)

        console.log(data)
    var temp = data.main.temp
  
         var c = 5/9*(data.main.temp-32)
         c = Math.trunc(c)

        var weather={
            city:city,
            temperature:c,
            icon:data.weather[0].icon,
            description:data.weather[0].description
        }

        res.render("index",{weather:weather})
        })
})

app.post('/temp',function(req,res){

    var city=req.body.city_name
    var url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`
    
    request(url,function(error,response,body){
        if(error) throw error
        data =JSON.parse(body)
        console.log(data)
    
            var temp = data.main.temp
        var c = 5/9*(data.main.temp-32)

var weather={
    city:city,
    temperature:c,
    icon:data.weather[0].icon,
    description:data.weather[0].description
}

res.render("index",{weather:weather})
})
    
    })
    
    
    
    
    



app.listen(3000,function(req,res){
    console.log("server started")
})