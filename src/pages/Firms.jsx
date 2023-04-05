import { Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FirmCard from "../components/FirmCard";
import FirmModal from "../components/modals/FirmModal";
import { getSuccess, fetchFail } from "../features/stockSlice";
import useStockCall from "../hooks/useStockCall";
import { flex } from "../styles/globalStyles";

const Firms = () => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });

  const { getStockData } = useStockCall();
  const { firms } = useSelector((state) => state.stock);
  // console.log(useLocation()); // {pathname: '/stock/firms/', search: '', hash: '', state: null, key: 'e6qi9mwg'}

  // + Custom hook ile okunurluk artirilabilir.
  // const dispatch = useDispatch();
  // const getStockData = async (url) => {
  //   const BASE_URL = process.env.REACT_APP_API_URL;
  //   // + Tek firmayi okumak icin -> `${BASE_URL}/stock/firms/{id}/`
  //   try {
  //     const { data } = await axios(`${BASE_URL}stock/firms/`, {
  //       headers: { Authorization: `Token ${token}` },
  //     });
  //     console.log(data);
  //     dispatch(getSuccess({ data, url }));
  //   } catch (error) {
  //     const err = `Error ${error.response.status}: ${error.message}`;
  //     console.log(err);
  //     dispatch(fetchFail(err));
  //   }
  // };

  useEffect(() => {
    getStockData();
  }, []);

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Firm
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setInfo({
            name: "",
            phone: "",
            address: "",
            image: "",
          });
          setOpen(true);
        }}
      >
        NEW FIRM
      </Button>

      <FirmModal open={open} setOpen={setOpen} info={info} setInfo={setInfo} />

      <Grid container sx={flex}>
        {firms?.map((firm) => (
          <Grid
            item
            key={firm.id}
            sx={{
              marginTop: "1rem",
            }}
          >
            <FirmCard {...firm} setOpen={setOpen} setInfo={setInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Firms;
