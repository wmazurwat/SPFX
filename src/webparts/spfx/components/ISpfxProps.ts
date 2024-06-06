export interface ISpfxProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  quality:string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  userEmail: string;
  customerName?: string;
  setCustomerName?: (name: string) => void;
  setActivePage?: (page: number) => void; 
  setQuality?: (quality: string) => void;
}
// Importowanie typów kontekstu z @microsoft/sp-webpart-base
import { WebPartContext } from "@microsoft/sp-webpart-base";