import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
const BASE_URL = 'https://connectify-backend-mjv2.onrender.com';

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      `${BASE_URL}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <>
      <Box
        fontSize="30px"
        fontWeight="500"
        padding='0rem 0rem 1rem 0rem'
      >{isLogin ? "SignIn" : "REGISTER"}
      </Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"

                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    InputLabelProps={{
                      sx: {
                        color: 'rgba(144, 238, 144, 0.7)', // set the label color to red

                      },
                    }}
                    sx={{ gridColumn: "span 2", backgroundColor: 'rgba(0,0,0,0.8)' }}
                    InputProps={{
                      inputProps: {
                        style: { color: "white" }, // set the text color to white
                      },
                    }}
                  />
                  <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    InputLabelProps={{
                      sx: {
                        color: 'rgba(144, 238, 144, 0.7)', // set the label color to red

                      },
                    }}
                    sx={{
                      gridColumn: "span 2",

                      backgroundColor: 'rgba(0,0,0,0.8)'
                    }}
                    InputProps={{
                      inputProps: {
                        style: { color: "white" }, // set the text color to white
                      },
                    }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={Boolean(touched.location) && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4", backgroundColor: 'rgba(0,0,0,0.8)' }}
                    InputLabelProps={{
                      sx: {
                        color: 'rgba(144, 238, 144, 0.7)', // set the label color to red
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        style: { color: "white" }, // set the text color to white
                      },
                    }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 4", backgroundColor: 'rgba(0,0,0,0.8)' }}
                    InputLabelProps={{
                      sx: {
                        color: 'rgba(144, 238, 144, 0.7)', // set the label color to red
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        style: { color: "white" }, // set the text color to white
                      },
                    }}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <Box sx={{ color: 'rgba(144, 238, 144, 0.7)' }}> Add Picture Here</Box>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}

              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4", backgroundColor: 'rgba(0,0,0,0.8)' }}
                InputLabelProps={{
                  sx: {
                    color: 'rgba(144, 238, 144, 0.7)', // set the label color to red
                  },
                }}
                InputProps={{
                  inputProps: {
                    style: { color: "white" }, // set the text color to white
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4", backgroundColor: 'rgba(0,0,0,0.8)' }}
                InputLabelProps={{
                  sx: {
                    color: 'rgba(144, 238, 144, 0.7)', // set the label color to red
                  },
                }}
                InputProps={{
                  inputProps: {
                    style: { color: "white" }, // set the text color to white
                  },
                }}
              />
            </Box>

            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "0.7rem",
                  // backgroundColor: palette.primary.main,
                  backgroundColor: 'rgb(103, 189, 103)',
                  color: 'white',
                  "&:hover": { backgroundColor: 'rgb(94, 169, 94)' },
                  fontSize: '15px'
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}

                sx={{
                  // textDecoration: "underline",
                  fontSize: '16px',
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer"

                  },
                }}
              >
                {isLogin
                  ? <Box display="flex" gap='10px' >Don't have an account?
                    <Typography component="span" fontSize='16px'>
                      Register here
                    </Typography></Box>
                  : <Box display='flex' gap='10px'>Already have an account?
                    <Typography component="span" fontSize='16px' >
                      SignIn Here
                    </Typography></Box>
                }
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </>

  );
};

export default Form;
