/*
*
* Create and export Config variables
*
*/


// Container for environments
var environments ={};

// Staging environment
environments.development ={
  'port' : 3000,
  'envName': 'Development'
}

// Production environment
environments.production ={
  'port' : 5000,
  'envName': 'Production'
}


// Determine the current environment passed from command line
var curEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check if current env exists or default to development
var environmentToExport = typeof(environments[curEnv]) == 'object' ? environments[curEnv] : environments.development;

// Export the module
module.exports = environmentToExport;
