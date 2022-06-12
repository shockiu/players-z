export interface Country {
    name:         string;
    country_code: number;
}

export interface Sport {
    sport_code: number;
    name:       string;
}

export interface Player {
    country_code: number;
    sport_code:   number;
    player_code:  number;
    name:         string;
    url_image:    string;
}

