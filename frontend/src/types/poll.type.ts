export interface PollOption {
  id: string;
  label: string;
  percent: number;
}

export interface FanPollData {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}
