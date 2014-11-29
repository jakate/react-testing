var JEvents = function(){

    var self = this;
    var listeners = [];

    this.addEventListener = function(eventName, callback){
        listeners.push({
            eventName: eventName,
            callback: callback
        });
    };

    this.dispatchEvent = function(eventName, params) {
        var listener = _.each(listeners, function(listener){
            if(listener.eventName === eventName) {
                listener.callback(params);
            }
        });
    };

};
