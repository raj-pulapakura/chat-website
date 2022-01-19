Usually for chat apps you would something like sockets for preserved connections, but I simply decided to use the react-query package to automatically refetch data on the client, so it wasn't that big of a deal.

## Features:

 - Create rooms
 - Invite friends
 - Chat together

To join a room that someone else has created, the creator has to invite you, or you can join by yourself if you know the room ID.

## Tech stack:

 - Website: React | react-query (data-fetcher) | material-ui (component library)
 - Backend: NodeJS | Graphql | MySQL | Redis (session store) | Docker
