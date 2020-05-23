import { Signale } from 'signale';
const chalk = require('chalk');
type Color = "red" | "green" | "cyan" | "magenta" | "yellow" | "blue"

class Print extends Signale {
    constructor(options?: any) {
        super(options);
    }
    custom(color: Color, ...text: string[]) {
        console.log(chalk[color](...text))
    }
    primary(...text: string[]) {
        this.custom("cyan", ...text)
    }
    cyan(...text: string[]) {
        this.custom("cyan", ...text)
    }
    keyword(...text: string[]) {
        this.custom("magenta", ...text)
    }
    red(...text: string[]) {
        this.custom("red", ...text)
    }
    green(...text: string[]) {
        this.custom("green", ...text)
    }
}
const signale = new Print();

export default signale;
