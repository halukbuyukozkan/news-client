import { Paper } from '@mui/material'
import React from 'react'
import MaterialTable from 'material-table';




export default function PersonalTable() {

  return (
    <div className='w-full'>
      <Paper>

        <MaterialTable
          title="Staffs"
          columns={[
            { title: 'Name / Surname', field: 'name' },
            { title: 'Tc Kimlik No', field: 'tc' },
            { title: 'Not', field: 'not' },
            {
              title: 'Actions',
              field: 'actions',
            },
          ]}
          data={[
            { name: 'Aytug Tombul', tc: 123123122213, not: 25},
            { name: 'Haluk Büyüközkan', tc: 123123122213, not: 25},
          ]}
          options={{
            tableLayout: "fixed"
          }}
        />

      </Paper>

    </div>
  )
}
