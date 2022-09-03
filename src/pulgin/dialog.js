import ReactDom from "react-dom";
import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class globelDialog {
  constructor() {
    this.div = null;
  };
  open = (params = {}) => {
    let obj = Object.assign({
      title: "this is title",
      content: 'this is content text'
    }, params)
    let that = this;
    class GlobelDialog extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          open: false,
        }
      };
      componentDidMount() {
        this.setState({ open: true })
      };

      handleClose = () => {
        this.setState({ open: false });
        setTimeout(() => {
          that.close();
        }, 500);
      };
      render() {
        return (
          <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{obj.title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description" style={{ minWidth: '350px', height: 'auto' }}>
                {obj.content}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()}>close</Button>
              <Button onClick={() => this.handleClose()}>confirm</Button>
            </DialogActions>
          </Dialog>
        )
      }
    }
    this.div = document.createElement('div');
    document.body.appendChild(this.div);
    ReactDom.render(<GlobelDialog />, this.div);
  };
  close() {
    ReactDom.unmountComponentAtNode(this.div);
    this.div.remove();
  }

}
export default globelDialog;