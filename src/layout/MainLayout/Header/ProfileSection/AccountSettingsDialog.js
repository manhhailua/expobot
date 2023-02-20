import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const AccountSettingsDialog = ({ onSave, ...rest }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.user?.openAI?.apiKey);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const validationSchema = Yup.object().shape({
    openAIApiKey: Yup.string().test({
      test: (value, ctx) => {
        if (!value) {
          return ctx.createError({ message: 'API KEY is required' });
        } else if (!value.startsWith('sk-')) {
          return ctx.createError({ message: 'API KEY is malformed' });
        }
        return true;
      },
    }),
  });

  const handleSubmit = (values, ctx) => {
    dispatch.user.setOpenAIAPIKey(values.openAIApiKey);
    onSave();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth={'md'}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...rest}
    >
      <Formik initialValues={{ openAIApiKey: apiKey }} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ errors, touched, values, handleChange, handleBlur }) => (
          <Form>
            <DialogTitle id="alert-dialog-title" variant="h2">
              Account Settings
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Typography variant="body1">These settings is only locally persisted.</Typography>
              </DialogContentText>
              <Divider sx={{ my: 1.5 }} />
              <TextField
                margin="dense"
                id="openAIApiKey"
                label="OpenAI API Key"
                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                defaultValue={values.openAIApiKey}
                helperText={errors.openAIApiKey}
                error={!!errors.openAIApiKey}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit">Save</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AccountSettingsDialog;
