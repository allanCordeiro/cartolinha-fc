import GroupsIcon from '@mui/icons-material/Groups'
import { Button, Divider, Grid, styled } from '@mui/material'
import { NextPage } from 'next'

import { Page } from '../components/Page'
import Link from 'next/link'
import { TeamLogo } from '../components/TeamLogo'
import { Section } from '../components/Section'
import { Label } from '../components/Label'


const BudgetContainer = styled(Section)(({theme}) => ({
  width: '800px', 
  height: '300px',
  marginTop: theme.spacing(8),
  display: 'flex',
  alignItems: 'center'
}))

const HomePage: NextPage = () => {
  return (
    <Page>
      <Grid container sx={{
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        gap: (theme) => theme.spacing(3)
        }}
      >
        <Grid item>
          <TeamLogo sx={{ position: 'absolute', left:0, right: 0, m: "auto"}} />
          <BudgetContainer>
            <Grid container>
              <Grid item xs={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Label>Última pontuação</Label>
                <Label>99.04</Label>
              </Grid>
              <Grid item xs={2} sx={{display: 'flex', justifyContent: 'center'}} >                
                <Divider orientation='vertical' sx={{height: 'auto'}} />
              </Grid>
              <Grid item xs={5} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Label>Patrimônio</Label>
                <Label>300</Label>
              </Grid>
            </Grid>
          </BudgetContainer>
        </Grid>
        <Grid item>
          <Button component={Link} href="/players" variant="contained" startIcon={<GroupsIcon />}>Escalar jogadores</Button>
        </Grid>
      </Grid>
    </Page>
  )
}



export default HomePage