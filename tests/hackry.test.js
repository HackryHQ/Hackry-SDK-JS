const chai = require('chai');
const chaiHttp = require('chai-http');
const Hackry = require('../src/hackry.js');
require('./mocker/v1');

const { expect } = chai;
const HACKATHON_ID = 'TUFVHq2aKe';

chai.use(chaiHttp);

describe('hackry', () => {
  describe('init', () => {
    it('should require a hackathon id', () => {
      expect(() => new Hackry()).to.throw(Error, 'Hackry: Missing hackathon id.');
    });

    it('should set the hackathon id', () => {
      expect(new Hackry(HACKATHON_ID).hackathonId()).to.equal(HACKATHON_ID);
    });

    it('should initialize an empty cache', () => {
      expect(new Hackry(HACKATHON_ID).cache()).to.deep.equal({});
    });

    it('should enable caching by default', () => {
      expect(new Hackry(HACKATHON_ID).config()).to.deep.equal({
        shouldCache: true,
      });
    });

    it('should allow the cache to be disabled', () => {
      expect(new Hackry(HACKATHON_ID, {
        shouldCache: false,
      }).config()).to.deep.equal({
        shouldCache: false,
      });
    });
  });

  describe('registration url', () => {
    it('should return the registration url for the hackathon', () => {
      const url = `https://dashboard.hackry.io/register?hackathonId=${HACKATHON_ID}`;
      expect(new Hackry(HACKATHON_ID).registrationURL()).to.deep.equal(url);
    });
  });

  describe('get resource', () => {
    it('should return resources from the cache', (done) => {
      const hackry = new Hackry(HACKATHON_ID, {
        shouldCache: true,
      });

      hackry.cache()['/resources'] = [
        {
          id: 'resource',
        },
      ];

      hackry.getResource(
        {
          resource: '/resources',
        },
        (err, resources) => {
          expect(err).to.equal(null);
          expect(resources).to.deep.equal([
            {
              id: 'resource',
            },
          ]);
          done();
        },
      );
    });

    it('should fetch all resources', (done) => {
      const hackry = new Hackry(HACKATHON_ID);
      hackry.getResource(
        {
          resource: '/resources',
        },
        (err, { resources }) => {
          expect(err).to.equal(null);
          expect(resources).to.deep.equal([
            {
              id: 'resource',
            },
          ]);
          done();
        },
      );
    });

    it('should populate a resource with any ', (done) => {
      const hackry = new Hackry(HACKATHON_ID);
      hackry.getResource(
        {
          resource: '/resources/error',
        },
        (err, resources) => {
          expect(err)
            .to.have.property('message')
            .equal('An error occured.');
          expect(resources).to.equal(null);
          done();
        },
      );
    });
  });

  describe('announcements', () => {
    it('should return announcements sorted by updated at', (done) => {
      const hackry = new Hackry(HACKATHON_ID);
      hackry.announcements((err, announcements) => {
        expect(err).to.equal(null);
        expect(announcements).to.deep.equal([
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
          {
            id: '5a7c87b0fc13ae7d0900006f',
            title: 'React Workshop',
            body: 'Join Stacy in room 101 for her React workshop.',
            updatedAt: '2018-02-28T22:24:29.000Z',
          },
        ]);
        done();
      });
    });

    it('should populate formatted properties when format params present', (done) => {
      const hackry = new Hackry(HACKATHON_ID);
      hackry.announcements(
        {
          timeZone: 'America/New_York',
          updatedAtFormat: 'dddd h:mm a',
        },
        (err, announcements) => {
          expect(err).to.equal(null);
          announcements.forEach((announcement) => {
            expect(announcement).to.have.property('updatedAtFormatted');
          });
          done();
        },
      );
    });
  });

  describe('day of contacts', () => {
    it('should return day of contacts', (done) => {
      const hackry = new Hackry(HACKATHON_ID);
      hackry.dayOfContacts((err, contacts) => {
        expect(err).to.equal(null);
        expect(contacts).to.deep.equal([
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
        ]);
        done();
      });
    });
  });

  describe('events', () => {
    it('should return announcements sorted by start date', (done) => {
      const hackry = new Hackry(HACKATHON_ID);
      hackry.events((err, events) => {
        expect(err).to.equal(null);
        expect(events).to.deep.equal([
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
        ]);
        done();
      });
    });

    it('should populate formatted properties when format params present', (done) => {
      const hackry = new Hackry(HACKATHON_ID);
      hackry.events(
        {
          timeZone: 'America/New_York',
          startDateFormat: 'dddd h:mm a',
          endDateFormat: 'dddd h:mm a',
        },
        (err, events) => {
          expect(err).to.equal(null);
          events.forEach((event) => {
            expect(event).to.have.property('startDateFormatted');
            expect(event).to.have.property('endDateFormated');
          });
          done();
        },
      );
    });
  });

  describe('faqs', () => {
    it('should return faqs sorted by position', (done) => {
      const hackry = new Hackry(HACKATHON_ID);
      hackry.faqs((err, faqs) => {
        expect(err).to.equal(null);
        expect(faqs).to.deep.equal([
          {
            id: '5a7647cffc13ae6931000000',
            question: 'What should I bring?',
            answer: 'Your computer.',
            position: 0,
            updatedAt: '2018-02-03T10:00:00.000Z',
          },
          {
            id: '5a7647cffc13ae6931000001',
            question: 'How many people can be on a team?',
            answer: 'There may be at more 4 to a team.',
            position: 1,
            updatedAt: '2018-02-03T10:01:00.000Z',
          },
          {
            id: '5a7647cffc13ae6931000002',
            question: 'Who can attend?',
            answer: 'Any current high school or University student.',
            position: 2,
            updatedAt: '2018-02-03T10:02:00.000Z',
          },
        ]);
        done();
      });
    });
  });
});
