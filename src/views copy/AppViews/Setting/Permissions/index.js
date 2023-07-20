import React, { Component } from "react";
import { Box } from "@mui/material";
import RoleControl from "./RoleControl";
import GroupControl from "./GroupControl";
import UserControl from "./UserControl";

export class Permissions extends Component {
  controlMapping = [
    {
      icon: "fa-user-gear",
      label: "Role",
      value: "46",
      dataKey: "role",
    },
    {
      icon: "fa-users",
      label: "Group",
      value: "33",
      dataKey: "group",
    },
    {
      icon: "fa-user",
      label: "User",
      value: "544",
      dataKey: "user",
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  setActiveTab = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <Box className="permissions-container">
        <Box className="heading">Role Based Access Control</Box>
        <Box className="access-control-boxs">
          {this.controlMapping.map((tabData, index) => {
            return (
              <Box
                key={`control-${index}`}
                className={
                  index === activeTab ? "control-box active" : "control-box"
                }
                onClick={() => this.setActiveTab(index)}
              >
                <Box className="icon">
                  <i className={`fa-solid ${tabData.icon}`}></i>
                </Box>
                <Box className="content">
                  <label>{tabData.label}</label>
                  <strong>{tabData.value}</strong>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box className="access-control-container">
          {activeTab === 0 ? (
            <RoleControl />
          ) : activeTab === 1 ? (
            <GroupControl />
          ) : activeTab === 2 ? (
            <UserControl />
          ) : (
            <></>
          )}
        </Box>
      </Box>
    );
  }
}
export default Permissions;