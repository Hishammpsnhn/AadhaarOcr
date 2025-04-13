import { Container, Paper } from "@mui/material";
import ImageUploader from "./components/ImageUploader";
import ExtractDetails from "./components/ExtractDetails";
import { useState } from "react";

export default function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(data)

  const GetData = (data: any,loading:boolean) => {
    setData(data)
    setLoading(loading)
  };
  return (
    <Container
      maxWidth={false}
      sx={{ py: 4, height: "100vh", bgcolor: "#f5f5f5" }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          height: "90vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Left Side - Upload Panel */}
        <ImageUploader GetData={GetData} />

        {/* Right Side - Content */}
        <ExtractDetails data={data} loading={loading}/>
      </Paper>
    </Container>
  );
}
