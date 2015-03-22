module.exports = function(config){
  config.set({
basePath : './',

    files : [
		"node_modules/jquery/dist/jquery.js",
		"node_modules/underscore/underscore.js",
		"node_modules/bootstrap/dist/js/bootstrap.js",
		"node_modules/backbone/backbone.js",	
		"node_modules/chai/chai.js",
		"test/lib/sinon-chai.js",
		"test/lib/sinon-1.14.1.js",
		"js/**/*.js",
		"test/**/*-test.js"
    ],

    autoWatch : true,

    frameworks: ['mocha'],

    browsers : ['Firefox'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-junit-reporter',
            'karma-mocha'
            ],
junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
