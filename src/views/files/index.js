import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import prettyBytes from "pretty-bytes";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { IconCopy } from "@tabler/icons-react";
import IconButton from "@mui/material/IconButton";
import { useCopyToClipboard } from "utils/hooks";

const FilesPage = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.files?.list);
  const [value, copy] = useCopyToClipboard();

  useEffect(() => {
    dispatch.files.getList().then();
  }, [dispatch.files]);

  const renderStatus = (status) => {
    let color = "default";

    switch (status) {
      case "processed":
        color = "info";
        break;
    }

    return (
      <Chip label={status} color={color} />
    );
  };

  return (
    <MainCard>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Purpose</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Bytes</TableCell>
              <TableCell align="right">Created at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  {row.id}
                  <IconButton
                    onClick={() => copy(row.id)}
                    size="small"
                    color="primary"
                  >
                    <IconCopy />
                  </IconButton>
                </TableCell>
                <TableCell align="right">{row.filename}</TableCell>
                <TableCell align="right">{row.purpose}</TableCell>
                <TableCell align="right">{renderStatus(row.status)}</TableCell>
                <TableCell align="right">{prettyBytes(row.bytes)}</TableCell>
                <TableCell align="right">{moment.unix(row.created_at).format()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default FilesPage;
