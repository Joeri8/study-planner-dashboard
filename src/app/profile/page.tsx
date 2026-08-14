import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function ProfilePage() {
  return (
    <div className="pageLayout">
      <Sidebar />

      <div className="pageContent">
        <Header />

        <main>
          <section>
            <h1>Profile</h1>
            <p>Edit your profile here.</p>
          </section>
        </main>
      </div>
    </div>
  );
}