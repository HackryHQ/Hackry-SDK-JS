const nock = require('nock');

// A generic resource for testing purposes.
nock('https://api.hackry.io/v1')
  .persist()
  .get(/\/hackathons\/.*\/resources$/)
  .reply(200, {
    resources: [
      {
        id: 'resource',
      },
    ],
  });

nock('https://api.hackry.io/v1')
  .persist()
  .get(/\/hackathons\/.*\/resources\/error$/)
  .reply(200, {
    error: {
      message: 'An error occured.',
    },
  });
