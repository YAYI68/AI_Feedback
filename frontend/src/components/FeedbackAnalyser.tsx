import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { FeedbackCard } from "./FeedbackCard";
import { Sparkles, FileText, AlertCircle } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Button } from "./ui/button";
import type { FeedbackAnalysis } from "../types/feedback";
import { useMutation } from "@tanstack/react-query";
import { analyzeText } from "../api/feedback";

export const FeedbackAnalyzer = () => {
  const [inputText, setInputText] = useState("");
  const { toast } = useToast();

  const {
    mutate: analyze,
    data: analysis,
    error,
    isPending: isAnalyzing,
    reset,
  } = useMutation<FeedbackAnalysis, Error, string>({
    mutationFn: analyzeText,
    onSuccess: () => {
      toast({
        title: "Analysis Complete!",
        description: "Customer feedback has been successfully analyzed.",
      });
    },
    onError: () => {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the feedback. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some customer feedback to analyze.",
        variant: "destructive",
      });
      return;
    }
    analyze(inputText);
  };

  const handleReset = () => {
    setInputText("");
    reset();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-primary rounded-xl">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Opinion Digest
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform raw customer feedback into structured insights. Paste any feedback text and get instant analysis of sentiment, key details, and actionable summaries.
          </p>
        </div>

        {/* Input Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Customer Feedback Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback-text">Paste customer feedback here:</Label>
              <Textarea
                id="feedback-text"
                placeholder="Hello, my name is David Smith and I just wanted to say that my new 'Ergo-Max Office Chair' is fantastic! It arrived yesterday and has been a lifesaver for my back..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[120px] resize-none"
                disabled={isAnalyzing}
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !inputText.trim()}
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyze Feedback
                  </>
                )}
              </Button>
              
              {(analysis || inputText) && (
                <Button variant="outline" onClick={handleReset} disabled={isAnalyzing}>
                  Reset
                </Button>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <p className="text-sm text-destructive">{error.message}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {analysis && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Analysis Results</h2>
            <FeedbackCard feedback={analysis} />
          </div>
        )}
      </div>
    </div>
  );
};