export interface FeedbackAnalysis {
  id: number;
  rawText: string;
  customerName: string;
  productMentioned: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  summary: string;
  createdAt: string;
}