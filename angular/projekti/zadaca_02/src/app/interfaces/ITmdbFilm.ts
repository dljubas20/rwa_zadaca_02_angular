export interface ITmdbFilm {
    id : number;
    imdb_id : number;
    adult : boolean;
    backdrop_path : string;
    belongs_to_collection : any;
    budget : number;
    genres : any;
    homepage : string;
    original_language : string;
    original_title : string;
    overview : string;
    popularity : number;
    poster_path : string;
    production_companies : any;
    production_countries : any;
    release_date : Date;
    revenue : number;
    runtime : number;
    spoken_languages : any;
    status : string;
    tagline : string;
    title : string;
    video : boolean;
    vote_average : number;
    vote_count : number;
}