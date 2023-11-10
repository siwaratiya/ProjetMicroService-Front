import { MsgReponseStatusDto } from "./MsgReponseStatusDto";
export class AuthenticationResponseDto extends MsgReponseStatusDto{
    token! : string;
    refresh_token! : string; }