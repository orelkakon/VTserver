export const encrypt = (realPass) => {
    const firstNum = Math.floor(Math.random() * 10);
    const seconedNum = Math.floor(Math.random() * 10);
    const thirdNum = Math.floor(Math.random() * 10);
    const forthNum = Math.floor(Math.random() * 10);
    return "" + firstNum + seconedNum + realPass + thirdNum + forthNum;
}

export const decrypt = (encPass) => {
    return encPass.substring(2, encPass.length - 2)
}

