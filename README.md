# Overview

Chatbot

## Quick start guide (develop)

1. `npm install` (`yarn`)
2. `npm run dev` (`yarn dev`)
3. Open a browser and go to <http://localhost:4200>
4. Envs can be chaned by coping .env.default to .env

## Production

Warning: settings in this project should not be used in production. This is just a showcase that it can be started with pm2. Safty measures are deactivated which should never be the case in production!

1. install pm2 (global: `npm i -g pm2` or `yarn global add pm2`
2. `npm run build` (`yarn build`)
3. `npm run start` (`yarn start`)
