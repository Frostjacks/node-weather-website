const request = require('request')

// request({url:url}, (error, response)=>{
//     // response has all the datas related to the request that has been made like header info, request status. Among them the body property has the required weather info in JSON format
//     // parse converts the json into js objects. you can only access the data in js objects from but not directly in JSON form
//     const data = JSON.parse(body)
//     console.log(data)
// })

const geocode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWF5dXNoZGhha2FsIiwiYSI6ImNrMXlnODJ1bjBuMHozcHM1YTdibHhoZ20ifQ.qpyqiJNDPqvUpvcOnUKgOg&limit=1`;

    // json:true auto parses the response
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
    
}

module.exports = geocode