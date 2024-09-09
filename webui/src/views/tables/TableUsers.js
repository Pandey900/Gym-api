// // ** React Imports
import { useState, useEffect, forwardRef, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'

// ** Lodash Import
import { debounce } from 'lodash'

// ** Material-Table Import
import MaterialTable, { MTableToolbar } from 'material-table'

// ** Icons Imports
import AddBox from '@mui/icons-material/AddBox'
import ArrowUpward from '@mui/icons-material/ArrowUpward'
import Check from '@mui/icons-material/Check'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Clear from '@mui/icons-material/Clear'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import Edit from '@mui/icons-material/Edit'
import FilterList from '@mui/icons-material/FilterList'
import FirstPage from '@mui/icons-material/FirstPage'
import LastPage from '@mui/icons-material/LastPage'
import Remove from '@mui/icons-material/Remove'
import SaveAlt from '@mui/icons-material/SaveAlt'
import Search from '@mui/icons-material/Search'
import ViewColumn from '@mui/icons-material/ViewColumn'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'

// ** Axios Import
import axios from 'axios'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  ExpandLess: forwardRef((props, ref) => <ExpandLess {...props} ref={ref} />),
  ExpandMore: forwardRef((props, ref) => <ExpandMore {...props} ref={ref} />)
}

const useStyles = makeStyles(theme => ({
  tableContainer: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    boxShadow: theme.shadows[3]
  },
  detailPanel: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius
  },
  detailTitle: {
    marginBottom: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold
  },
  detailContent: {
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      marginBottom: theme.spacing(1)
    }
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between !important',
    padding: theme.spacing(2)
  },
  searchInput: {
    marginLeft: theme.spacing(2)
  }
}))

