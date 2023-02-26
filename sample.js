import * as IPFS from "ipfs-core";
import OrbitDB from "orbit-db";

async function createAndLoadFeed() {
  // Create an IPFS instance
  const ipfs = await IPFS.create();

  // Create an OrbitDB instance
  const orbitdb = await OrbitDB.createInstance(ipfs);

  // Create a feed database
  const feed = await orbitdb.feed("my-feed");

  // Load the database
  await feed.load();

  console.log("Feed database loaded:", feed);
}

createAndLoadFeed();
