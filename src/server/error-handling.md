# API errors, by endpoint

## POST/register

400 missing input
409 username already in use

## POST/login

400 missing input
401 incorrect username/password

## POST/movie

400 missing input
401 user not signed in
403 access denied
409 movie title already in use

### catch-all

500 oops, something went wrong