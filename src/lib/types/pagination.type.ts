import { z } from "zod";

export type FetchingData<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type PagedData<T> = {
  offset: number;
  limit: number;
  total: number;
  page: number;
  items: T[];
};

export const pagingSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
});

export type PagingSchema = z.infer<typeof pagingSchema>;
