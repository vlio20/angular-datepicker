const {SpecReporter} = require('jasmine-spec-reporter');
const headless = process.env.HEADLESS;

exports.config = {
  allScriptsTimeout: 120000,
  specs: ['./e2e/**/*spec.ts'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: headless
        ? ['--headless', '--disable-gpu', '--window-size=1280,1024']
        : []
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 120000,
    print: function () {
    }
  },
  onPrepare() {
    jasmine
      .getEnv()
      .addReporter(new SpecReporter({spec: {displayStacktrace: true}}));

    require('ts-node').register({project: 'e2e/tsconfig.e2e.json'});
  },
};
