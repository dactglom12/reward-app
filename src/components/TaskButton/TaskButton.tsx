import { TaskApi } from "@api/taskApi";
import { UserBalanceContext } from "@contexts/UserBalanceContext";
import { Box, Button, Typography } from "@material-ui/core";
import { TaskTypes } from "@typings/task";
import * as React from "react";

interface TaskButtonProps {
  taskType: TaskTypes;
  buttonText: string;
  buttonSectionTitle: string;
}

export const TaskButton: React.FC<TaskButtonProps> = ({
  taskType,
  buttonText,
  buttonSectionTitle,
}) => {
  const { updateBalance } = React.useContext(UserBalanceContext);

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  React.useEffect(() => {
    TaskApi.isTaskCompletedToday({ taskType })
      .then((response) => {
        setIsButtonDisabled(response.data.isCompleted);
      })
      .catch(console.error);
  }, [taskType]);

  const completeTask = (_event: React.SyntheticEvent<HTMLButtonElement>) => {
    TaskApi.complete({ taskType })
      .then((response) => {
        updateBalance(response.data.reward);
        setIsButtonDisabled(true);
      })
      .catch(console.error);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {buttonSectionTitle}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        disabled={isButtonDisabled}
        onClick={completeTask}
      >
        {buttonText}
      </Button>
    </Box>
  );
};
