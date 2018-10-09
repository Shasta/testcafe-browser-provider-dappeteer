# testcafe-browser-provider-dappeteer
Testcafe browser provider for decentraland/dappmeteer. E2E testing with Puppeteer and Metamask chrome extenstion, using Testcafé.

This is the [dappmeteer](https://github.com/decentraland/dappmeteer) chromium browser provider, with Metamask extension, for [TestCafe](http://devexpress.github.io/testcafe).


## Install

```
npm install --save-dev testcafe-browser-provider-dappmeteer
```

## Usage


When you run tests from the command line, use the provider name when specifying browsers:

```
For how to interact with the dappmeteer Metamask, check the Dappmeteer readme. 
testcafe dappmeteer 'path/to/test/file.js'
```


When you use API, pass the provider name to the `browsers()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('dappmeteer')
    .run();
```

## How to get the Metamask instance to tinteract at Testcafe tests

For a deep understand about the API of the mestamask instance check check the [Dappeteer docs](https://github.com/decentraland/dappmeteer).

You need to pass the testcafe instance as argument to the `getMetamask` function from this testcafe provider, and it will return a promise, once resolved you will have an object that allows you to interact with Metamask.

Example with localhost/private Ethereum blockchain and Testcafe:

```
import { Selector } from 'testcafe'; 
import { getMetamask } from 'testcafe-browser-provider-dappeteer';

const default_mmemo = 'stumble story behind hurt patient ball whisper art swift tongue ice alien';

fixture `Sign up page`
    .page `http://localhost:3000`
    .beforeEach(async t => {
      const metamask = await getMetamask(t);
      try {
        await metamask.lock()  // If user is not created, it will throw here, creating a new imported seed account
        console.log("Unlocking account...")
        await metamask.unlock();
      } catch (_error) {
        console.log("Creating an account...")
        // Import default mmemonic
        await metamask.importAccount(default_mmemo);
      }
      // Change network to private blockchain
      await metamask.switchNetwork('localhost 8545');
    });


test('Mint test tokens', async t => {
  const metamask = await getMetamaskInstance(t);
  const mintButton = await Selector('#mint');
  
  // Click to mint tokens
  await mintButton.click();

  // Click to confirm transaction at Metamask
  await metamask.confirmTransaction();
});
```
