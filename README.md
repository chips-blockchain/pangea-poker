<img src="https://norbert.dev/chips_poker@2x.jpg" srcset="https://norbert.dev/chips_poker@.jpg 1x https://norbert.dev/chips_poker@.jpg 2x"">

# Lightning Chips Frontend

This is a redesign of [Pangea Poker Frontend](https://github.com/sg777/pangea-poker-frontend). Built with React, currently in WIP.

## Run the project

`npm install` and `npm start` for the front-end.

You will need to run your own back-end nodes. [Here](https://github.com/NOCTLJRNE/CHIPS-tuto/blob/master/README.md) is a detailed guide on how to do it.

Once you've set up the back-end nodes, change the IP addresses in `Game.jsx` to connect to all four nodes.

## To Dos

- [ ] Add holeCards logic
- [ ] Add boardCards logic
- [ ] Fix `pangea.game.pot` and `pangea.gui.updatePotAmount()`
- [ ] Link UI controls via `processControls`
- [ ] Add Chip Animations
- [ ] Add Chat
