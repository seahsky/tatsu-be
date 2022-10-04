export interface MagicEdenCollectionStats {
  symbol: string;
  floorPrice: number;
  listedCount: number;
  volumeAll: number;
}

export interface MagicEdenCollection {
  pdaAddress: string;
  auctionHouse: string;
  tokenAddress: string;
  tokenMint: string;
  seller: string;
  tokenSize: number;
  price: number;
  rarity: {
    moonrank: MagicEdenCollectionRarityMoonRank;
    merarity: MagicEdenCollectionRarityME;
  };
  extra: {
    img: string;
  };
  expiry: number;
}

export interface MagicEdenCollectionRarityBase {
  rank: number;
}

export interface MagicEdenCollectionRarityMoonRank
  extends MagicEdenCollectionRarityBase {
  absolute_rarity: number;
  crawl: {
    id: string;
    created: Date;
    updated: Date;
    first_mint_ts: number;
    last_mint_ts: number;
    first_mint: string;
    last_mint: string;
    expected_pieces: number;
    seen_pieces: number;
    last_crawl_id: number;
    complete: boolean;
    blocked: boolean;
    unblock_at_ts: number;
  };
}

export interface MagicEdenCollectionRarityME
  extends MagicEdenCollectionRarityBase {
  tokenKey: string;
  score: number;
  totalSupply: number;
}

export interface MagicEdenActivity {
  signature: string;
  type: string;
  source: string;
  tokenMint: string;
  collectionSymbol: string;
  slot: number;
  blockTime: number;
  buyer: string;
  buyerReferral: string;
  seller: string;
  sellerReferral: string;
  price: number;
}

export interface MagicEdenCollectionActivity extends MagicEdenActivity {
  collection: string;
  image: string;
}
