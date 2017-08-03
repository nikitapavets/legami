module.exports = { 
    entry: './scripts/main', 
    output: {
        path: `${__dirname}/js/`, 
        filename: 'main.min.js' 
    }, 
    watch: true 
}