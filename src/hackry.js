const axios = require('axios');

const HackryAPI = axios.create({
  baseURL: 'https://api.hackry.io/v1',
});

class Hackry {
  static error(message) {
    throw new Error(`Hackry: ${message}`);
  }

  constructor(hackathonId, { shouldCache } = {}) {
    if (!hackathonId) {
      this.constructor.error('Missing hackathon id.');
    }

    const cache = {};

    this.cache = () => cache;
    this.hackathonId = () => hackathonId;
    this.config = () => ({
      shouldCache: shouldCache !== false,
    });
  }

  registrationURL() {
    return `https://dashboard.hackry.io/register?hackathonId=${this.hackathonId()}`;
  }

  getResource({ resource, params }, completion) {
    if (this.config().shouldCache && this.cache()[resource]) {
      return completion && completion(null, this.cache()[resource]);
    }

    return HackryAPI.request({
      url: `/hackathons/${this.hackathonId()}${resource}`,
      params,
    }).then(({ data }) => {
      const { error } = data;
      this.cache()[resource] = error || data;
      return completion(error ? Error(error.message) : null, error ? null : data);
    });
  }

  announcements(params, completion = params) {
    this.getResource(
      {
        resource: '/announcements/visible',
        params: typeof params === 'object' ? params : {},
      },
      (err, { announcements }) => {
        completion(
          err,
          announcements.sort((lhs, rhs) => new Date(lhs.updatedAt) - new Date(rhs.updatedAt)),
        );
      },
    );
  }

  dayOfContacts(completion) {
    this.getResource(
      {
        resource: '/contacts/available',
      },
      (err, { contacts }) => completion(err, contacts),
    );
  }

  events(params, completion = params) {
    this.getResource(
      {
        resource: '/events/visible',
        params: typeof params === 'object' ? params : {},
      },
      (err, { events }) => {
        completion(
          err,
          events.sort((lhs, rhs) => new Date(lhs.startDate) - new Date(rhs.startDate)),
        );
      },
    );
  }

  faqs(completion) {
    this.getResource(
      {
        resource: '/faqs/visible',
      },
      (err, { faqs }) => {
        completion(err, faqs.sort((lhs, rhs) => lhs.position - rhs.position));
      },
    );
  }
}

module.exports = Hackry;
