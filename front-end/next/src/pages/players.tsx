import { Autocomplete, Avatar, Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material'
import { NextPage } from 'next'
import Image from "next/image"

import { Page } from '../components/Page'
import { Section } from '../components/Section'
import { TeamLogo } from '../components/TeamLogo'
import { Label } from '../components/Label'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Player, PlayersMap } from '../util/model'
import PersonIcon from "@mui/icons-material/Person2"
import DeleteIcon from "@mui/icons-material/Delete"
import { fetcherStats, httpAdmin } from '../util/http'
import { useHttp } from '../hooks/useHttp'

const players = [
  {id: "64fb9c2f-a45b-4f96-9d8b-b127878ca6f3", name: "Messi", price: 35},
  {id: "4876d14f-d998-4abf-96ef-89fd53185464", name: "Cristiano Ronaldo", price: 35},
  {id: "0f463bea-1dbd-4765-b080-9f5f170b6ded", name: "Neymar", price: 5},
  {id: "c7830b65-cf79-49b7-a878-82250fec1d94", name: "Flavio Caca-Rato", price: 42},
]

const fakePlayer = {
  id: '',
  name: 'Escolha o jogador',
  price: 0,
}

const makeFakePlayer = (key: number) => ({
  ...fakePlayer,
  name: `${fakePlayer.name} ${key +1}`,
});

const totalPlayers = 4;
const balance = 300;
const fakePlayers: Player[] = new Array(totalPlayers).fill(0).map((_, key) => makeFakePlayer(key));

const ListPlayersPage: NextPage = () => {

  const {data: myPlayers} = useHttp("/my-teams/22087246-01bc-46ad-a9d9-a99a6d734167/players", fetcherStats);
  const {data: balanceData} = useHttp(
    "/my-teams/22087246-01bc-46ad-a9d9-a99a6d734167/balance", 
    fetcherStats,
    {
      refreshInterval: 5000,
    }
  );
  const {data: players} = useHttp<Player[]>("/players", fetcherStats, {fallbackData: [],});
  const [playersSelected, setPlayersSelected] = useState(fakePlayers)

  const countPlayersUsed = useMemo(() => playersSelected.filter(
    (player) => player.id !== ''
  ).length, [playersSelected]);  

  const budgetRemaining = useMemo(
    () => !balanceData ? 0 : balanceData.balance - playersSelected.reduce((acc, player) => acc + player.price, 0), [playersSelected, balanceData]
  );

  useEffect(() => {
    if(!myPlayers) {
      return;
    }
    setPlayersSelected((prev) => {
      return [...myPlayers, ...prev.slice(myPlayers.length)];
    })
  }, [myPlayers]);

  const addPlayer = useCallback((player: Player) => {
    setPlayersSelected((prev) => {
      const hasFound = prev.find((p) => p.id === player.id);
      if(hasFound) return prev;
      const firstIndexFakePlayer = prev.findIndex(p => p.id === '');
      if(firstIndexFakePlayer === -1) return prev;

      const newPlayers = [...prev];
      newPlayers[firstIndexFakePlayer] = player;
      return newPlayers;
    })
  }, []);

  const removePlayer = useCallback((index: number) => {
    setPlayersSelected((prev) => {      
      const newPlayers = prev.map((p, key) => {
        if (key === index) {
          return makeFakePlayer(key);
        }
        return p;
      });
      return newPlayers;
    })
  }, []);

  const saveMyPlayers = useCallback(async() => {
    await httpAdmin.put('my-teams/22087246-01bc-46ad-a9d9-a99a6d734167/players', {
      players_uuid: playersSelected.map(player => player.id)
    })
  }, [playersSelected]);

  return (
    <Page>
      <Grid container sx={{display: 'flex', justifyContent: 'center', gap: (theme) => theme.spacing(4)}}>
        <Grid item xs={12}>
          <Section>
            <TeamLogo sx={{
              position: 'absolute', 
              flexDirection: 'row', 
              ml: (theme) => theme.spacing(-5.5), 
              mt: (theme) => theme.spacing(-3.5),
              gap: (theme) => theme.spacing(1),
            }}/>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: (theme)=> theme.spacing(2)}}>
              <Label>Você ainda tem</Label>
              <Label>C$ {budgetRemaining}</Label>
            </Box>
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section>
            <Grid container>
              <Grid item xs={6}>
              <Autocomplete
                  sx={{ width: 400 }}
                  isOptionEqualToValue={(option, value) => {
                    console.log(option);
                    return option.name
                      .toLowerCase()
                      .includes(value.name.toLowerCase());
                  }}
                  getOptionLabel={(option) => option.name}
                  options={players!}
                  onChange={(_event, newValue) => {
                    if (!newValue) {
                      return;
                    }
                    addPlayer(newValue);
                  }}
                  renderOption={(props, option) => (
                    <React.Fragment key={option.name}>
                      <ListItem {...props}>
                        <ListItemAvatar>
                          <Avatar>
                            <Image
                              src={PlayersMap[option.name]}
                              width={40}
                              height={40}
                              alt=""
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${option.name}`}
                          secondary={`C$ ${option.price}`}
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Pesquise um jogador"
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          backgroundColor: (theme) =>
                            theme.palette.background.default,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Label>Meu time</Label>
                <List>
                  {playersSelected.map((player, key) => (
                    <React.Fragment key={key}>                      
                      <ListItem secondaryAction={<IconButton edge='end' disabled={player.id === ''} onClick={() => removePlayer(key)}><DeleteIcon /></IconButton>}>
                        <ListItemAvatar>                          
                            <Avatar>
                              {player.id === '' ? (<PersonIcon />) :
                              (<Image
                                src={PlayersMap[player.name]}
                                width={40}
                                height={40}
                                alt=""
                              />)}
                            </Avatar>
                          </ListItemAvatar>
                        <ListItemText primary={player.name} secondary={`C$ ${player.price}`} />
                      </ListItem>
                      <Divider variant='inset' component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Section>
        </Grid>
        <Grid item>
          <Button variant='contained' size='large' disabled={countPlayersUsed < totalPlayers || budgetRemaining < 0 } onClick={() => saveMyPlayers()}>Salvar</Button>
        </Grid>
      </Grid>
    </Page>
  )
}



export default ListPlayersPage