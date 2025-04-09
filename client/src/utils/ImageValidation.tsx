
export const validateImageFile = (file: File): string | null => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB
  
    if (!validTypes.includes(file.type)) {
      return "Only JPG, JPEG, or PNG images are allowed.";
    }
  
    if (file.size > maxSize) {
      return "Image size exceeds 5MB limit. Please choose a smaller file.";
    }
  
    return null; // valid
  };
  