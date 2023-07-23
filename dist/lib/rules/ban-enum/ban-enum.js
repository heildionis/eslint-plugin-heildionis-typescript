"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.banEnumRule = void 0;
const utils_1 = require("@typescript-eslint/utils");
const templates_1 = require("./helpers/templates");
const common_1 = require("./helpers/common");
const fix = (fixer, node, tokens) => {
    const enumKeywordToken = tokens[0];
    const enumKeywordTemplate = (0, templates_1.getEnumKeywordTemplate)();
    const closeBraceTokenPosition = (0, common_1.findCloseBraceToken)(tokens);
    const closeBraceToken = tokens[closeBraceTokenPosition];
    const closeBraceTemplate = (0, templates_1.getCloseBraceTemplate)(node);
    const enumMembersEquals = (0, common_1.getEnumMembersEquals)(tokens, fixer);
    return [
        fixer.replaceText(enumKeywordToken, enumKeywordTemplate),
        fixer.replaceText(node.id, `${node.id.name} =`),
        fixer.replaceText(closeBraceToken, closeBraceTemplate),
        ...enumMembersEquals,
    ];
};
exports.banEnumRule = utils_1.ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        messages: {
            banEnum: 'You cant use enums. Use `as const` enums instead ;)',
        },
        schema: [],
        type: 'problem',
        fixable: 'code',
    },
    defaultOptions: [],
    create(context) {
        return {
            TSEnumDeclaration(node) {
                const sourceCode = context.getSourceCode();
                const enumTokens = sourceCode.getTokens(node);
                context.report({
                    node,
                    messageId: 'banEnum',
                    fix: (fixer) => fix(fixer, node, enumTokens),
                });
            },
        };
    },
});
