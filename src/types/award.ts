import { WithDBId, WithTimestamps } from "./shared";

enum Rarities {
  COMMON = "common",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
}

export type Award = {
  image: string;
  title: string;
  description: string;
  price: number;
  rarity: Rarities;
} & WithTimestamps &
  WithDBId;
