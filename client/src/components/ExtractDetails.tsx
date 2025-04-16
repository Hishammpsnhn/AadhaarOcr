import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ResponseCoder from "./ResposeCoder";
import FormData from "./FormData";
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
        Aadhaar Analysis Tool
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {data?.data ? (
            <>
              {(!data?.data?.name || !data?.data?.uuid || !data?.data?.gender) && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                  Upload High Quality Image For More Accurate
                </Alert>
              )}
              {(!data?.data.isUidSame) && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                  Aadhaar number on front and back do not match. Please upload clearer images.
                </Alert>
              )}

               <FormData data={data} />

               <ResponseCoder data={data} />
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </Box>
  );
};

export default ExtractDetails;
