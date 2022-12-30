const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(`setDefaultDate ${req.params.date}`);
  const now = new Date();
  res.json({ unix: now.getTime(), utc: now.toUTCString() });
});

router.get("/:date", (req, res) => {
  console.log(`Input date is ${req.params.date}`);
  const requestDateTime = req.params.date;

  const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  const getTimeStamp = (paramDate) => {
    return Date.parse(paramDate);
  };
  const getDate = (timestamp) => {
    return new Date(timestamp).toUTCString();
  };
  const isValidDate = (date) => {
    const timestamp = getTimeStamp(date);
    return !!timestamp;
  };
  const isValidTimeStamp = (timestamp) => {
    return isNumeric(new Date(timestamp).getTime());
  };
  const returnDateResponse = (paramDate, res) => {
    const timestamp = getTimeStamp(paramDate);
    const date = new Date(timestamp);
    res.json({ unix: timestamp, utc: date.toUTCString() });
  };
  const returnTimestampResponse = (timestamp, res) => {
    res.json({ unix: timestamp, utc: getDate(timestamp) });
  };
  const returnError = (res) => {
    res.json({ error: `Invalid Date` });
  };

  if (requestDateTime && isValidDate(requestDateTime)) {
    returnDateResponse(requestDateTime, res);
  } else if (isValidTimeStamp(Number(requestDateTime))) {
    returnTimestampResponse(Number(requestDateTime), res);
  } else {
    returnError(res);
  }
});

module.exports = router;