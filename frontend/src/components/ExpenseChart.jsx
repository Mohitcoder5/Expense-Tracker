// src/components/ExpenseChart.jsx
import React, { useMemo, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
  Label,
} from 'recharts';

// Color-blind-friendly-ish palette
const COLORS = [
  '#60A5FA', // blue-400
  '#34D399', // emerald-400
  '#FBBF24', // amber-400
  '#F97316', // orange-400
  '#A78BFA', // violet-400
  '#F472B6', // pink-400
  '#fb7185', // rose-400
  '#22D3EE', // cyan-400
];

const formatCurrency = (n = 0) => `₹${(+n).toFixed(2)}`;

const CustomTooltip = ({ active, payload, total }) => {
  if (!active || !payload || !payload.length) return null;
  const { name, value, color } = payload[0] || {};
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="bg-gray-800 text-gray-100 border border-gray-700 rounded-md px-3 py-2 shadow-lg">
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-2.5 rounded-sm"
          style={{ background: color }}
        />
        <span className="font-medium">{name}</span>
      </div>
      <div className="text-sm mt-1">
        <span className="text-gray-300">{formatCurrency(value)}</span>
        <span className="text-gray-500"> • {pct}%</span>
      </div>
    </div>
  );
};

const CenterLabel = ({ viewBox, total }) => {
  const { cx, cy } = viewBox || {};
  if (cx == null || cy == null) return null;
  return (
    <g>
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-gray-400"
        fontSize="12"
      >
        Total
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-indigo-300"
        fontSize="16"
        fontWeight="700"
      >
        {formatCurrency(total)}
      </text>
    </g>
  );
};

// Slightly larger active slice + soft ring
const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 12}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.15}
      />
    </g>
  );
};

function ExpenseChart({ expenses }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const { data, total } = useMemo(() => {
    if (!expenses || expenses.length === 0) return { data: [], total: 0 };

    const categoryTotals = expenses.reduce((acc, expense) => {
      const category = expense.category || 'Uncategorized';
      const amount = Number(expense.amount) || 0;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});

    const dataArr = Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const totalValue = dataArr.reduce((sum, d) => sum + d.value, 0);
    return { data: dataArr, total: totalValue };
  }, [expenses]);

  if (!data.length) {
    return (
      <div className="text-center p-6 bg-gray-900 border border-gray-700 rounded-xl text-gray-300 animate-fade-in-up">
        <h3 className="text-xl font-semibold mb-2 text-gray-100">Expense Summary</h3>
        <p className="text-gray-400">No expenses logged yet to display a chart.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-900 border border-gray-700 rounded-xl shadow-inner animate-fade-in-up">
      <h3 className="text-xl font-semibold mb-4 text-center text-indigo-300">
        Expense Summary by Category
      </h3>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={1}
              dataKey="value"
              isAnimationActive
              animationBegin={200}
              animationDuration={700}
              animationEasing="ease-out"
              onMouseEnter={(_, idx) => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(-1)}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`slice-${entry.name}-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="rgba(0,0,0,0.3)"
                  strokeWidth={1}
                />
              ))}
              <Label content={<CenterLabel total={total} />} position="center" />
            </Pie>

            <Tooltip
              content={<CustomTooltip total={total} />}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ color: '#d1d5db' }} // tailwind slate-300
              formatter={(value, entry) => {
                const v = entry?.payload?.value ?? 0;
                return (
                  <span className="text-sm">
                    {value} <span className="text-gray-500">({formatCurrency(v)})</span>
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpenseChart;