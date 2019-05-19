// Method "Vehicle.setData()" for set object properties
Vehicle.prototype.setData = function (name, value) {
    if (!this.live)
        this.live = {
            properties: {}
        };

    this.live.properties[name] = value;

    return true;
};

// Method "Vehicle.getData()" for get object properties
Vehicle.prototype.getData = function (name) {
    if (!this.live)
        return false;

    return this.live.properties[name] || false;

    return true;
};