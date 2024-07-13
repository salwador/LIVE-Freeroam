String.prototype.removeChatHex = function () {
    const matches = this.match(/\[[0-9A-Fa-f]{6}\]/g);

    if (!matches || (matches.length < 1))
        return this;

    for (const part of matches) {
        this.replace(part, ``);
    };

    return this.trim();
};