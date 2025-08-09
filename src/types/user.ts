export interface IUser {
    id: string;
    username: string;
    isOnline: boolean;
}

export interface IUserStatusChanged {
    type: "userStatusChanged";
    username: string;
    id: string;
    isOnline: boolean;
}
