import { useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import config from 'config';
import prettyBytes from 'pretty-bytes';

const FineTuneAModelDialog = ({ onSave, ...rest }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const inputFileRef = useRef();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const initialValues = {
    file: '',
    model: 'davinci',
  };
  const validationSchema = Yup.object().shape({
    file: Yup.mixed()
      .test({
        message: 'Please provide a supported file type: csv, tsv, xlsx, json, jsonl',
        test: (filePath, context) => {
          const isValid = ['csv', 'tsv', 'xlsx', 'json', 'jsonl'].includes(filePath?.replace(/(.*)\//g, ''));
          if (!isValid) context?.createError();
          return isValid;
        },
      })
      .test({
        message: `File too big, can't exceed ${prettyBytes(config.maxFileSize)}`,
        test: (file) => {
          const isValid = file?.size < config.maxFileSize;
          return isValid;
        },
      }),
  });

  const handleSubmit = (values, ctx) => {
    dispatch.user.setOpenAIAPIKey(values.openAIApiKey);
    onSave();
  };

  return (
    <Dialog fullScreen={fullScreen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" {...rest}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ errors, touched, values, handleChange, handleBlur }) => (
          <Form>
            <DialogTitle id="alert-dialog-title" variant="h2">
              Upload a new file or choose an existing one
            </DialogTitle>
            <DialogContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Button variant="outlined" size="large" onClick={() => inputFileRef.current.click()}>
                  <Typography>Upload</Typography>
                </Button>
                <TextField
                  id="filePath"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.file}
                  helperText={errors.file}
                  error={!!errors.file}
                  InputProps={{
                    readOnly: true,
                  }}
                  onClick={() => inputFileRef.current.click()}
                />
                <input id="file" name="file" hidden type="file" onChange={handleChange} ref={inputFileRef} />
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 3 }}>
                <Typography variant="h4">Base model</Typography>
                <Select
                  id="model"
                  name="model"
                  fullWidth
                  variant="outlined"
                  value={values.model}
                  label="Base model"
                  onChange={handleChange}
                >
                  <MenuItem value="ada">ada</MenuItem>
                  <MenuItem value="babbage">babbage</MenuItem>
                  <MenuItem value="curie">curie</MenuItem>
                  <MenuItem value="davinci">davinci</MenuItem>
                </Select>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button type="submit">Create</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default FineTuneAModelDialog;
