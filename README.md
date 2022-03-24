# DevChat
💬 A full chat application built with NestJS and React

## Structure
This project will have three main applications, a server built with NodeJS, a web application built with React and a mobile app built with React Native, that will be in each of the folders in this project.

- _server_: the server web api with the socket server
- _web_: the web application for chatting in browser
- _mobile_: the mobile application for Android and IOS smartphones 
- _env_: the dockers used to support the main applications

## Description
**Tier**: 3-Advanced

Real-time chat interface where multiple users can interact with each other by sending messages.

As a MVP(Minimum Viable Product) you can focus on building the Chat interface. Real-time functionality can be added later (the bonus features).

## User Stories
Instead of the way described in the app idea, I chose to make the user authenticate with its GitHub account
-   [ ] User can authenticate using a GitHub account, GitHub username will be stored in the application
-   [ ] User can see an `input field` where he can type a new message
-   [ ] By pressing the `enter` key or by clicking on the `send` button the text will be displayed in the `chat box` alongside his username (e.g. `John Doe: Hello World!`)

## Bonus features

-   [ ] The messages will be visible to all the Users that are in the chat app (using WebSockets)
-   [ ] When a new User joins the chat, a message is displayed to all the existing Users
-   [ ] Messages are saved in a database
-   [ ] User can send images, videos and links which will be displayed properly
-   [ ] User can select and send an emoji
-   [ ] Users can chat in private
-   [ ] Users can join `channels` on specific topics
