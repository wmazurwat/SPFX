export interface ISpfxProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  userEmail: string;
}
// Importowanie typów kontekstu z @microsoft/sp-webpart-base
import { WebPartContext } from "@microsoft/sp-webpart-base";