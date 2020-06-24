const request = require('request')

const forecast = (longitude, latitude, callback)=>{
    const url = `https://api.darksky.net/forecast/70340a97f574c025f94c998201bb3908/${longitude},${latitude}`;

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('unable to connect to weather services')
        } else if(body.error){
            callback('unable to find location')
        }else{      
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast