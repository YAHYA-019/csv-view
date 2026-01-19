
import { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DataPortal() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filter, setFilter] = useState("");

  const loadFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const wb = XLSX.read(e.target.result, { type: "binary" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      setData(json);
      setColumns(Object.keys(json[0] || {}));
    };
    reader.readAsBinaryString(file);
  };

  const filtered = useMemo(() => {
    if (!filter) return data;
    return data.filter((row) =>
      Object.values(row).some((v) =>
        String(v).toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [data, filter]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Advanced Data Portal</h1>

      <Card className="mb-6">
        <CardContent className="space-y-4">
          <Input type="file" accept=".csv,.xlsx" onChange={(e) => loadFile(e.target.files[0])} />
          <Input placeholder="Search..." value={filter} onChange={(e) => setFilter(e.target.value)} />
        </CardContent>
      </Card>

      <div className="overflow-auto rounded-xl border bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              {columns.map((c) => (
                <th key={c} className="px-4 py-2 border text-left text-sm font-semibold">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                {columns.map((c) => (
                  <td key={c} className="px-4 py-2 border text-sm">
                    {row[c]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
