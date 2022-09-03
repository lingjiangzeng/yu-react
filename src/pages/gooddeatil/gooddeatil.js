import React from "react";
import './gooddeatil.less';
import Fab from '@mui/material/Fab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import project from '../../assets/project.png';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
export default class Gooddeatil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      technologystack: [

      ],
      pages: [

      ]
    }
  };
  componentDidMount() {
  }
  goback = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div className="gooddeatil">
        <Fab color="primary" aria-label="add" className="back" onClick={() => this.goback()}>
          <ArrowBackIosNewIcon className="icon" />
        </Fab>
        <div className="gooddeatilp-content">
          <div className="gooddeatilp-content-top">
            <div className="imge-name">
              <span>this template name</span>
              <img src={project} />
            </div>
            <div className="package-type">
              <div>
                <div>
                  <span>
                    Standard License
                  </span>
                  <span>
                    End-users can't be charged for.Read full Standard License
                  </span>
                </div>
                <div>
                  <AttachMoneyIcon className="priceusicon"></AttachMoneyIcon>
                  <span>69</span>
                </div>
              </div>
              <div>
                <div>
                  <span>
                    Standard License
                  </span>
                  <span>
                    End-users can't be charged for.Read full Standard License
                  </span>
                </div>
                <div>
                  <AttachMoneyIcon className="priceusicon"></AttachMoneyIcon>
                  <span>69</span>
                </div>
              </div>
              <div>
                <div>
                  <span>
                    Standard License
                  </span>
                  <span>
                    End-users can't be charged for.Read full Standard License
                  </span>
                </div>
                <div>
                  <AttachMoneyIcon className="priceusicon"></AttachMoneyIcon>
                  <span>69</span>
                </div>
              </div>
              <div>
                <div>
                  <span>
                    Standard License
                  </span>
                  <span>
                    End-users can't be charged for.Read full Standard License
                  </span>
                </div>
                <div>
                  <AttachMoneyIcon className="priceusicon"></AttachMoneyIcon>
                  <span>69</span>
                </div>
              </div>
            </div>
          </div>
          <div className="gooddeatilp-content-bottom">
            <div className="gooddeatilp-content-bottom-left">
              <div className="gooddeatilp-content-bottom-left-introduce">
                <div className="page-title"><span>Introduce</span></div>
                <div className="introduce-text">
                  <span>　　Failure is the path to success. It helps us to touch the sky, teaches us to survive and shows us a specific way.
                    Success brings in money, fame, pride and self-respect.
                    Here it becomes very important to keep our head on out shoulder.
                    The only way to show our gratitude to God for bestowing success on us is by being humble, modest, courteous and respectful to the less fortunate ones.
                    Hope and Despair
                  </span>
                </div>
              </div>
              <div className="gooddeatilp-content-bottom-left-technology-stack">
                <div className="page-title"><span>Technology stack</span></div>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Technology</TableCell>
                        <TableCell align="left">or not</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.technologystack.map((row, i) => (
                        <TableRow key={row.label + i}>
                          <TableCell align="left" >{row.label}</TableCell>
                          <TableCell align="left" width={150}>{row.ornot == "yes" ? <CheckIcon className="CheckIcon"></CheckIcon> : <ClearIcon className="ClearIcon"></ClearIcon>}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="gooddeatilp-content-bottom-left-page">
                <div className="page-title"><span>Pages</span></div>
                <ul>
                  {
                    this.state.pages.map((data, i) => <li key={data.pageName + i}><span>{data.pageName}</span></li>)
                  }
                </ul>
              </div>
            </div>
            <div className="gooddeatilp-content-bottom-right">
              <div className="buy-now-prieview">
                <Button variant="contained" className="buy-now-prieview-but">Buy now</Button>
                <Button variant="outlined" className="buy-now-prieview-but">Live Preview</Button>
              </div>
              <div className="version-information">
                <div>
                  <span>Version</span>
                  <span>3.5.0</span>
                </div>
                <div>
                  <span>First release</span>
                  <span>2022/07/29</span>
                </div>
                <div>
                  <span>Category</span>
                  <span>Admin & Dashboard</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}