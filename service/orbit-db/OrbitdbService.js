import OrbitDB from "orbit-db";

class OrbitdbService {
  constructor() {
    this.messages = [];
    this._localInstance = null;
    this._database = null;
  }

  async loadLocalInstance(IPFS) {
    this._localInstance = await OrbitDB.createInstance(IPFS);
  }

  async createDatabase() {
    const peerId = await this._localInstance.identity.id;
    this._database = await this._localInstance.feed(
      // "my-feed"
      `orbitchat.messages.${peerId}`,
      {
        accessController: {
          write: ["*"],
        },
        localOnly: false,
        overwrite: true,
        replicate: true,
      }
    );

    this._database.events.on("replicated", () => {
      this.updateMessages();
    });

    this._database.events.on("ready", () => {
      this.updateMessages();
    });

    this._database.events.on("write", (address, entry, heads) => {
      this.updateMessages();
    });

    // Load the database
    await this._database.load();

    const address = await this._database.id;
    return address;
  }

  static async connectToDatabase(address) {
    await this._database.close();
    this._database = await this._localInstance.open(address);

    this._database.events.on("replicated", () => {
      this.updateMessages();
    });

    this._database.events.on("ready", () => {
      this.updateMessages();
    });

    this._database.events.on("write", (address, entry, heads) => {
      this.updateMessages();
    });

    await this._database.load();
  }

  updateMessages() {
    const items = this._database
      .iterator({ limit: -1 })
      .collect()
      .map((e) => e.payload.value);
    let i = 0;
    items.forEach((e) => {
      if (i < this.messages.length) {
        this.messages[i] = e;
      } else {
        this.messages.push(e);
      }

      i++;
    });
    console.log("item = ", items);
  }

  async sendMessage(message) {
    console.log("message from sendMessgae", message);
    if (this._database) {
      await this._database.add(message);
    }
  }
}

export default OrbitdbService;
