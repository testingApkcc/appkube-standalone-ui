import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../img";
import { CommonService } from "../_common/common";
import { RestService } from "../_service/RestService";

class AddDatasourceInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      environment: "",
      account: "",
      sourceList: {},
    };
  }

  async componentDidMount() {
    await this.getAccountList();
  }

  getAccountList = async () => {
    try {
      await RestService.getData(
        "http://localhost:3000/api/plugins/filter-datasource/key=cloudwatCH,TESTDATA,grafana-azure-monitor-datasource",
        null,
        null
      ).then((response) => {
        console.log(response);
        this.manipulateData(response);
        console.log("Loading Asstes : ", response);
      });
    } catch (err) {
      console.log("Loading Asstes failed. Error: ", err);
    }
  };

  manipulateData = (data) => {
    let dataobj = {};
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        dataobj[data[i].category] = dataobj[data[i].category] || [];
        dataobj[data[i].category].push(data[i]);
      }
    }
    this.setState({
      sourceList: dataobj,
    });
  };

  displayDataSource = () => {
    let retData = [];
    const { sourceList } = this.state;
    console.log(sourceList);
    let accountId = CommonService.getParameterByName(
      "accountId",
      window.location.href
    );
    if (sourceList) {
      Object.keys(sourceList).map((source, indexedDB) => {
        retData.push(
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="services-heading">
                <span>
                  <img src={images.awsLogo} alt="" />
                </span>
                <h5>{source ? source : "Others"}</h5>
              </div>
              <div className="account-specific-content">
                <span>{source} Account specific input source</span>
                <div className="specific-heading">
                  <p>
                    Account &#8758;
                  </p>
                </div>
              </div>
              <div className="source-boxs">
                <div className="row">
                  {sourceList[source] &&
                    sourceList[source].map((accountdata, i) => {
                      return (
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                          <Link
                            to={`/add-datasource-credential?sourceName=${accountdata.name}&&accountId=${accountId}`}
                          >
                            <div className="source-box">
                              <div className="images">
                                <img
                                  src={accountdata.typeLogoUrl}
                                  height="50px"
                                  width="50px"
                                  alt=""
                                />
                              </div>
                              <div className="source-content">
                                <label>{accountdata.name}</label>
                                <span>{accountdata.type}</span>
                                <p>
                                  Receive traces and store in local Zipkin DB
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return retData;
  };

  onChangeDataSource = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="add-data-source-container">
        <div className="add-data-source-page-container">
          <div className="data-source-section">
            <div className="source-content">
              <div className="add-input-content">
                <div className="form-group">
                  <div className="right-search-bar">
                    <div className="form-group search-control m-b-0">
                      <i className="fa fa-search" />
                      <input
                        type="text"
                        className="input-group-text"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
                <div className="back-btn">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-link"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className="specific-input-content">
                {this.displayDataSource()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddDatasourceInputs;