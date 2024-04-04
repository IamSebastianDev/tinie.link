<!-- @format -->

# tinie.link

Tinie.link is a modern, performant link shortening application built for scale and performance.

## Overview

Tinie utilizes the following technologies and services:

-   [Bun](https://bun.sh) as main TypeScript runtime
-   [ElysiaJS](https://elysiajs.com) as bun compatible, fast http framework
-   [AWS DynamoDB](https://aws.amazon.com/dynamodb/) as primary row storage
-   [Redis](https://redis.io) as cache layer
-   [Cloudflare Workers](https://developers.cloudflare.com/workers/) as Range distributor
-   [Cloudflare D1](https://developers.cloudflare.com/d1/) to store used ranges
-   [TurboRepo](https://turbo.build/repo) as mono-repository orchestrator
-   [Docker](https://www.docker.com) for local development setups
-   [Render](https://render.com) to host the web server container

## Local Development

To develop or test Tinie locally, follow this guide:

-   **Install workspace dependencies:** Install [Bun](https://bun.sh) & [Docker](https://www.docker.com).
-   **Clone the repository:** Run `git clone https://github.com/IamSebastianDev/tinie.link.git` to clone the repository.
-   **Install package dependencies:** Run `bun install` to install dependencies.
-   **Add the environment file:** Create a `.env.local` file in the workspace root and set the environment variables as shown in the `.env.example` file.
-   **Start the cloudflare workers:** Run `bun run start:worker` to start the worker. You might need to log in to your `Cloudflare` account.
-   **Start the Databases:** Run `bun db:up` & `bun db:migrate:local` to initialize the databases.
-   **Start the Server:** Run `bun run start:server` to start the web server.
-   **Connect to the Server:** You can use a tool like [Postman](https://www.postman.com) to test the API

## Architecture

You can find the architecture diagram as well as the design document here: [Excalidraw](https://link.excalidraw.com/readonly/gv2xKA07ek8SjrICZ3bo).
