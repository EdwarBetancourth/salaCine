import { Movie, Room } from ".";

export interface Ticket {
    id?: number;
    room_id: number;
    movie_id: number;
    hour?: number;
    movie: Movie;
    room: Room;
}
