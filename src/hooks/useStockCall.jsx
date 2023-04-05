import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import stockSlice, {
  fetchFail,
  getSuccess,
  fetchStart,
  getProdCatgBrndsSuccess,
  test,
  getPurchSalesSuccess,
} from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";

const useStockCall = () => {
  // const { token } = useSelector((state) => state.auth);
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  // console.log(pathname);
  pathname = pathname.slice(1);
  let url = pathname.slice(6, -1);

  const BASE_URL = process.env.REACT_APP_API_URL;

  const getStockData = async (urlArgument = undefined) => {
    // + Tek firmayi okumak icin -> `${BASE_URL}/${url}/${id}/`
    dispatch(fetchStart());
    if (urlArgument) {
      url = urlArgument;
    }
    try {
      // const { data } = await axios(`${BASE_URL}${pathname}`, {
      //   headers: { Authorization: `Token ${token}` },
      // });
      const { data } = await axiosWithToken(
        urlArgument ? "stock/" + urlArgument + "/" : pathname
      );
      // console.log(`${url}:`, data);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      const err = `Error ${error.response.status}: ${
        error.response?.data?.message || error.message
      }`;
      dispatch(fetchFail(err));
      toastErrorNotify(err);
      console.log(err);
    }
  };

  const deleteStockData = async (id) => {
    // + Firmayi silmek icin -> `${BASE_URL}/stock/firms/${id}/`
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`${pathname}${id}/`);
      getStockData();
      toastSuccessNotify(`${url} deleted successfully.`);
    } catch (error) {
      const err = `Error ${error.response.status}: ${
        error.response?.data?.message || error.message
      }`;
      dispatch(fetchFail(err));
      toastErrorNotify(err);
      console.log(err);
    }
  };

  const postStockData = async (info) => {
    // console.log(pathname);
    // console.log(url);
    console.log(info);
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(pathname, info);
      getStockData();
      toastSuccessNotify(`${url} posted successfully.`);
    } catch (error) {
      console.log(error);
      const err = `Error ${error.response.status}: ${
        error.response?.data[Object.keys(error.response?.data)[0]]
      }`;
      dispatch(fetchFail(err));
      toastErrorNotify(err);
      console.log(err);
    }
  };

  const putStockData = async (id, info) => {
    // console.log(id);
    // console.log(pathname);
    // console.log(url);
    // console.log(info);
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`${pathname}${id}/`, info);
      getStockData();
      toastSuccessNotify(`${url} edited successfully.`);
    } catch (error) {
      const err = `Error ${error.response.status}: ${
        error.response?.data?.message || error.message
      }`;
      dispatch(fetchFail(err));
      toastErrorNotify(err);
      console.log(err);
    }
  };

  const getProdCatgBrnds = async () => {
    dispatch(fetchStart());
    try {
      const [products, categories, brands] = await Promise.all([
        axiosWithToken("stock/products/"),
        axiosWithToken("stock/categories/"),
        axiosWithToken("stock/brands/"),
      ]);

      dispatch(
        getProdCatgBrndsSuccess([
          products?.data,
          categories?.data,
          brands?.data,
        ])
      );
      // console.log(url);
      toastSuccessNotify(`${url} initial fetching successfully done.`);
    } catch (error) {
      const err = `Error ${error.response.status}: ${
        error.response?.data?.message || error.message
      }`;
      dispatch(fetchFail(err));
      toastErrorNotify(err);
      console.log(err);
    }
  };

  const getPurchSales = async () => {
    // console.log(url);
    dispatch(fetchStart());
    try {
      const [purchases, sales] = await Promise.all([
        axiosWithToken("stock/purchases/"),
        axiosWithToken("stock/sales/"),
      ]);

      dispatch(getPurchSalesSuccess([purchases?.data, sales?.data]));
      // console.log(url);
      toastSuccessNotify(`stock initial fetching successfully done.`);
    } catch (error) {
      const err = `Error ${error.response.status}: ${
        error.response?.data?.message || error.message
      }`;
      dispatch(fetchFail(err));
      toastErrorNotify(err);
      console.log(err);
    }
  };

  return {
    getStockData,
    deleteStockData,
    postStockData,
    putStockData,
    getProdCatgBrnds,
    getPurchSales,
  };
};

export default useStockCall;

// console.log(new Promise((resolve) => setTimeout(resolve, 1000))); // Promise {<pending>}
// console.log(pathname);
// console.log(pathname.slice(6).replace("/", ""));
// console.log(pathname.slice(6, -1));

// action creator/case reducer type check -> slice(subStore)Name/fetchStart
// console.log(fetchStart.type); // action creator/case reducer type check -> stock/fetchStart
// console.log(getSuccess.type); // stock/getSuccess
// console.log(stockSlice(null, test(5))); // {test: 6}
// console.log(test.type); // stock/test
// console.log(fetchFail.type); // stock/fetchFail
// console.log(fetchFail()); // {type: 'stock/fetchFail', payload: undefined}
