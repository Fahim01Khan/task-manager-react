import { useEffect, useState } from "react";
import api from "../api/axios";
import Spinner from "./Spinner";
import { useToast } from "./ToastProvider";

function ServiceLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState(null);
  const { showToast } = useToast();

  async function fetchLogs() {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("service-logs/");
      setLogs(data);
    } catch (err) {
      setError("Failed to load service logs.");
      showToast("Failed to load service logs", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this service log?")) return;
    setActionId(id);
    try {
      await api.delete(`service-logs/${id}/`);
      setLogs((prev) => prev.filter((l) => l.id !== id));
      showToast("Deleted service log", "success");
    } catch (err) {
      showToast("Delete failed", "error");
    }
    setActionId(null);
  }

  async function handleToggleStatus(id, current) {
    const next = current === "serviced" ? "scheduled" : "serviced";
    setActionId(id);
    try {
      const { data } = await api.patch(`service-logs/${id}/`, { status: next });
      setLogs((prev) => prev.map((l) => (l.id === id ? data : l)));
      showToast("Updated status", "success");
    } catch (err) {
      showToast("Update failed", "error");
    }
    setActionId(null);
  }

  async function handleAdd(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      customer_name: form.get("customer_name"),
      unit_serial_number: form.get("unit_serial_number"),
      service_date: form.get("service_date"),
      status: "scheduled",
      notes: form.get("notes") || "",
    };
    try {
      const { data } = await api.post("service-logs/", payload);
      setLogs((prev) => [data, ...prev]);
      e.currentTarget.reset();
      showToast("Created service log", "success");
    } catch (err) {
      showToast("Create failed", "error");
    }
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginTop: 24 }}>
      <h2>Service Logs (Backend)</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 16 }}>
        <input name="customer_name" placeholder="Customer Name" required />
        <input name="unit_serial_number" placeholder="Serial Number" required />
        <input name="service_date" type="date" required />
        <input name="notes" placeholder="Notes" />
        <button type="submit">Add</button>
      </form>
      {loading && <p><Spinner /> Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {logs.map((l) => (
          <li key={l.id} style={{ marginBottom: 8 }}>
            <strong>{l.customer_name}</strong> | SN: {l.unit_serial_number} | Date: {l.service_date} | Status: {l.status}
            <button onClick={() => handleToggleStatus(l.id, l.status)} style={{ marginLeft: 8 }} disabled={actionId === l.id}>
              Toggle Status
            </button>
            <button onClick={() => handleDelete(l.id)} style={{ marginLeft: 8, color: "red" }} disabled={actionId === l.id}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceLogs;
