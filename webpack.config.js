module.exports = { 
    entry: './src/js/main', 
    output: {
        path: `${__dirname}/dist/js`, 
        filename: 'main.min.js' 
    }, 
    watch: true 
}