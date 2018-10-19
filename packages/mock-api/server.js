const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
}

app.use(cors());
app.use(morgan('API Request (port 3001): :method :url :status :response-time ms - :res[content-length]'));

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkMessagesScopes = jwtAuthz([ 'read:messages' ]);
const checkTodosScopes = jwtAuthz([ 'read:todos' ]);

app.get('/api/public', function(req, res) {
  res.json({ message: "public - no scopes required" });
});

app.get('/api/messages', checkJwt, checkMessagesScopes, function(req, res) {
  res.json({ message: "read:messages" });
});

app.get('/api/todos', checkJwt, checkTodosScopes, function(req, res) {
  res.json({ message: "read:todos" });
});

app.listen(3001);
console.log('server listening on http://localhost:3001');
