import React, { Component } from "react";
import AWS from "assets/img/aws.png";
import AZURE from "assets/img/microsoftazure.png";
import GCP from "assets/img/google-cloud.png";
import Kubernetes from "assets/img/kubernetes.png";
import isoImage from "assets/img/iso-img.png";
import pciImage from "assets/img/pci-img.png";
import hipaaImage from "assets/img/hipaa-img.png";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import FilterPopup from "Views/AppViews/Environments/Components/FilterPopup";
import {
  getEnvironmentCount,
  getEnvsSummary,
} from "Redux/Environments/EnvironmentsThunk";
import status from "Redux/Constants/CommonDS";
import { APP_PREFIX_PATH } from "Configs/AppConfig";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import {
  getRecentVisitedEnvironments,
  setRecentVisitedEnvironments,
  deleteSelectedInfraTopologyView,
} from "Utils";
import { ToastMessage } from "Toast/ToastMessage";
import { LOGOS } from "CommonData";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Loader from "Components/Loader";
import { v4 } from "uuid";
import TitleIconWithInfoOfCard from "Components/TitleIconWithInfoOfCard";
import { USER_RBAC_TYPE } from "CommonData";
import RBAC_MAPPING from "Utils/RbacMapping";
import CheckRbacPerMission from "Views/AppViews/Rbac";

