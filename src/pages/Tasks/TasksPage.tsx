import * as React from "react";
import { TaskButton } from "@components/TaskButton";
import { Box, Divider, useTheme } from "@mui/material";
import { TaskTypes } from "@typings/task";

export const TasksPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ maxWidth: 600 }}>
      <TaskButton
        taskType={TaskTypes.WATER_CONSUMPTION}
        buttonSectionTitle="Water consumption"
        buttonText="2 liters are done today!"
      />
      <Divider style={{ marginTop: theme.spacing(2) }} />
      <TaskButton
        taskType={TaskTypes.GYM_VISITS}
        buttonSectionTitle=" Gym visits"
        buttonText="I've been to the gym today!"
      />
    </Box>
  );
};
