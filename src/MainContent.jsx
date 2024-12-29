import { Divider, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomCard from "./components/Card";
import { useCallback, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar-dz";
import Loader from "./components/Loader";

moment().locale("ar");
export const MainContent = () => {
  const [city, setCity] = useState({
    name: "مكة المكرمة",
    isoName: "Makah al Mukaramah",
  });
  const [timings, setTimings] = useState({
    Fajr: "0:00",
    Dhuhr: "0:00",
    Asr: "0:00",
    Sunset: "0:00",
    Isha: "0:00",
  });
  const [today, setToday] = useState("");
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const data = [
    { id: 0, title: "الفجر", time: timings.Fajr },
    { id: 1, title: "الظهر", time: timings.Dhuhr },
    { id: 2, title: "العصر", time: timings.Asr },
    { id: 3, title: "المغرب", time: timings.Sunset },
    { id: 4, title: "العشاء", time: timings.Isha },
  ];
  const cities = [
    {
      name: "مكة المكرمة",
      isoName: "Makah al Mukaramah",
    },
    { name: "الرياض", isoName: "Riyadh" },
  ];

  const prayersArray = [
    { key: "Fajr", name: "الفجر" },
    { key: "Dhuhr", name: "الظهر" },
    { key: "Asr", name: "العصر" },
    { key: "Sunset", name: "المغرب" },
    { key: "Isha", name: "العشاء" },
  ];

  const handleChange = (event) => {
    const selectedCity = cities.find(
      (city) => city.isoName == event.target.value
    );
    setCity(selectedCity);
  };

  const getTimings = useCallback(async () => {
    const res = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=SA&city=${city.isoName}`
    );
    setTimings(res?.data?.data?.timings);
  }, [city]);

  const setupCountTimer = useCallback(() => {
    let momentNow = moment();
    let nextPrayerIndex = null;

    // select the next prayer
    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      nextPrayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      nextPrayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
    ) {
      nextPrayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      nextPrayerIndex = 4;
    } else {
      nextPrayerIndex = 0;
    }
    setNextPrayerIndex(nextPrayerIndex);
    const nextPrayerTime = timings[prayersArray[nextPrayerIndex].key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTimeMoment).diff(momentNow);
    // in "Fajar" the difference is negative so i make a special calcs
    if (remainingTime < 0) {
      const midnight = moment("23:59:59", "hh:mm:ss");
      const fajrToMidDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totaldiff = fajrToMidDiff + midnight;
      remainingTime = totaldiff;
    }
    const durationRemainingTime = moment.duration(remainingTime);
    setRemainingTime(
      `${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
    );
    setIsLoading(false);
  }, [timings]);

  useEffect(() => {
    getTimings();
  }, [getTimings]);

  useEffect(() => {
    const today = moment().format("MMM Do YYYY | h:mm");
    setToday(today);
    let interval = setInterval(() => {
      setupCountTimer();
    }, 1000);

    // clear side effect
    return () => {
      clearInterval(interval);
    };
  }, [setupCountTimer]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Grid container>
            <Grid size={{ xs: 24, md: 6 }}>
              <div>
                <h2>{today}</h2>
                <h1>{city.name}</h1>
              </div>
            </Grid>

            <Grid size={{ xs: 24, md: 6 }}>
              <div>
                <h2>متبقي حتى صلاة {prayersArray[nextPrayerIndex].name}</h2>
                <h1>{remainingTime}</h1>
              </div>
            </Grid>
          </Grid>
          {/*== Top Row ==*/}
          <Divider
            style={{ borderColor: "#fff", opacity: "0.2", marginTop: "10px" }}
          />
          {/* Prayer Cards */}
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            style={{
              marginTop: "50px",
              marginBottom: "50px",
              flexWrap: "wrap",
              gap: "20px",
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
                value={city.isoName}
                label="المدينة"
                onChange={handleChange}
              >
                {cities.map((option) => {
                  return (
                    <MenuItem key={option.name} value={option.isoName}>
                      {option.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>{" "}
        </>
      )}
    </>
  );
};
