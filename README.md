# Hola! kcs

This is the tastyle website in production.
This is created with the help of `create-fullstack-react-app`

We have modified it and made some changes to make it easier for organising and stuff.

We have utilised **yarn** with version _berry_ here.
In case it gave some hard time to you due to it's pnp feature, change the nodeLinker attribute value to node-modules.

## Frontend instructions

This frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Please refer to the source for more information.

Start development client:

```
yarn start-client
```

Run client tests:

```
yarn test-client
```

Build client for production:

```
yarn build-client
```

## Backend instructions

This backend uses MongoDB, make sure you have it installed in your system.

Install MongoDB and start your server: [MongoDB instructions](https://docs.mongodb.com/manual/administration/install-community/)

Seed database with sample data if you want:

```
yarn seed
```

Start development server:

```
yarn start-server
```

Run server tests:

```
yarn test-server
```

Build server for production:

```
yarn build-server
```

Start server in production environment:

```
yarn serve
```
