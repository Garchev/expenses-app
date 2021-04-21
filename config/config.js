const config = {
    PORT: 3000,
    DB_Uri: 'mongodb://localhost/expenses',
    secret: 'ungaBunga',
    salt_rounds: 12,
    cookie_name: 'auth_token',
}

module.exports = config;