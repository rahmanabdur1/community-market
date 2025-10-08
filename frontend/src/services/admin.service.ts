// // services/admin.service.ts
// import { authApi } from "@/services/api";
// import { AxiosResponse } from "axios";

// // ────────────── Analytics ──────────────
// export const getAnalytics = async (): Promise<any[]> => {
//   const { data }: AxiosResponse<any[]> = await authApi.get("/admin/analytics");
//   return data;
// };

// // ────────────── Users ──────────────
// export const listUsers = async (): Promise<any[]> => {
//   const { data }: AxiosResponse<any[]> = await authApi.get("/admin/users");
//   return data;
// };

// // ────────────── Vendors ──────────────
// export const listVendors = async (): Promise<any[]> => {
//   const { data }: AxiosResponse<any[]> = await authApi.get("/admin/vendors");
//   return data;
// };

// export const updateVendorStatus = async (
//   vendorId: string,
//   status: "approved" | "rejected"
// ): Promise<void> => {
//   await api.patch(`/admin/vendors/${vendorId}/status`, { status });
// };

// // ────────────── Listings ──────────────
// export const listListings = async (): Promise<any[]> => {
//   const { data }: AxiosResponse<any[]> = await authApi.get("/admin/listings");
//   return data;
// };

// export const approveListing = async (listingId: string): Promise<void> => {
//   await authApi.patch(`/admin/listings/${listingId}/status`, { status: "approved" });
// };

// export const updateListing = async (
//   listingId: string,
//   payload: { status?: string; featured?: boolean }
// ): Promise<void> => {
//   await authApi.patch(`/admin/listings/${listingId}`, payload);
// };

// export const featureListing = async (listingId: string): Promise<void> => {
//   await authApi.patch(`/admin/listings/${listingId}/feature`, { featured: true });
// };

// // ────────────── Marketplace Items ──────────────
// export const listItems = async (): Promise<any[]> => {
//   const { data }: AxiosResponse<any[]> = await authApi.get("/admin/items");
//   return data;
// };

// export const approveItem = async (itemId: string): Promise<void> => {
//   await authApi.patch(`/admin/items/${itemId}/status`, { status: "approved" });
// };

// export const updateItem = async (
//   itemId: string,
//   payload: { status?: string; featured?: boolean }
// ): Promise<void> => {
//   await authApi.patch(`/admin/items/${itemId}`, payload);
// };

// export const featureItem = async (itemId: string): Promise<void> => {
//   await authApi.patch(`/admin/items/${itemId}/feature`, { featured: true });
// };

// // ────────────── Bookings ──────────────
// export const listBookings = async (): Promise<any[]> => {
//   const { data }: AxiosResponse<any[]> = await authApi.get("/admin/bookings");
//   return data;
// };

// // ────────────── Payments ──────────────
// export const listPayments = async (): Promise<any[]> => {
//   const { data }: AxiosResponse<any[]> = await authApi.get("/admin/payments");
//   return data;
// };

// export const updatePaymentStatus = async (
//   paymentId: string,
//   status: "completed" | "failed"
// ): Promise<void> => {
//   await authApi.patch(`/admin/payments/${paymentId}/status`, { status });
// };

// // ────────────── Posts ──────────────
// export const listPosts = async (): Promise<any[]> => {
//   const { data }: AxiosResponse<any[]> = await authApi.get("/admin/posts");
//   return data;
// };

// export const approvePost = async (postId: string): Promise<void> => {
//   await authApi.patch(`/admin/posts/${postId}/status`, { status: "approved" });
// };

// export const deletePost = async (postId: string): Promise<void> => {
//   await authApi.delete(`/admin/posts/${postId}`);
// };

// // ────────────── Reviews ──────────────
// export const listReviews = async (): Promise<any[]> => {
//   const { data }: AxiosResponse<any[]> = await authApi.get("/admin/reviews");
//   return data;
// };

// export const deleteReview = async (reviewId: string): Promise<void> => {
//   await authApi.delete(`/admin/reviews/${reviewId}`);
// };

// // ────────────── Support Tickets ──────────────
// export const listTickets = async (): Promise<any[]> => {
//   const { data }: AxiosResponse<any[]> = await authApi.get("/admin/tickets");
//   return data;
// };

// export const updateTicketStatus = async (
//   ticketId: string,
//   status: "in_progress" | "closed"
// ): Promise<void> => {
//   await authApi.patch(`/admin/tickets/${ticketId}/status`, { status });
// };
