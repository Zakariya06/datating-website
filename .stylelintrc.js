module.exports = {
    extends: 'stylelint-config-standard',
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
        indentation: 4,
        'block-closing-brace-newline-after': [
            'always',
            {
                ignoreAtRules: ['if', 'else'],
            },
        ],
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['function', 'if', 'else', 'each', 'include', 'mixin', 'return'],
            },
        ],
        'at-rule-empty-line-before': [
            'always',
            {
                except: ['inside-block', 'blockless-after-same-name-blockless', 'blockless-after-blockless', 'first-nested'],
                ignore: ['after-comment', 'first-nested', 'inside-block', 'blockless-after-same-name-blockless', 'blockless-after-blockless'],
                ignoreAtRules: ['array', 'of', 'at-rules', 'if', 'else', 'function'],
            },
        ],
    },
};
