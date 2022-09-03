import React from "react";
import './rootBox.less';

class RootBox extends React.Component {
    constructor(props){
      super(props);
      this.state = {};
    }
    render(){
      return(
        <div className="rootbox" ref={this.RootBoxref}>
          <div className="routepagechildren">
          {this.props.children}
          </div>
          <div className="bottomrecordmsg">
            <span>粤B2-20090191-18  工业和信息化部备案管理系统网站</span>
            <span> 浙公网安备 33010902002564号</span>
          </div>
        </div>
      )
    }
}

export default RootBox;