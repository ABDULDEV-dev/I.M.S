import BackToHomeButtom from './BackToHomeButtom'

function DeveloperDetails({ setCurrentPage }) {
  return (
    <main className="developer-details">
      <h2>Developer Details</h2>
      <div className="card">
        <img src="./user.jpg" alt="Abdulkadir Adamu Haji" className="developer-image" />
        <h3>About the Developer</h3>
        <p>This inventory management system was developed by Abdulkadir Adamu Haji.</p>
        <p>Technologies used:</p>
        <ul>
          <li>React</li>
          <li>JavaScript</li>
          <li>CSS</li>
        </ul>
      </div>
      <BackToHomeButtom setCurrentPage={setCurrentPage} />
    </main>
  )
}

export default DeveloperDetails

