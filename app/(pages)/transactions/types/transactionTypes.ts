export type Transaction = {
  _id: string;
  userEmail: string;
  transactionName: string;
  transactionDate: string;
  transactionCategory: string;
  transactionAmount: number;
  transactionRecurring: boolean;
  createdAt?: string;
  updatedAt?: string;
};
