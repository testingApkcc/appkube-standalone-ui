import { escape } from "lodash";
import { object } from "prop-types";
import React, { Component } from "react";
import { Collapse } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { ToastMessage } from "../../../Toast/ToastMessage";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
class AddTaggingWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "Parent 1",
        id: 1,
        departments: [
          {
            id: "11",
            name: "Department 1",
            products: [
              {
                id: "111",
                name: "Produt 111",
                deploymentEnvironments: [
                  {
                    id: "1111",
                    name: "deploymentEnvironments 11111",
                    modules: [
                      {
                        id: "1111111",
                        name: "modules 11111111",
                        appServices: [
                          {
                            id: "1111111111",
                            name: "appServices 1",
                          },
                          {
                            id: "1111111111112",
                            name: "appServices 11111111111112",
                          },
                        ],
                        dataServices: [
                          {
                            id: "1111111111454545",
                            name: "appServices 1",
                          },
                          {
                            id: "11111111111145645454452",
                            name: "appServices 111111111111124545645",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      toggleTree: {
        parent: false,
        departments: {},
        products: {},
        deploymentEnvironments: {},
        modules: {},
      },
      wizardPathNames: [],
    };
  }
  getDiscoverAssest(id) {
    return fetch(
      `http://34.199.12.114:5057/api/organizations/search?landingZone=${id}`
    )
      .then((response) => response.json())
      .then((res) => {
        if (res["status"] != 404) {
          this.setState({ ...this.state, ["data"]: res });
        }
      });
  }
  componentDidMount() {
    let getId = this.handleGetId();
    // this.getDiscoverAssest(getId);
  }
  handleToggleTree(type, id = 0, isChecked) {
    let { toggleTree } = this.state;
    if (type != "parent") {
      toggleTree[`${type}`][id] = !toggleTree[`${type}`][id];
    }
    this.setState({
      ...this.state,
      ["toggleTree"]: {
        ...this.state.toggleTree,
        ["parent"]:
          type == "parent"
            ? !this.state.toggleTree[`${type}`]
            : this.state.toggleTree[`parent`],
        ["departments"]:
          type == "departments"
            ? toggleTree[`${type}`]
            : type == "parent"
            ? isChecked
              ? this.state.toggleTree[`departments`]
              : {}
            : this.state.toggleTree[`departments`],
        ["products"]:
          type == "products"
            ? toggleTree[`${type}`]
            : type == "departments" || type == "parent"
            ? isChecked
              ? this.state.toggleTree[`products`]
              : {}
            : this.state.toggleTree[`products`],
        ["deploymentEnvironments"]:
          type == "deploymentEnvironments"
            ? toggleTree[`${type}`]
            : type == "departments" || type == "products" || type == "parent"
            ? isChecked
              ? this.state.toggleTree[`deploymentEnvironments`]
              : {}
            : this.state.toggleTree[`deploymentEnvironments`],
        ["modules"]:
          type == "modules"
            ? toggleTree[`${type}`]
            : type == "departments" ||
              type == "products" ||
              type == "deploymentEnvironments" ||
              type == "parent"
            ? isChecked
              ? this.state.toggleTree[`modules`]
              : {}
            : this.state.toggleTree[`modules`],
      },
      ["wizardPathNames"]:
        type == "modules" ? this.state[`wizardPathNames`] : [],
    });
  }
  // handleToggleTree(type, id = 0, isChecked) {
  //   let { toggleTree } = this.state;
  //   if (type == "parent") {
  //     this.setState({
  //       ...this.state,
  //       ["toggleTree"]: {
  //         ...this.state.toggleTree,
  //         [`${type}`]: !this.state.toggleTree[`${type}`],
  //         ["departments"]: isChecked
  //           ? this.state.toggleTree[`departments`]
  //           : {},
  //         ["products"]: isChecked ? this.state.toggleTree[`products`] : {},
  //         ["deploymentEnvironments"]: isChecked
  //           ? this.state.toggleTree[`deploymentEnvironments`]
  //           : {},
  //         ["modules"]: isChecked ? this.state.toggleTree[`modules`] : {},
  //       },
  //     });
  //   } else if (type == "departments") {
  //     toggleTree["departments"][id] = !toggleTree["departments"][id];
  //     this.setState({
  //       ...this.state,
  //       ["toggleTree"]: {
  //         ...this.state.toggleTree,
  //         ["departments"]: toggleTree["departments"],
  //         ["products"]: isChecked ? this.state.toggleTree[`products`] : {},
  //         ["deploymentEnvironments"]: isChecked
  //           ? this.state.toggleTree[`deploymentEnvironments`]
  //           : {},
  //         ["modules"]: isChecked ? this.state.toggleTree[`modules`] : {},
  //       },
  //       ["wizardPathNames"]: [],
  //     });
  //   } else if (type == "products") {
  //     toggleTree["products"][id] = !toggleTree["products"][id];
  //     this.setState({
  //       ...this.state,
  //       ["toggleTree"]: {
  //         ...this.state.toggleTree,
  //         ["products"]: toggleTree["products"],
  //         ["deploymentEnvironments"]: isChecked
  //           ? this.state.toggleTree[`deploymentEnvironments`]
  //           : {},
  //         ["modules"]: isChecked ? this.state.toggleTree[`modules`] : {},
  //       },
  //       ["wizardPathNames"]: [],
  //     });
  //   } else if (type == "deploymentEnvironments") {
  //     toggleTree["deploymentEnvironments"][id] =
  //       !toggleTree["deploymentEnvironments"][id];
  //     this.setState({
  //       ...this.state,
  //       ["toggleTree"]: {
  //         ...this.state.toggleTree,
  //         ["deploymentEnvironments"]: toggleTree["deploymentEnvironments"],
  //         ["modules"]: isChecked ? this.state.toggleTree[`modules`] : {},
  //       },
  //       ["wizardPathNames"]: [],
  //     });
  //   } else if (type == "modules") {
  //     toggleTree["modules"][id] = !toggleTree["modules"][id];
  //     this.setState({
  //       ...this.state,
  //       ["toggleTree"]: {
  //         ...this.state.toggleTree,
  //         ["modules"]: toggleTree["modules"],
  //       },
  //     });
  //   }
  // }
  handlePath(data, checked) {
    let { wizardPathNames } = this.state;
    let pathKeys = ["PRODUCT", "ENV", "MODULE", "SERVICE", "SERVICE_TYPE"];
    if (checked) {
      this.handleDiscoverAssetsUpdate(data).then((res) => {
        if (res && res.tag) {
          let tagPath = res.tag.split(",");
          let newPath = "";
          tagPath.forEach((tempData, key) => {
            if (key > 1) {
              newPath += " > ";
            }
            if (key > 0) {
              newPath += tempData.replace(`${pathKeys[key - 1]}=`, "");
            }
          });
          wizardPathNames.push({
            id: data.id,
            value: newPath,
            type: data.type,
            tagId: res.id,
          });
          this.setState({
            ...this.state,
            ["wizardPathNames"]: wizardPathNames,
          });
          ToastMessage("Tag Added", "success");
        }
      });
    } else {
      let getTabId = wizardPathNames.filter((path) => path.id == data.id);
      this.handleTagDelete(getTabId.length && getTabId[0].tagId).then((res) => {
        if (res) {
          wizardPathNames = wizardPathNames.filter(
            (path) => path.id != data.id
          );
          this.setState({
            ...this.state,
            ["wizardPathNames"]: wizardPathNames,
          });
          ToastMessage("Tag untagged", "success");
        }
      });
    }
  }
  handleGetId() {
    try {
      return this.props.params.id;
    } catch (e) {
      console.log(e);
    }
  }
  handleGetLandingId() {
    try {
      return this.props.params.landingZone;
    } catch (e) {
      console.log(e);
    }
  }
  handleDiscoverAssetsUpdate(otherparams) {
    let getLandingId = this.handleGetLandingId();
    let getId = this.handleGetId();

    return fetch(
      `http://34.199.12.114:5057/api/service-allocations/search?landingZone=${getLandingId}&${otherparams.id}`
    )
      .then((response) => response.json())
      .then((res) => {
        if (res && res.length) {
          return fetch(`http://34.199.12.114:5057/api/tags`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              discoveredAsset: {
                id: getId,
              },
              serviceAllocation: otherparams.serviceAllocation,
              tag: otherparams.value + res[0].serviceType,
            }),
          })
            .then((response) => response.json())
            .then((res) => res);
        }
      });
  }
  // async handleDiscoverAssetsUpdate(otherparams) {
  //   let getLandingId = this.handleGetLandingId();
  //   let getId = this.handleGetId();
  //   return new Promise(async function (myResolve, myReject) {
  //     const response = await fetch(
  //       `http://34.199.12.114:5057/api/service-allocations/search?landingZone=${getLandingId}&${otherparams.id}`
  //     );
  //     const discoverDataId = await response.json();
  //     if (discoverDataId && discoverDataId.length) {
  //       const response = await fetch(`http://34.199.12.114:5057/api/tags`, {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         method: "POST",
  //         body: JSON.stringify({
  //           discoveredAsset: {
  //             id: getId,
  //           },
  //           serviceAllocation: otherparams.serviceAllocation,
  //           tag: otherparams.value + discoverDataId[0].serviceType,
  //         }),
  //       });
  //       const discoverData = await response.json();
  //       myResolve(discoverData);
  //     }
  //   });
  // }
  handleTagDelete(id) {
    return fetch(`http://34.199.12.114:5057/api/tags/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then(
      (res) => {},
      (error) => error.status == 204
    );
  }

  // async handleTagDelete(id) {
  //   return new Promise(async function (myResolve, myReject) {
  //     const response = await fetch(`http://34.199.12.114:5057/api/tags/${id}`, {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       method: "DELETE",
  //     });

  //     if (response.status == 204) {
  //       myResolve(true);
  //     }
  //   });
  // }
  handlemodule(searchString) {
    let { wizardPathNames } = this.state;
    let pathKeys = ["PRODUCT", "ENV", "MODULE", "SERVICE", "SERVICE_TYPE"];
    return fetch(`http://34.199.12.114:5057/api/tags/search?${searchString}`)
      .then((response) => response.json())
      .then((res) => {
        if (res && res.length) {
          res.forEach((tag) => {
            let tagId = `departmentId=${tag.serviceAllocation.departmentId}&productId=${tag.serviceAllocation.productId}&deploymentEnvironmentId=${tag.serviceAllocation.deploymentEnvironmentId}&moduleId=${tag.serviceAllocation.moduleId}&servicesId=${tag.serviceAllocation.servicesId}`;
            if (
              wizardPathNames.filter(
                (path) =>
                  path.id == tagId &&
                  path.type == tag.serviceAllocation.serviceType
              ).length == 0
            ) {
              let tagPath = tag.tag.split(",");
              let newPath = "";
              tagPath.forEach((tempData, key) => {
                if (key > 1) {
                  newPath += " > ";
                }
                if (key > 0) {
                  newPath += tempData.replace(`${pathKeys[key - 1]}=`, "");
                }
              });
              wizardPathNames.push({
                id: `departmentId=${tag.serviceAllocation.departmentId}&productId=${tag.serviceAllocation.productId}&deploymentEnvironmentId=${tag.serviceAllocation.deploymentEnvironmentId}&moduleId=${tag.serviceAllocation.moduleId}&servicesId=${tag.serviceAllocation.servicesId}`,
                type: tag.serviceAllocation.serviceType,
                value: newPath,
                tagId: tag.id,
              });
            }
          });
          this.setState({
            ...this.state,
            ["wizardPathNames"]: wizardPathNames,
          });
        }
      });
  }
  renderDiscoverAssests() {
    return Object.keys(this.state.data).length ? (
      this.renderParent("parent", this.state.data)
    ) : (
      <></>
    );
  }
  renderParent(type, data) {
    return (
      <tr>
        <td>
          {/* <div className="table-contant">
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => {
                this.handleToggleTree(type, 0, e.target.checked);
              }}
            />
            <span>{data.name}</span>
          </div> */}
          {this.renderCommonHtml(type, data.name, 0)}
          {this.isDepartMentListExist(data.departments) ? (
            <table className="data-table inner">
              {this.renderDepartment("departments", data.departments)}
            </table>
          ) : (
            <></>
          )}
        </td>
      </tr>
    );
  }
  renderDepartment(type, data) {
    return data.map((department, index) => {
      return (
        <tr key={index}>
          <td>
            {/* <div className="table-contant">
              <input
                type="checkbox"
                className="checkbox"
                onChange={(e) => {
                  this.handleToggleTree(
                    "departments",
                    department.id,
                    e.target.checked
                  );
                }}
                checked={this.state.toggleTree["departments"] &&
                  this.state.toggleTree["departments"][department.id]
                }
              />
              <span>{department.name}</span>
            </div> */}
            {this.renderCommonHtml(
              "departments",
              department.name,
              department.id
            )}
            {this.isProductListExist(department.products, department.id) ? (
              <table className="data-table inner">
                {this.renderProducts(
                  "products",
                  department.products,
                  department.id
                )}
              </table>
            ) : (
              <></>
            )}
          </td>
        </tr>
      );
    });
  }
  renderProducts(type, data, departmentId) {
    return data.map((product, index) => {
      return (
        <tr key={index}>
          <td>
            {/* <div className="table-contant">
              <input
                type="checkbox"
                className="checkbox"
                onChange={(e) => {
                  this.handleToggleTree(
                    "products",
                    `${departmentId}_${product.id}`,
                    e.target.checked
                  );
                }}
                checked={
                  this.state.toggleTree["products"] &&
                  this.state.toggleTree["products"][
                    `${departmentId}_${product.id}`
                  ]
                }
              />
              <span>{product.name}</span>
            </div> */}
            {this.renderCommonHtml(
              "products",
              product.name,
              `${departmentId}_${product.id}`
            )}
            {this.isDepolyMentListExist(
              product.deploymentEnvironments,
              `${departmentId}_${product.id}`
            ) ? (
              <table className="data-table inner">
                {this.renderDeploymentEnvironments(
                  "deploymentEnvironments",
                  product.deploymentEnvironments,
                  { department: departmentId, product: product.id },
                  {
                    product: product.name,
                  }
                )}
              </table>
            ) : (
              <></>
            )}
          </td>
        </tr>
      );
    });
  }
  renderDeploymentEnvironments(type, data, ids, names) {
    return data.map((deploymentEnvironment, index) => {
      return (
        <tr key={index}>
          <td>
            {/* <div className="table-contant">
              <input
                type="checkbox"
                className="checkbox"
                onChange={(e) => {
                  this.handleToggleTree(
                    "deploymentEnvironments",
                    `${ids.department}_${ids.product}_${deploymentEnvironment.id}`,
                    e.target.checked
                  );
                }}
                checked={
                  this.state.toggleTree["deploymentEnvironments"] &&
                  this.state.toggleTree["deploymentEnvironments"][
                    `${ids.department}_${ids.product}_${deploymentEnvironment.id}`
                  ]
                }
              />
              <span>{deploymentEnvironment.name}</span>
            </div> */}
            {this.renderCommonHtml(
              "deploymentEnvironments",
              deploymentEnvironment.name,
              `${ids.department}_${ids.product}_${deploymentEnvironment.id}`
            )}
            {this.isModuleListExist(
              deploymentEnvironment.modules,
              `${ids.department}_${ids.product}_${deploymentEnvironment.id}`
            ) ? (
              <table className="data-table inner">
                {this.renderModule(
                  "modules",
                  deploymentEnvironment.modules,
                  {
                    department: ids.department,
                    product: ids.product,
                    deploymentEnvironment: deploymentEnvironment.id,
                  },
                  {
                    ...names,
                    ...{ deploymentEnvironment: deploymentEnvironment.name },
                  }
                )}
              </table>
            ) : (
              <></>
            )}
          </td>
        </tr>
      );
    });
  }
  renderModule(type, data, ids, names) {
    return data.map((module, index) => {
      return (
        <tr key={index}>
          <td>
            {/* <div className="table-contant">
              <input
                type="checkbox"
                className="checkbox"
                onChange={(e) => {
                  this.handleToggleTree(
                    "modules",
                    `${ids.department}_${ids.product}_${ids.deploymentEnvironment}_${module.id}`,
                    e.target.checked
                  );
                  if (e.target.checked) {
                    this.handlemodule(
                      `landingZone=${this.handleGetLandingId()}&departmentId=${
                        ids.department
                      }&productId=${ids.product}&deploymentEnvironmentId=${
                        ids.deploymentEnvironment
                      }&moduleId=${
                        module.id
                      }&discoveredAssetId=${this.handleGetId()}`
                    );
                  }
                }}
                checked={
                  this.state.toggleTree["modules"] &&
                  this.state.toggleTree["modules"][
                    `${ids.department}_${ids.product}_${ids.deploymentEnvironment}_${module.id}`
                  ]
                }
              />
              <span>{module.name}</span>
            </div> */}
            {this.renderCommonHtml(
              "modules",
              module.name,
              `${ids.department}_${ids.product}_${ids.deploymentEnvironment}_${module.id}`,
              () => {
                return this.handlemodule(
                  `landingZone=${this.handleGetLandingId()}&departmentId=${
                    ids.department
                  }&productId=${ids.product}&deploymentEnvironmentId=${
                    ids.deploymentEnvironment
                  }&moduleId=${
                    module.id
                  }&discoveredAssetId=${this.handleGetId()}`
                );
              }
            )}
            {this.state.toggleTree["modules"] &&
            this.state.toggleTree["modules"][
              `${ids.department}_${ids.product}_${ids.deploymentEnvironment}_${module.id}`
            ] &&
            module.appServices &&
            module.appServices.length ? (
              <table className="data-table inner">
                {this.renderAppServices(
                  "appService",
                  module.appServices,
                  {
                    department: ids.department,
                    product: ids.product,
                    deploymentEnvironment: ids.deploymentEnvironment,
                    module: module.id,
                  },
                  { ...names, ...{ module: module.name } }
                )}
              </table>
            ) : (
              <></>
            )}
            {this.state.toggleTree["modules"] &&
            this.state.toggleTree["modules"][
              `${ids.department}_${ids.product}_${ids.deploymentEnvironment}_${module.id}`
            ] &&
            module.dataServices &&
            module.dataServices.length ? (
              <table className="data-table inner">
                {this.renderDataServices(
                  "dataService",
                  module.dataServices,
                  {
                    department: ids.department,
                    product: ids.product,
                    deploymentEnvironment: ids.deploymentEnvironment,
                    module: module.id,
                  },
                  { ...names, ...{ module: module.name } }
                )}
              </table>
            ) : (
              <></>
            )}
          </td>
        </tr>
      );
    });
  }
  renderAppServices(type, data, ids, names) {
    return data.map((appService, index) => {
      return (
        <tr key={index}>
          <td>
            {/* <div className="table-contant">
              <input
                type="checkbox"
                className="checkbox"
                onChange={(e) => {
                  this.handlePath(
                    this.getHandlePathFirstArgs(
                      { ...ids, ...{ appService: appService.id } },
                      { ...names, ...{ appService: appService.name } },
                      "APP"
                    ),
                    e.target.checked,
                    appService.id
                  );
                }}
                checked={this.isServiceTagged(ids, "APP")}
              />
              <span>{appService.name}</span>
            </div> */}
            {this.renderCommonHtml("APP", appService.name, ids, (isChecked) => {
              return this.handlePath(
                this.getHandlePathFirstArgs(
                  { ...ids, ...{ appService: appService.id } },
                  { ...names, ...{ appService: appService.name } },
                  "APP"
                ),
                isChecked,
                appService.id
              );
            })}
          </td>
        </tr>
      );
    });
  }
  renderDataServices(type, data, ids, names) {
    return data.map((dataService, index) => {
      return (
        <tr key={index}>
          <td>
            {/* <div className="table-contant">
              <input
                type="checkbox"
                className="checkbox"
                onChange={(e) => {
                  this.handlePath(
                    this.getHandlePathFirstArgs(
                      { ...ids, ...{ dataService: dataService.id } },
                      { ...names, ...{ dataService: dataService.name } },
                      "DATA"
                    ),
                    e.target.checked,
                    dataService.id
                  );
                }}
                checked={this.isServiceTagged(ids, "DATA")}
              />
              <span>{dataService.name}</span>
            </div> */}
            {this.renderCommonHtml(
              "DATA",
              dataService.name,
              ids,
              (isChecked) => {
                return this.handlePath(
                  this.getHandlePathFirstArgs(
                    { ...ids, ...{ dataService: dataService.id } },
                    { ...names, ...{ dataService: dataService.name } },
                    "DATA"
                  ),
                  isChecked,
                  dataService.id
                );
              }
            )}
          </td>
        </tr>
      );
    });
  }
  getHandlePathFirstArgs(ids, names, type) {
    return {
      id: `departmentId=${ids.department}&productId=${
        ids.product
      }&deploymentEnvironmentId=${ids.deploymentEnvironment}&moduleId=${
        ids.module
      }&servicesId=${type == "APP" ? ids.appService : ids.dataService}`,
      value: `asset-id-${this.handleGetId()},PRODUCT=${names.product},ENV=${
        names.deploymentEnvironment
      },MODULE=${names.module},SERVICE=${
        type == "APP" ? ids.appService : ids.dataService
      },SERVICE_TYPE=`,
      currentId: type == "APP" ? ids.appService : ids.dataService,
      type: type,
      serviceAllocation: {
        landingZone: this.handleGetLandingId(),
        departmentId: ids.department,
        productId: ids.product,
        deploymentEnvironmentId: ids.deploymentEnvironment,
        moduleId: ids.module,
        servicesId: type == "APP" ? ids.appService : ids.dataService,
      },
    };
  }
  isServiceTagged(ids, type) {
    return (
      this.state.wizardPathNames &&
      this.state.wizardPathNames.length &&
      this.state.wizardPathNames.filter(
        (path) =>
          path.type == type &&
          path.id ==
            `departmentId=${ids.department}&productId=${
              ids.product
            }&deploymentEnvironmentId=${ids.deploymentEnvironment}&moduleId=${
              ids.module
            }&servicesId=${type == "APP" ? ids.appService : ids.dataService}`
      ).length > 0
    );
  }
  isDepartMentListExist(data) {
    return this.state.toggleTree.parent && data && data.length;
  }
  isProductListExist(data, id) {
    return (
      this.state.toggleTree["departments"] &&
      this.state.toggleTree["departments"][id] &&
      data &&
      data.length
    );
  }
  isDepolyMentListExist(data, id) {
    return (
      this.state.toggleTree["products"] &&
      this.state.toggleTree["products"][`${id}`] &&
      data &&
      data.length
    );
  }
  isModuleListExist(data, id) {
    return (
      this.state.toggleTree["deploymentEnvironments"] &&
      this.state.toggleTree["deploymentEnvironments"][id] &&
      data &&
      data.length
    );
  }
  renderCommonHtml(type, name, id, callBackFunction) {
    return (
      <div className="table-contant">
        <input
          type="checkbox"
          className="checkbox"
          onChange={(e) => {
            if (type == "APP" || type == "DATA") {
              callBackFunction(e.target.checked);
            } else {
              this.handleToggleTree(type, id, e.target.checked);
              if (type == "modules" && e.target.checked) {
                callBackFunction();
              }
            }
          }}
          checked={
            type == "APP" || type == "DATA"
              ? this.isServiceTagged(id, type)
              : this.renderIsChecked(type, id)
          }
        />
        <span>{name}</span>
      </div>
    );
  }
  renderIsChecked(type, id) {
    return (
      this.state.toggleTree[`${type}`] && this.state.toggleTree[`${type}`][id]
    );
  }
  render() {
    return (
      <div className="asset-container">
        <div className="tagging-wizard-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="asset-heading">Discovered Assets</div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="float-right common-right-btn">
                  <a
                    className="white-button m-r-0"
                    href="/assetmanager/pages/taggingWizard"
                  >
                    <i className="fa fa-arrow-circle-left"></i>
                    &nbsp;&nbsp; Back
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className=" common-container border-bottom-0">
            <div className="urganisational-unit-container add-tagging-contant">
              <div className="associate-head p-b-1">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <strong>Associate Elements</strong>
                  </div>
                </div>
              </div>
              <div className="select-resources">
                <p className="m-t-1">
                  Please select below the resources you want to tag with element
                </p>
                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="resources-box">
                      <div className="resources-title">
                        <h4 className="m-b-0">Resources</h4>
                      </div>
                      <div className="resources-contant">
                        <table className="data-table">
                          {this.renderDiscoverAssests()}
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="resources-box">
                      <div className="resources-title">
                        <h4 className="m-b-0">Existing tags of element</h4>
                      </div>
                      {this.state.wizardPathNames &&
                      this.state.wizardPathNames.length ? (
                        this.state.wizardPathNames.map((path) => {
                          return (
                            <div className="existing-tags-contant">
                              <div className="existing-tags-text">
                                <p>{path.value}</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withParams(AddTaggingWizard);