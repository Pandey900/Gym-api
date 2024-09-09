import { useState, useEffect, forwardRef, Fragment } from 'react'

// makeStyles import
import { makeStyles } from '@mui/styles'

// ** MUI Imports
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

// ** Lodash Import
import debounce from 'lodash/debounce'

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
import CloseIcon from '@mui/icons-material/Close'

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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(3),
    '& > *': {
      marginBottom: theme.spacing(2)
    }
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.7em'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: '10px'
    }
  }
}))

const Alert = props => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const TableGyms = () => {
  const classes = useStyles()

  // ** State
  const [gyms, setGyms] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [orderBy, setOrderBy] = useState('')
  const [orderDirection, setOrderDirection] = useState('asc')
  const [search, setSearch] = useState('')
  const [addFormVisible, setAddFormVisible] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    status: '',
    pincode: '',
    phone_number: '',
    email: '',
    contact_person: '',
    currency: '',
    latitude: '',
    longitude: ''
  })

  const [toast, setToast] = useState({
    open: false,
    severity: 'success',
    message: ''
  })

  const fetchGyms = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://${themeConfig.apiUrl}/api/gym`, {
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
      setGyms(response.data.data)
      setTotalCount(response.data.meta.totalItems)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching gyms:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGyms()
  }, [page, pageSize, orderBy, orderDirection, search])

  const handleSearchChange = debounce(event => {
    setSearch(event.target.value)
  }, 500)

  const handleAdd = () => {
    setAddFormVisible(!addFormVisible)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    // Validate required fields
    const requiredFields = ['name', 'address', 'city', 'state', 'country', 'status']
    const missingFields = requiredFields.filter(field => !formData[field])

    const titleCase = str => str.charAt(0).toUpperCase() + str.slice(1)
    missingFields.forEach((field, index) => {
      missingFields[index] = titleCase(field)
    })

    if (missingFields.length) {
      setToast({
        open: true,
        severity: 'error',
        message: `Please fill out all required fields: ${missingFields.join(', ')}`
      })

      return
    }

    // Parse fields as needed
    const validatedFormData = {
      ...formData,
      latitude: parseFloat(formData.latitude) || 0,
      longitude: parseFloat(formData.longitude) || 0,
      pincode: parseInt(formData.pincode) || 0
    }

    try {
      const response = await axios.post(`http://${themeConfig.apiUrl}/api/gym`, validatedFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.status === 200) {
        setToast({
          open: true,
          severity: 'success',
          message: 'Gym added successfully'
        })

        // Reset form data
        setFormData({
          name: '',
          address: '',
          city: '',
          state: '',
          country: '',
          status: '',
          pincode: '',
          phone_number: '',
          email: '',
          contact_person: '',
          currency: '',
          latitude: '',
          longitude: ''
        })

        fetchGyms()
        setAddFormVisible(false)
      }
    } catch (error) {
      console.error('Error adding gym:', error)
      setToast({
        open: true,
        severity: 'error',
        message: 'Error adding gym'
      })
    }
  }

  const handleCloseToast = () => {
    if (toast.open) {
      setToast({
        ...toast,
        open: false
      })
    }
  }

  return (
    <>
      <Dialog open={addFormVisible} onClose={() => setAddFormVisible(false)}>
        <DialogTitle>
          Add New Gym
          <Button onClick={() => setAddFormVisible(false)} style={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent dividers>
          <form
            onSubmit={handleFormSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '500px' }}
          >
            <TextField
              label='Gym Name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label='Address'
              name='address'
              value={formData.address}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField label='City' name='city' value={formData.city} onChange={handleInputChange} required fullWidth />
            <TextField
              label='State'
              name='state'
              value={formData.state}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label='Country'
              name='country'
              value={formData.country}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label='Status'
              name='status'
              value={formData.status}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField label='Pincode' name='pincode' value={formData.pincode} onChange={handleInputChange} fullWidth />
            <TextField
              label='Phone Number'
              name='phone_number'
              value={formData.phone_number}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField label='Email' name='email' value={formData.email} onChange={handleInputChange} fullWidth />
            <TextField
              label='Contact Person'
              name='contact_person'
              value={formData.contact_person}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label='Currency'
              name='currency'
              value={formData.currency}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label='Latitude'
              name='latitude'
              value={formData.latitude}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label='Longitude'
              name='longitude'
              value={formData.longitude}
              onChange={handleInputChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddFormVisible(false)} color='secondary' startIcon={<CloseIcon />}>
            Discard
          </Button>
          <Button type='submit' variant='contained' color='primary' onClick={handleFormSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <MaterialTable
        icons={tableIcons}
        title=''
        columns={[
          { title: 'Gym Name', field: 'name' },
          { title: 'Address', field: 'address', align: 'right' },
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
        data={gyms}
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
                Add Gym
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
          pageSize: 10,
          sorting: true,
          paging: true,
          detailPanelType: 'single',
          showFirstLastPageButtons: true
        }}
        detailPanel={[
          {
            icon: ExpandMore,
            openIcon: ExpandLess,
            tooltip: 'Show Details',
            render: rowData => {
              return (
                <Collapse in={true} timeout='auto' unmountOnExit>
                  <Box className={classes.detailPanel}>
                    <Typography className={classes.detailTitle}>Gym Details</Typography>
                    <TableContainer>
                      <Table size='small' aria-label='gym details'>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <strong>Address:</strong>
                            </TableCell>
                            <TableCell>{rowData.address}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Pincode:</strong>
                            </TableCell>
                            <TableCell>{rowData.pincode}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Phone Number:</strong>
                            </TableCell>
                            <TableCell>{rowData.phone_number}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Email:</strong>
                            </TableCell>
                            <TableCell>{rowData.email}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Contact Person:</strong>
                            </TableCell>
                            <TableCell>{rowData.contact_person}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Currency:</strong>
                            </TableCell>
                            <TableCell>{rowData.currency}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Latitude:</strong>
                            </TableCell>
                            <TableCell>{rowData.latitude}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <strong>Longitude:</strong>
                            </TableCell>
                            <TableCell>{rowData.longitude}</TableCell>
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
      <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleCloseToast}>
        <div>
          <Alert onClose={handleCloseToast} severity={toast.severity}>
            {toast.message}
          </Alert>
        </div>
      </Snackbar>
    </>
  )
}

export default TableGyms
