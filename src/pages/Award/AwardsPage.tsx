import * as React from "react";
import { Grid } from "@material-ui/core";
import { AwardCard } from "@components/AwardCard";
import { useAwardsManager } from "@hooks/useAwardsManager";
import { AwardsApi } from "@api/awardsApi";
import { UserBalanceContext } from "@contexts/UserBalanceContext";
import { UserAwardsApi } from "@api/userAwardsApi";
import { Award } from "@typings/award";

interface AwardsPageProps {}

const AwardsPage: React.FC<AwardsPageProps> = () => {
  const { getAwards, addAwards } = useAwardsManager();
  const { updateBalance } = React.useContext(UserBalanceContext);

  const onAwardPurchase = React.useCallback(
    (award: Award) => {
      const { _id, price } = award;

      UserAwardsApi.grantAward({ awardId: _id, price })
        .then(() => {
          updateBalance(-price);
        })
        .catch(console.error);
    },
    [updateBalance]
  );

  React.useEffect(() => {
    AwardsApi.getAwards()
      .then((response) => {
        addAwards(response.data.awards);
      })
      .catch(console.error);
  }, [addAwards]);

  return (
    <Grid container spacing={3}>
      {getAwards().map((award) => (
        <Grid item key={award._id} xs={12} sm={6} md={4} lg={3}>
          <AwardCard award={award} onPurchase={onAwardPurchase} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AwardsPage;
