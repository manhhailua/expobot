import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import AnimateButton from "ui-component/extended/AnimateButton";
import { auth } from "utils/firebase";
import Google from "assets/images/icons/social-google.svg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const FirebaseLogin = ({ ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const googleHandler = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        navigate("/", { replace: true });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch.user.setFirebaseProfile(user);
        navigate("/", { replace: true });
      }
    });
  });

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            onClick={googleHandler}
            size="large"
            variant="outlined"
            startIcon={
              <Box sx={{ mr: { xs: 1, sm: 2 } }}>
                <img src={Google} alt="google" width={16} height={16} />
              </Box>
            }
          >Sign in with Google</Button>
        </AnimateButton>
      </Grid>
    </Grid>
  );
};

export default FirebaseLogin;
