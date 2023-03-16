import React from 'react'

const tableSADM = () => {
  return (
    <div className='container relative overflow-x-auto sm:rounded-lg border-2 m-10 p-10'>
      <table className="table w-full text-center">
      <caption>
      Table SADM
      </caption>
      <thead>
          <tr>
          <th></th>
        <th className="object-center" >Id</th>
        <th>Client</th>
        <th>Adresse</th>
        <th>Etat</th>
        </tr>
      </thead>
      <tbody>
          <tr className='bg-white'>
          <td> <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/></td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          </tr>
          <tr className='bg-gray-50'>
          <td> <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/></td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          </tr>
          <tr className='bg-white'>
          <td> <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/></td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          </tr>
      </tbody>
    </table>
    </div>
  )
}

export default tableSADM