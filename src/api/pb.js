import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_PB);

pb.autoCancellation = true;

export default pb;
