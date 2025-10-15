import {MSGraphClientFactory} from "@microsoft/sp-http"
export interface IGetAllUsersProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  graphClient:MSGraphClientFactory;
}
