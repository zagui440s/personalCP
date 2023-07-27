var ZFighter = /** @class */ (function () {
    function ZFighter(name, powerLevel) {
        this.name = name;
        this.powerLevel = powerLevel;
    }
    ZFighter.prototype.increasePowerLevel = function (incrementBy) {
        this.powerLevel += incrementBy;
    };
    ZFighter.prototype.statusReport = function () {
        var powerStatus = this.powerLevel > 9000 ? "has a power level over 9000" : "is a weakling";
        console.log("".concat(this.name, " ").concat(powerStatus));
    };
    ZFighter.prototype.toString = function () {
        return "ZFighter { name: ".concat(this.name, ", powerLevel: ").concat(this.powerLevel, " }");
    };
    return ZFighter;
}());
var goku = new ZFighter("Son Goku", 8999);
console.log(goku);
goku.statusReport();
goku.increasePowerLevel(10);
goku.statusReport();
