import { TSEnumDeclaration } from '@typescript-eslint/types/dist/generated/ast-spec';

export const getCloseBraceTemplate = (node: TSEnumDeclaration) => {
    const nodeName = node.id.name;

    return `} as const\n\ntype ${nodeName}Type = (typeof ${nodeName})[keyof typeof ${nodeName}];`;
};

export const getEnumKeywordTemplate = () => `const `;
