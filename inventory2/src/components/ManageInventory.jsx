import BackToHomeButtom from "./BackToHomeButtom"



function ManageInventory({ inventory, updateQuantity, setCurrentPage }) {
  return (
    <main className="manage-inventory">
      <h2>Manage Inventory</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{Number(item.quantity) || 0}</td>
              <td>
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BackToHomeButtom setCurrentPage={setCurrentPage} />
    </main>
  )
}

export default ManageInventory

