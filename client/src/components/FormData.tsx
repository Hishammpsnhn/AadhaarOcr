import { Box, TextField } from "@mui/material";
import React from "react";

type Props = {
  data: any;
};
const FormData: React.FC<Props> = ({ data }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 2 }}>
      <TextField
        disabled
        label="Name"
        value={data?.data?.name}
        variant="outlined"
      />
      <Box>
        <TextField
          disabled
          label="UUID"
          value={data?.data?.uuid}
          variant="outlined"
        />
        <TextField
          disabled
          label="DOB"
          value={data?.data?.dob}
          variant="outlined"
        />
        <TextField
          disabled
          label="Gender"
          value={data?.data?.gender}
          variant="outlined"
        />
      </Box>
      <TextField
        disabled
        label="Address"
        value={data?.data?.address}
        variant="outlined"
      />
    </Box>
  );
};

export default FormData;
