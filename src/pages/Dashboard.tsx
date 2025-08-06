import { useSurveyData } from "@/hooks/useSurveyData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SatisfactionChart } from "@/components/dashboard/SatisfactionChart";
import { NPSWidget } from "@/components/dashboard/NPSWidget";
import { FeedbackSection } from "@/components/dashboard/FeedbackSection";
import { 
  calculateCategoryAverages, 
  calculateNPS, 
  extractFeedbacks, 
  getOverallSatisfaction,
  getCourseInfo 
} from "@/utils/surveyAnalytics";
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Star,
  Target,
  MessageSquare,
  BarChart3,
  Award
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data, loading, error } = useSurveyData();

  if (loading) {
    return (
      <div className="min-h-screen bg-dashboard-bg p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dashboard-bg p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-destructive text-lg font-semibold mb-2">
              Erro ao carregar dados
            </div>
            <div className="text-muted-foreground">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const courseInfo = {
    ...getCourseInfo(data),
    startDate: "2025-08-01",
    endDate: "2025-08-02"
  };
  const categoryData = calculateCategoryAverages(data);
  const npsData = calculateNPS(data);
  const feedbacks = extractFeedbacks(data);
  const overallSatisfaction = getOverallSatisfaction(data);

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <DashboardHeader courseInfo={courseInfo} />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Satisfação Geral"
            value={`${overallSatisfaction}/10`}
            description="Média geral de todas as categorias"
            icon={Star}
            variant={overallSatisfaction >= 8 ? "success" : overallSatisfaction >= 6 ? "warning" : "danger"}
          />
          
          <MetricCard
            title="Net Promoter Score"
            value={npsData.score}
            description="Probabilidade de recomendação"
            icon={Target}
            variant={npsData.score >= 50 ? "success" : npsData.score >= 0 ? "warning" : "danger"}
          />
          
          <MetricCard
            title="Total de Respostas"
            value={courseInfo.totalResponses}
            description="Participantes que responderam"
            icon={Users}
            variant="default"
          />
          
          <MetricCard
            title="Feedbacks Qualitativos"
            value={feedbacks.length}
            description="Comentários e sugestões"
            icon={MessageSquare}
            variant="default"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SatisfactionChart
            data={categoryData}
            title="Avaliação por Categoria"
            description="Média de satisfação em cada área avaliada"
          />
          
          <NPSWidget
            promoters={npsData.promoters}
            passives={npsData.passives}
            detractors={npsData.detractors}
            total={npsData.total}
          />
        </div>

        {/* Detailed Category Breakdown */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {categoryData.map((category) => (
            <div key={category.category} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{category.category}</h3>
                  <p className="text-sm text-muted-foreground">
                    Média: {category.average}/10 • {category.responses} respostas
                  </p>
                </div>
              </div>
              
              <div className="grid gap-3">
                {category.questions.map((question, index) => (
                  <MetricCard
                    key={index}
                    title={question.question}
                    value={`${question.average}/10`}
                    description={`${question.responses} respostas`}
                    variant={question.average >= 8 ? "success" : question.average >= 6 ? "warning" : "danger"}
                    className="bg-card/50"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        {feedbacks.length > 0 && (
          <FeedbackSection
            feedbacks={feedbacks}
            title="Feedbacks dos Participantes"
            description="Comentários, sugestões e avaliações qualitativas"
          />
        )}

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Resumo Executivo</h3>
              <p className="text-muted-foreground">Principais insights da pesquisa</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">
                {Math.round((overallSatisfaction / 10) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Índice de Satisfação Geral
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {categoryData.length > 0 ? categoryData.reduce((max, cat) => cat.average > max ? cat.average : max, 0).toFixed(1) : "0"}
              </div>
              <div className="text-sm text-muted-foreground">
                Melhor Categoria Avaliada
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">
                {Math.round((npsData.promoters / Math.max(npsData.total, 1)) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Taxa de Promotores
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}