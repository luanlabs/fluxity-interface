import { Server } from 'stellar-sdk';

const server = new Server('https://horizon-futurenet.stellar.org');

const account = await server.loadAccount(sourcePublicKey);
