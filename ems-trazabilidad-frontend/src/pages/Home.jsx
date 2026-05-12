import RequirementForm from '../components/RequirementForm';
import RequirementTable from '../components/RequirementTable';

function Home() {
  return (
    <div className="container">

      <header className="navbar">
        <h1>EMS - Trazabilidad</h1>
      </header>

      <RequirementForm />

      <RequirementTable />

    </div>
  );
}

export default Home;