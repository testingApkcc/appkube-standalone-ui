import React, { Component } from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { Link } from "react-router-dom";
import SelectFilterModal from "../../Components/SelectFilterModal";
import TimeSpendComponent from "../../Components/TimeSpendComponent";
import ServiceIcon1 from "assets/img/report/service-icon1.png";
import ServiceIcon2 from "assets/img/report/service-icon2.png";
import ServiceIcon3 from "assets/img/report/service-icon3.png";
import ServiceIcon4 from "assets/img/report/service-icon4.png";
import ServiceIcon5 from "assets/img/report/service-icon5.png";
import ServiceIcon6 from "assets/img/report/service-icon6.png";
let timeSpendData = [
  {
    name: "Month to date spend",
    value: "$70,000",
    percentage: "",
    subName: "",
  },
  {
    name: "Forecasted Spend",
    value: "$85,000",
    percentage: "15",
    subName: "vs Last Month",
  },
  {
    name: "Last Month Spend",
    value: "$90,000",
    percentage: "5",
    subName: "vs Last Month",
  },
  {
    name: "Avg Daily Spend",
    value: "$1500",
    percentage: "",
    subName: "",
  },
];

class CostCentralServicesInternal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  render() {
    return (
      <>
        <Box className="new-reports-container">
          <Box className="global-services-fliter">
            <Box className="heading">
              <Box className="breadcrumbs">
                <ul>
                  <li>
                    <p> Central Dashboard</p>
                  </li>
                  <li>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li>
                    <p>Cost Central Top Internal</p>
                  </li>
                  <li>
                    <i className="fa-solid fa-chevron-right"></i>
                  </li>
                  <li className="active">
                    <p>Cost Central Services Internal</p>
                  </li>
                </ul>
              </Box>
            </Box>
          </Box>
          <Box className="list-heading m-t-2 ">
            <h4>Cost of Top Services in US East (N.Virginia) </h4>
            <Box className="d-flex ">
              <Button
                className="light-btn p-l-15 p-r-15 m-r-3"
                onClick={this.handleSelectFilterModal}
              >
                <i className="fas fa-filter m-r-2"></i> Filter
              </Button>
              <Button className="light-btn p-l-15 p-r-15">
                <i className="fas fa-calendar-minus m-r-2"></i> Last Month
              </Button>
            </Box>
          </Box>
          <Box className="m-t-2">
            <TimeSpendComponent data={timeSpendData} />
          </Box>
          <Box className="table-head">
            <h4 className="m-t-0 m-b-0">
              Overview of Top Services in N. Virginia
            </h4>
            <Box className="search">
              <input
                type="text"
                className="input"
                placeholder="Search Insatnce "
                //value={searchedKey}
                onChange={this.handleSearchChange}
                autoFocus="autoFocus"
              />
              <button className="button">
                <SearchOutlinedIcon />
              </button>
            </Box>
          </Box>
          <Box className="new-reports-table">
            <TableContainer className="table">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Service name</TableCell>
                    <TableCell align="center">Current month spend </TableCell>
                    <TableCell align="center">Last month Spend</TableCell>
                    <TableCell align="center">Variance</TableCell>
                    <TableCell align="center">Avg daily spend</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon1} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        10%
                        <i className="fas fa-sort-down p-l-5 m-r-1"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $1,205</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon1} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        10%
                        <i className="fas fa-sort-down p-l-5 m-r-1"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $1,205</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon2} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        10%
                        <i className="fas fa-sort-down p-l-5 m-r-1"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $1,205</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon3} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        10%
                        <i className="fas fa-sort-down p-l-5 m-r-1"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $1,205</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon4} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        10%
                        <i className="fas fa-sort-down p-l-5 m-r-1"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $1,205</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon5} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        10%
                        <i className="fas fa-sort-down p-l-5 m-r-1"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $1,205</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon6} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        10%
                        <i className="fas fa-sort-down p-l-5 m-r-1"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $1,205</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon1} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        10%
                        <i className="fas fa-sort-down p-l-5 m-r-1"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $1,205</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon1} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        10%
                        <i className="fas fa-sort-down p-l-5 m-r-1"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $1,205</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Box className="service-image d-inline-block">
                        <img src={ServiceIcon1} alt="" />
                      </Box>
                      EC2
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $20,000</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Box className="variance-count">
                        10%
                        <i className="fas fa-sort-down p-l-5 m-r-1"></i>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <strong> $1,205</strong>
                    </TableCell>
                    <TableCell align="center">
                      <Button className="light-btn p-l-15 p-r-15 ">
                        view more <OpenInNewIcon className="p-l-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </>
    );
  }
}

export default CostCentralServicesInternal;