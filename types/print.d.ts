import { Signale } from "signale";
declare type Color = "red" | "green" | "cyan" | "magenta" | "yellow" | "blue";
declare class Print extends Signale {
    constructor(options?: any);
    custom(color: Color, ...text: string[]): void;
    primary(...text: string[]): void;
    cyan(...text: string[]): void;
    keyword(...text: string[]): void;
    red(...text: string[]): void;
    green(...text: string[]): void;
}
declare const signale: Print;
export default signale;
