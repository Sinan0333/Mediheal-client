
function TransactionHistory() {
  return (
    <div className="flex-1 h-98 overflow-x-auto  mx-auto md:mx-0 mb-6 md:mb-0  dark:bg-zinc-700 p-4 rounded-lg " style={{scrollbarWidth:"none"}}>
    <h2 className="text-2xl font-bold mb-4 ">Transaction History</h2>
    <div className="overflow-x-auto ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-17</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment foXZ r Product A</td>
            <td className="px-6 py-4 whitespace-nowrap">$50.00</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-16</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
            <td className="px-6 py-4 whitespace-nowrap">$30.00</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-16</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
            <td className="px-6 py-4 whitespace-nowrap">$30.00</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-17</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment for Product A</td>
            <td className="px-6 py-4 whitespace-nowrap">$50.00</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-16</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
            <td className="px-6 py-4 whitespace-nowrap">$30.00</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-16</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
            <td className="px-6 py-4 whitespace-nowrap">$30.00</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-17</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment for Product A</td>
            <td className="px-6 py-4 whitespace-nowrap">$50.00</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-16</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
            <td className="px-6 py-4 whitespace-nowrap">$30.00</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-16</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
            <td className="px-6 py-4 whitespace-nowrap">$30.00</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-17</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment for Product A</td>
            <td className="px-6 py-4 whitespace-nowrap">$50.00</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-16</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
            <td className="px-6 py-4 whitespace-nowrap">$30.00</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-16</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
            <td className="px-6 py-4 whitespace-nowrap">$30.00</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-17</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment for Product A</td>
            <td className="px-6 py-4 whitespace-nowrap">$50.00</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-16</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
            <td className="px-6 py-4 whitespace-nowrap">$30.00</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap">2024-04-16</td>
            <td className="px-6 py-4 whitespace-nowrap">Payment for Product B</td>
            <td className="px-6 py-4 whitespace-nowrap">$30.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default TransactionHistory
