"use server";

import { redirect } from "next/navigation";

export async function redirectToBooking() {
  redirect("/book");
}

export async function redirectToAppointments() {
  redirect("/appointments");
}
