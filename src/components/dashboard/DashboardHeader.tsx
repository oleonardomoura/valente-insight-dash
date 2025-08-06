import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, BookOpen, MapPin } from "lucide-react";

interface DashboardHeaderProps {
  courseInfo: {
    name: string;
    instructor: string;
    startDate: string;
    endDate: string;
    totalResponses: number;
    completionRate: number;
  };
}

export function DashboardHeader({ courseInfo }: DashboardHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-light to-secondary p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <BookOpen className="h-6 w-6" />
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Pesquisa de Satisfação
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Dashboard de Avaliação
          </h1>
          
          <p className="text-white/90 text-lg mb-6 max-w-2xl">
            Instituto Valente - Análise da pesquisa de satisfação do treinamento realizado 
            em parceria com a Sicoob Secovicred
          </p>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-4 right-4 animate-float">
          <div className="w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"></div>
        </div>
        <div className="absolute bottom-4 right-16 animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Course Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-card to-accent/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Curso</p>
                <p className="font-semibold text-sm">{courseInfo.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-secondary/10 border-secondary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Users className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Instrutor</p>
                <p className="font-semibold text-sm">{courseInfo.instructor}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-success/10 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CalendarDays className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Período</p>
                <p className="font-semibold text-sm">
                  01/08/2025 - 02/08/2025
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-warning/10 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <MapPin className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Respostas</p>
                <p className="font-semibold text-sm">{courseInfo.totalResponses} participantes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}