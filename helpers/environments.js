/*
 * Title: Environment Configuration
 * Description: 
 * Author: Md. Saiful Islam
 * Date: 11/13/2025
 *
 */

// Dependencies

// module scaffolding
const environments = {};

// Staging (default) environment
environments.staging = {
    port: 3000,
    envName: 'staging',
}
// Production environment
environments.production = {
    port: 5000,
    envName: 'production',
}

// Determine which environment was passed as a command-line argument
// Normalize the incoming value to avoid mismatches caused by casing or extra whitespace
const rawNodeEnv = process.env.NODE_ENV;
const currentEnvironment = (typeof rawNodeEnv === 'string' && rawNodeEnv.trim() !== '')
    ? rawNodeEnv.toLowerCase().trim()
    : 'staging';

// console.log('raw NODE_ENV:', JSON.stringify(rawNodeEnv));
// console.log('normalized currentEnv:', currentEnvironment);

// Export corresponding environment object (fallback to staging if unknown)
const environmentToExport =
    typeof(environments[currentEnvironment]) === 'object'
    ? environments[currentEnvironment]
    : environments.staging;

module.exports = environmentToExport;