const nock = require('nock');

const faqs = [
  {
    id: '5a7647cffc13ae6931000000',
    question: 'What should I bring?',
    answer: 'Your computer.',
    position: 0,
    updatedAt: '2018-02-03T10:00:00.000Z',
  },
  {
    id: '5a7647cffc13ae6931000002',
    question: 'Who can attend?',
    answer: 'Any current high school or University student.',
    position: 2,
    updatedAt: '2018-02-03T10:02:00.000Z',
  },
  {
    id: '5a7647cffc13ae6931000001',
    question: 'How many people can be on a team?',
    answer: 'There may be at more 4 to a team.',
    position: 1,
    updatedAt: '2018-02-03T10:01:00.000Z',
  },
];

nock('https://api.hackry.io/v1')
  .persist()
  .get(/\/hackathons\/.*\/faqs\/visible$/)
  .reply(200, {
    faqs,
  });
