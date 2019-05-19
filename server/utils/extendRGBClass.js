RGB.prototype.toChatHex = function () {
    if (this.__chatColor)
        return this.__chatColor;

    const convertedColorToChat = `[${((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1)}]`;

    this.__chatColor = convertedColorToChat;

    return this.__chatColor;
};