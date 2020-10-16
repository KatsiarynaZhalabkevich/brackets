function isBracketOpenFun(symbol, config) {
    for (let bracket of config) {
        if (symbol === bracket[0]) {
            return true;
        }
    }
    return false;
}

function isBracketCloseFun(symbol, config) {
    for (let bracket of config) {
        if (symbol === bracket[1]) {
            return true;
        }
    }
    return false;
}


function isBracketsSequenceEmpty(bracketsSequence) {
    return bracketsSequence.length === 0;
}

function isBracketsSequenceCorrect(bracketsSequence, isBracketOpen, isBracketClose) {
    return !(isBracketsSequenceEmpty(bracketsSequence) && !isBracketOpen && isBracketClose);
}

function isClosingLastOpened(bracketsSequence, symbol, bracketsConfig) {
    let lastBracket = bracketsSequence[bracketsSequence.length-1];
    for (let bracketsRule of bracketsConfig) {
        if (lastBracket === bracketsRule[0] && symbol === bracketsRule[1]) {
            return true;
        }
    }
    return false;
}

module.exports = function check(str, bracketsConfig) {
    let bracketsSequence = [];
    for (let symbol of str) {
        let isBracketOpen = isBracketOpenFun(symbol, bracketsConfig);
        let isBracketClose = isBracketCloseFun(symbol, bracketsConfig);
        if (!isBracketsSequenceCorrect(bracketsSequence, isBracketOpen, isBracketClose)) {
            return false;
        }
        if (isBracketClose && isClosingLastOpened(bracketsSequence, symbol, bracketsConfig)) { //это закрывающаяся и она закрывает последнюю открытую
            bracketsSequence.pop();
        }else if (isBracketOpen) {
            bracketsSequence.push(symbol);

        }
    }
    return isBracketsSequenceEmpty(bracketsSequence);
}
