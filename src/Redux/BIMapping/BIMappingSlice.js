import { createSlice } from "@reduxjs/toolkit";
import {
  getElementType,
  getElementInstancesOfGivenType,
  getBiServicesFromProductCategory,
  getCloudServices,
  getInstancesServices,
} from "Redux/BIMapping/BIMappingThunk";
import status from "Redux/Constants/CommonDS";

export const BIMappingSlice = createSlice({
  name: "BIMapping",
  initialState: {
    elementTypeData: {
      status: null,
      data: [],
    },
    elementInstancesOfGivenType: {
      status: null,
      data: [],
    },
    createProductFormData: {
      departmentName: "",
      productName: "",
      category: "",
      moduleName: "",
      environment: "",
    },
    biServicesFromProductCategory: {
      status: null,
      data: [],
    },
    cloudServices: {
      status: null,
      data: [],
    },
    instancesServices: {
      status: null,
      data: [],
    },
  },
  reducers: {
    setProductIntoDepartment: (state, action) => {
      let createProductFormData = action.payload;
      return {
        ...state,
        createProductFormData,
      };
    },
  },
  extraReducers: {
    [getElementType.pending]: (state) => {
      return {
        ...state,
        elementTypeData: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getElementType.fulfilled]: (state, action) => {
      return {
        ...state,
        elementTypeData: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getElementType.rejected]: (state) => {
      return {
        ...state,
        elementTypeData: {
          status: status.FAILURE,
        },
      };
    },

    [getElementInstancesOfGivenType.pending]: (state) => {
      return {
        ...state,
        elementInstancesOfGivenType: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getElementInstancesOfGivenType.fulfilled]: (state, action) => {
      return {
        ...state,
        elementInstancesOfGivenType: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getElementInstancesOfGivenType.rejected]: (state) => {
      return {
        ...state,
        elementInstancesOfGivenType: {
          status: status.FAILURE,
        },
      };
    },

    [getBiServicesFromProductCategory.pending]: (state) => {
      return {
        ...state,
        biServicesFromProductCategory: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getBiServicesFromProductCategory.fulfilled]: (state, action) => {
      return {
        ...state,
        biServicesFromProductCategory: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getBiServicesFromProductCategory.rejected]: (state) => {
      return {
        ...state,
        biServicesFromProductCategory: {
          status: status.FAILURE,
        },
      };
    },

    [getCloudServices.pending]: (state) => {
      return {
        ...state,
        cloudServices: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getCloudServices.fulfilled]: (state, action) => {
      return {
        ...state,
        cloudServices: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getCloudServices.rejected]: (state) => {
      return {
        ...state,
        cloudServices: {
          status: status.FAILURE,
        },
      };
    },

    [getInstancesServices.pending]: (state) => {
      return {
        ...state,
        instancesServices: {
          status: status.IN_PROGRESS,
        },
      };
    },
    [getInstancesServices.fulfilled]: (state, action) => {
      return {
        ...state,
        instancesServices: {
          status: status.SUCCESS,
          data: action.payload,
        },
      };
    },
    [getInstancesServices.rejected]: (state) => {
      return {
        ...state,
        instancesServices: {
          status: status.FAILURE,
        },
      };
    },
  },
});
export const { setProductIntoDepartment } = BIMappingSlice.actions;
export default BIMappingSlice.reducer;
