Usually for chat apps you would use something like sockets for preserved connections, but I simply decided to use the react-query package to automatically refetch data on the client, so it wasn't that big of a deal.

## Features:

 - Create rooms
 - Invite friends
 - Chat together

## Tech stack:

 - Website: React | react-query (data-fetcher) | material-ui (component library)
 - Backend: NodeJS | Graphql | MySQL | Redis (session store) | Docker
