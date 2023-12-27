class ZFighter {
  name: string;
  powerLevel: number;

  constructor(name: string, powerLevel: number) {
    this.name = name;
    this.powerLevel = powerLevel;
  }

  increasePowerLevel(incrementBy: number) {
    this.powerLevel += incrementBy;
  }

  statusReport() {
    const powerStatus =
      this.powerLevel > 9000 ? "has a power level over 9000" : "is a weakling";

    console.log(`${this.name} ${powerStatus}`);
  }

  toString() {
    return `ZFighter { name: ${this.name}, powerLevel: ${this.powerLevel} }`;
  }
}

const goku = new ZFighter("Son Goku", 8999);

console.log(goku);
goku.statusReport();
goku.increasePowerLevel(10);
goku.statusReport();
