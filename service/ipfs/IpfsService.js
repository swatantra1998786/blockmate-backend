import { create } from "ipfs-core";
import * as IPFS from "ipfs-core";
import { BehaviorSubject } from "rxjs";

class IpfsService {
  constructor() {
    const config = {
      repo: "./ipfs",
      start: true,
      preload: {
        enabled: false,
      },
      EXPERIMENTAL: {
        ipnsPubsub: true,
      },
      config: {
        Addresses: {
          Swarm: [
            "/ip4/0.0.0.0/tcp/4002",
            "/ip4/127.0.0.1/tcp/4003/ws",
            "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
          ],
        },
      },
    };

    // nilesh configs
    // const config = {
    //   repo: "./ipfs",
    //   start: true,
    //   preload: {
    //     enabled: false,
    //   },
    //   EXPERIMENTAL: {
    //     ipnsPubsub: true,
    //   },
    //   config: {
    //     Addresses: {
    //       Swarm: [
    //         "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
    //       ],
    //     },
    //   },
    // };

    // this._createIPFSNodePromise = create(config);
    this._ipfsSource = new BehaviorSubject(null);
  }

  LocalIPFS() {
    const getter = async () => {
      let node = this._ipfsSource.getValue();

      if (node == null) {
        console.log("Waiting for node creation...");

        // Create an IPFS instance
        node = await IPFS.create();
        this._ipfsSource.next(node);
      }

      return node;
    };

    return getter();
  }

  async getLocalNode() {
    return await this.LocalIPFS();
  }
}

// const myIpfs = new IpfsService();
// myIpfs.getLocalNode();

export default IpfsService;
