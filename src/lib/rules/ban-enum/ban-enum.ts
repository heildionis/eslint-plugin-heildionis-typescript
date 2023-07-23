import {
    TSEnumDeclaration,
    Token,
} from '@typescript-eslint/types/dist/generated/ast-spec';
import { ESLintUtils } from '@typescript-eslint/utils';
import { RuleFixer } from '@typescript-eslint/utils/dist/ts-eslint';
import {
    getEnumKeywordTemplate,
    getCloseBraceTemplate,
} from './helpers/templates';
import { findCloseBraceToken, getEnumMembersEquals } from './helpers/common';

const fix = (fixer: RuleFixer, node: TSEnumDeclaration, tokens: Token[]) => {
    const enumKeywordToken = tokens[0]!;
    const enumKeywordTemplate = getEnumKeywordTemplate();

    const closeBraceTokenPosition = findCloseBraceToken(tokens);
    const closeBraceToken = tokens[closeBraceTokenPosition]!;
    const closeBraceTemplate = getCloseBraceTemplate(node);

    const enumMembersEquals = getEnumMembersEquals(tokens, fixer);

    return [
        fixer.replaceText(enumKeywordToken, enumKeywordTemplate),
        fixer.replaceText(node.id, `${node.id.name} =`),
        fixer.replaceText(closeBraceToken, closeBraceTemplate),
        ...enumMembersEquals,
    ];
};

export const banEnumRule = ESLintUtils.RuleCreator.withoutDocs({
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
