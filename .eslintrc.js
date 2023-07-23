module.exports = {
    extends: ['plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        'max-len': [
            'error',
            {
                ignoreComments: true,
                code: 140,
            },
        ],
    },
    env: {
        node: true,
    },
    ignorePatterns: [
        'node_modules',
        'eslint-plugin-custom-rules',
        '.eslintrc.js',
    ],
};
