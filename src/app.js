import express from 'express';

import claims from '../data/claims.json' assert {type: 'json'};
import providers from '../data/providers.json' assert {type: 'json'};

const port = process.env.SERVER_PORT || 8080;

const app = express();
app.use(express.json())

app.get('/claim', (req, res) => {
  res.json(claims);
});

app.post('/assignment', (req, res) => {
  let claim = claims.claims.find((claim) => claim.claimId === req.body.serviceAssignment.claimId);
  let claimIndex = claims.claims.indexOf(claim);
  
  claim = {
    ...claim,
    ...req.body.serviceAssignment,
    status: 'Assigned'
  };
  
  claims.claims[claimIndex] = claim;

  res.json(claim);
});

app.get('/provider', (req, res) => {
  res.json(providers);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});