"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnumKeywordTemplate = exports.getCloseBraceTemplate = void 0;
const getCloseBraceTemplate = (node) => {
    const nodeName = node.id.name;
    return `} as const\n\ntype ${nodeName}Type = (typeof ${nodeName})[keyof typeof ${nodeName}];`;
};
exports.getCloseBraceTemplate = getCloseBraceTemplate;
const getEnumKeywordTemplate = () => `const `;
exports.getEnumKeywordTemplate = getEnumKeywordTemplate;
