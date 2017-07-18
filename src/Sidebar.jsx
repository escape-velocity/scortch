import React from 'react';

class Sidebar extends React.Component {

  render() {
     console.log("rendering <sidebar>", this.props.children);
    
    return (
      <div className="container-fluid sideMenuBar">
        <div className="row">
          <div className="col-sm-3 bg-faded navbar-collapse collapse pt-0 sidebar" id="navbarSidebar">
            <ul className="nav nav-sidebar">
              <div id="accordion" role="tablist" aria-multiselectable="true">
                <div className="card">
                  <div className="card-header" role="tab" id="headingTwo">
                    <h5 className="mb-0">
                      <a className="collapsed navTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        MLB
                      </a>
                    </h5>
                  </div>
                  <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo">
                    <div className="card-block">
                      {this.props.children}
                      </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" role="tab" id="headingThree">
                    <h5 className="mb-0">
                      <a className="collapsed navTitle" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        NFL
                        </a>
                    </h5>
                  </div>
                  <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree">
                    <div className="card-block">
                      Pre Season Countdown! 12 Days to go!
                      </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
 
    );
  }
}


export default Sidebar;