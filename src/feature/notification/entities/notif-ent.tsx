export interface Notification {
  id: number;
  titre: string;
  message: string;
  lu: boolean;
  dateEnvoi: string;
  destinataireId: number;
}