class Environments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecentVisitedEnvMenuOpen: false,
      isAddNewEnvironmentShown: false,
      searchedKey: "",
      searchedEnvSummary: [],
      collapsedTableIndex: [],
      environmentCountData: [],
      envSummary: [],
      menuSummaryShowMenu: [null, null],
      compliantShowMenu: [null, null],
      filters: {
        selectedDepartment: -1,
        selectedProduct: -1,
        selectedEnv: -1,
      },
      showFilterPopup: false,
    };
  }

  togglePopup = () => {
    this.setState({
      showFilterPopup: !this.state.showFilterPopup,
    });
  };

  componentDidMount = () => {
    this.props.getEnvironmentCount();
    this.props.getEnvsSummary();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.environmentCountData.status !==
      this.props.environmentCountData.status
    ) {
      const environmentCountData = this.props.environmentCountData;
      if (environmentCountData.status === status.SUCCESS) {
        this.setState({
          environmentCountData: environmentCountData.data,
        });
      } else if (environmentCountData.status === status.FAILURE) {
        ToastMessage.error("There is some issue.");
      }
    }
    if (prevProps.envSummary.status !== this.props.envSummary.status) {
      const envSummary = this.props.envSummary;
      if (envSummary.status === status.SUCCESS && envSummary.data) {
        this.setState({
          envSummary: envSummary.data,
          searchedEnvSummary: JSON.parse(JSON.stringify(envSummary.data)),
          showFilterPopup: false,
        });
      } else if (envSummary.status === status.FAILURE) {
        ToastMessage.error("There is some issue.");
      }
    }
  }

  // renderEnvironmentCountData = () => {
  //   const environmentCount = this.props.environmentCountData;
  //   if (environmentCount.status === status.IN_PROGRESS) {
  //     return <Loader className={"environment-loader w-100"} />;
  //   } else if (environmentCount.status === status.SUCCESS) {
  //     const { environmentCountData } = this.state;
  //     let retData = [];
  //     if (environmentCountData?.length > 0) {
  //       environmentCountData.forEach((env) => {
  //         retData.push(
  //           <Box className="environment-box" key={v4()}>
  //             <Box className="environment-title">
  //               <Box className="environment-image">
  //                 <img src={LOGOS[env?.cloud?.toUpperCase()]} alt={env.cloud} />
  //               </Box>
  //               <Box className="title-name">{env?.cloud?.toUpperCase()}</Box>
  //             </Box>
  //             <Box className="data-contant">
  //               <List>
  //                 <ListItem>
  //                   <Box className="data-text">
  //                     <span style={{ backgroundColor: "#ff9900" }}></span>
  //                     <p>Environments</p>
  //                   </Box>
  //                   <label>{env.environments}</label>
  //                 </ListItem>
  //                 <ListItem>
  //                   <Box className="data-text">
  //                     <span style={{ backgroundColor: "#0089d6" }}></span>
  //                     <p>Assets</p>
  //                   </Box>
  //                   <label>{env.assets}</label>
  //                 </ListItem>
  //                 <ListItem>
  //                   <Box className="data-text">
  //                     <span style={{ backgroundColor: "#da4f44" }}></span>
  //                     <p>Alerts</p>
  //                   </Box>
  //                   <label>{env.alerts}</label>
  //                 </ListItem>
  //                 <ListItem>
  //                   <Box className="data-text">
  //                     <span style={{ backgroundColor: "#00b929" }}></span>
  //                     <p>Total Billing</p>
  //                   </Box>
  //                   <label>
  //                     {env.totalBilling ? `&#65284;${env.totalBilling}` : ""}
  //                   </label>
  //                 </ListItem>
  //               </List>
  //             </Box>
  //           </Box>
  //         );
  //       });
  //     } else {
  //       retData = (
  //         <Box className="environment-loader w-100">
  //           There are no data available.
  //         </Box>
  //       );
  //     }
  //     return retData;
  //   } else {
  //     return (
  //       <Box className="environment-loader w-100">
  //         There is some issue. Try again later.
  //       </Box>
  //     );
  //   }
  // };

  renderEnvironmentCountData = () => {
    const environmentCount = this.props.environmentCountData;
    if (environmentCount.status === status.IN_PROGRESS) {
      return <Loader className={"environment-loader w-100"} />;
    } else if (environmentCount.status === status.SUCCESS) {
      const { environmentCountData } = this.state;
      let retData = [];
      if (environmentCountData?.length > 0) {
        environmentCountData.forEach((env, index) => {
          const backgroundColors = ["#ff9900", "#0089d6", "#da4f44", "#00b929"];
          const labels = ["Environments", "Assets", "Alerts", "Total Billing"];
          const keys = ["environments", "assets", "alerts", "totalBilling"];

          const data = keys.map((key, innerIndex) => {
            return {
              backgroundColor: backgroundColors[innerIndex],
              label: labels[innerIndex],
              value: env[key],
            };
          });

          let envCountInfo = {
            image: LOGOS[env?.cloud?.toUpperCase()],
            title: env?.cloud?.toUpperCase(),
            data,
            active: "",
          };
          retData.push(<TitleIconWithInfoOfCard cardDetails={envCountInfo} />);
        });
      } else {
        retData = (
          <Box className="environment-loader w-100">
            There are no data available.
          </Box>
        );
      }
      return retData;
    } else {
      return (
        <Box className="environment-loader w-100">
          There is some issue. Try again later.
        </Box>
      );
    }
  };
  handleMenuToggle = (envKey, accountIndex) => {
    const { menuSummaryShowMenu } = this.state;
    if (menuSummaryShowMenu[0] !== null && menuSummaryShowMenu[1] !== null) {
      this.setState({ menuSummaryShowMenu: [null, null] });
    } else {
      this.setState({ menuSummaryShowMenu: [envKey, accountIndex] });
    }
  };

  handleComplianceToggle = (envKey, accountIndex) => {
    const { compliantShowMenu } = this.state;
    if (compliantShowMenu[0] !== null && compliantShowMenu[1] !== null) {
      this.setState({ compliantShowMenu: [null, null] });
    } else {
      this.setState({ compliantShowMenu: [envKey, accountIndex] });
    }
  };

  handleTableToggle = (tableIndex) => {
    const { collapsedTableIndex } = this.state;
    const index = collapsedTableIndex.indexOf(tableIndex);
    if (index === -1) {
      collapsedTableIndex.push(tableIndex);
    } else {
      collapsedTableIndex.splice(index, 1);
    }
    this.setState({
      collapsedTableIndex,
    });
  };

  renderEnvironmentTable() {
    const envSummaryStatus = this.props.envSummary.status;
    const isRbcPermission = this.checkRbacPermissionForAction();
    if (envSummaryStatus === status.IN_PROGRESS) {
      return (
        <Loader
          className={
            "new-environment-loader text-center align-self-center p-t-20 p-b-20"
          }
        />
      );
    } else if (envSummaryStatus === status.SUCCESS) {
      const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
          color: "#ffffffff",
        },
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: "#ffffffff",
          color: "rgba(0, 0, 0, 0.87)",
          maxWidth: 250,
          fontSize: theme.typography.pxToRem(12),
          border: "1px solid #dadde9",
        },
      }));
      const {
        menuSummaryShowMenu,
        searchedEnvSummary,
        collapsedTableIndex,
        envSummary,
      } = this.state;
      let retData = [];

      if (envSummary.length > 0) {
        searchedEnvSummary.forEach((item, envIndex) => {
          let accountsJSX = [];
          item.environmentSummaryList.forEach((account, accountIndex) => {
            accountsJSX.push(
              <TableRow key={v4()}>
                <TableCell align="left">
                  <HtmlTooltip
                    className="table-tooltip"
                    title={account.landingZone}
                  >
                    <Link
                      to={`${APP_PREFIX_PATH}/assets/environments/environmentlist?landingZone=${account.landingZone}&cloudName=${account.cloud}&landingZoneId=${account.landingZoneId}`}
                      onClick={() => {
                        this.addAccountToRecentlyVisited({
                          accountType: account.cloud,
                          accountId: account.landingZone,
                          landingZoneId: account.landingZoneId,
                        });
                        deleteSelectedInfraTopologyView();
                      }}
                    >
                      {account.cloud} ({account.landingZone})
                    </Link>
                  </HtmlTooltip>
                </TableCell>
                <TableCell align="center">
                  {account.productEnclave} VPC
                </TableCell>
                <TableCell align="center">{account.totalDepartment}</TableCell>
                <TableCell align="center">{account.totalProduct}</TableCell>
                <TableCell align="center">
                  {account.totalProductProdEnv}
                </TableCell>
                <TableCell align="center">
                  {account.overallCost ? `$${account.overallCost.total}` : ""}
                </TableCell>
                <TableCell align="center">
                  <HtmlTooltip
                    className="table-tooltip"
                    title={
                      <React.Fragment>
                        <Box className="compliant-list">
                          <List>
                            <ListItem>
                              <span>
                                <img src={isoImage} alt="" />
                              </span>{" "}
                              ISO 27001 Compliant
                            </ListItem>
                            <ListItem>
                              <span>
                                <img src={pciImage} alt="" />
                              </span>{" "}
                              PCI DSS Compliant
                            </ListItem>
                            <ListItem>
                              <span>
                                <img src={hipaaImage} alt="" />
                              </span>{" "}
                              HIPAA Compliant
                            </ListItem>
                          </List>
                        </Box>
                      </React.Fragment>
                    }
                  >
                    <Button className="compliance-btn">
                      {account.compliance} Compliance
                    </Button>
                  </HtmlTooltip>
                </TableCell>
                <TableCell align="center">
                  <button
                    type="button"
                    className="list-icon"
                    onClick={(e) => {
                      isRbcPermission ? (
                        this.handleMenuToggle(envIndex, accountIndex)
                      ) : (
                        <></>
                      );
                    }}
                    disabled={!isRbcPermission}
                  >
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                  {menuSummaryShowMenu[0] === envIndex &&
                  menuSummaryShowMenu[1] === accountIndex ? (
                    <>
                      <div
                        className="open-create-menu-close"
                        onClick={(e) => {
                          this.handleMenuToggle(envIndex, accountIndex);
                        }}
                      ></div>
                      <Box className="menu-list">
                        <List>
                          <ListItem>Add New datasource</ListItem>
                          <ListItem>Add CompListItemance</ListItem>
                          <ListItem>Associate to OU</ListItem>
                          <ListItem>Add New VPC</ListItem>
                          <ListItem>Add New Product</ListItem>
                        </List>
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}
                </TableCell>
              </TableRow>
            );
          });
          if (accountsJSX.length === 0) {
            accountsJSX = (
              <TableRow>
                <TableCell
                  align="center"
                  style={{ textAlign: "center" }}
                  colSpan={7}
                >
                  There is no data with searched key.
                </TableCell>
              </TableRow>
            );
          }
          retData.push(
            <div className="environment-table" key={v4()}>
              <TableContainer className="table">
                <Table style={{ minWidth: 1220 }}>
                  <TableHead
                    className={
                      collapsedTableIndex.indexOf(envIndex) === -1
                        ? "active"
                        : ""
                    }
                  >
                    <TableRow>
                      <TableCell align="left">
                        <i
                          className={
                            collapsedTableIndex.indexOf(envIndex) === -1
                              ? "fa-solid fa-sort-down"
                              : "fa-solid fa-caret-right"
                          }
                          onClick={() => {
                            this.handleTableToggle(envIndex);
                          }}
                        ></i>
                        <Box className="environment-image">
                          <img src={LOGOS[item?.cloud?.toUpperCase()]} alt="" />
                        </Box>
                        <strong>{item?.cloud}</strong>
                      </TableCell>
                      <TableCell align="center">Product Enclave</TableCell>
                      <TableCell align="center">Departments</TableCell>
                      <TableCell align="center">Products</TableCell>
                      <TableCell align="center">Production Env</TableCell>
                      <TableCell align="center">Overall Cost</TableCell>
                      <TableCell align="center">Compliance</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  {collapsedTableIndex.indexOf(envIndex) === -1 && (
                    <TableBody>{accountsJSX}</TableBody>
                  )}
                </Table>
              </TableContainer>
            </div>
          );
        });
      } else {
        retData = (
          <Box className="chart-spinner d-flex text-center w-100 p-t-20 p-b-20">
            No environments found.
          </Box>
        );
      }
      return retData;
    } else {
      return (
        <Box className="chart-spinner d-flex text-center w-100 p-t-20 p-b-20">
          There is some issue. Try again later.
        </Box>
      );
    }
  }

  handleSearchChange = (e) => {
    let value = e.target.value;
    this.setState({ searchedKey: value });
    let { envSummary, searchedEnvSummary } = this.state;
    searchedEnvSummary = JSON.parse(JSON.stringify(envSummary));
    if (value) {
      searchedEnvSummary = searchedEnvSummary.map((cloud) => {
        cloud.environmentSummaryList = cloud.environmentSummaryList.filter(
          (item) => {
            if (
              item.landingZone.includes(value) ||
              item.cloud.toLowerCase().includes(value.toLowerCase())
            ) {
              return item;
            } else {
              return null;
            }
          }
        );
        return cloud;
      });
      this.setState({ searchedEnvSummary });
    } else {
      this.setState({
        searchedEnvSummary: JSON.parse(JSON.stringify(envSummary)),
      });
    }
  };

  addAccountToRecentlyVisited = (account) => {
    const newItem = {
      accountType: account.accountType,
      accountId: account.accountId,
      landingZoneId: account.landingZoneId,
    };
    let recentEnv = getRecentVisitedEnvironments();
    if (recentEnv !== null) {
      recentEnv.forEach((item, index) => {
        if (item.accountId === account.accountId) {
          recentEnv.splice(index, 1);
        }
      });
      recentEnv.splice(0, 0, newItem);
    } else {
      recentEnv = [newItem];
    }
    recentEnv.length = recentEnv.length > 5 ? 5 : recentEnv.length;
    setRecentVisitedEnvironments(recentEnv);
  };

  toggleRecentEnvsMenu = () => {
    this.setState({
      isRecentVisitedEnvMenuOpen: !this.state.isRecentVisitedEnvMenuOpen,
    });
  };

  renderRecentVisitedMenu = () => {
    const recentEnvs = getRecentVisitedEnvironments();
    if (recentEnvs) {
      return recentEnvs.map((item) => {
        return (
          <ListItem key={v4()}>
            <Link
              to={`${APP_PREFIX_PATH}/assets/environments/environmentlist?landingZone=${item.accountId}&cloudName=${item.accountType}&landingZoneId=${item.landingZoneId}`}
              onClick={() => this.addAccountToRecentlyVisited(item)}
            >
              <span>
                <img
                  src={LOGOS[item.accountType.toUpperCase()]}
                  alt={item.accountType}
                />
              </span>
              <p>{item.accountId}</p>
            </Link>
          </ListItem>
        );
      });
    }
    return null;
  };

  toggleAddNewEnvironmentMenu = () => {
    this.setState({
      isAddNewEnvironmentShown: !this.state.isAddNewEnvironmentShown,
    });
  };

  renderAddNewEnvironmentList = () => {
    return (
      <>
        <ListItem>
          <Link
            to={`${APP_PREFIX_PATH}/assets/environments/aws/newaccountsetup`}
          >
            <span className="image-box">
              <img src={AWS} alt="AWS" />
            </span>
            <p>Amazon Web Services</p>
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to={`${APP_PREFIX_PATH}/assets/environments/azure/newaccountsetup`}
          >
            <span className="image-box">
              <img src={AZURE} alt="AZURE" />
            </span>
            <p>Azure Cloud</p>
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to={`${APP_PREFIX_PATH}/assets/environments/gcp/newaccountsetup`}
          >
            <span className="image-box">
              <img src={GCP} alt="GCP" />
            </span>
            <p>Google Cloud Platform</p>
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to={`${APP_PREFIX_PATH}/assets/environments/kubernetes/newaccountsetup`}
          >
            <span className="image-box">
              <img src={Kubernetes} alt="Kubernetes" />
            </span>
            <p>Kubernetes</p>
          </Link>
        </ListItem>
      </>
    );
  };

  checkRbacPermissionForAddNewEnvironment = () => {
    const { ADMIN } = USER_RBAC_TYPE;
    const { EDIT_LANDING_ZONE, CREATE_LANDING_ZONE } = RBAC_MAPPING;

    const permissions = {
      [CREATE_LANDING_ZONE]: [ADMIN],
      [EDIT_LANDING_ZONE]: [ADMIN],
    };

    return CheckRbacPerMission(permissions);
  };

  checkRbacPermissionForAction = () => {
    const { ADMIN, PRODUCT_OWNERS } = USER_RBAC_TYPE;
    const {
      DELETE_LANDING_ZONE,
      REPLICATE_LANDING_ZONE,
      CREATE_PRODUCT_ENCLAVE,
    } = RBAC_MAPPING;

    const permissions = {
      [DELETE_LANDING_ZONE]: [ADMIN],
      [REPLICATE_LANDING_ZONE]: [ADMIN],
      [CREATE_PRODUCT_ENCLAVE]: [ADMIN, PRODUCT_OWNERS],
    };

    return CheckRbacPerMission(permissions);
  };
  render() {
    const {
      isRecentVisitedEnvMenuOpen,
      isAddNewEnvironmentShown,
      searchedKey,
      showFilterPopup,
      filters,
    } = this.state;
    let rbcPermission = this.checkRbacPermissionForAddNewEnvironment();

    return (
      <div className="environment-container">
        <Box className="list-heading" key={v4()}>
          <h3>Environments</h3>
        </Box>
        <Box className="environment-boxs m-t-4" key={v4()}>
          {this.renderEnvironmentCountData()}
        </Box>
        <Box className="add-new-environment" key={v4()}>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              // rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              alignItems={"center"}
              justifyContent={"flex-start"}
            >
              <Grid item lg={3} md={3} xs={12}>
                <Box className="environment-fliter">
                  <Box className="fliter-toggel" onClick={this.togglePopup}>
                    <i className="fa-solid fa-filter fillter-icon"></i>
                    Fillter
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={9} md={9} xs={12}>
                <Box sx={{ width: "100%" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                  >
                    <Grid item lg={8} md={7} xs={12}>
                      <Box className="export-sction">
                        {getRecentVisitedEnvironments() !== null && (
                          <Box className="environment-fliter">
                            <Box
                              className="fliter-toggel"
                              onClick={this.toggleRecentEnvsMenu}
                            >
                              <i className="far fa-clock fillter-icon"></i>
                              Recent
                              <i className="fa-solid fa-caret-down arrow-icon"></i>
                            </Box>
                            <Box
                              className={
                                isRecentVisitedEnvMenuOpen
                                  ? "fliter-collapse  active"
                                  : "fliter-collapse"
                              }
                            >
                              <List>{this.renderRecentVisitedMenu()}</List>
                            </Box>
                            <div
                              className={
                                isRecentVisitedEnvMenuOpen
                                  ? "fliters-collapse-bg active"
                                  : "fliters-collapse-bg"
                              }
                              onClick={this.toggleRecentEnvsMenu}
                            />
                          </Box>
                        )}
                        <Box className="environment-fliter">
                          {rbcPermission ? (
                            <>
                              <Box
                                className="fliter-toggel new-environment"
                                onClick={this.toggleAddNewEnvironmentMenu}
                              >
                                Add New Environment
                                <i className="fa-solid fa-caret-down arrow-icon"></i>
                              </Box>
                              <Box
                                className={
                                  isAddNewEnvironmentShown
                                    ? "fliter-collapse active"
                                    : "fliter-collapse"
                                }
                              >
                                <List>
                                  {this.renderAddNewEnvironmentList()}
                                </List>
                              </Box>
                            </>
                          ) : (
                            <></>
                          )}

                          <div
                            className={
                              isAddNewEnvironmentShown
                                ? "fliters-collapse-bg active"
                                : "fliters-collapse-bg"
                            }
                            onClick={this.toggleAddNewEnvironmentMenu}
                          />
                        </Box>
                        <Button
                          className="primary-btn min-width-inherit"
                          variant="contained"
                        >
                          <i className="fas fa-external-link-square-alt p-r-10"></i>
                          Export
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={5} xs={12}>
                      <Box className="search-box">
                        <Box
                          className="form-group search-control-group m-b-0"
                          key="search_box"
                        >
                          <input
                            id={`search_envs`}
                            type="text"
                            className="input-group-text"
                            placeholder="Search"
                            name="searchedKey"
                            value={searchedKey}
                            onChange={this.handleSearchChange}
                            autoFocus={
                              document.activeElement.id === `search_envs`
                                ? "autofocus"
                                : null
                            }
                          />
                          <button className="search-btn">
                            <i className="fa fa-search" />
                          </button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {this.renderEnvironmentTable()}

        {showFilterPopup ? (
          <FilterPopup
            showModal={showFilterPopup}
            togglePopup={this.togglePopup}
            selectedFilters={filters}
            handleSubmitFilter={(filters) => {
              this.setState({ filters });
            }}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { environmentCountData, envSummary } = state.environments;
  return {
    environmentCountData,
    envSummary,
  };
}

const mapDispatchToProps = {
  getEnvironmentCount,
  getEnvsSummary,
};

export default connect(mapStateToProps, mapDispatchToProps)(Environments);
