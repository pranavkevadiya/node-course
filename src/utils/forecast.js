const request = require('request')




const forecast = (location, callback) => {

    const mapBoxAccessKey = 'pk.eyJ1IjoicHJhbmF2a2V2YWRpeWEiLCJhIjoiY2tiM2x1Yno2MDczazMwbzJicXdoMnB3MCJ9.OmqoynHeTsgLVz8-1O-yQA'
    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
                + encodeURIComponent(location)  
                + '.json?access_token='
                + mapBoxAccessKey

    request({url : mapboxUrl, json : true}, (error, {body}) => {
        if(error){
            callback('Error while getting geo loacation', undefined)
        }
        else if(body.features.length == 0){
            callback('User error prevented getting of gelocation', undefined)
        }
        else{
            forecast2(undefined, {body}, callback)
        }
    });


}

const forecast2 = (error, {body} , callback) => {
    const weatherstackAccessKey = 'f128627e186255920d983e87e6a14985'
    const lat = body.features[0].geometry.coordinates[1];
    const long = body.features[0].geometry.coordinates[0];

    const url = 'http://api.weatherstack.com/current?access_key=' + weatherstackAccessKey + '&query='+lat + ',' + long;

    request({ url : url, json : true}, (error, {body} = {}) => {
        if(error){
            callback('Error occured while calling weatherstack api', undefined)
        }
        else if(!body){
            callback('There is some user error', undefined)
        }
        else{
            const { temperature, humidity }  = body.current;
            callback(undefined, {
                temperature,
                humidity
            })
        }
    });


}

module.exports = forecast 