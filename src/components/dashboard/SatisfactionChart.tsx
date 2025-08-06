import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SatisfactionData {
  category: string;
  average: number;
  responses: number;
}

interface SatisfactionChartProps {
  data: SatisfactionData[];
  title: string;
  description?: string;
}

export function SatisfactionChart({ data, title, description }: SatisfactionChartProps) {
  const getBarColor = (value: number) => {
    if (value >= 9) return "hsl(var(--success))";
    if (value >= 7) return "hsl(var(--secondary))";
    if (value >= 5) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-card-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            Média: <span className="font-bold text-primary">{data.value}/10</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Respostas: {data.payload.responses}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              domain={[0, 10]}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="average" 
              radius={[4, 4, 0, 0]}
              fill="hsl(var(--primary))"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}