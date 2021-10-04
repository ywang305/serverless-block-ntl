enum BlockName {
  btc = "btc",
  doge = "doge",
  dot = "dot",
}

interface Link {
  link: string;
}

export class BLOCK_IO_LINK implements Link {
  link: string;
  constructor(
    public coinname: BlockName,
    public chainnet: "mainnet" | "testnet"
  ) {
    this.link = `https://${coinname}.getblock.io/${chainnet}`;
  }
}

export 