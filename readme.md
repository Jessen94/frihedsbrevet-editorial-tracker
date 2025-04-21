# Frihedsbrevet editorial tracker 
This is my version of a basic editorial tracker. 

## Backend 

For the backend app I have used nestjs for the api framework and the prisma as an ORM on top of a postgres db. To setup the app follow these steps:
#### Setup
- `docker compose up -d`
- `npm install`
- `npx prisma migrate reset`
- `npm run seed`

The database has now being initialize with 2 users, and a task each.
The users are:
Editor:      `editor@test.com`,      Password: `test`
Contributor: `contributor@test.com`, Password: `test`

#### Start
To start the app:
- `npm run start`

It is now running on `http://localhost:3001`


## Frontend
The frontend is a nextjs app using heroui for the components. To start run `nom run dev`. THe is no env file for this app, as a future improvement the api url should be moved to an .env-file instead of having it hardcoded in the code. 

## Authentication
For the sake of this case I have mocked the authentication process. In a production I would use a third party service such as [Auth0](https://auth0.com/).

# TODO - Backend
- [x] Setup backend (Nestjs and prisma) 
- [x] github repo
- [x] Basic routes
    - [x] Login route
    - [x] Fetch all
    - [x] Create one
    - [x] Update Status
    - [x] Display content according to role (All for editors, userbased for contributors)
- [ ] Unit tests

# TODO - Frontend
- [x] Setup frontend (HeroUI)
- [x] Github repo
- [x] Login in screen 
    - [x] Keep login in status in context
    - [x] Use modals for creating and editing 
    - [x] One page which either shows login or dashboard
- [ ] Improve error handling 