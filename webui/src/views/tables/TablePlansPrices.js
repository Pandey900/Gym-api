// ** React Imports
import { useState, useEffect, forwardRef, Fragment, useCallback } from 'react'

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

const TablePlansPrices = () => {
  const classes = useStyles()

  // ** State
  const [plansPrices, setPlansPrices] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [orderBy, setOrderBy] = useState('')
  const [orderDirection, setOrderDirection] = useState('asc')
  const [search, setSearch] = useState('')

  const fetchPlansPrices = useCallback(async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://${themeConfig.apiUrl}/api/membership-plans-prices`, {
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
      setPlansPrices(response.data.data)
      setTotalCount(response.data.meta.totalItems)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching membership plans prices:', error)
      setLoading(false)
    }
  }, [page, pageSize, orderBy, orderDirection, search])

  useEffect(() => {
    fetchPlansPrices()
  }, [fetchPlansPrices])

  const handleSearchChange = debounce(event => {
    setSearch(event.target.value)
  }, 500)

  const handleAdd = () => {
    console.log('Add Plan Price button clicked')
  }

  return (
    <MaterialTable
      icons={tableIcons}
      title=''
      columns={[
        { title: 'ID', field: 'id', align: 'left' },
        { title: 'Membership Plan ID', field: 'membership_plan_id', align: 'left' },
        { title: 'Price', field: 'price', align: 'right' },
        { title: 'Validity Start Date', field: 'validity_start_date', align: 'right', type: 'datetime' },
        { title: 'Validity End Date', field: 'validity_end_date', align: 'right', type: 'datetime' },
        { title: 'Comments', field: 'comments', align: 'right' },
        { title: 'Created At', field: 'createdAt', align: 'right', type: 'datetime' },
        { title: 'Updated At', field: 'updatedAt', align: 'right', type: 'datetime' }
      ]}
      data={plansPrices}
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
              Add Plan Price
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
                  <Typography className={classes.detailTitle}>Membership Plan Price Details</Typography>
                  <TableContainer>
                    <Table size='small' aria-label='membership plan price details'>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <strong>ID:</strong>
                          </TableCell>
                          <TableCell>{rowData.id}</TableCell>
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

export default TablePlansPrices
