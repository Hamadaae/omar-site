import { NextResponse } from "next/server";

// Standard API response helpers
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export function ok<T>(data: T): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status: 200 });
}

export function created<T>(data: T): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status: 201 });
}

export function badRequest(error: string): NextResponse<ApiResponse<never>> {
  return NextResponse.json({ success: false, error }, { status: 400 });
}

export function unauthorized(error: string): NextResponse<ApiResponse<never>> {
  return NextResponse.json({ success: false, error }, { status: 401 });
}

export function notFound(error: string): NextResponse<ApiResponse<never>> {
  return NextResponse.json({ success: false, error }, { status: 404 });
}

export function serverError(error: string): NextResponse<ApiResponse<never>> {
  return NextResponse.json({ success: false, error }, { status: 500 });
}
