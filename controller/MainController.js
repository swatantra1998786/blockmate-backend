import IpfsService from "../service/ipfs/IpfsService.js";
import OrbitdbService from "../service/orbit-db/OrbitdbService.js";

class MainController {
  constructor() {
    this.title = "orbit-chat";
    this.uri = "";
    this.status = "Initializing IPFS...";

    this.ipfsService = new IpfsService();
    this.orbitDbService = new OrbitdbService();
  }

  async initialize() {
    try {
      // Create an IPFS instance
      let IPFS = await this.ipfsService.LocalIPFS();
      this.status = "Initializing OrbitDB...";

      // Create an OrbitDB instance
      await this.orbitDbService.loadLocalInstance(IPFS);
      this.status = "Creating OrbitDB database...";

      // Create a feed database
      this.uri = await this.orbitDbService.createDatabase();
      this.status = "Connected!";
      console.log("status = ", this.status);
      await this.orbitDbService.sendMessage("hi there");
      await this.orbitDbService.updateMessages();
    } catch (error) {
      this.status = "Opps something went wrong!!!";
    }
  }

  async connectButtonClick() {
    this.status = "Connecting to OrbitDB database...";

    await this.orbitDbService.connectToDatabase(this.uri);
    this.status = "Connected!";
  }

  messageInputEnterKeydown(event) {
    const inputValue = event.target.value;
    event.target.value = "";

    this.orbitDbService.sendMessage(inputValue);
  }
}

const mainController = new MainController();
mainController.initialize();
