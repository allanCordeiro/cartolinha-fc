export type Player = {
    id: number;
    name: string;
    price: number;
}

export type Action = {    
    player_name: string;
    minutes: number;
    action: "goal" | "yellow_card" | "fault" | "red_card" | "assist";
    score: number;
}

export type Match = {
    id: string;
    match_date: string;
    team_a: string;
    team_b: string;
    result: string;
    //score: number;
    actions: Action[];
}

export const PlayersMap: {[key: string]: string} = {
    "Cristiano Ronaldo": "/img/players/Cristiano Ronaldo.png",
    "Messi": "/img/players/Messi.png",
    "Neymar": "/img/players/Neymar.png",
    "Flavio Caca-Rato": "/img/players/Maguirre.png"
}

export const TeamsImagesMap: { [key: string]: string } = {
    Alemanha: "/img/flags/Alemanha.png",
    Argentina: "/img/flags/Argentina.png",
    Bélgica: "/img/flags/Belgica.png",
    Brasil: "/img/flags/Brasil.png",
    França: "/img/flags/Franca.png",
    Inglaterra: "/img/flags/Inglaterra.png",
    Polônia: "/img/flags/Polonia.png",
    Portugal: "/img/flags/Portugal.png",
  };