type RecodeItem = {
  tags: string[];
  type: string;
  notes: string;
  amount: number;
  createAt?: Date; //？表示可以不存在
};