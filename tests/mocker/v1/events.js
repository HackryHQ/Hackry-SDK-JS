const nock = require('nock');

const events = [
  {
    id: '5a76749efc13ae69e8000a32',
    name: 'Bags Tournament',
    description: 'Join us as we compete in the traditional bags tournament.',
    startDate: '2018-02-04T01:00:00.000Z',
    endDate: '2018-02-05T02:00:00.000Z',
    location: '444 Lakewood Gardens Road',
    updatedAt: '2018-02-04T03:10:46.431Z',
    startDateFormatted: 'Saturday 8:00 pm ',
    endDateFormated: 'Sunday 9:00 pm',
  },
  {
    id: '5a76749efc13ae69e8000a34',
    name: 'Demos',
    description: 'Show everyone what cool thing you have built.',
    startDate: '2018-02-04T03:30:00.000Z',
    endDate: '2018-02-06T04:00:00.000Z',
    location: '2891 Evergreen Crossing',
    updatedAt: '2018-02-04T03:11:08.165Z',
  },
  {
    id: '5a76749efc13ae69e8000a33',
    name: 'Yoga',
    description: 'Zen out after all your hard work!',
    startDate: '2018-02-05T02:50:00.000Z',
    endDate: '2018-02-05T03:20:00.000Z',
    location: '1 Talisman Trail',
    updatedAt: '2018-02-04T03:11:00.653Z',
  },
];

nock('https://api.hackry.io/v1')
  .persist()
  .get(/\/hackathons\/.*\/events\/visible$/)
  .reply(200, {
    events,
  });

nock('https://api.hackry.io/v1')
  .persist()
  .get(/\/hackathons\/.*\/events\/visible$/)
  .query({
    timeZone: 'America/New_York',
    startDateFormat: 'dddd h:mm a',
    endDateFormat: 'dddd h:mm a',
  })
  .reply(200, {
    events: [
      {
        ...events[0],
        startDateFormatted: 'Saturday 8:00 pm ',
        endDateFormated: 'Sunday 9:00 pm',
      },
      {
        ...events[1],
        startDateFormatted: 'Saturday 10:30 pm',
        endDateFormated: 'Monday 11:00 pm',
      },
      {
        ...events[2],
        startDateFormatted: 'Sunday 9:50 pm',
        endDateFormated: 'Sunday 10:20 pm ',
      },
    ],
  });
