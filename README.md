# Hackry JavaScript Library

The Hackry JavaScript library wraps the [Hackry](https://hackry.io) REST API
for client-side use. No secrets or other credentials are ever exchanged using
this library since all API endpoints interfaced are public.

## Documentation

To better understand the contents each response, see the
[Hackry API Docs](https://hackry.io/docs).

## Installation

Add the script tag:
```html
<script src="https://unpkg.com/hackry@latest/hackry.min.js"></script>
```

Although this library is built for client-side use, it may be used server-side
with `npm`:
```
npm install hackry
```

## Usage

Instantiate a `Hackry` object with your hackathon id, located in the Home
section of the dashboard.
```js
const hackry = new Hackry('<hackathon-id>', {
  cache: false // Defaults to true. Set to false for server-side use.
});
```

All hackathon resources have a corresponding method for fetching. Some methods
will sort resources to guarantee ordering. Many resources contain dates and we
recommend using [Moment.js](http://momentjs.com) for displaying and manipulating
dates.

```js
// Announcements - sorted by `updatedAt` in ascending order
hackry.announcements(function(announcements) {

});

// Day of Contacts - not sorted
hackry.dayOfContacts(function(dayOfContacts) {

});

// Events - sorted by `startDate` in ascending order
hackry.events(function(events) {

});


// FAQs - sorted by `position` in ascending order
hackry.faqs(function(faqs) {

});
```

## Client-Side Example

Let's create a simple webpage that will display your Hackathon's frequently
asked questions. Start by pulling down some data. Make sure to replace
`<hackathon-id>` with your hackathon id.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Hackathon</title>
    <script src="https://unpkg.com/hackry@latest/hackry.min.js"></script>
  </head>
  <body>
    <script>
      const hackry = new Hackry('<hackathon-id>');

      hackry.faqs(function(faqs) {
        // We have data!
      });
    </script>
  </body>
</html>
```

Now that we have our frequently asked questions as `JSON`, let's display them on our
webpage in a nested list.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Hackathon</title>
    <script src="https://unpkg.com/hackry@latest/hackry.min.js"></script>
  </head>
  <body>
    <script>
      const hackry = new Hackry('<hackathon-id>');

      hackry.faqs(function(faqs) {
        const faqsElement = document.getElementById('faqs');

        faqs.forEach(function(faq) {
          // Create a nested list of questions and answers
          const question = document.createElement('li');
          question.appendChild(document.createTextNode(faq.question));

          const nestedAnswer = document.createElement('ul');
          const answer = document.createElement('ul');
          answer.appendChild(document.createTextNode(faq.answer));
          nestedAnswer.appendChild(answer);

          question.appendChild(answer)
          faqsElement.appendChild(question);
        });
      });
    </script>
    <h3>Frequently Asked Questions</h3>
    <ul id="faqs"></ul>
  </body>
</html>
```

### Troubleshooting

If the example above is not working, make sure you have at least one FAQ
populated in your dashboard __with visibility turned on__. As explained in the
[documentation](https://hackry.io/docs), only objects with an enabled
visibility/availability will be delivered. Finally, check the web console for
any errors that may have been logged by the library.

## Contact Us

Please send any questions or feature requests to <mailto:support@hackry.io>.
