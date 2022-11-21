# Hand-me: A Secondhand Bookstore Project

A progressive web application to help people sell and buy used/read books.
This project was developed as a Final Project for the Upleveled BootCamp.

## Tech Stack

- Next.js
- JS / TypeScript / React
- PWA
- REST API
- PostgreSQL
- Ley for migrations
- Emotion
- Jest for unit testing
- Playwrright for E2E testing
- Cloudinary for images upload
- Ably for the chat feature

## Features

- Authentication: registration and login secured with CSRF token
- Logout
- Add books for sale with some fields being required
   - Add book title and author
   - Add a book cover image and preview it
   - Add multiples genres
   - Add book language
   - Add book publishing date
   - Add a synopsis and/or some text about the book
   - Add the current condition status of the book
   - Add sold/reserved option
   - Add shipping costs included 
- Search: by genre, language and recently released (books that were published in the last 18 months). Sort by price and time added to the site.
   - The search is performed in one call and performed all at once on the database side. 
- Chat: interaction between sellers and buyers is possible in order to agree on the details to finalize the order.
   - An Inbox page where the user can see their conversations split by role: as the buyer or as the seller.
- The user can change/update/delete the book he/she added for sale.
- The user can change/update their profile picture, email and username.
- The user can delete their profile.
- The user can easily access all the books they have for sale on their profile

## Screenshots

#### Home Page
![App Homepage](https://raw.githubusercontent.com/N2late/secondhand-bookstore/main/public/Hand-me_%20secondhand%20bookstore.png)

#### Search
![App Search](https://raw.githubusercontent.com/N2late/secondhand-bookstore/main/public/Buy_book.png)

#### Book details page
![Book details](https://raw.githubusercontent.com/N2late/secondhand-bookstore/main/public/for_sell.png)

#### Chat
![Chat](https://raw.githubusercontent.com/N2late/secondhand-bookstore/main/public/Inbox_%20conversation.png)

#### Profile
![Profile](https://raw.githubusercontent.com/N2late/secondhand-bookstore/main/public/Profile.png)

## Desgin Mockups in Figma
![Figma](https://raw.githubusercontent.com/N2late/secondhand-bookstore/main/public/figma_ss_smaller.png)

## Database Schema in DrawSQL
![Database schema](https://raw.githubusercontent.com/N2late/secondhand-bookstore/main/public/db_schema_small.png)


## Setup instructions

Clone the repository and install all dependencies

```bash
git clone https://github.com/N2late/secondhand-bookstore.git
cd secondhand-bookstore
yarn
```

## Setup the database by downloading and installing PostgreSQL

- Create a user and a database
- Create a .env file. Check .env.example file to see what info should be provided
- Copy the environment variables from .env-example into .env
- Replace the placeholders xxxxx with your username, password and name of the database
- Install dotenv-cli with yarn add dotenv-cli
- Run the migrations with yarn migrate up
- Start the server by running yarn dev

## API Keys Dependencies

- A cloudinary account for images upload. Add your cloudinary name to the env file.
- A Ably account for the chat application. Add your Ably key to the env file.








