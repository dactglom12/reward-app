import { Box, Link, Typography } from "@material-ui/core";
import * as React from "react";

export const AuthorSection: React.FC = () => (
  <Box mt={8}>
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with ❤️ by "}
      <Link color="inherit" href="https://example.com/">
        Dactglom
      </Link>
    </Typography>
  </Box>
);
