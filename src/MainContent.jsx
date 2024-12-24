import { Divider, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomCard from "./components/Card";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const MainContent = () => {
  const [city, setCity] = useState("");

  const data = [
    { id: 0, title: "الفجر", time: "5:00" },
    { id: 1, title: "الظهر", time: "5:00" },
    { id: 2, title: "العصر", time: "5:00" },
    { id: 3, title: "المغرب", time: "5:00" },
    { id: 4, title: "العشاء", time: "5:00" },
  ];

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      {/* Top Row*/}
      <Grid container>
        <Grid size={6}>
          <div>
            <h2>4:20 | 9 2023</h2>
            <h1>مكة المكرمة</h1>
          </div>
        </Grid>

        <Grid size={6}>
          <div>
            <h2>متبقي حتى صلاة العصر</h2>
            <h1>00:10:20</h1>
          </div>
        </Grid>
      </Grid>
      {/*== Top Row ==*/}
      <Divider style={{ borderColor: "#fff", opacity: "0.2" }} />

      {/* Prayer Cards */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        style={{
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        {data.map((item) => {
          return (
            <CustomCard key={item.id} time={item.time} title={item.title} />
          );
        })}
      </Stack>
      {/*== Prayer Cards ==*/}

      <Divider style={{ borderColor: "#fff", opacity: "0.2" }} />

      {/* Selector */}
      <Stack direction="row" justifyContent="center">
        <FormControl
          variant="standard"
          style={{ backgroundColor: "#fff", width: "200px" }}
        >
          <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            label="المدينة"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
};
