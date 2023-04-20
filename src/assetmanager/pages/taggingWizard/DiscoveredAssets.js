import React, { Component } from "react";
import awsLogo from "../../img/aws.png";
import microsoftAzureLogo from "../../img/microsoftazure.png";
import gcpLogo from "../../img/google-cloud.png";
import Table from "./components/table";
import { NavLink  } from "react-router-dom";

export class DiscoveredAssets extends Component {
  constructor(props) {
    super(props);
    this.perPageLimit = 3;
    // this.checkboxValue = true;
    this.state = {
      columns: [
        {
          label: "Element ID",
          key: "name",
        },
        {
          label: "Element Type",
          key: "ruleType",
        },
        {
          label: "Landing Zone",
          key: "message",
        },
        {
          label: "Product Enclave",
          key: "alertHandlers",
        },
        {
          label: "Tag Status",
          key: "action",
          renderCallback: () => {
            return (
              <td>
                <div className="tagged-box d-inline-block">
                  <i class="far fa-check"></i>
                </div>
                Tagged
              </td>
            );
          },
        },
        {
          label: "Action",
          key: "alertHandlers",
          renderCallback: (value, index) => {
            return (
              <td className="text-center">
                <button className="action-btn">
                   <NavLink
                        to={`/assetmanager/pages/addTaggingWizard/${index.id}`}
                      > 
                    <i class="far fa-plus"></i>
                    </NavLink>
                  {/* </a> */}
                </button>
              </td>
            );
          },
        },
      ],
      data: [ ],
    };
    // this.tableValue = ;
  }
  async getAssets(){
    const response = await fetch(
      `http://34.199.12.114:5057/api/discovered-assets`
    );
    const tableData = await response.json();
    let tableValue = tableData.map((asset)=>{
        return {
          id: asset.id,
          name: asset.elementId,
          ruleType: asset.elementType,
          message: asset.landingZone,
          alertHandlers:asset.productEnclave,
        }
    });
    // this.tableValue.data = tableValue
    this.setState({...this.tableValue,['data']:tableValue});
  }
    componentDidMount() {
      this.getAssets()
    }
  
  isLightTheme() {
    const w = window;
    if (w.grafanaBootData && w.grafanaBootData.user) {
      return w.grafanaBootData.user.lightTheme;
    }
    return false;
  }

  render() {
    return (
      <div className="discovered-assets-contant">
        <div className="tagging-wizard-head">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <div className="discovered-edit-logos">
                <ul>
                  <li>
                    <a className="active">
                      <span>
                        <img src={awsLogo} alt="" />
                      </span>
                      <p>AWS</p>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>
                        <img src={gcpLogo} alt="" />
                      </span>
                      <p>GCP</p>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>
                        <img src={microsoftAzureLogo} alt="" />
                      </span>
                      <p>Azure</p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="search-box">
                <form>
                  <div className="form-group search-control-group">
                    <input
                      type="text"
                      className="input-group-text"
                      placeholder="Search"
                      value=""
                    />
                    <button>
                      <i className="fa fa-search"></i>
                    </button>
                    <div className="close-icon">
                      <i class="far fa-times"></i>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="alert-data-table-container managealertrules-data-table-container">
          <Table
            valueFromData={this.state}
            perPageLimit={this.perPageLimit}
            visiblecheckboxStatus={this.checkboxValue}
            tableClasses={{
              table: "alert-data-tabel",
              tableParent: "alerts-data-tabel",
              parentClass: "all-alert-data-table",
            }}
            searchKey="name"
            showingLine="Showing %start% to %end% of %total%"
            dark={!this.isLightTheme()}
          />
        </div>
      </div>
    );
  }
}

export default DiscoveredAssets;