# My Wave Portal 👋

This is my first blockchain app, u can send a message for me and when the transaction is processed ur message it'll be shown on the site!! All this system is powered by blockchain, besides that u have 50/50 chances to win 0.001 ETH!!

<img width="1433" alt="Screen Shot 2021-12-24 at 13 17 32" src="https://user-images.githubusercontent.com/57234795/147364220-2623bf62-dfe3-4d3e-8cc6-21c6b84b730f.png">


> 50/50 win 0.001??? u crazy man

We're using a test network that's called rinkeby, the money is fake :p 


## How to run
 - Create a .env file
 - Create an account on [Alchemy](https://www.alchemy.com/) it'll handle our deploy process, after that u need to create a new app and select the `rinkeby network`. after that, get your API link and create a new env variable called `ALCHEMY_API_URL`. It'll be used on [hardhat.config](https://github.com/NicolasLopes7/my-wave-portal/blob/master/hardhat.config.js#L24).
 - Get your private key on metamask (pay attention on this step, u can be hacked if you share this with someone). You just need to click on `Three Dots -> Account Details -> Export Private Key`. After get your private key, set a new env variable called `PRIVATE_RINKEBY_ACCOUNT_KEY`.

To execute the contract stuff, certifies that you're on the root folder and u can run these commands:
```shell
yarn test
yarn deploy:rinkeby
```

To run the frontend stuff, go into the frontend folder, install the dependencies and run `yarn start`.
