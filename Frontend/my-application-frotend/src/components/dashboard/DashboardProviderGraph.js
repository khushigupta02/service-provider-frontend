import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../instance/Api";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { startOfWeek, endOfWeek, addDays, eachDayOfInterval, parse, format } from "date-fns";

const DashboardProviderGraph = () => {
  const [data, setData] = useState([]);
  
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday as the start of the week
  const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 1 }); // Sunday as the end of the week

  const [dateRange, setDateRange] = useState([
    {
      startDate: startOfCurrentWeek,
      endDate: endOfCurrentWeek,
      key: "selection",
    },
  ]);

  const username = localStorage.getItem("userName");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewBookingByServiceProviderUsername/${username}`
        );

        const processedData = response.data.map((booking) => ({
          date: new Date(booking.bookedAt).toLocaleDateString("en-GB"),
          bookings: 1,
        }));

        const filteredData = processedData.filter((booking) => {
          const bookingDate = parse(booking.date, "dd/MM/yyyy", new Date());
          return (
            bookingDate >= dateRange[0].startDate &&
            bookingDate <= dateRange[0].endDate
          );
        });

        const aggregatedData = filteredData.reduce((acc, curr) => {
          const found = acc.find((item) => item.date === curr.date);
          if (found) {
            found.bookings += 1;
          } else {
            acc.push({ date: curr.date, bookings: curr.bookings });
          }
          return acc;
        }, []);

        const allDatesInRange = eachDayOfInterval({
          start: dateRange[0].startDate,
          end: dateRange[0].endDate,
        }).map(date => ({
          date: format(date, "dd/MM/yyyy"),
          bookings: 0,
        }));

        const mergedData = allDatesInRange.map(dateEntry => {
          const found = aggregatedData.find(item => item.date === dateEntry.date);
          return found ? found : dateEntry;
        });

        setData(mergedData);
      } catch (error) {
        console.error("Error fetching provider activities:", error);
      }
    };

    fetchData();

  }, [username, dateRange]);

  return (
    <div className="container-fluid dashboard-header my-4 py-3 px-4">
      <h4 className="heading-statistic">Booking Statistics</h4>
      <div className="row my-5">
        <div className="col-lg-8 col-md-8 col-sm-8">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data.sort(
                (a, b) =>
                  new Date(a.date.split("/").reverse().join("-")) -
                  new Date(b.date.split("/").reverse().join("-"))
              )}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4">
          <div className="date-picker-container">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProviderGraph;
