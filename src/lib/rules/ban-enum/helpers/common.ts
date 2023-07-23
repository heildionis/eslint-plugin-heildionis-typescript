import { AST_TOKEN_TYPES } from '@typescript-eslint/types';
import { Token } from '@typescript-eslint/types/dist/generated/ast-spec';
import { RuleFixer, RuleFix } from '@typescript-eslint/utils/dist/ts-eslint';

export const findCloseBraceToken = (tokens: Token[]): number => {
    let closeBraceIndex: number = 0;

    tokens.forEach((token, index) => {
        if (token.value === '}') {
            closeBraceIndex = index;
        }
    });

    return closeBraceIndex;
};

export const getEnumMembersEquals = (tokens: Token[], fixer: RuleFixer) => {
    const enumMembersEquals: RuleFix[] = [];

    tokens.forEach((token, index) => {
        const isFirstIdentifier = tokens[index + 1]?.value === '{';

        if (isFirstIdentifier) {
            return;
        }

        if (token.type === AST_TOKEN_TYPES.Identifier) {
            enumMembersEquals.push(fixer.replaceText(tokens[index + 1]!, ':'));
        }
    });

    return enumMembersEquals;
};
