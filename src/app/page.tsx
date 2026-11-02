import LinkButton from "@/components/common/LinkButton";
import ThemeToggle from "@/components/common/ThemeToggle";
import TextSizeToggle from "@/components/common/TextSizeToggle";
import Card from "@/components/common/Card";
import PageTitle from "@/components/common/PageTitle";
import Sidebar from "@/components/layout/Sidebar";

export default function Home() {
  return (
    <div className="pageLayout">
      <Sidebar />

      <div className="pageContent">
        <main className="homePage">
          <div className="headerActions">
            <TextSizeToggle />
            <ThemeToggle />
          </div>
          <section className="heroSection">
            <PageTitle
              title="Study Planner"
              description="Plan your projects, manage your tasks and stay on track."
            />

            <LinkButton href="/login">
              Get started
            </LinkButton>
          </section>

          <section className="homeFeatures">
            <Card>
              <h2>Plan</h2>
              <p>Create tasks and organize your work.</p>
            </Card>

            <Card>
              <h2>Prioritize</h2>
              <p>See which tasks are most important.</p>
            </Card>

            <Card>
              <h2>Stay on track</h2>
              <p>Keep track of deadlines and overdue tasks.</p>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}