
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface JobsBySourceChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export function JobsBySourceChart({ data }: JobsBySourceChartProps) {
  // Update the chart colors to match the sources
  const getSourceColor = (sourceName: string): string => {
    if (sourceName === "LinkedIn") return "#0077B5"; // LinkedIn blue
    if (sourceName === "Naukrigulf") return "#FF7A59"; // Orange color for Naukrigulf
    return data.find(item => item.name === sourceName)?.color || "#8884d8";
  };

  // Apply colors based on source names
  const chartData = data.map(item => ({
    ...item,
    color: getSourceColor(item.name)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Jobs by Source
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} jobs`, "Count"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
