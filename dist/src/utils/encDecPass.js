"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNewPINcode = exports.decrypt = exports.encrypt = void 0;
const encrypt = (realPass) => {
    const firstNum = Math.floor(Math.random() * 10);
    const seconedNum = Math.floor(Math.random() * 10);
    const thirdNum = Math.floor(Math.random() * 10);
    const forthNum = Math.floor(Math.random() * 10);
    return "" + firstNum + seconedNum + realPass + thirdNum + forthNum;
};
exports.encrypt = encrypt;
const decrypt = (encPass) => {
    return encPass.substring(2, encPass.length - 2);
};
exports.decrypt = decrypt;
const generateNewPINcode = () => {
    let result = "";
    const MUSTelementA = 'O';
    const MUSTelementB = 'K';
    const MUSTelementC = 'l';
    const MUSTelementD = 'n';
    const MUSTelementE = '494';
    const MUSTelementF = '_';
    const MUSTelementG = '0';
    const MAYBEelementA = 'N!';
    const MAYBEelementB = 'L!';
    const MAYBEelementC = '?o';
    const MAYBEelementD = '?k';
    const constantElement = '~';
    let mustArr = [MUSTelementA, MUSTelementB, MUSTelementC, MUSTelementD, MUSTelementE, MUSTelementF, MUSTelementG, constantElement];
    const maybeArr = [MAYBEelementA, MAYBEelementB, MAYBEelementC, MAYBEelementD];
    const maybeNumber = Math.floor(Math.random() * maybeArr.length);
    mustArr.push(maybeArr[maybeNumber]);
    while (mustArr.length !== 0) {
        const randomNum = Math.floor(Math.random() * mustArr.length);
        result = result + mustArr[randomNum];
        mustArr = mustArr.filter(element => element !== mustArr[randomNum]);
    }
    return result;
};
exports.generateNewPINcode = generateNewPINcode;
//# sourceMappingURL=encDecPass.js.map