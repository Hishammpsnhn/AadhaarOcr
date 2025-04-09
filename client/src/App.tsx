import { Container, Paper } from "@mui/material";
import ImageUploader from "./components/ImageUploader";
import ExtractDetails from "./components/ExtractDetails";

export default function App() {
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
        <ImageUploader />

        {/* Right Side - Content */}
        <ExtractDetails />
      </Paper>
    </Container>
  );
}
