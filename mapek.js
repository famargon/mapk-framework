
var rest = require("./rest/rest")
var events = require("./eventsEngine/events")
var knowledge = require("./knowledge/knowledge")
var http = require("./utils/httpTemplate")

var node = function(propertiesPath){

    if(!propertiesPath) propertiesPath="./mapek.ini"

    var properties = require("./properties").getInstance(propertiesPath).get()

    var network = require("./network/network")(properties)

    rest.init(properties.rest.port);

    var monitor = function(callback){
        var process = function(data){
            events.emitProcess(data)
        }
        events.listenMonitor(callback,process)
    }

    var process = function(callback){
        events.listenProcess(callback)
    }

    return {
        monitor,
        process,
        properties,
        network
    }

}



module.exports = {
    node,
    knowledge,
    http
}