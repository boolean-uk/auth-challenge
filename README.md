# Authentication Challenge

## Learning Objectives

- Use a token-based approach to authorise access to API resources
- Use a hashing library to encrypt sensitive information
- Build a front-end application that interacts with a bearer-auth protected API

## Introduction

You are tasked with building a small frontend application containing 3 forms and a list. There is a screenshot at the
bottom of this document that gives you an idea of what to aim for. As you'll be able to see, it doesn't have to *look*
good so don't spend time on styling!

The flow of the application you build looks like this:

1. A user fills in the register form to create their account with a hashed password
2. The user fills in the login form to get a bearer token
3. The user can then create movies once they have a valid token
4. The list of displayed movies will update as a user creates them

## Requirements

1. Both your backend _and_ your frontend must exist in this repo. We should be able to run them both together with a single command.
2. Must use React, Express and an SQL database. Everything else is fair game.
3. Good luck, have fun!

## Extension

1. Create an admin dashboard where admins can view and delete users.
2. Introduce a second type of auth. It should be a second option to the user, not a replacement for the original.

## Example solution

![](./assets/example_solution.png)
