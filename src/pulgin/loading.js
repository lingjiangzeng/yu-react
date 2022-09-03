import ReactDom from "react-dom";
import React from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

class loading {
  constructor() {
    this.div = null;
    this.that = null;
  };
  open = (params = {}) => {
    let obj = Object.assign({
      sx: { color: '#fff', zIndex: 9999 },
      iconcolor: 'inherit'
    }, params)
    let that = this;
    class Loading extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          open: false,
        };
      };
      componentDidMount() {
        that.that = this;
        this.setState({ open: true });
      }
      render() {
        return (
          <Backdrop
            sx={obj.sx}
            open={this.state.open}
          >
            <CircularProgress color={obj.iconcolor} />
          </Backdrop>
        )
      }
    }
    this.div = document.createElement('div');
    document.body.appendChild(this.div);
    ReactDom.render(<Loading />, this.div);
  }
  close() {
    this.that.setState({ open: false }, () => {
      ReactDom.unmountComponentAtNode(this.div);
      this.div.remove();
    });
  }

}
export default loading;