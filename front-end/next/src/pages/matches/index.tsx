import { Box, Button } from '@mui/material'
import { NextPage } from 'next'

import { Page } from '../../components/Page'
import { MatchResult } from '../../components/MatchResult'
import { useHttp } from '../../hooks/useHttp'
import { fetcherStats } from '../../util/http'
import { Match } from '../../util/model'
import { useRouter } from 'next/router'

const ListMatchesPage: NextPage = () => {
  const {data } = useHttp<Match[]>("/matches", fetcherStats, {refreshInterval: 5000});
  const router = useRouter();

  return (
    <Page>
      <Box sx={{display: 'flex', alignItems:'center', flexDirection: 'column', gap: (theme) => theme.spacing(3)}}>
        {data && data?.map((match, key) => (
            <Box key={key} sx={{cursor: 'pointer'}} onClick={() => router.push(`/matches/${match.id}`)}>
              <MatchResult match={match} />
            </Box>
          )
        )}        
      </Box>
    </Page>
  )
}




export default ListMatchesPage