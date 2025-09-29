"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import Loading from "@/components/child/Loading";
import AlertContainer from "@/components/AlertContainer";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const RequestsStatistic = () => {
  const [range, setRange] = useState("Monthly"); // Yearly | Monthly | Weekly | Today
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);

  const addAlert = (type, title, description) => {
    const id = crypto.randomUUID();
    setAlerts((prev) => [...prev, { id, type, title, description }]);
  };
  const removeAlert = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id));

  const fetchData = async (currentRange) => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/admin/stats/requests", {
        params: { range: currentRange, tz: "Europe/Tirane" },
        withCredentials: true,
      });
      setLabels(res.data.labels || []);
      setData(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (e) {
      addAlert("error", "Gabim", "Nuk u morën të dhënat e grafikut të kërkesave.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(range);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  const chartOptions = useMemo(
      () => ({
        chart: { type: "area", toolbar: { show: false }, zoom: { enabled: false } },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth", width: 2 },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.35,
            opacityTo: 0.1,
            stops: [0, 90, 100],
          },
        },
        grid: { strokeDashArray: 3 },
        xaxis: { categories: labels, labels: { rotate: -45 } },
        yaxis: { labels: { formatter: (val) => Math.round(val).toString() } },
        tooltip: { y: { formatter: (val) => `${val} requests` } },
        colors: ["#4f46e5"], // mund ta zëvendësosh me ngjyrat e dizajnit tënd
      }),
      [labels]
  );

  const chartSeries = useMemo(
      () => [{ name: "Requests", data }],
      [data]
  );

  return (
      <div className="col-xxl-6 col-xl-12">
        <AlertContainer alerts={alerts} onClose={removeAlert} />
        <div className="card h-100">
          <div className="card-body p-24">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
              <h6 className="text-lg mb-0">Statistika e Kërkesave/Raportimeve</h6>
              <select
                  className="form-select bg-base form-select-sm w-auto"
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
              >
                <option value="Yearly">Vjetore</option>
                <option value="Monthly">Mujore</option>
                <option value="Weekly">Javore</option>
                <option value="Today">Sot</option>
              </select>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2 mt-8">
              <h6 className="mb-0">{total}</h6>
              <span className="text-xs fw-medium">Kërkesa/Raportime në diapazonin</span>
              <span className="text-sm fw-semibold rounded-pill bg-success-focus text-success-main border br-success px-8 py-4 line-height-1 d-flex align-items-center gap-1">
              <Icon icon="mdi:chart-areaspline" className="text-xs" />
                &nbsp;{range}
            </span>
            </div>

            {loading ? (
                <div className="text-center py-4"><Loading /></div>
            ) : (
                <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={264} />
            )}
          </div>
        </div>
      </div>
  );
};

export default RequestsStatistic;
