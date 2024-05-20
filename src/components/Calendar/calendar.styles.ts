import { Box, styled } from "@mui/material";

export const CalendarContainer = styled(Box)(({ theme }) => ({
  "& .rbc-header": {
    borderLeft: "1px solid rgb(226, 232, 240) !important",
    borderBottom: "none !important",

    "&:nth-of-type(1)": {
      borderLeft: "none !important",
    },
  },
  "& .rbc-month-view": {
    border: "none !important",
  },
  "& .rbc-month-row": {
    borderBottom: "1px solid rgb(226, 232, 240) !important",
    borderTop: "none",

    "&:last-child": {
      borderBottom: "none !important",
    },
  },
  "& .rbc-date-cell": {
    //   display: "flex",
    //   alignItems: "center",
    textAlign: "center",
  },
  "& .rbc-button-link": {
    marginTop: theme.spacing(1),
    fontWeight: "500 !important",
    fontFamily: theme.typography.fontFamily,
  },
  ".rbc-event": {
    padding: "4px",
    borderRadius: "4px",
    fontFamily: theme.typography.fontFamily,
    fontStyle: "italic",
    margin: "2px auto 0 auto",
    width: "95%",
  },
}));

export const ToolbarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

export const ToolbarLabel = styled("span")(({ theme }) => ({
  letterSpacing: "-0.025em",
  fontSize: "1.4rem",
  lineHeight: "1.5",
  fontWeight: 600,
  fontFamily: theme.typography.fontFamily,
  width: "12rem",
}));

export const ToolbarButtonsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(2),

  "& > *": {
    marginLeft: theme.spacing(1),
  },
}));

export const MonthHeaderContainer = styled(Box)(() => ({
  height: "1.2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
}));

export const MonthHeaderLabel = styled("span")(({ theme }) => ({
  fontWeight: 500,
  fontFamily: theme.typography.fontFamily,
  fontSize: "0.8rem",
  textTransform: "uppercase",
}));

export const DateCellContainer = styled(Box)({
  borderLeft: "1px solid rgb(226, 232, 240) !important",

  "&:nth-of-type(1)": {
    borderLeft: "none !important",
  },
});
