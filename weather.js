const request=require('postman-request')
const express=require('express')
const app=express.Router()

app.get('/current',(req,res)=>{

let options={
  proxy:'http://id:password@proxy'
  }

//for mapbox
let address=req.query.address;
console.log(address)
let access_key='pk.eyJ1IjoicHJhdGhlZWstMSIsImEiOiJja2J6MTBvem0wamRtMnpxYjY5OWc3MXB1In0.SehzVmKAXJRVugFLCDenCA'
let map='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token='+access_key;
if(address==''|| address==undefined ||address==null)
{
  return res.send('please enter proper address')
}
request(map,options,(err,response)=>{
  let data=JSON.parse(response.body); 
  if(err){
    return res.render('error', {
      error:err
  })
  }
  else if(data.features.length === 0){
    return res.render('error', {
      error:'place not found'
  })
  }
  else{
    let lng=data.features[0].center[0]
    let lat=data.features[0].center[1]
    let location= data.features[0].place_name
  
    let res1={lng,lat,location}
    console.log(res1)
    weather(res1)
  }
})

const weather=function(res1){
let{lat,lng}=res1
console.log(lat,lng)
 //for weatherstack 
let url='http://api.weatherstack.com/current?access_key=5a8960e742a304e309ddbabe863d97a5&query='+lat+','+lng

request(url,options,(err,response)=>{
  if(!err){
  let data=JSON.parse(response.body);
  console.log(data)
  let temp=data.current.temperature
  let wind=data.current.wind_speed
  console.log(temp)
  

  res.render('weather', {
    title: 'Weather App',
    location:res1.location,
    temperature:temp,
    wind,
    name: 'Pratheek'
})
  // res.send(message)
  }
  else{
    console.log(err)
  }
})
}

})

module.exports=app;