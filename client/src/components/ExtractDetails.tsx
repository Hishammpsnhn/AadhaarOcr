import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import React from "react";
import useApi from "../hooks/useApi";
type Props = {
  data: any;
  loading: boolean;
};

const ExtractDetails: React.FC<Props> = ({ data, loading }) => {
  console.log(data);
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "60%" },
        p: 4,
        overflow: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Image Analysis Tool
      </Typography>

      <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
        Compare and analyze your images with our powerful tools
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="body1" paragraph>
        Our image analysis platform provides powerful tools for both
        professionals and enthusiasts to compare, analyze, and extract insights
        from digital images. Whether you're working on photography projects,
        design iterations, or scientific analysis, our tools make the process
        simple and effective.
      </Typography>

      <Typography variant="body1" paragraph>
        By uploading two images side by side, you can easily identify
        differences in composition, color balancing, lighting effects, and other
        visual elements. Our intelligent comparison algorithm can highlight
        subtle differences that might be difficult to spot with the naked eye.
      </Typography>

      <Typography variant="body1" paragraph>
        For designers and photographers, this tool provides an invaluable
        resource for comparing different versions of your work, ensuring
        consistency across multiple projects, or evaluating different processing
        techniques applied to the same base image.
      </Typography>

      <Typography variant="body1" paragraph>
        Researchers and data analysts can benefit from our quantitative analysis
        features, which can extract valuable data points from visual
        information. Our platform supports various image formats and provides
        comprehensive metadata extraction to give you complete insight into your
        visual assets.
      </Typography>

      {data ? (
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
      ) : loading ? (
        <CircularProgress />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ExtractDetails;
