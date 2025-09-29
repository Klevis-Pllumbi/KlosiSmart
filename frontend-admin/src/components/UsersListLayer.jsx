"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "@/components/child/Loading";
import AlertContainer from "@/components/AlertContainer";

const UserListLayer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);
  const dataTableInstance = useRef(null);
  const jQueryRef = useRef(null);

  // Alerts
  const [alerts, setAlerts] = useState([]);
  const addAlert = (type, title, description) => {
    const id = crypto.randomUUID();
    setAlerts((prev) => [...prev, { id, type, title, description }]);
  };
  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const roleBadgeHtml = (role) => {
    const map = {
      ADMIN: "bg-primary-focus text-primary-600",
      USER: "bg-secondary-focus text-secondary-600",
    };
    return `<span class="${map[role] || ""} px-24 py-4 rounded-pill fw-medium text-sm">${role}</span>`;
  };

  const boolBadgeHtml = (val, yes = "Po", no = "Jo") => {
    return `<span class="${val ? "bg-success-focus text-success-main" : "bg-danger-focus text-danger-main"} px-16 py-2 rounded-pill fw-medium text-sm">${val ? yes : no}</span>`;
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // RRESHTI TANI KA SAKTËSISHT 8 KOLONA (në sinkron me <thead>)
  // [0] ID, [1] FullName, [2] Email(HTML), [3] NID, [4] Role(HTML),
  // [5] Subscribed(HTML), [6] Enabled(HTML), [7] Actions(HTML)
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const createRowHtml = (u) => {
    return [
      u.id,
      u.fullName || "", // përdor fullName nga DTO
      `<a href="mailto:${u.email}" class="text-primary-600">${u.email}</a>`,
      u.nid || "",
      roleBadgeHtml(u.role),
      boolBadgeHtml(u.isSubscribed),
      boolBadgeHtml(u.enabled),
      `
    <div class="d-flex">
      <button
  class="change-role-btn w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center border-0"
  data-id="${u.id}"
  title="Ndrysho rolin"
>
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
    />
  </svg>
</button>

      <button
        class="delete-user-btn w-32-px h-32-px me-8 bg-danger-focus text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center border-0"
        data-id="${u.id}"
        title="Fshi user-in"
      >
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zM7 6h10v13H7V6zm2 2v9h2V8H9zm4 0v9h2V8h-2z"/>
        </svg>
      </button>
    </div>
    `,
    ];
  };

  // Fetch all users
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/users", {
          withCredentials: true,
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        addAlert("error", "Gabim", "Nuk u mor lista e user-ëve!");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const MySwal = withReactContent(Swal);

  const handleChangeRole = (id) => {
    MySwal.fire({
      title: "Ndrysho rolin",
      text: "Zgjidh rolin e ri:",
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "ADMIN",
      denyButtonText: "USER",
      cancelButtonText: "Anulo",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-primary me-2",
        denyButton: "btn btn-secondary me-2",
        cancelButton: "btn btn-outline-secondary",
      },
    }).then(async (result) => {
      let newRole = null;
      if (result.isConfirmed) newRole = "ADMIN";
      else if (result.isDenied) newRole = "USER";
      else return;

      try {
        const res = await axios.patch(
            `http://localhost:8080/api/admin/users/${id}/role`,
            { role: newRole },
            { withCredentials: true }
        );
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: res.data.role } : u)));
        addAlert("success", "Sukses", `Roli u ndryshua në ${newRole}`);
      } catch (err) {
        addAlert("error", "Gabim", "Nuk mund të ndryshohet roli!");
      }
    });
  };

  const handleDeleteUser = (id) => {
    MySwal.fire({
      title: "Je i sigurt?",
      text: "Ky veprim do të fshijë përfundimisht user-in.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Po, fshije",
      cancelButtonText: "Anulo",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-danger me-2",
        cancelButton: "btn btn-secondary",
      },
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        await axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
          withCredentials: true,
        });
        setUsers((prev) => prev.filter((u) => u.id !== id));
        addAlert("success", "U fshi", "User-i u fshi me sukses.");
      } catch (err) {
        addAlert("error", "Gabim", "Nuk mund të fshihet user-i!");
      }
    });
  };

  // Initialize DataTable
  useEffect(() => {
    const init = async () => {
      if (loading || users.length === 0 || !tableRef.current) return;

      try {
        const $ = (await import("jquery")).default;
        await import("datatables.net-dt/js/dataTables.dataTables.js");
        jQueryRef.current = $;

        if (dataTableInstance.current) {
          dataTableInstance.current.destroy();
          dataTableInstance.current = null;
        }

        $(tableRef.current).find("tbody").empty();

        dataTableInstance.current = $(tableRef.current).DataTable({
          data: users.map((u) => createRowHtml(u)),
          pageLength: 10,
          destroy: true,
          scrollX: true,
          language: {
            search: "Kërko:",
            lengthMenu: "Shfaq _MENU_ rreshta",
            info: "Duke treguar _START_ deri _END_ nga _TOTAL_ rreshta",
            zeroRecords: "Asnjë rezultat i gjetur",
            infoEmpty: "Nuk ka të dhëna për t'u shfaqur",
            infoFiltered: "(filtruar nga gjithsej _MAX_ rreshta)",
          },
          // Indekset 0..7 sipas thead-it më poshtë
          columnDefs: [
            { targets: [2, 4, 5, 6, 7], orderable: false }, // Email/HTML, Role/Badges, Subscribed, Enabled, Actions
          ],
        });

        $(tableRef.current)
            .off("click", ".change-role-btn")
            .on("click", ".change-role-btn", function () {
              const id = parseInt($(this).data("id"));
              handleChangeRole(id);
            });

        $(tableRef.current)
            .off("click", ".delete-user-btn")
            .on("click", ".delete-user-btn", function () {
              const id = parseInt($(this).data("id"));
              handleDeleteUser(id);
            });
      } catch (err) {
        console.error("Error initializing DataTable:", err);
      }
    };

    init();

    return () => {
      if (dataTableInstance.current) {
        dataTableInstance.current.destroy();
        dataTableInstance.current = null;
      }
    };
  }, [users, loading]);

  return (
      <>
        <AlertContainer alerts={alerts} onClose={removeAlert} />
        <div className="card basic-data-table">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Lista e User-ëve</h5>
          </div>
          <div className="card-body">
            {loading ? (
                <div className="text-center py-4">
                  <Loading />
                </div>
            ) : (
                <table className="table bordered-table mb-0" ref={tableRef}>
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Emri</th>
                    <th>Email</th>
                    <th>NID</th>
                    <th>Roli</th>
                    <th>I abonuar</th>
                    <th>Aktiv</th>
                    <th>Veprime</th>
                  </tr>
                  </thead>
                  <tbody></tbody>
                </table>
            )}
          </div>
        </div>
      </>
  );
};

export default UserListLayer;
