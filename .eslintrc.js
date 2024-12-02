module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['react-app', 'plugin:@typescript-eslint/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        indent: ['off', 4],
        'linebreak-style': ['off', 'windows'],
        'no-console': 'error',
        'no-debugger': 'error',
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        'class-methods-use-this': 'error',
        'max-len': ['error', { code: 300 }],
        // ! Typescript
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': [
            'warn',
            {
                default: 'array-simple',
            },
        ],
        // normally we would set that rule to error, yet we can't because of the dispatch typings
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/ban-types': [
            'warn',
            {
                extendDefaults: true,
                types: {
                    '{}': false,
                    Function: false,
                    object: false,
                },
            },
        ],
        '@typescript-eslint/ban-ts-comment': 'warn',

        //  '@typescript-eslint/camelcase': 'warn',
        // '@typescript-eslint/class-name-casing': 'error',
        // '@typescript-eslint/interface-name-prefix': ['error', 'always'],
        // '@typescript-eslint/member-naming': ['warn', { private: '^_' }],

        '@typescript-eslint/naming-convention': [
            'warn',
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: true,
                },
            },
            {
                selector: ['variable'],
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
            },
            {
                selector: 'memberLike',
                modifiers: ['private'],
                format: ['camelCase'],
                leadingUnderscore: 'require',
            },
            {
                selector: 'class',
                format: ['PascalCase'],
            },
        ],

        '@typescript-eslint/consistent-type-assertions': [
            'warn',
            {
                assertionStyle: 'as',
                objectLiteralTypeAssertions: 'allow',
            },
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/explicit-function-return-type': [
            'off',
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
                allowHigherOrderFunctions: true,
            },
        ],
        '@typescript-eslint/explicit-member-accessibility': ['warn', { overrides: { constructors: 'off' } }],
        '@typescript-eslint/func-call-spacing': ['warn', 'never'],
        '@typescript-eslint/generic-type-naming': 'off',
        '@typescript-eslint/indent': 'off',

        '@typescript-eslint/member-delimiter-style': 'error',

        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: [
                    'public-static-field',
                    'protected-static-field',
                    'private-static-field',

                    'public-instance-field',
                    'protected-instance-field',
                    'private-instance-field',

                    'public-field',
                    'protected-field',
                    'private-field',

                    'static-field',
                    'instance-field',

                    'field',

                    'public-static-method',
                    'protected-static-method',
                    'private-static-method',

                    'constructor',

                    'public-instance-method',
                    'protected-instance-method',
                    'private-instance-method',

                    'public-method',
                    'protected-method',
                    'private-method',

                    'static-method',
                    'instance-method',

                    'method',
                ],
            },
        ],
        '@typescript-eslint/no-array-constructor': 'error',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-empty-interface': ['off', { allowSingleExtends: false }],

        // "@typescript-eslint/no-explicit-any": ["error", { "ignoreRestArgs": true }],
        '@typescript-eslint/no-explicit-any': 'off',
        'no-extra-parens': 'off',
        '@typescript-eslint/no-extra-parens': 'off',
        '@typescript-eslint/no-extraneous-class': ['error', { allowStaticOnly: true }],
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true, ignoreProperties: true }],
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': ['off', { ignoreNumericLiteralTypes: true, ignoreEnums: true }],
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-parameter-properties': 'error',
        '@typescript-eslint/no-require-imports': 'warn',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-type-alias': [
            'off',
            {
                allowAliases: 'always',
                allowMappedTypes: 'always',
                allowLiterals: 'in-unions-and-intersections',
                allowCallbacks: 'always',
            },
        ],
        '@typescript-eslint/no-unnecessary-qualifier': 'warn',
        // "@typescript-eslint/no-unnecessary-type-arguments": "warn",
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-useless-constructor': 'warn',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-includes': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/prefer-readonly': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'warn',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/promise-function-async': [
            'error',
            {
                checkArrowFunctions: false,
                checkFunctionDeclarations: true,
                checkFunctionExpressions: true,
            },
        ],
        '@typescript-eslint/require-array-sort-compare': 'warn',
        'require-await': 'off',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        semi: 'off',
        '@typescript-eslint/semi': ['error'],
        // "@typescript-eslint/strict-boolean-expressions": ["warn", { "ignoreRhs": true }],
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/type-annotation-spacing': 'warn',
        // TODO: typedef...
        '@typescript-eslint/typedef': 'off',
        '@typescript-eslint/unbound-method': ['off', { ignoreStatic: true }],
        '@typescript-eslint/unified-signatures': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        // ! React
        'react/no-unescaped-entities': 'off',

        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    },
};
