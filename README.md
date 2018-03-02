# Hackry JavaScript Library

The Hackry JavaScript library wraps the [Hackry](https://hackry.io) REST API. No
secrets or other credentials are ever exchanged using this library since all API
endpoints interfaced are public.

To better understand the API requests, see the [Hackry API Docs][docs].

## Installation
Using npm:
```bash
$ npm install hackry
```

Using CDN:
```html
<script src="https://unpkg.com/hackry"></script>
```

## Usage

Instantiate a `Hackry` object with your hackathon id, located in the Home
section of the dashboard.
```js
const hackry = new Hackry('<hackathon-id>', {
  // Defaults to true. Set to false for server-side use.
  cache: false
});

// Get the attendee registration URL for your hackathon.
hackry.registrationURL();
```
All hackathon resources have a corresponding method for fetching. Some methods
will sort resources to guarantee ordering.

The `announcements` and `events` methods take an optional query params object
that allows you to format their date response properties according to a
[Moment.js format string](https://momentjs.com/docs/#/displaying/format/).

### Announcements
Sorted by `updatedAt` in ascending order.
```js
hackry.announcements(function(err, announcements) {

});

// Format updatedAt property with Moment.js format string.
hackry.announcements({
  timeZone: 'America/New_York',
  updatedAtFormat: 'dddd h:mm a'
}, function(err, announcements) {
  // Each announcement has updatedAtFormatted property.
});
```

### Day of Contacts
Not sorted.
```js
hackry.dayOfContacts(function(err, dayOfContacts) {

});
```

### Events
Sorted by `startDate` in ascending order.
```js
hackry.events(function(err, events) {

});

// Format startDate and/or endDate properties with Moment.js format strings.
hackry.events({
  timeZone: 'America/New_York',
  startDateFormat: 'dddd h:mm a',
  endDateFormat: 'h:mm a'
}, function(err, events) {
  // Each event now has startDateFormatted and endDateFormatted properties.
});
```

### FAQs
Sorted by `position` in ascending order
```js
hackry.faqs(function(err, faqs) {

});
```

## Troubleshooting

If no resources are returned by a method without an error occuring, make sure
you have at least one resource populated in your dashboard __with visibility
turned on__. As explained in the [documentation][docs], only objects with an
enabled visibility/availability will be delivered.

### Contact Us

Please send any questions or feature requests to <mailto:support@hackry.io>.

[docs]: https://hackry.io/docs
