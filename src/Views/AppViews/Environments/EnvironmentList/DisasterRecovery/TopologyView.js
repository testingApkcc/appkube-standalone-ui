import React, { Component } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Box, Grid } from "@mui/material";
import { v4 } from "uuid";
let transformScale = 0;

let zoomElement = () => {};

class TopologyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // active view maintains the current active node on the given level.
      // at index 0, 0 node will be by default active. -1 indicates that that level would render but
      // there will not be any active node.
      // it would also contain sublevel. if at index 2, value is 0.1, that means,
      // at level 2, sublevel 0, index 1 is active.
      activeView: [0, -1],
      currentActiveNode: "",
    };
  }

  renderBody = () => {
    const { data } = this.props;
    const strokeStyles = { strokeColor: "#a5a5d7", strokeWidth: 2 };
    const { activeView } = this.state;
    return (
      <ArcherContainer
        noCurves
        style={{
          width: `100%`,
          height: "100%",
        }}
      >
        <TransformWrapper
          onTransformed={(instance) => {
            transformScale = instance && instance.state.scale;
            this.setState({ scale: true });
          }}
        >
          {({ zoomIn, zoomOut, instance, zoomToElement, ...rest }) => {
            transformScale = instance.transformState.scale;
            zoomElement = zoomToElement;
            return (
              <>
                <div className="gmnoprint">
                  <div className="gmnoprint-plus-minus">
                    <button className="btn btn-plus" onClick={() => zoomIn()}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <button className="btn btn-minus" onClick={() => zoomOut()}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                  <div
                    className="gmnoprint-map"
                    onClick={() => {
                      this.zoomToElementCallback(300);
                    }}
                  >
                    <button className="btn btn-map">
                      <i className="fa-solid fa-map-marker-alt"></i>
                    </button>
                  </div>
                </div>
                <TransformComponent
                  wrapperStyle={{
                    width: `100%`,
                    height: "100%",
                  }}
                  contentStyle={{
                    width: `${this.state.activeView.length * 200}px`,
                    height: "100%",
                    transform: "translate(0px, 0px) scale(0)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArcherElement
                    id="root"
                    relations={[
                      {
                        targetId: this.getTargetId(1),
                        targetAnchor: "left",
                        sourceAnchor: "right",
                        style: strokeStyles,
                      },
                    ]}
                  >
                    <div
                      className="services-text-box active"
                      id={`${data.label}`}
                    >
                      <div className="d-flex">
                        <div className="account-image">
                          <img src={data.image} alt="aws image" />
                        </div>
                        <div className="account-id">
                          <span id="custom_location_1" className="d-block">
                            {data.label}
                          </span>
                          <span className="d-block">{data.subLabel}</span>
                        </div>
                      </div>
                    </div>
                  </ArcherElement>
                  {data.children.length ? (
                    this.renderChildNodes(data.children, 1, activeView)
                  ) : (
                    <></>
                  )}
                </TransformComponent>
              </>
            );
          }}
        </TransformWrapper>
      </ArcherContainer>
    );
  };

  getTargetId = (currentLevel) => {
    const activeNode = this.getChild(currentLevel);
    if (activeNode) {
      return activeNode.label;
    }
    return "";
  };

  getChild = (level) => {
    const { activeView } = this.state;
    const { data } = this.props;
    let retData = data;
    for (let i = 0; i <= level; i++) {
      if (i === 0) {
        retData = data;
      } else {
        if (activeView[i] && activeView[i] !== -1) {
          let activeSublevel = parseInt(activeView[i].split(".")[0]);
          let activeNode = parseInt(activeView[i].split(".")[1]);
          retData = retData.children[activeSublevel][activeNode];
        } else {
          retData = null;
          break;
        }
      }
    }
    return retData;
  };

  renderChildNodes = (nodes, currentLevel, activeView) => {
    let retData = [];
    const strokeStyles = { strokeColor: "#a5a5d7", strokeWidth: 2 };
    if (activeView.length > currentLevel) {
      let activeSublevel = -1;
      let activeNode = -1;
      if (activeView[currentLevel] !== -1) {
        activeSublevel = parseInt(activeView[currentLevel].split(".")[0]);
        activeNode = parseInt(activeView[currentLevel].split(".")[1]);
      }
      const childJSX = [];
      nodes.map((item, sublevelIndex) => {
        if (item.length > 0) {
          retData.push(
            <ul>
              {item.map((item, nodeIndex) => {
                if (item.children.length > 0) {
                  if (
                    activeSublevel === sublevelIndex &&
                    activeNode === nodeIndex
                  ) {
                    childJSX.push(
                      this.renderChildNodes(
                        item.children,
                        currentLevel + 1,
                        activeView
                      )
                    );
                  }
                }
                return (
                  <ArcherElement
                    key={v4()}
                    id={item.label}
                    relations={[
                      {
                        targetId:
                          activeSublevel === sublevelIndex &&
                          activeNode === nodeIndex
                            ? this.getTargetId(currentLevel + 1)
                            : "",
                        targetAnchor: "left",
                        sourceAnchor: "right",
                        style: strokeStyles,
                      },
                    ]}
                  >
                    <li
                      className={
                        activeSublevel === sublevelIndex &&
                        activeNode === nodeIndex
                          ? "active"
                          : ""
                      }
                      id={item.label}
                      onClick={() => {
                        this.setState({ currentActiveNode: item.label }, () => {
                          this.zoomToElementCallback();
                        });
                        this.handleNodeClick(
                          currentLevel,
                          sublevelIndex,
                          nodeIndex
                        );
                      }}
                    >
                      <span>
                        <img src={item.image} alt={item.label} />
                      </span>
                      {this.getServiceName(item.label)}
                    </li>
                  </ArcherElement>
                );
              })}
            </ul>
          );
        }
      });
      retData = [
        <div className="global-servies" style={{ marginLeft: "50px" }}>
          {retData}
        </div>,
      ];
      if (childJSX.length > 0) {
        retData.push(childJSX);
      }
    }
    return retData;
  };

  handleNodeClick = (currentLevel, activeSublevel, activeIndex) => {
    const { activeView } = this.state;
    // active view length will alway be added by 2 than current level.
    // suppose current level is 1. so active view lenght should be 3.
    // it would contain [index-of-root-active-node, root-of-level1-active-node, -1]
    activeView.length = currentLevel + 2;
    activeView[currentLevel] = activeSublevel + "." + activeIndex;
    activeView[currentLevel + 1] = -1;
    this.setState({
      activeView,
    });
  };

  zoomToElementCallback = (animationTime) => {
    zoomElement(
      this.state.currentActiveNode,
      transformScale,
      animationTime ? animationTime : 0
    );
  };

  /** Get name in form of capitalize. */
  getServiceName(name) {
    let firstChar = name ? name.charAt(0) : "";
    let otherStr = name ? name.toLowerCase().slice(1) : "";
    let string = firstChar + otherStr;
    return string;
  }

  render() {
    const { data } = this.props;
    return (
      <>
        <Grid item xs={4}>
          <Box className="topology-panel">
            <Box className="topology-panel-title">
              <Box className="name">App Topology</Box>
            </Box>
            <Box className="topology-panel-body">
              <Box className="app-topology-chart">
                {Object.keys(data).length ? this.renderBody() : <></>}
              </Box>
            </Box>
          </Box>
        </Grid>
      </>
    );
  }
}

export default TopologyView;