import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Quote } from "lucide-react";

interface FeedbackItem {
  id: string;
  content: string;
  category: string;
  sentiment?: "positive" | "neutral" | "negative";
}

interface FeedbackSectionProps {
  feedbacks: FeedbackItem[];
  title: string;
  description?: string;
}

export function FeedbackSection({ feedbacks, title, description }: FeedbackSectionProps) {
  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-success/10 text-success border-success/20";
      case "negative":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSentimentIcon = (sentiment?: string) => {
    switch (sentiment) {
      case "positive":
        return "😊";
      case "negative":
        return "😟";
      default:
        return "😐";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {feedbacks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Nenhum feedback escrito disponível</p>
          </div>
        ) : (
          <ScrollArea className="h-96 w-full">
            <div className="space-y-4">
              {feedbacks.map((feedback, index) => (
                <div
                  key={feedback.id || index}
                  className="border rounded-lg p-4 bg-card/50 hover:bg-card transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Quote className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <p className="text-sm leading-relaxed text-foreground">
                        {feedback.content}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {feedback.category}
                        </Badge>
                        {feedback.sentiment && (
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getSentimentColor(feedback.sentiment)}`}
                          >
                            {getSentimentIcon(feedback.sentiment)} {feedback.sentiment}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}