const path = require('path');
 
// here we use the plugins to clear folders and copy folder content
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
 
var PATHS = {dist: path.resolve(__dirname, 'dist')}

module.exports = {
    entry: {
        // this is our entry point, the main JavaScript file
        app: './src/main.ts',
    },
    output: {
 
        // this is our output file, the one which bundles all libraries
        filename: 'main.js',
 
        // and this is the path of the output bundle, "dist" folder
        path: path.resolve(__dirname, 'dist'),
    },
 
    // we are in production mode
    mode: 'production',
    /*externals: {
     "pixi": path.resolve(__dirname, "./node_modules/pixi.js/dist/pixi.min.js")
    },*/
    plugins: [
 
        // here we clean the destination folder
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
 
        // here we copy some files to destination folder.
        // which files?
        new CopyPlugin({
            patterns: [
                { 
                    // src/index.html
                    from: 'index.html',//template
                    context: 'src/',
                    to:"index.html"//rename it
                },
                
                {
                    // all files inside src/assets folder
                    from: 'assets/*/*',
                    context: 'src/'
                },
                
               // { from: 'node_modules/pixi.js/dist/pixi.min.js', to: PATHS.dist },
                {
                    // all files inside css
                    from: 'css/*',
                    context: 'src/'
                },
                {
                    // all files inside css
                    from: 'js/*',
                    context: 'src/'
                }

            ]
        })
    ],
// list of extensions to resolve, in resolve order
resolve: {
    extensions: [ '.ts', '.tsx', '.js' ]
},

// loader to handle TypeScript file type
module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    }]
}
}