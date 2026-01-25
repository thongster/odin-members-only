# Anime Internet Club

_A Members-Only Message Board_

Live Demo: https://animeinternetclub.up.railway.app/

## Overview

**Anime Internet Club** is a full-stack web application built as part of _The Odin Project_ It’s a small, Anime fan club members-only message board with an intentionally old-internet / early forum feel.

The main purpose of this project was to practice **authentication and authorization** in a real application — not just logging users in, but controlling what different users are allowed to see and do.

---

## Project Goals

The focus of this project was to understand and implement:

- User authentication (sign up, log in, sessions)
- Authorization and permissions
- Role-based access control (visitor, user, member, admin)
- Secure password handling
- Server-side enforcement of permissions

In short: **who can see what, and who can do what** — and making sure those rules can’t be bypassed.

---

## User Roles & Permissions

The app supports four user states:

### Visitor

- Can view messages
- Cannot see authors or timestamps

### User (logged in)

- Can create messages
- Still cannot see authors or timestamps

### Member

- Can see message authors and dates

### Admin

- All member permissions
- Can delete messages

Admins are always members by design. There is no case where a user can be an admin without also being a member.

---

## Authentication & Security

- User sign-up with validation and sanitization
- Passwords hashed using **bcrypt**
- Authentication handled with **Passport.js (Local Strategy)**
- Sessions managed using **express-session**
- User authentication state available globally to views
- Authorization enforced at the server level, not just the UI

Passwords are never stored in plain text — only hashed values are saved in the database.

---

## Database Design

The app uses PostgreSQL with two main tables:

### Users

- Email (unique)
- Hashed password
- First and last name
- Member and admin flags
- Created timestamp

### Messages

- Title and body
- Author reference (foreign key to users)
- Created timestamp

Messages are automatically deleted if their author is removed.

---

## Tech Stack

### Backend

- Node.js
- Express
- PostgreSQL
- Passport.js
- express-session
- bcrypt
- express-validator

### Frontend

- EJS
- Vanilla CSS
- Minimal client-side JavaScript

### Deployment

- Render (Web Service + PostgreSQL)

---

## Design Direction

The UI is intentionally simple and slightly nostalgic, inspired by older internet forums rather than modern web apps. This was a deliberate choice to keep the focus on backend logic, permissions, and correctness rather than UI frameworks.

---

## Challenges & Takeaways

Some of the main challenges in this project were:

- Separating authentication from authorization
- Structuring controllers, middleware, and routes cleanly
- Preventing unauthorized actions at the server level
- Managing session behavior in development vs production
- Keeping EJS templates readable as role-based conditionals grew
