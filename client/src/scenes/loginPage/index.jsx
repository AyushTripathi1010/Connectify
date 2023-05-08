import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
// import BackgroundImage from '../../../public/assets/Home_page_Image.jpg'
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box sx={{
      position: 'relative', minHeight: '100vh', width: '100%',
      backgroundImage: 'url("http://localhost:3001/assets/bgImage.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      
    }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          width: '100%',
          height: '100%',
          zIndex: '1'
        }}
      />
      <Box
        p='1rem 6%'
        sx={{
          width: '100%',
          // backgroundColor={theme.palette.background.alt}
          backgroundColor: 'transparent',

          position: 'relative',
          textAlign: 'center'
        }}
      >
        <Typography sx={{
          position: 'absolute', fontWeight: 'bold', fontSize: '32px', color: 'rgba(144, 238, 144, 0.85)', zIndex: '10', position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',

        }}>
          Connectify
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "40%" : "90%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        // backgroundColor={theme.palette.background.alt}
        backgroundColor="rgba(0,0,0,0.3)"
        position="relative"
        zIndex="10"
        color="white"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Connectify.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
