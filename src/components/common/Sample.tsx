
function Sample() {

  return (
    <div className="flex justify-between items-center h-screen flex-wrap md:flex-nowrap p-6 bg-white dark:bg-zinc-800">
      <div className="flex-1 h-full max-w-md mx-auto md:mx-0 mb-6 md:mb-0 md:mr-6 dark:bg-zinc-700 p-4 rounded-lg">
        <div className="flex flex-col items-center pb-10">  
          <img className="w-32 h-32 rounded-full mb-4" src="https://placehold.co/128x128" alt="Profile avatar" />
          <h3 className="text-2xl font-semibold mb-2">John Doe</h3>
          <p className="text-zinc-600 dark:text-zinc-300 mb-1">Email: johndoe@gmail.com</p>
          <p className="text-zinc-600 dark:text-zinc-300 mb-4">Phone: 1234567890</p>
          <div>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2">Logout</button>
          </div>
        </div>
        <div className="w-full h-72 bg-blue-400">
        </div>
      </div>
      
      <div className="flex-1   h-full max-w-md mx-auto md:mx-0 md:mr-6  dark:bg-zinc-70">
        <h2 className="text-xl font-semibold mb-6">Update Profile</h2>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2" htmlFor="name">Name :</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your name" />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2" htmlFor="email">Email :</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your email" />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2" htmlFor="phone">Phone :</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="Your phone number" />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2" htmlFor="old-password">Old Password :</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline" id="old-password" type="password" placeholder="Your old password" />
          </div>
          <div className="mb-4">
            <label className="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2" htmlFor="new-password">New Password :</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline" id="new-password" type="password" placeholder="Your new password" />
          </div>
          <div className="mb-6">
            <label className="block text-zinc-700 dark:text-zinc-200 text-sm font-bold mb-2" htmlFor="profile-photo">Profile Photo :</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline" id="profile-photo" type="file"/>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit
            </button>
          </div>
      </div>

      <div className="flex-1 h-full overflow-x-auto  mx-auto md:mx-0 mb-6 md:mb-0  dark:bg-zinc-700 p-4 rounded-lg " style={{scrollbarWidth:"none"}}>
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
    </div>
  )
}

export default Sample
