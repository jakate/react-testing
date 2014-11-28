var JEvents = new function(){

    var self = this;
    var listeners = [];

    this.addEventListener = function(eventName, callback){
        listeners.push({
            eventName: eventName,
            callback: callback
        });
    };

    this.dispatchEvent = function(eventName, params) {
        var listener = _.find(listeners, function(listener){
            return listener.eventName === eventName
        });

        if(listener){
            listener.callback(params);
        }
    };

};
