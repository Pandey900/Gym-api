// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

import GymIcon from '@mui/icons-material/LocationCity'
import UsersIcon from '@mui/icons-material/PeopleAlt'
import GymAdminsIcon from '@mui/icons-material/SupervisorAccount'
import GymMembersIcon from '@mui/icons-material/Group'
import MembershipPlansIcon from '@mui/icons-material/Assignment'
import PlansPricingIcon from '@mui/icons-material/MonetizationOn'
import MembershipsIcon from '@mui/icons-material/CardMembership'
import PaymentsIcon from '@mui/icons-material/Payment'
import WorkoutPlansIcon from '@mui/icons-material/FitnessCenter'
import DietPlansIcon from '@mui/icons-material/Dining'

const navigation = () => {
  let options = [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
  
  // Check if window is defined to ensure this runs in the browser
  if (typeof window !== 'undefined') {
    const user_type = localStorage.getItem('user_type')
    if (user_type === 'admin') {
      options = [
        { sectionTitle: 'Admin' },
        { title: 'Gyms', icon: GymIcon, path: '/gyms' },
        { title: 'Users', icon: UsersIcon, path: '/users' },
        { title: 'Gym Admins', icon: GymAdminsIcon, path: '/gym-and-gym-admins' },
        { title: 'Gym Members', icon: GymMembersIcon, path: '/gym-and-gym-members' },
        { title: 'Membership Plans', icon: MembershipPlansIcon, path: '/membership-plans' },
        { title: 'Plans Pricing', icon: PlansPricingIcon, path: '/membership-plans-pricing' },
        { title: 'Memberships', icon: MembershipsIcon, path: '/memberships' },
        { title: 'Payments', icon: PaymentsIcon, path: '/payments' },
        { title: 'Workout Plans', icon: WorkoutPlansIcon, path: '/workout-plans' },
        { title: 'Diet Plans', icon: DietPlansIcon, path: '/diet-plans' }
      ]
    } else if (user_type === 'gym_admin') {
      options = [
        { sectionTitle: 'Gym Admin' },
        { title: 'Gym Members', icon: GymMembersIcon, path: '/gym-members' },
        { title: 'Membership Plans', icon: MembershipPlansIcon, path: '/membership-plans' },
        { title: 'Plans Pricing', icon: PlansPricingIcon, path: '/membership-plans-pricing' },
        { title: 'Memberships', icon: MembershipsIcon, path: '/memberships' },
        { title: 'Payments', icon: PaymentsIcon, path: '/payments' },
        { title: 'Workout Plans', icon: WorkoutPlansIcon, path: '/workout-plans' },
        { title: 'Diet Plans', icon: DietPlansIcon, path: '/diet-plans' }
      ]
    } else if (user_type === 'gym_member') {
      options = [
        { sectionTitle: 'Gym Member' },
        { title: 'Memberships', icon: MembershipsIcon, path: '/memberships' },
        { title: 'Payments', icon: PaymentsIcon, path: '/payments' },
        { title: 'Workout Plans', icon: WorkoutPlansIcon, path: '/workout-plans' },
        { title: 'Diet Plans', icon: DietPlansIcon, path: '/diet-plans' }
      ]
    } else {
      options = []
    }
  }

  return options;
}

export default navigation;