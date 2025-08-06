import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface NPSWidgetProps {
  promoters: number;
  passives: number;
  detractors: number;
  total: number;
}

export function NPSWidget({ promoters, passives, detractors, total }: NPSWidgetProps) {
  const npsScore = Math.round(((promoters - detractors) / total) * 100);
  
  const getScoreCategory = (score: number) => {
    if (score >= 50) return { label: "Excelente", color: "text-success", bgColor: "bg-success" };
    if (score >= 0) return { label: "Bom", color: "text-secondary", bgColor: "bg-secondary" };
    return { label: "Crítico", color: "text-destructive", bgColor: "bg-destructive" };
  };

  const category = getScoreCategory(npsScore);
  const promoterPercent = (promoters / total) * 100;
  const passivePercent = (passives / total) * 100;
  const detractorPercent = (detractors / total) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Net Promoter Score (NPS)</CardTitle>
        <CardDescription>
          Baseado na probabilidade de recomendação do curso
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* NPS Score Display */}
        <div className="text-center space-y-2">
          <div className={cn("text-6xl font-bold", category.color)}>
            {npsScore}
          </div>
          <div className={cn("text-sm font-medium px-3 py-1 rounded-full inline-block", category.bgColor, "text-white")}>
            {category.label}
          </div>
        </div>

        {/* Distribution */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-success font-medium">Promotores (9-10)</span>
              <span>{promoters} ({promoterPercent.toFixed(1)}%)</span>
            </div>
            <Progress value={promoterPercent} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-warning font-medium">Neutros (7-8)</span>
              <span>{passives} ({passivePercent.toFixed(1)}%)</span>
            </div>
            <Progress value={passivePercent} className="h-2 [&>div]:bg-warning" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-destructive font-medium">Detratores (0-6)</span>
              <span>{detractors} ({detractorPercent.toFixed(1)}%)</span>
            </div>
            <Progress value={detractorPercent} className="h-2 [&>div]:bg-destructive" />
          </div>
        </div>

        {/* Calculation Info */}
        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <p><strong>Cálculo:</strong> % Promotores - % Detratores = {npsScore}</p>
          <p>Total de respondentes: {total}</p>
        </div>
      </CardContent>
    </Card>
  );
}