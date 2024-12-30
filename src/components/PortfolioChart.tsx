import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stock } from "@/lib/utils";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface PortfolioChartProps {
  stocks: Stock[];
}

const COLORS = ['#22C55E', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

export function PortfolioChart({ stocks }: PortfolioChartProps) {
  const data = stocks.map(stock => ({
    name: stock.symbol,
    value: stock.quantity * stock.currentPrice
  }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Portfolio Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}