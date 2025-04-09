import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Button, 
  Card, 
  CardMedia, 
  Divider,
  Stack,
  IconButton,
  Alert
} from '@mui/material';
import { 
  CloudUpload as CloudUploadIcon, 
  Delete as DeleteIcon,
  AddPhotoAlternate as AddPhotoIcon
} from '@mui/icons-material';

export default function App() {
  const [images, setImages] = useState<(string|null)[]>([null, null]);
  const [error, setError] = useState('');
  
  const handleImageChange = (index:number, event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size exceeds 5MB limit. Please choose a smaller file.');
        return;
      }
      console.log("images",images)
      const newImages = [...images];
      console.log("new image",newImages)
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
      setError('');
    }
  };

  const removeImage = (index:number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  return (
    <Container maxWidth={false} sx={{ py: 4, height: '100vh', bgcolor: '#f5f5f5' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          height: '90vh',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        {/* Left Side - Upload Panel */}
        <Box 
          sx={{ 
            width: { xs: '100%', md: '40%' },
            bgcolor: '#f9f9f9',
            p: 4,
            display: 'flex',
             overflow: 'auto',
            flexDirection: 'column'
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
                  height: '40%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    p: 1, 
                    bgcolor: 'primary.light', 
                    color: 'white'
                  }}
                >
                  Image {index + 1}
                </Typography>
                
                {images[index] ? (
                  <Box sx={{ position: 'relative', flexGrow: 1 }}>
                    <CardMedia
                      component="img"
                      image={images[index]}
                      alt={`Uploaded image ${index + 1}`}
                      sx={{ 
                        height: '100%',
                        objectFit: 'contain',
                        bgcolor: '#fff'
                      }}
                    />
                    <IconButton
                      size="small"
                      aria-label="delete"
                      onClick={() => removeImage(index)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'error.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'error.dark',
                        },
                        boxShadow: 2
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
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexGrow: 1,
                      bgcolor: '#fff',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'grey.50',
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
                    <AddPhotoIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
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
              sx={{ mt: 'auto' }}
              disabled={!images[0] || !images[1]}
            >
              {(!images[0] || !images[1]) ? 'Upload Both Side' : 'Process Images'}
            </Button>
          </Stack>
        </Box>
        
        {/* Right Side - Content */}
        <Box 
          sx={{ 
            width: { xs: '100%', md: '60%' },
            p: 4,
            overflow: 'auto'
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Image Analysis Tool
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            Compare and analyze your images with our powerful tools
          </Typography>
          
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="body1" paragraph>
            Our image analysis platform provides powerful tools for both professionals and enthusiasts 
            to compare, analyze, and extract insights from digital images. Whether you're working on 
            photography projects, design iterations, or scientific analysis, our tools make the process 
            simple and effective.
          </Typography>
          
          <Typography variant="body1" paragraph>
            By uploading two images side by side, you can easily identify differences in composition, 
            color balancing, lighting effects, and other visual elements. Our intelligent comparison 
            algorithm can highlight subtle differences that might be difficult to spot with the naked eye.
          </Typography>
          
          <Typography variant="body1" paragraph>
            For designers and photographers, this tool provides an invaluable resource for comparing 
            different versions of your work, ensuring consistency across multiple projects, or 
            evaluating different processing techniques applied to the same base image.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Researchers and data analysts can benefit from our quantitative analysis features, which 
            can extract valuable data points from visual information. Our platform supports various 
            image formats and provides comprehensive metadata extraction to give you complete 
            insight into your visual assets.
          </Typography>
          
          <Box sx={{ bgcolor: 'primary.light', p: 3, borderRadius: 2, mt: 4, color: 'white' }}>
            <Typography variant="h6" gutterBottom>
              Getting Started
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2 }}>
              To begin using our image analysis tools:
            </Typography>
            
            <ol style={{ paddingLeft: '20px', margin: 0 }}>
              <li>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Upload two images using the panel on the left side of the screen
                </Typography>
              </li>
              <li>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Click the "Process Images" button once both images are uploaded
                </Typography>
              </li>
              <li>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  View the analysis results and use our interactive tools to explore the differences
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Export your findings or save them to your account for future reference
                </Typography>
              </li>
            </ol>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}