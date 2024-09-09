import { useState, useEffect, forwardRef } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import axios from 'axios'
import { debounce } from 'lodash'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

const useStyles = makeStyles(theme => ({
  tableContainer: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    boxShadow: theme.shadows[3]
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

const TableGymAdmins = () => {
  const classes = useStyles()

  const [gymAdmins, setGymAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [orderBy, setOrderBy] = useState('')
  const [orderDirection, setOrderDirection] = useState('asc')
  const [search, setSearch] = useState('')

  const fetchGymAdmins = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://${themeConfig.apiUrl}/api/gymAdminAndGym`, {
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
      setGymAdmins(response.data.data)
      setTotalCount(response.data.meta.totalItems)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching gym admins:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGymAdmins()
  }, [page, pageSize, orderBy, orderDirection, search])

  const handleSearchChange = debounce(event => {
    setSearch(event.target.value)
  }, 500)

  const handleAdd = () => {
    console.log('Add Gym Admin button clicked')
  }

  return (
    <MaterialTable
      icons={tableIcons}
      title='Gym Admins'
      columns={[
        { title: 'Gym Admin ID', field: 'gymAdminId' },
        { title: 'Gym ID', field: 'gymId' },
        { title: 'Created At', field: 'createdAt', type: 'datetime' },
        { title: 'Updated At', field: 'updatedAt', type: 'datetime' }
      ]}
      data={gymAdmins}
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
              Add Gym Admin
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
                  <Typography className={classes.detailTitle}>Gym Admin Details</Typography>
                  <TableContainer>
                    <Table size='small' aria-label='gym admin details'>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <strong>ID:</strong>
                          </TableCell>
                          <TableCell>{rowData.id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>Gym Admin ID:</strong>
                          </TableCell>
                          <TableCell>{rowData.gymAdminId}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>Gym ID:</strong>
                          </TableCell>
                          <TableCell>{rowData.gymId}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>Created At:</strong>
                          </TableCell>
                          <TableCell>{rowData.createdAt}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>Updated At:</strong>
                          </TableCell>
                          <TableCell>{rowData.updatedAt}</TableCell>
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

export default TableGymAdmins
