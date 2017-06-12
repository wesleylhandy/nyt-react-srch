# NYTimes Article Search - React edition

I built this app using `create-react-app` together with an `Express` server. The `concurrently` package helped tremendously as recommended by [this excellent article](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/). 

Data is stored and served from a connection to MongoDB, via `Mongoose` and the app is hosted on Heroku.

### NPM Dependencies

* Time is formated via `moment`.
* New Article notifications are broadcast via `socket.io`
* Many Components are `react-bootstrap`.
* The Front End utilizes the `Fetch API`
* The main communication between front and back end is via `axios`.

#### Try opening multiple windows of the app to see the notification system at work -> https://nyt-srch.herokuapp.com/