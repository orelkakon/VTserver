"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
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
//# sourceMappingURL=encDecPass.js.map