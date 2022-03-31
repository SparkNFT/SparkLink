# How to Preview

Follow the steps below to preview the frontend.

## Setup server

+ Open the `config.json` file, replace the following fields:
    + `chain.rinkeby.block_height` with the current block height of rinkeby;
    + `chain.rinkeby.rpc_url` with your RPC url (if need);
    + `pinata` with your pinata key pair;
+ Run `docker-compose -f docker-compose.preview.yml up postgres`;
+ Open a new terminal, Run `docker-compose -f docker-compose.preview.yml up server`.

## Setup frontend

+ Open a new terminal, Run the following command:

```shell
DOCKER_BUILDKIT=1 docker-compose -f docker-compose.preview.yml up --build frontend
```

## Preview it

+ Open your browser, go to `http://localhost:3002`.