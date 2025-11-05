"use client";

import React from "react";
import { AppSidebar } from "@/components/(protected)/app-sidebar";
import NotificationEmp from "@/feature/employe/notification";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-white">
     
      <AppSidebar />

 
      <main className="flex-1 p-6 flex flex-col items-center">
             
             <NotificationEmp />
      </main>
    </div>
  );
}
