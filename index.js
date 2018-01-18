class Hackry {
  static urls() {
    return {
      api: 'https://api.hackry.io/v1',
      dashboard: 'https://dashboard.hackry.io'
    };
  }

  static error(message) {
    console.log('Hackry: ' + message);
  }

  constructor(hackathonId, options = {}) {
    if (!hackathonId) {
      this.constructor.error('Missing hackathon id.')
    }

    this.hackathonId = hackathonId;
    this.cache = {};
    this.options = {
      cache: options.cache === false ? false : true
    };
  }

  registrationURL() {
    const DASHBOARD_URL = Hackry.urls().dashboard;
    return DASHBOARD_URL + '/register?hackathonId=' + this.hackathonId;
  }

  getResource(resource, completion) {
    const API_URL = Hackry.urls().api;
    const url = [API_URL, 'hackathons', this.hackathonId, resource].join('/');

    if (this.options.cache && this.cache[resource]) {
      return completion(this.cache[resource]);
    }

    fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.error) {
        return Promise.reject(new Error(data.error.message));
      } else {
        this.cache[resource] = completion(data) || data;
      }
    }.bind(this)).catch(function(error) {
      Hackry.error(error.message);
    });
  }

  announcements(completion) {
    this.getResource('announcements/visible', function(data) {
      return completion(data.announcements.sort(function(lhs, rhs) {
        return Date.parse(lhs.updatedAt) < Date.parse(rhs.updatedAt) ? -1 : 1;
      }));
    });
  }

  dayOfContacts(completion) {
    this.getResource('contacts/available', function(data) {
      return completion(data.contacts)
    });
  }

  events(completion) {
    this.getResource('events/visible', function(data) {
      return completion(data.events.sort(function(lhs, rhs) {
        return Date.parse(lhs.startDate) < Date.parse(rhs.endDate) ? -1 : 1;
      }));
    });
  }

  faqs(completion) {
    this.getResource('faqs/visible', function(data) {
      return completion(data.faqs.sort(function(lhs, rhs) {
        return lhs.position < rhs.position ? -1 : 1;
      }));
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Hackry;
}
