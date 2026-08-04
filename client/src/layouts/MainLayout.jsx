import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
    return (
        <div className="relative min-h-screen overflow-hidden transition-colors duration-300"
        style={{ background: "var(--bg)"}}>
         
         {/*Background Blobs*/}
         <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#A1F1CA]/30 blur-3xl" />
         <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-[#FF6F61]/15 blur-3xl"/>
         <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#FFD1C7]/30 blur-3xl" />
        
        {/*Layout*/}
        <div className="relative z-10 flex min-h-screen">
          <Sidebar />
          <div className="flex flex-1 flex-col">
             <Navbar />
             <main className="flex-1 p-8">
                {children}
             </main>
          </div>
         </div>
        </div>
    );
}

export default MainLayout;