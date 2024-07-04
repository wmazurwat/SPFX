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
  idReview?: number;
  answer?: Answer[]; // Zaktualizowanie typu na Answer[]
  setCustomerName?: (name: string) => void;
  setIdReview?: (name: number) => void;
  setActivePage?: (page: number) => void;
  setQuality?: () => void;
  setAnswer?: (answer: Answer[] | string[]) => void;
}
// Importowanie typów kontekstu z @microsoft/sp-webpart-base
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Answer } from "./types";
