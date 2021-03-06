var os = require('os');

var config = {};
config.test = {
  //
  db: {
    username: "root",
    password: "Password12!",
    database: "codepush_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  qiniu: {
    accessKey: "",
    secretKey: "",
    bucketName: "",
    downloadUrl: "" //
  },
  local: {
    storageDir: os.tmpdir(),
    downloadUrl: "http://localhost:3000/download"
  },
  common: {
    loginSecret: "CodePushServer",
    tryLoginTimes: 10,
    diffNums: 3,
    dataDir: os.tmpdir(),
    storageType: "local"
  },
  smtpConfig: false,
  redis: {
    default: {
      host: "127.0.0.1",
      port: 6379,
      retry_strategy: function (options) {
        if (options.error.code === 'ECONNREFUSED') {
          // End reconnecting on a specific error and flush all commands with a individual error
          return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.times_connected > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.max(options.attempt * 100, 3000);
      }
    }
  }
}
module.exports = config;
