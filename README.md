# wacm_ss18
- Home page / Frontend: ``https://localhost:8443``
- Server api starts on ``https://localhost:8443/api``
- Travis CI: `https://travis-ci.org/tu1426/wacm_ss18`
- Repository: `https://github.com/tu1426/wacm_ss18/`
- Docker Image: `https://hub.docker.com/r/tu1426/waecm-2018-group-13-bsp-3-web`

## !!Attention!!
- we were only 3 guys who implemented this exercise, Stefan Puhalo did not participate anymore
- Report is done in file ``/WACM_GROUP13_Report_UE3.pdf``
- Api documentation available when opening ``/docs/html/index.html`` in a browser
- A research facility can be registered via the frontend ui, but has to be enabled in the database before login (set isEnabled flag to true), but two of them are already saved (local mounted directory) with logins:
    - email: ``one@rf.com`` passwd: ``oneoneone``
    - email: ``two@rf.com`` passwd: ``twotwotwo``
- !! Testdata of research facilities is only provided with the zip file, not in the container directly!

## Start webapp with uploaded images:
`docker-compose up`

Maybe you have to call `docker-compose build` beforehand.

sha256 hash: 
`61f06d233b17c56589fc13409ef21b0788864513502f0ea224e95fae6e816b08`

but its updating on every push to master!

## Start webapp with local build
`npm start_local` oder `docker-compose -f docker-compose-local.yml up --build`.

To stop docker-compose started with `npm start_local` use or `npm run stop_local`.

## Development environment
Start local MongoDB instance localhost:27017 and run `npm run nodemon-dev-server` to start the server and watch backend files and run `npm run build-watch` to watch the frontend files while developing.
- Attention: DB creates a folder /data/db in directory of docker-compose file called to save states between container restarts!

## Test
Starting tests locally
- Run `npm run start_environment` to start the database
- Run `npm run dev-test-server-local`

#### All tests
- Run all tests with `npm test-local`

#### Backend Unit
- Run `npm run backend-test-local`

#### E2E
- Run `npm run e2e-test`

## Technology stack
For this exercise we chose MondoDB for database purposes, Node.js for backend development and Vue.js for frontend development.

## Remarks
- it is still possible to login with email: user and password: password for admin user, this could be easily disabled though
- the counter from UE1 is still shown as home page
- image upload is not working at all, though you can select an image
- its not possible to use transactions with MongoDB yet, therefore we didn't use them at all.