import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {
    data:any
}
const ResponseCoder:React.FC<Props> = ({ data }) => {
  return (
    <Box
      sx={{
        bgcolor: "#1e1e1e",
        p: 3,
        borderRadius: 2,
        mt: 4,
        color: "white",
      }}
    >
      <Typography variant="h6" gutterBottom>
        API Response
      </Typography>

      <Box
        component="pre"
        sx={{
          borderRadius: 2,
          p: 2,
          overflowX: "auto",
          fontFamily: "Consolas, 'Courier New', monospace",
          fontSize: "0.9rem",
          color: "#d4d4d4",
        }}
      >
        {data ? JSON.stringify(data, null, 2) : "Failed..."}
      </Box>
    </Box>
  );
};

export default ResponseCoder;
