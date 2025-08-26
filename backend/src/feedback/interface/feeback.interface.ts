

export interface ExtractedFeedback {
  customerName: string;
  productMentioned: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  summary: string;
}
