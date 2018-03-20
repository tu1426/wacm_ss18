# wacm_ss18

## Start webapp with uploaded images:
`docker-compose up`

Maybe you have to call `docker-compose build` beforehand.

sha256 hash: 
`e3bc8380e796e87a3ddf770256f32e94d2d2002bf7063e95bdef12e09305fb7d`

## Start webapp with local build
`./start.sh` oder `npm start` oder `docker-compose -f docker-compose-local.yml up --build`.

To stop docker-compose started with `./start.sh` or `npm start` use `./stop.sh` or `npm run stop`.

## Development environment
Start local MongoDB instance localhost:27017, go to /webapp directory and run `npm run nodemon-dev-server` to start the server and watch backend files and run `npm run build-watch` to watch the frontend files while developing.

## Technology stack
For this exercise we chose MondoDB for database purposes, Node.js for backend development and Vue.js for frontend development.