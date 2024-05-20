export interface WithTimestamps {
  createdAt: string;
  updatedAt: string;
}

export interface WithDBId {
  _id: string;
}

export interface WithUserId {
  userId: string;
}

export interface WithUserRelation {
  userId: string;
}
