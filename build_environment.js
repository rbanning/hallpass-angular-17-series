//key name pair defining the keys in resulting environment dictionary and the associated lookup name .env
// key = key for environment dictionary (object)
// name = lookup name in the .env file
const envDict = {
  MOCK_API_KEY: 'MOCK_API_SANDBOX_KEY', 
  MOCK_API_KEY_HEADER: 'MOCK_API_KEY_HEADER',
  MOCK_API_SEED: 'MOCK_API_SANDBOX_SEED',
  MOCK_API_SEED_HEADER: 'MOCK_API_SEED_HEADER',
  MOCK_API_URL: 'MOCK_API_URL',
};

const buildEnvironment = () => {
  //requirements
  const { writeFile } = require('fs');
  const colors = require('colors');
  const { version } = require('./package.json');

  //pull .env into the process.env
  require('dotenv').config({
    path: './src/environments/.env'
  });

  const dictCode = Object.keys(envDict)
    .map(key => {
      return `${key}:"${process.env[envDict[key]]}"`
    });

  //build the code for the output (environment.ts)  
  const outputCode = `export const environment = {
    ${dictCode.join(',\n')},
    APP_VERSION: "${version}",
    production: ${process.env.production === 'true'},
  }`;

  const target = './src/environments/environment.ts';
  writeFile(target, outputCode, (err) => {
    if (err) {
      //oops - did not work
      console.error("Unable to build environment file", err);
      throw err;
    } else {
      console.log(colors.green(`App's environment file generated successfully.`));
    }
  })
}

buildEnvironment();