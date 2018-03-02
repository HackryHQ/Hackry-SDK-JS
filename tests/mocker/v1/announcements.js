const nock = require('nock');

const announcements = [
  {
    id: '5a7c87b0fc13ae7d0900006f',
    title: 'React Workshop',
    body: 'Join Stacy in room 101 for her React workshop.',
    updatedAt: '2018-02-28T22:24:29.000Z',
  },
  {
    id: '5a7c87b0fc13ae7d09000072',
    title: 'Cookie Time',
    body: 'Come grab some warm sugar cookies while they last.',
    updatedAt: '2018-02-28T07:53:54.000Z',
  },
  {
    id: '5a7c87b0fc13ae7d09000070',
    title: 'Bags Tournament',
    body: 'Join us as we compete in the traditional bags tournament.',
    updatedAt: '2018-02-28T10:45:44.000Z',
  },
];

nock('https://api.hackry.io/v1')
  .persist()
  .get(/\/hackathons\/.*\/announcements\/visible$/)
  .reply(200, {
    announcements,
  });

nock('https://api.hackry.io/v1')
  .persist()
  .get(/\/hackathons\/.*\/announcements\/visible$/)
  .query({
    timeZone: 'America/New_York',
    updatedAtFormat: 'dddd h:mm a',
  })
  .reply(200, {
    announcements: [
      {
        ...announcements[0],
        updatedAtFormatted: 'Wednesday 5:24 pm',
      },
      {
        ...announcements[1],
        updatedAtFormatted: 'Wednesday 2:53 am',
      },
      {
        ...announcements[2],
        updatedAtFormatted: 'Wednesday 5:45 am',
      },
    ],
  });
