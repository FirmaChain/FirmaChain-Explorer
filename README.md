# FirmaChain Blockchain Explorer

FirmaChain Explorer works with [firmachain](https://github.com/firmachain/firmachain).

## Installation

- Clone the FirmaChain Explorer repository and run.

  ```
  git clone https://github.com/firmachain/explorer.git
  cd explorer
  cd client && npm install
  cd ../server && npm install
  ```

## Start(Server)

FirmaChain Explorer Server uses Mysql as Backend Storage

Install & Configure Mysql

General : https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/

Mac : https://github.com/rajivkanaujia/alphaworks/wiki/Install-MySQL-using-Homebrew

Default database name is "explorer". You can change database name or host in `server/config/default.js`. Create this database with mysql command-line.

And then, You must configure ENVIRONMNET VARIABLES with your DB username & password

```
export EXPLORER_DB_USERNAME={username}
export EXPLORER_DB_PASSWORD={password}
```

Then,
`cd server && npm run syncdb && npm start`

## Configuration(Server)

The `server/config/default.js` file contains configuration settings for FirmaChain Explorer Server.

#### Blockchain endpoint

To connect with custom FirmaChain blockchain, blockchain.url should be set.
```
// you can set this endpoint to your blockchain.
const endpoint = 'localhost';
```

## Start(Client)

FirmaChain Explorer Client is using Webpack.

If you want to watch all the changes of the code in real time, run the following command. It will run the FirmaChain Explorer on the port 3000(<http://localhost:3000>).

`yarn start`

To generate the minified files, run the following command.

`yarn build`


## License
```
Copyright 2018 MediBloc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
