This is an example of how to 0xcertAPI asset approval.

The example is wrapped in a simple dApp to showcase not only functionalities but also the basic principles of handling blockchain communication through 0xcertAPI. Main logic is isolated in `src/example.ts` while response handling is located in `index.ts`.

The `src/config.ts` file also contains and empty variable that you need to set for the example to work. It is `assetLedgerId` which you get through the deployment example and `operator` which you can set as you secondary MetaMask account.

Project stucture:

| Path           | Description                                   |
| -------------- | --------------------------------------------- |
| src/example.ts | Main logic showing the use.                   |
| src/config.ts  | Configuration file.                           |
| index.html     | Front end styling.                            |
| index.ts       | Controller connecting front end to the logic. |
| package.json   | Dependencies.                                 |
