"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Budget } from "../types/budgetsTypes";
import { Transaction } from "../../transactions/types/transactionTypes";

export function ChartPieDonutText({
  budgets,
  transactions,
}: {
  budgets: Budget[];
  transactions: Transaction[];
}) {
  const totalAmount = transactions.reduce((a, b) => {
    return a + Number(b.transactionAmount);
  }, 0);

  const chartData = React.useMemo(() => {
    return budgets.map((budget) => ({
      category: budget.category,
      spend: budget.spend,
      fill: budget.theme,
    }));
  }, [budgets]);

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      spend: {
        label: "Spend",
      },
    };

    budgets.forEach((budget, index) => {
      config[budget.category] = {
        label: budget.category,
        color: budget.theme,
      };
    });

    return config;
  }, [budgets]);

  const totalSpend = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.spend, 0);
  }, [chartData]);

  if (budgets.length === 0) {
    return (
      <Card className="flex flex-col h-fit">
        <CardContent className="flex-1 pb-0 flex items-center justify-center">
          <p className="text-muted-foreground">No budgets to display</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-fit">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="spend"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          ${totalAmount.toFixed(2)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-[10px]"
                        >
                          of ${totalSpend} limit
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <h1 className="flex items-center gap-2 text-xl leading-none font-medium">
          Spending Summary
        </h1>
        <div className=" flex flex-col gap-3 w-full self-start text-sm text-muted-foreground">
          {budgets.map((budget) => (
            <div
              key={budget._id}
              className="flex items-center justify-between border-b duration-200 rounded-md px-2 py-2 hover:bg-accent w-full"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-4 w-1 rounded-sm"
                  style={{ backgroundColor: budget.theme }}
                />
                <h3>{budget.category}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary flex items-center">
                  {/* {transactions
                    .filter((t) => {
                      return t.transactionCategory === budget.category;
                    })
                    .map((t) => (
                      <div key={t._id}>
                        {t.transactionAmount > 0 ? "+" : "-"}
                      </div>
                    ))} */}
                  $
                  {Math.abs(
                    transactions
                      .filter((t) => t.transactionCategory === budget.category)
                      .reduce((sum, t) => sum + Number(t.transactionAmount), 0)
                  ).toFixed(2)}
                </span>{" "}
                of ${budget.spend.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
