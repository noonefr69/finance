export type Transaction = {
  _id: string;
  userEmail: string;
  transactionName: string;
  transactionDate: string;
  transactionCategory: string;
  transactionAmount: number;
  createdAt?: string;
  updatedAt?: string;
};
