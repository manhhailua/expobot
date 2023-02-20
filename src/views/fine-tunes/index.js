import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { IconCopy, IconBox } from '@tabler/icons-react';
import { useCopyToClipboard } from 'utils/hooks';
import MainCard from 'ui-component/cards/MainCard';
import FineTuneAModelDialog from './FineTuneAModelDialog';

const FineTunesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rows = useSelector((state) => state.fineTunes?.list);
  const [value, copy] = useCopyToClipboard();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch.fineTunes.list().then();
  }, [dispatch.fineTunes]);

  const renderStatus = (status) => {
    let color = 'warning';

    switch (status) {
      case 'succeeded':
        color = 'success';
        break;
      case 'failed':
        color = 'error';
        break;
      case 'pending':
        color = 'info';
        break;
    }

    return <Chip label={status} color={color} />;
  };

  const renderSecondary = () => {
    return (
      <>
        <Button variant="outlined" startIcon={<IconBox />} onClick={() => setOpen(true)}>
          Fine tune a model
        </Button>
        <FineTuneAModelDialog open={open} onClose={() => setOpen(false)} />
      </>
    );
  };

  return (
    <MainCard title={' '} secondary={renderSecondary()}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Model</TableCell>
              <TableCell align="right">Fine tuned model</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Created at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Link to={`/fine-tunes/${row.id}`} onClick={() => navigate(`/fine-tunes/${row.id}`)} sx={{ cursor: 'pointer' }}>
                    {row.id}
                  </Link>
                </TableCell>
                <TableCell>{row.model}</TableCell>
                <TableCell align="right">
                  {row.fine_tuned_model}
                  {row.fine_tuned_model && (
                    <IconButton onClick={() => copy(row.fine_tuned_model)} size="small" color="primary">
                      <IconCopy />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="right">{renderStatus(row.status)}</TableCell>
                <TableCell align="right">{moment.unix(row.created_at).format()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default FineTunesPage;
