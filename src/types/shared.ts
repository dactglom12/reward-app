import * as React from "react";

export interface WithOpenClosedState {
  isOpen: boolean;
  onClose: () => void;
}

export interface WithTimestamps {
  createdAt: string;
  updatedAt: string;
}

export interface WithDBId {
  _id: string;
}

export interface WithReactChildren {
  children: React.ReactNode;
}
