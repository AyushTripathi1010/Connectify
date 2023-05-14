import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
const BASE_URL = 'https://connectify-backend-mjv2.onrender.com';
const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src= {`${BASE_URL}/assets/info2.jpeg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Introducing KFC's BOLD Burger</Typography>
        <Typography color={medium}>kfcBurger.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Get ready for a finger-licking good time with KFC's juicy and flavorful burgers! Satisfaction guaranteed with every bite.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
