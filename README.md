The project:
=============

The project allow using whatsapp bot where person send command to restart, reload, start, stop service linux in one machine that is running agent application the simple form.

The project flow:
=================
- Person interact whastapp bot, choose agent application running one machine, after choose one someone action: stop, start, restart and reload.
- After person informate data necessary whatsapp bot send data to pub/sub service
- Pub/Sub service notify agent application subscribed in topic
- In agent application check if message is for that agent, if yes, execution action, if no, ignore notification.

Instruction settings applications:
==================================
- Clone project

Instruction settings api application:
=====================================
- Access directory **api**
- Create **.env** file based in **.env.example** file
- Execute command: **npm i**
- Execute command: **docker-compose up -d** to created mongodb database.
- Execute command: **npm run start:dev** to start server.


Instruction settings agent application:
=======================================
- Access directory **agent**
- Create **.env** file based in **.env.example** file
- Execute command: **npm i**
- Execute command: **node ./src/index.js password_root name_agent** to start serve that maintain running application waiting receive data per service pub/sub.

Instruction settings boot application:
=======================================
- Access directory **bot**
- Create **.env** file based in **.env.example** file
- Execute command: **npm i**
- Execute command: **node ./src/index.js** to start whatsapp bot and use whatsapp to read qrcode, after read qrcode with success, bot listen interaction person.