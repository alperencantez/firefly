# Firefly: An Old-School Social Media for the web

### 🧬 STILL UNDER DEVELOPMENT 🧬

<br>

# Server
## _Tech Stack_: TypeScript - Node - Express.js - MongoDB
## 🔒 Auth/User

> -   [x] Sign In
>
> -   [x] Sign Up
>
> -   [x] Sign Out

## 🤖 Byte (Posts on Firefly are called Bytes)

> -   [x] Creating a Byte
>
> -   [x] Creating a byte with a media
>
> -   [x] Receive comments under a Byte which are also considered Bytes
>
> -   [ ] Updating a Byte, but after updating a post we need to add a notifier badge for users to know about it
>
> -   [ ] Deleting a Byte

##

# Client
## _Tech Stack_: JavaScript - TailwindCSS - Vue.js
## Route: `/`
- Entrypoint of the app. An informative page for anonymous/unauthorized users. 
- 
## Route: `/auth/login` (Protected)
- User login is handled here.

## Route: `/auth/signup` (Protected)
- New user registrations can be made in this route.

## Route: `/timeline` (Protected)
- Dashboard page of the social media app, users will see latest Bytes from their followings here.