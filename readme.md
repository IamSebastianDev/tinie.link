<!-- @format -->

# tinie.xyz

Tinie is a link shortening application implemented using microservice architecture.

## Proposed Application Structure

You can find the design document here: [https://link.excalidraw.com/l/14LI4WlZ7MK/2uSbEGRRy3G](https://link.excalidraw.com/l/14LI4WlZ7MK/2uSbEGRRy3G)

The proposed stack is:

-   Server implemented in bun.sh with elysia as http framework
-   Zookeeper as cloudflare worker
-   DynamoDb on AWS as main storage
-   cloudflare D1 as row storage for the Zookeeper
-   Server hosted on render to utilize automatic load balancing
-   Redis as Caching solution
