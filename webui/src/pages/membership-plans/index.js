// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import { makeStyles } from '@mui/styles'

// ** Icons Imports
import FitnessCenter from '@mui/icons-material/FitnessCenter'

// ** Demo Components Imports
import TableGyms from 'src/views/tables/TableGyms'

const useStyles = makeStyles(theme => ({
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiCardHeader-title': {
      display: 'flex',
      alignItems: 'center' // Ensure content is centered vertically
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
  )
}

export default MUITable