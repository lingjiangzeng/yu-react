import React from 'react';
import './orderPage.less';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
export default class OrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTimeOpen: false,
      startTime: null,
      endTimeOpen: false,
      endTime: null

    };
  };

  componentDidMount() {
    console.log(this.props)
    this.setState({
      startTime: this.props.startTime,
      endTime: this.props.endTime
    })
  };

  componentWillUnmount() {
    this.props.setseachTime(
      {
        startTime: this.state.startTime,
        endTime: this.state.endTime
      }
    )
  };
  download = () => {

  };

  openStartTime = (bool) => {
    this.setState({ startTimeOpen: bool }, () => {
      if (bool) {
        setTimeout(() => {
          document.querySelector('.MuiModal-root').classList.add('MuiModal-root-addlclass')
        })
      }
    })
  };

  openEndTime = (bool) => {
    this.setState({ endTimeOpen: bool }, () => {
      if (bool) {
        setTimeout(() => {
          document.querySelector('.MuiModal-root').classList.add('MuiModal-root-addlclass-1')
        })
      }
    })
  };

  render() {
    return (
      <div className='orderoage'>
        <div className='seachbox'>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
              open={this.state.startTimeOpen}
              value={this.state.startTime}
              onChange={(newValue) => {
                this.setState({ startTime: new Date(newValue) })
              }}
              onClose={() => this.openStartTime(false)}
              label="start time"
              minDate={new Date('1970-01-01T00:00')}
              inputFormat="yyyy/MM/dd HH:mm"
              renderInput={(params) => <TextField onClick={() => this.openStartTime(true)} size="small" {...params} />}
            ></MobileDateTimePicker>
            <span className='timeto'>&ensp;~&ensp;</span>
            <MobileDateTimePicker
              open={this.state.endTimeOpen}
              value={this.state.endTime}
              onChange={(newValue) => {
                this.setState({ endTime: new Date(newValue) })
              }}
              onClose={() => this.openEndTime(false)}
              label="end time"
              minDate={new Date('1970-01-01T00:00')}
              inputFormat="yyyy/MM/dd HH:mm"
              renderInput={(params) => <TextField onClick={() => this.openEndTime(true)} size="small" {...params} />}
            ></MobileDateTimePicker>
          </LocalizationProvider>
          <Button variant="contained" className='searchbut' startIcon={<SearchIcon />}>search</Button>
        </div>
        <div className='orderlist'>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" width={300}>The project name</TableCell>
                  <TableCell align="left">The preview image</TableCell>
                  <TableCell align="left">Commodity prices</TableCell>
                  <TableCell align="left">Buy time</TableCell>
                  <TableCell align="left">Expiry date</TableCell>
                  <TableCell align="left" width={300}>Operating </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.orderlist.map((row, i) => (
                  <TableRow key={row.goodID + row.orderID + i}>
                    <TableCell align="left" width={300}>{row.goodName}</TableCell>
                    <TableCell align="left"><img src={row.image} className="tableiamge" /></TableCell>
                    <TableCell align="left">
                      <div className='tableprice'>
                        <AttachMoneyIcon className="priceusicon"></AttachMoneyIcon>
                        <span>{row.payprice}</span>
                      </div>
                    </TableCell>
                    <TableCell align="left">{window.$datehandle(row.buyTime)}</TableCell>
                    <TableCell align="left">{window.$datehandle(Date.now() + row.validTime)}</TableCell>
                    <TableCell align="left" width={300}>
                      <IconButton color="primary" onClick={() => this.download(row)}>
                        <DownloadIcon className="operationicon" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    )
  }
}