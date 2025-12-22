import AppSidebarAdmin from "@/components/dashboard/app-sidebaradmin";

export default function Layout({
     children 
}: Readonly<{ children: React.ReactNode }>) 
{
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AppSidebarAdmin />
      <main className="flex-1 bg-white rounded-tl-3xl shadow-inner p-6 m-4">
        {children}
      </main>
    </div>
  );
}
