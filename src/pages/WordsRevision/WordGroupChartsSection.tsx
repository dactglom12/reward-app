import { WordsApi } from "@api/wordsApi";
import { useRequest } from "@hooks/useRequest";
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  Typography,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { WordGroup, WordTrainingSession } from "@typings/word";
import { getDisplayableDate } from "@utilities/dateUtils";
import { Colors } from "constants/styles";
import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Line,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface WordGroupChartsSectionProps {
  wordGroups: WordGroup[];
}

const transformTrainingSessions = (sessions: WordTrainingSession[]) =>
  sessions.map((session) => ({
    ...session,
    creationDate: getDisplayableDate(new Date(session.createdAt), true),
    percentage: Math.floor(
      (session.correctAnswersCount / session.wordsCount) * 100
    ),
  }));

const trainingSessionKeyToDisplayMap: Record<string, string> = {
  percentage: "Percentage",
  correctAnswersCount: "Correct Answers",
  wordsCount: "Words",
};

export const WordGroupChartsSection: React.FC<WordGroupChartsSectionProps> = ({
  wordGroups,
}) => {
  const [currentWordGroup, setCurrentWordGroup] = useState(wordGroups[0]);
  const { data, error, isLoading, sendRequest } = useRequest(
    WordsApi.getSessions
  );

  useEffect(() => {
    const loadTrainingSessions = async () => {
      await sendRequest({ groupId: currentWordGroup._id });
    };

    loadTrainingSessions();
  }, [currentWordGroup, sendRequest]);

  const transformedData = useMemo(
    () => (data ? transformTrainingSessions(data.sessions) : null),
    [data]
  );

  const onRandomWordsSelectChange = (event: SelectChangeEvent) => {
    const group = wordGroups.find((group) => group._id === event.target.value);

    if (!group) return;

    setCurrentWordGroup(group);
  };

  const renderContent = () => {
    if (isLoading)
      return (
        <Box
          height="inherit"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      );

    if (error || !transformedData)
      return (
        <Box
          height="inherit"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      );

    if (transformedData.length < 4)
      return (
        <Box
          height="inherit"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <Typography variant="h4">Insufficient training data</Typography>
          <Typography variant="caption" fontSize="1.3rem">
            You must complete at least 4 sessions to display the chart
          </Typography>
        </Box>
      );

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={400}
          data={transformedData}
          margin={{ top: 32 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="creationDate" />
          <YAxis />
          <Line
            type="monotone"
            dataKey="correctAnswersCount"
            stroke={Colors.DARK_BLUE}
            strokeOpacity={0}
          />
          <Line
            type="monotone"
            dataKey="wordsCount"
            strokeOpacity={0}
            stroke={Colors.DARK_BLUE}
          />
          <Line type="monotone" dataKey="percentage" stroke={Colors.PURPLE} />

          <Tooltip
            formatter={(value, name) => [
              value,
              trainingSessionKeyToDisplayMap[name],
            ]}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Grid width="100%" height="400px">
      <Grid item container xs={12}>
        <Grid item xs={12} mb={2}>
          <Typography variant="h4">Training session results</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="word-group-label">Word group</InputLabel>
            <Select
              labelId="word-group-label"
              value={currentWordGroup._id}
              onChange={onRandomWordsSelectChange}
              label="Word group"
            >
              {wordGroups.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {renderContent()}
    </Grid>
  );
};
