"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Loading from "@/components/child/Loading";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const RequestsStatusDonut = () => {
  const [range, setRange] = useState("Monthly"); // Today | Weekly | Monthly | Yearly
  const [labels, setLabels] = useState(["E_RE", "NE_PROCES", "E_ZGJIDHUR"]);
  const [data, setData] = useState([0, 0, 0]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async (r) => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/admin/stats/requests/status", {
        params: { range: r, tz: "Europe/Tirane" },
        withCredentials: true,
      });
      setLabels(res.data.labels || ["E_RE", "NE_PROCES", "E_ZGJIDHUR"]);
      setData(res.data.data || [0, 0, 0]);
      setTotal(res.data.total || 0);
    } catch (e) {
      // mund të shtosh AlertContainer si në komponentët e tjerë
      console.error("Failed to fetch status donut", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(range); }, [range]);

  // ngjyrat sipas statusit (ApexCharts kërkon hex)
  const colors = useMemo(() => ([
    "#EF4444", // E_RE    -> danger
    "#F59E0B", // NE_PROCES -> yellow
    "#22C55E", // E_ZGJIDHUR -> success
  ]), []);

  const donutChartOptions = useMemo(() => ({
    chart: { type: "donut" },
    labels,
    colors,
    legend: { show: false },
    dataLabels: { enabled: true, formatter: (val) => `${val.toFixed(0)}%` },
    stroke: { width: 0 },
    tooltip: {
      y: { formatter: (val) => `${val} requests` },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            value: { formatter: (v) => v },
            total: {
              show: true,
              label: "Total",
              formatter: () => `${total}`,
            },
          },
        },
      },
    },
  }), [labels, colors, total]);

  const donutChartSeries = useMemo(() => data, [data]);

  return (
      <div className="col-xxl-6 col-xl-6">
        <div className="card h-100 radius-8 border-0 overflow-hidden">
          <div className="card-body p-24">
            <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
              <h6 className="mb-2 text-lg">Statistika e Kërkesave/Raportimeve Sipas Statusit</h6>
              <div>
                <select
                    className="form-select form-select-sm w-auto bg-base border text-secondary-light"
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                >
                  <option value="Today">Sot</option>
                  <option value="Weekly">Javore</option>
                  <option value="Monthly">Mujore</option>
                  <option value="Yearly">Vjetore</option>
                </select>
              </div>
            </div>

            {loading ? (
                <div className="text-center py-4"><Loading /></div>
            ) : (
                <ReactApexChart
                    options={donutChartOptions}
                    series={donutChartSeries}
                    type="donut"
                    height={264}
                />
            )}

            {/* legend custom me klasat e ngjyrave të tua */}
            <ul className="d-flex flex-wrap align-items-center justify-content-between mt-3 gap-3">
              <li className="d-flex align-items-center gap-2">
                <span className="w-12-px h-12-px radius-2 bg-danger" />
                <span className="text-secondary-light text-sm fw-normal">
                E_RE:
                <span className="text-primary-light fw-semibold">&nbsp;{data[0] ?? 0}</span>
              </span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="w-12-px h-12-px radius-2 bg-yellow" />
                <span className="text-secondary-light text-sm fw-normal">
                NE_PROCES:
                <span className="text-primary-light fw-semibold">&nbsp;{data[1] ?? 0}</span>
              </span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="w-12-px h-12-px radius-2 bg-success" />
                <span className="text-secondary-light text-sm fw-normal">
                E_ZGJIDHUR:
                <span className="text-primary-light fw-semibold">&nbsp;{data[2] ?? 0}</span>
              </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default RequestsStatusDonut;
