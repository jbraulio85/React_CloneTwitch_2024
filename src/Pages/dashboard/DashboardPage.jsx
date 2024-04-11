/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Nav } from '../../components/navbar/Nav'
import { Sidebar } from '../../components/navbar/Sidebar'
import { Content } from '../../components/dashboard/Content'
import { useChannels, useUserDetails } from '../../shared/hooks'
import { LoadingSpinner } from '../../components/LoadingSpinner'

import './dashboardPage.css'

export const DashboardPage = () => {
  const { getChannels, isFetching, followedChannels, allChannels } = useChannels()
  const { isLogged } = useUserDetails()

  useEffect(() => {
    getChannels(isLogged)
  }, [])

  if (isFetching) {
    return <LoadingSpinner />
  }

  return (
    <div className='dashboard-container'>
      <Nav />
      <Sidebar channels={followedChannels}/>
      <Content channels={allChannels} getChannels={getChannels} />
    </div>
  )
}


