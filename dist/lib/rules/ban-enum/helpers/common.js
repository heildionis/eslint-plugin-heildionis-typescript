"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnumMembersEquals = exports.findCloseBraceToken = void 0;
const types_1 = require("@typescript-eslint/types");
const findCloseBraceToken = (tokens) => {
    let closeBraceIndex = 0;
    tokens.forEach((token, index) => {
        if (token.value === '}') {
            closeBraceIndex = index;
        }
    });
    return closeBraceIndex;
};
exports.findCloseBraceToken = findCloseBraceToken;
const getEnumMembersEquals = (tokens, fixer) => {
    const enumMembersEquals = [];
    tokens.forEach((token, index) => {
        const isFirstIdentifier = tokens[index + 1]?.value === '{';
        if (isFirstIdentifier) {
            return;
        }
        if (token.type === types_1.AST_TOKEN_TYPES.Identifier) {
            enumMembersEquals.push(fixer.replaceText(tokens[index + 1], ':'));
        }
    });
    return enumMembersEquals;
};
exports.getEnumMembersEquals = getEnumMembersEquals;
