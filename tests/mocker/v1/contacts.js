const nock = require('nock');

nock('https://api.hackry.io/v1')
  .persist()
  .get(/\/hackathons\/.*\/contacts\/available$/)
  .reply(200, {
    contacts: [
      {
        id: '5a7668ccfc13ae68dd0000c9',
        name: 'Cherry Shilston',
        phone: '(732) 926-0582',
        type: 'regular',
        isAvailable: false,
        updatedAt: '2018-02-03T09:01:00.000Z',
      },
      {
        id: '5a7668ccfc13ae68dd0000ca',
        name: 'Campus Police',
        phone: '(205) 446-3584',
        type: 'emergency',
        isAvailable: true,
        updatedAt: '2018-02-03T09:02:00.000Z',
      },
    ],
  });
