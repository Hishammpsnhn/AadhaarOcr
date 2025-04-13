import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternate";

import { validateImageFile } from "../utils/ImageValidation";
import useApi from "../hooks/useApi";

type ImageUploaderProps = {
  GetData: (data: any, loading: boolean) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ GetData }) => {
  const { data, apiError, loading, makeRequest } = useApi();
  const [images, setImages] = useState<(File | null)[]>([null, null]);
  const [error, setError] = useState("");

  const handleImageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const validateError = validateImageFile(file);
      if (validateError) {
        setError(validateError);
        return;
      }
      const newImages = [...images];
      newImages[index] = file
      setImages(newImages);
      setError("");
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const handleSubmit = async() => {
    const formData = new FormData();
  
    images.forEach((file) => {
      if (file) {
        formData.append("images", file); 
      }
    });
    GetData(null,true)
    const res = await makeRequest({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/ocr`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(res){
      console.log(res);
      GetData(res,false)
    }
  };
  
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "40%" },
        bgcolor: "#f9f9f9",
        p: 4,
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Image Upload
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Upload two images to compare or analyze side by side
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={4} sx={{ flexGrow: 1 }}>
        {[0, 1].map((index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{
              borderRadius: 2,
              height: "40%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                p: 1,
                bgcolor: "primary.light",
                color: "white",
              }}
            >
              Image {index + 1}
            </Typography>

            {images[index] ? (
              <Box sx={{ position: "relative", flexGrow: 1 }}>
                <CardMedia
                  component="img"
                  image={URL.createObjectURL(images[index])}
                  alt={`Uploaded image ${index + 1}`}
                  sx={{
                    height: "100%",
                    objectFit: "contain",
                    bgcolor: "#fff",
                  }}
                />
                <IconButton
                  size="small"
                  aria-label="delete"
                  onClick={() => removeImage(index)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "error.main",
                    color: "white",
                    "&:hover": {
                      bgcolor: "error.dark",
                    },
                    boxShadow: 2,
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <Box
                component="label"
                htmlFor={`image-upload-${index}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flexGrow: 1,
                  bgcolor: "#fff",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "grey.50",
                  },
                }}
              >
                <input
                  id={`image-upload-${index}`}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageChange(index, e)}
                />
                <AddPhotoIcon
                  sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Click to upload image
                </Typography>
              </Box>
            )}
          </Card>
        ))}

        <Button
          variant="contained"
          fullWidth
          startIcon={<CloudUploadIcon />}
          sx={{ mt: "auto" }}
          onClick={handleSubmit}
          disabled={!images[0] || !images[1]}
        >
          {!images[0] || !images[1] ? "Upload Both Side" : "Process Images"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ImageUploader;
