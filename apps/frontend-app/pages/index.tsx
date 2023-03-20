import styles from './index.module.css';

export function Index({ api1Message, api2Message}) {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <p>{api1Message}</p>
            <p>{api2Message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const api1Value = await fetch(`http://${process.env.API_1_URL}:3333/api`).then(res => res.json());
  const api2Value = await fetch(`http://${process.env.API_2_URL}:3333/api`).then(res => res.json());

  return {
    props: {
      api1Message: api1Value.message,
      api2Message: api2Value.message
    }
  }
}

export default Index;
