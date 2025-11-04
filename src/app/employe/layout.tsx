"use client";

export default function EmployeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <main>{children}</main>
    </div>
  );
}






