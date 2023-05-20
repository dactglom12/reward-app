import * as React from "react";
import { Award } from "@typings/award";

export const useAwardsManager = () => {
  const [awards, setAwards] = React.useState<Award[]>([]);

  const getAwards = React.useCallback(() => awards, [awards]);

  const addAwards = React.useCallback((awards: Award[]) => {
    setAwards((currentAwards) => {
      const newAwards = awards.filter((award) => {
        return !Boolean(
          currentAwards.find((currentAward) => currentAward._id === award._id)
        );
      });

      return [...currentAwards, ...newAwards];
    });
  }, []);

  return {
    getAwards,
    addAwards,
  };
};
