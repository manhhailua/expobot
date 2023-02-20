import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import sortBy from 'lodash/sortBy';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import MainCard from 'ui-component/cards/MainCard';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { IconCopy } from '@tabler/icons-react';
import { useCopyToClipboard } from 'utils/hooks';

const RetrieveFineTunePage = () => {
  const { fineTuneId } = useParams();
  const dispatch = useDispatch();
  const [value, copy] = useCopyToClipboard();
  const [fineTune, setFineTune] = useState({});

  useEffect(() => {
    dispatch.fineTunes.retrieve(fineTuneId).then((res) => {
      setFineTune(res.data);
    });
  }, [dispatch.fineTunes, fineTuneId]);

  const events = useMemo(() => {
    return sortBy(fineTune.events, 'created_at').reverse();
  }, [fineTune.events]);

  const renderTitle = () => {
    if (fineTune.fine_tuned_model) {
      return (
        <Stack direction="row" spacing={1}>
          <Typography variant="h3" sx={{ m: 'auto 0' }}>
            {fineTune.fine_tuned_model}
          </Typography>
          <IconButton onClick={() => copy(fineTune.fine_tuned_model)} size="small" color="primary">
            <IconCopy />
          </IconButton>
        </Stack>
      );
    }
    return <Typography variant="h3">-</Typography>;
  };

  return (
    <>
      <MainCard title={renderTitle()} secondary={<Chip label={fineTune.model} variant="outlined" />}>
        <Typography variant="body2">Fine tune ID: {fineTune.id}</Typography>
      </MainCard>
      <MainCard title="Events" sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {events?.map((row) => (
                <TableRow key={`event-${uuidv4()}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.level}</TableCell>
                  <TableCell>{row.message}</TableCell>
                  <TableCell align="right">{moment.unix(row.created_at).format()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </>
  );
};

export default RetrieveFineTunePage;
