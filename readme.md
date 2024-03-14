<!-- @format -->

# tinie.xyz

Tinie is a link shortener application implemented using microservice architecture. (Or rather, will be soon.)

Right now, a prototype has been implemented to test the proposed application flow (minus caching).

To test, clone or fork the repository, install dependencies using `npm install` or `yarn install` and use the `dev` or `start` commands to run the application.

The API will be exposed on `Port 3000` and can be queries with tools like postman or the like.

## Proposed Application Structure

You can find the design document here: [https://link.excalidraw.com/l/14LI4WlZ7MK/2uSbEGRRy3G](https://link.excalidraw.com/l/14LI4WlZ7MK/2uSbEGRRy3G)

The proposed stack is:

-   Server implemented in node.js with Fastify
-   Zookeeper as cloudflare worker
-   DynamoDb on AWS as main storage
-   cloudflare D1 as row storage for the Zookeeper
-   Server hosted on render to utilize automatic load balancing
-   Redis as Caching solution
