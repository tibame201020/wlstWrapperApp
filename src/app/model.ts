export interface ServerJdbc {
  serverConfig: ServerConfig;
  jdbcConfigs: DatasourceConfig[];
  isInsertMode: boolean;
}

export interface ServerDeploy {
  serverConfig: ServerConfig;
  deployConfigs: DeployConfig[];
}

export interface ServerConfig {
  adminURL: string;
  adminUsername: string;
  adminPassword: string;
  setDomainEnv: string;
  execWlst: string;
  deployPath: string;
}

export interface DatasourceConfig {
  name: string;
  jndiName: string;
  dsURL: string;
  user: string;
  password: string;
  target: string;
  driverClass: string;
}

export interface DeployConfig {
  project: string;
  warPath: string;
  target: string;
}
