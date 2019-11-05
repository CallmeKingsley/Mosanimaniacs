module.exports = { 
    "extends": "airbnb-base",
    rules: {
        'import/no-unresolved': 0,
        'no-underscore-dangle': 0,
        'max-len': 0,
        'func-names': 0,
        'no-param-reassign': ['error', { props: false }],
        radix: ['error', 'as-needed'],
        'sort-imports': ['error'],
      },
    
};