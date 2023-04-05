import { Alert, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BrandCard from "../components/BrandCard";
import BrandModal from "../components/modals/BrandModal";
import useStockCall from "../hooks/useStockCall";
import { flex } from "../styles/globalStyles";

const Brands = () => {
  const { getStockData } = useStockCall();
  const { brands, loading } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({ name: "", image: "" });

  useEffect(() => {
    getStockData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Brand
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setInfo({ name: "", image: "" });
          setOpen(true);
        }}
      >
        NEW BRAND
      </Button>

      <BrandModal open={open} setOpen={setOpen} info={info} setInfo={setInfo} />

      {!loading && !brands?.length && (
        <Alert severity="warning" sx={{ mt: 4, width: "50%" }}>
          There is no brand to show
        </Alert>
      )}

      {brands?.length > 0 && (
        <Grid container sx={flex} mt={2}>
          {brands?.map((brand) => (
            <Grid item key={brand.id}>
              <BrandCard {...brand} setOpen={setOpen} setInfo={setInfo} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Brands;
