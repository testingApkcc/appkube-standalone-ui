import React, { Component } from "react";
import CommonFilterViewSearch from "../../CommonFilterViewSearch";
import TopologyView from "views/app-views/AssetManager/Environments/EnvironmentList/DiscoveredAssets/Components/TopologyView";
import Aws from "../../../../../../../assets/img/aws.png";
import VpcServicesIcon from "../../../../../../../assets/img/assetmanager/vpc-services-icon.png";
import ClusterIcon from "../../../../../../../assets/img/assetmanager/cluster-icon.png";
import GatewayIcon from"../../../../../../../assets/img/assetmanager/gateway-icon.png";
import {
  Box,
  Grid,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

let Data = {
  label: "Account ID",
  subLabel: "456262908",
  image: Aws,
  children: [
    [
      {
        label: "vpc-218",
        id: null,
        type: "vpc",
        image: VpcServicesIcon,
        children: [
          {
            label: "cloudManaged",
            id: "",
            image: ClusterIcon,
            type: "cluster",
            children: [],
          },
        ],
      },
      {
        label: "vpc-224",
        id: null,
        type: "vpc",
        image: VpcServicesIcon,
        children: [
          {
            label: "gateway",
            id: "",
            image: ClusterIcon,
            type: "cluster",
            children: [],
          },
        ],
      },
      {
        label: "vpc-223",
        id: null,
        type: "vpc",
        image: VpcServicesIcon,
        children: [
          {
            label: "gateway",
            id: "",
            image: GatewayIcon,
            type: "cluster",
            children: [],
          },
        ],
      },
    ],
    [],
  ],
};

class Environments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box className="environmentlist-container">
        <Box className="discovered-assets">
          <Box className="discovered-assets-head">
            <CommonFilterViewSearch />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <TopologyView data={Data} />
              <Grid item xs={5}>
                <Box className="fliter-tabs">
                  <Box
                    className="environment-table-section"
                    style={{ height: "373px" }}
                  >
                    <Box className="table discovered-assets-table">
                      <TableContainer>
                        <Table className="overview">
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell align="center">Performance</TableCell>
                              <TableCell align="center">Availability</TableCell>
                              <TableCell align="center">Security</TableCell>
                              <TableCell align="center">
                                Data Protection
                              </TableCell>
                              <TableCell align="center">User Exp</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <strong>
                                  <a href="#">EMS</a>
                                </strong>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box red">2</Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box orange">3</Box>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <strong>
                                  <a href="#">Supply Chain</a>
                                </strong>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box red">2</Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center"></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <strong>
                                  <a href="#">Procurement</a>
                                </strong>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box red">2</Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box green">
                                  <i className="fa-solid fa-check"></i>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Box className="box orange">3</Box>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Environments;
