import Sidebar from "@/components/Sidebar";
import StormBackground from "@/components/StormBackground";
import Footer from "@/components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative text-slate-200 h-screen flex flex-col overflow-hidden">
      <StormBackground />
      <Sidebar />
      
            <div className="flex-1 md:pl-[280px] sticky top-0 h-screen overflow-y-auto scroll-smooth">
        <div className="px-4 sm:px-6 lg:px-8 pb-24 pt-16 md:pt-0">
          {children}
        </div>
        <Footer /> {/* Inside Scrollable Div */}
      </div>
    </main>
  );
}