import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { User, Package, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { FeedbackAnalysis } from "../types/feedback";

interface FeedbackCardProps {
  feedback: FeedbackAnalysis;
}

export const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  const [showFullText, setShowFullText] = useState(false);

  const getSentimentVariant = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'destructive';
      default:
        return 'warning';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😟';
      default:
        return '😐';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-full shadow-card hover:shadow-glow transition-all duration-300 animate-in slide-in-from-bottom-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            Feedback Analysis #{feedback.id}
          </CardTitle>
          <Badge 
            variant={getSentimentVariant(feedback.sentiment)}
            className="px-3 py-1 text-sm font-medium"
          >
            {getSentimentIcon(feedback.sentiment)} {feedback.sentiment}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {formatDate(feedback.createdAt)}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
            <User className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-accent-foreground">Customer</p>
              <p className="text-sm text-muted-foreground">{feedback.customerName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
            <Package className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-accent-foreground">Product</p>
              <p className="text-sm text-muted-foreground">{feedback.productMentioned}</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-2">Summary</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feedback.summary}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFullText(!showFullText)}
            className="w-full justify-between text-muted-foreground hover:text-foreground"
          >
            <span>Original Feedback</span>
            {showFullText ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {showFullText && (
            <div className="mt-3 p-4 bg-secondary/50 rounded-lg border-l-4 border-primary">
              <p className="text-sm text-foreground leading-relaxed italic">
                "{feedback.rawText}"
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};