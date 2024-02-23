import React, { Component } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { navigateRouter } from "Utils/Navigate/navigateRouter";

export class SpendingTable extends Component {
  renderTable = () => {
    return (
      <TableContainer className="table">
        <Table>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
      </TableContainer>
    );
  };

  //  Render table head
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">Service name</TableCell>
          <TableCell align="center">last month spend </TableCell>
          <TableCell align="center">This month spend</TableCell>
          <TableCell align="center">variance</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    let { data } = this.props;
    return (
      <TableBody>
        {data?.length ? (
          data.map((details) => {
            let {
              name,
              icon,
              last_month_spend,
              month_spend,
              variance,
              actions,
            } = details;
            return (
              <TableRow>
                <TableCell align="left">
                  <Box className="service-image d-inline-block">
                    <img src={icon} alt="" />
                  </Box>
                  {name}
                </TableCell>
                <TableCell align="center">{last_month_spend}</TableCell>
                <TableCell align="center">{month_spend}</TableCell>
                <TableCell align="center">
                  <Box className="variance-count">
                    {variance} <i class="fas fa-sort-down p-l-5"></i>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => this.props.navigate(`${actions}${name}`)}
                    className="light-btn p-l-15 p-r-15 "
                  >
                    view more <OpenInNewIcon className="p-l-5" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <Box className="d-blck text-center w-100 h-100 ">
            <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
              <h5 className="m-t-0 m-b-0">There are no data available.</h5>
            </Box>
          </Box>
        )}
      </TableBody>
    );
  };

  render() {
    return <Box className="new-reports-table">{this.renderTable()}</Box>;
  }
}

export default navigateRouter(SpendingTable);