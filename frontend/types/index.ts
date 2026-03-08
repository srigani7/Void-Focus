export type BlockedApp = {
  name: string;
  enabled: boolean;
};

export type SessionLog = {
  id: string;
  appName: string;
  timestamp: string;
  action: string;
};
