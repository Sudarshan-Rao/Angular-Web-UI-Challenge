### Code Review Summary - Improvement Suggestions

-Introduced observable with async pipe usage.
-Replaced custom formatDate function with the date pipe.
-Added alt text and aria-labels to buttons for improved accessibility.
-Used http params to pass in the search query.
-Improved type safety.
-Fixed all linting errors, testings errors, and warnings.

Developer Notes:
-The google api is rate limiting the requests. Unable to run tests due to this. May have to mock the api call.