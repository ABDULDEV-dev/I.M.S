function HomePage({ setCurrentPage }) {
    return (
      <main className="home-page">
        <div className="grid">
          <button onClick={() => setCurrentPage("add-product")}>Add Product</button>
          <button onClick={() => setCurrentPage("view-inventory")}>View Inventory</button>
          <button onClick={() => setCurrentPage("manage-inventory")}>Manage Inventory</button>
          <button onClick={() => setCurrentPage("developer-details")}>Developer Details</button>
        </div>
      </main>
    )
  }
  
  export default HomePage
  
  