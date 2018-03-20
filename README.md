# wacm_ss18

## Start webapp with uploaded images:
`docker-compose up`

sha256 hash: 
`e3bc8380e796e87a3ddf770256f32e94d2d2002bf7063e95bdef12e09305fb7d`

## Start webapp with local build
`./start.sh` oder `npm start` oder `docker-compose -f docker-compose-local.yml up --build`

## Development environment
Start local MongoDB instance localhost:27017, go to /webapp directory and run `npm run nodemon-dev-server` to start the server and watch backend files and run `npm run build-watch` to watch the frontend files while developing