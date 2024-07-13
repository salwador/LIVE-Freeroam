const entities = [
    Player, Vehicle, WorldObject
];

for (const entityType of entities) {
    // Method "setData()" for set object properties
    global[entityType].prototype.setData = function (name, value) {
        this.live.properties[name] = value;

        return true;
    };

    // Method "getData()" for get object properties
    global[entityType].prototype.getData = function (name) {
        return this.live.properties[name] || false;

        return true;
    };
};