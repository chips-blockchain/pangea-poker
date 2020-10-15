![Screenshot of Lightining CHIPS Poker](https://norbert.dev/chips_poker@2x.jpg)

# Pangea Poker

:warning: **Keep in mind that the game is in alpha stage. There is a risk of loosing funds.**

Play decentralized poker via the CHIPS blockchain.

We hope to release a publicly playable version in April. You can find the latest releases [here](https://github.com/chips-blockchain/pangea-poker/releases).

Currently, to play, you will need to run your own back-end nodes. We are working on a Docker container to make this easy, which is expected to ship in April. [Here](https://github.com/NOCTLJRNE/CHIPS-tuto/blob/master/README.md) you can find the old, complicated way of setting up the back-end nodes.

## Development

Server runs at port 1234 - http://localhost:1234

- `npm install && npm run dev` - start with `NODE_ENV=development`

- `npm run electron-dev` to start the Electron app in development.

- `npm electron-pack` to package the app with electron-builder for MacOS, Windows and Linux.

### Debugging

browser plugin [React Context Dev Tools](https://github.com/deeppatel234/react-context-devtool)

### Sockets

When the player enters the game he opens two socket connections:

 - for writing `playerWrite`

 - for reading `playerRead`

### State Management

https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/

Good video explaining redux vs context state management approach
https://www.youtube.com/watch?time_continue=134&v=eBYJ7O482Dc&feature=emb_title

### Environment variables in scripts

REDUCER - adds extra logging from reducer to the console output.

## Contributing

Please reach out to us via [Discord](https://discord.gg/NGPu4g) and check out the open [Issues](https://github.com/chips-blockchain/pangea-poker/issues).

## Related links

- [Backend repo](https://github.com/chips-blockchain/bet)
- [Old back-end setup guide](https://github.com/NOCTLJRNE/CHIPS-tuto/blob/master/README.md)
