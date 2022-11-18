# Hand-me: A Secondhand Bookstore Project

A progressive web application to help people sell and buy used/read books.
This project was developed as a Final Project for the Upleveled BootCamp.

## Tech Stack

- Next.js
-TypeScript
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

![App Homepage](https://www.awesomescreenshot.com/image/34522879?key=9f05ba0c222f5675cdc2a06e4e215e26)

![App Search](https://www.awesomescreenshot.com/image/34522923?key=287deacd568b44ea93c7d7c34a33a7d4)











