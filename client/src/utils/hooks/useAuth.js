import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetProfileQuery } from '../../app/services/usersApi'
import { logout, setCredentials } from '../../features/authSlice'

const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const { data: profile, error } = useGetProfileQuery(null, {
    skip: !userInfo
  })

  useEffect(() => {
    if (profile) {
      dispatch(setCredentials(profile))
    } else if (error) {
      if (error.status === 401) {
        dispatch(logout())
        navigate('/login')
      }
    }
  }, [profile, error, dispatch, navigate])

  return !!userInfo
}

export default useAuth
