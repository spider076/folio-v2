export interface DiscordResponse {
    data: Data;
    success: boolean;
}

export interface Data {
    kv: Kv;
    spotify: Spotify;
    discord_user: Discorduser;
    activities: Activity[];
    discord_status: string;
    active_on_discord_web: boolean;
    active_on_discord_desktop: boolean;
    active_on_discord_mobile: boolean;
    listening_to_spotify: boolean;
}

export interface Activity {
    id: string;
    name: string;
    type: number;
    state: string;
    emoji?: Emoji;
    created_at: number;
    session_id?: string;
    details?: string;
    timestamps?: Timestamps2;
    application_id?: string;
    assets?: Assets;
    buttons?: string[];
    flags?: number;
    sync_id?: string;
    party?: Party;
}

export interface Party {
    id: string;
}

export interface Assets {
    large_image: string;
    large_text: string;
    small_image?: string;
    small_text?: string;
}

export interface Timestamps2 {
    start: number;
    end?: number;
}

export interface Emoji {
    name: string;
}

export interface Discorduser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    bot: boolean;
    global_name: string;
    avatar_decoration?: any;
    display_name: string;
    public_flags: number;
}

export interface Spotify {
    track_id: string;
    timestamps: Timestamps;
    album: string;
    album_art_url: string;
    artist: string;
    song: string;
}

export interface Timestamps {
    start: number;
    end: number;
}

export interface Kv {
    lanyard_api_key: string;
}

export interface Repo {
    owner: string;
    repo: string;
    link: string;
    description: string;
    image: string;
    website: string;
    language: string;
    languageColor: string;
    stars: string;
    forks: any;
}