const TableUsers = () => {
  const classes = useStyles()

  // ** State
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [orderBy, setOrderBy] = useState('')
  const [orderDirection, setOrderDirection] = useState('asc')
  const [search, setSearch] = useState('')

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://${themeConfig.apiUrl}/api/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          page: page + 1,
          limit: pageSize,
          sortBy: orderBy || undefined,
          order: orderDirection,
          search: search || undefined
        }
      })
      setUsers(response.data.data)
      setTotalCount(response.data.meta.totalItems)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching users:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [page, pageSize, orderBy, orderDirection, search])

  const handleSearchChange = debounce(event => {
    setSearch(event.target.value)
  }, 500)

  // Define the handleAdd function
  const handleAdd = () => {
    // Logic to add a new user
    console.log('Add User button clicked')
  }

  return (
    <MaterialTable
      icons={tableIcons}
      title=''
      columns={[
        { title: 'Username', field: 'username' },
        { title: 'Phone', field: 'phone' },
        { title: 'Type', field: 'type' },
        { title: 'City', field: 'city', align: 'right' },
        { title: 'State', field: 'state', align: 'right' },
        { title: 'Country', field: 'country', align: 'right' },
        {
          title: 'Status',
          field: 'status',
          align: 'center',
          render: rowData => (
            <Button
              variant='contained'
              style={{
                backgroundColor: rowData.status === 'active' ? 'green' : 'red',
                color: 'white',
                pointerEvents: 'none'
              }}
            >
              {rowData.status}
            </Button>
          )
        }
      ]}
      data={users}
      isLoading={loading}
      totalCount={totalCount}
      page={page}
      onPageChange={page => setPage(page)}
      pageSize={pageSize}
      onPageSizeChange={(_, pageSize) => setPageSize(pageSize)}
      onOrderChange={(orderBy, orderDirection) => {
        setOrderBy(orderBy)
        setOrderDirection(orderDirection)
      }}
      components={{
        Toolbar: props => (
          <Toolbar className={classes.toolbar}>
            <Button variant='contained' color='primary' startIcon={<AddBox />} onClick={handleAdd}>
              Add User
            </Button>
            <TextField
              className={classes.searchInput}
              variant='outlined'
              size='small'
              placeholder='Search...'
              onChange={handleSearchChange}
              defaultValue={search}
            />
            <MTableToolbar {...props} />
          </Toolbar>
        )
      }}
      options={{
        search: false,
        sorting: true,
        paging: true,
        detailPanelType: 'single',
        showFirstLastPageButtons: false
      }}
      detailPanel={[
        {
          icon: ExpandMore,
          openIcon: ExpandLess,
          tooltip: 'Show Details',
          render: rowData => {
            return (
              <Collapse in={open} timeout='auto' unmountOnExit>
                <Box className={classes.detailPanel}>
                  <Typography className={classes.detailTitle}>User Details</Typography>
                  <TableContainer>
                    <Table size='small' aria-label='user details'>
                      <TableBody>
                        <TableRow>
                          <TableCell component='th' scope='row'>
                            ID
                          </TableCell>
                          <TableCell>{rowData.id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th' scope='row'>
                            Username
                          </TableCell>
                          <TableCell>{rowData.username}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th' scope='row'>
                            Email
                          </TableCell>
                          <TableCell>{rowData.email}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th' scope='row'>
                            Phone
                          </TableCell>
                          <TableCell>{rowData.phone}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th' scope='row'>
                            First Name
                          </TableCell>
                          <TableCell>{rowData.firstName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th' scope='row'>
                            Last Name
                          </TableCell>
                          <TableCell>{rowData.lastName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th' scope='row'>
                            Type
                          </TableCell>
                          <TableCell>{rowData.type}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th' scope='row'>
                            City
                          </TableCell>
                          <TableCell>{rowData.city}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th' scope='row'>
                            State
                          </TableCell>
                          <TableCell>{rowData.state}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th' scope='row'>
                            Country
                          </TableCell>
                          <TableCell>{rowData.country}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component='th' scope='row'>
                            Status
                          </TableCell>
                          <TableCell>{rowData.status}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Collapse>
            )
          }
        }
      ]}
    />
  )
}

export default TableUsers


// import React, { useState, useEffect } from 'react'
// import MaterialTable from 'material-table'
// import axios from 'axios'
// import { debounce } from 'lodash'

// const TableUsers = () => {
//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [page, setPage] = useState(0)
//   const [pageSize, setPageSize] = useState(10)
//   const [totalCount, setTotalCount] = useState(0)
//   const [orderBy, setOrderBy] = useState('')
//   const [orderDirection, setOrderDirection] = useState('asc')
//   const [search, setSearch] = useState('')

//   const fetchUsers = async () => {
//     setLoading(true)
//     try {
//       const response = await axios.get(`http://${themeConfig.apiUrl}/api/users`, {
//         params: {
//           page: page + 1,
//           limit: pageSize,
//           sortBy: orderBy || undefined,
//           order: orderDirection,
//           search: search || undefined
//         }
//       })
//       setUsers(response.data.data)
//       setTotalCount(response.data.meta.totalItems)
//       setLoading(false)
//     } catch (error) {
//       console.error('Error fetching users:', error)
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchUsers()
//   }, [page, pageSize, orderBy, orderDirection, search])

//   const handleSearchChange = debounce(event => {
//     setSearch(event.target.value)
//   }, 500)

//   return (
//     <MaterialTable
//       title='Users'
//       columns={[
//         { title: 'Username', field: 'username' },
//         { title: 'Email', field: 'email' },
//         { title: 'Phone', field: 'phone' },
//         { title: 'First Name', field: 'firstName' },
//         { title: 'Last Name', field: 'lastName' },
//         { title: 'Type', field: 'type' },
//         { title: 'Status', field: 'status' }
//       ]}
//       data={users}
//       isLoading={loading}
//       options={{
//         search: false,
//         sorting: true,
//         paging: true
//       }}
//       page={page}
//       onPageChange={(page) => setPage(page)}
//       pageSize={pageSize}
//       onPageSizeChange={(_, pageSize) => setPageSize(pageSize)}
//       onOrderChange={(orderBy, orderDirection) => {
//         setOrderBy(orderBy)
//         setOrderDirection(orderDirection)
//       }}
//     />
//   )
// }

// export default TableUsers
