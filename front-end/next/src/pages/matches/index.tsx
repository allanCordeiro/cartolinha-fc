import { Box, Button } from '@mui/material'
import { NextPage } from 'next'

import styles from '../styles/Home.module.css'
import { Page } from '../../components/Page'
import { MatchResult } from '../../components/MatchResult'

const ListMatchesPage: NextPage = () => {
  return (
    <Page>
      <Box sx={{display: 'flex', alignItems:'center', flexDirection: 'column', gap: (theme) => theme.spacing(3)}}>
        <MatchResult match={{team_a: 'Brasil', team_b: 'Argentina'}}/>
        <MatchResult match={{team_a: 'Brasil', team_b: 'Argentina'}}/>
        <MatchResult match={{team_a: 'Brasil', team_b: 'Argentina'}}/>
      </Box>
    </Page>
  )
}



export default ListMatchesPage