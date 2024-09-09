// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import { makeStyles } from '@mui/styles'
import { debounce } from 'lodash'

// ** Icons Imports
import FitnessCenter from '@mui/icons-material/FitnessCenter'
import People from '@mui/icons-material/People'

// ** Demo Components Imports
// import TableGyms from 'src/views/tables/TableGyms'
import TableUsers from 'src/views/tables/TableUsers'

const useStyles = makeStyles(theme => ({
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiCardHeader-title': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5)
  }
}))

const MUITable = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={3}>
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar className={classes.avatar}>
                <FitnessCenter />
              </Avatar>
            }
            title='Gyms'
            titleTypographyProps={{ variant: 'h6' }}
          />
          <TableGyms />
        </Card>
      </Grid> */}
      <Grid item xs={12}>
        <Card>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar className={classes.avatar}>
                <People />
              </Avatar>
            }
            title='Users'
            titleTypographyProps={{ variant: 'h6' }}
          />
          <TableUsers />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
