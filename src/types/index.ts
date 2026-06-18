// Authentication types
export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  is_active: boolean;
  created_at: string;
}

export interface UserCreate {
    username: string;
    email: string;
    name: string;
    password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: UserCreate) => Promise<void>;
  logout: () => void;
  loading: boolean;
}


// Device types

export interface DeviceIn {
  name: string;
  description: string;
  topics: [string];
}

export interface DeviceOut {
  device_id: string;
  name: string;
  description: string;
  topics: [string];
  status: string;
  last_contact: Date | null;
  created_in: Date;
  active: boolean;
}

export interface DeviceUpdate {
  name: string | null;
  description: string | null;
  topics: [string] | null;
  active: boolean | null;
}

export interface DeviceRegisterOut {
  api_key:  string;
}

export interface RenewalKeyOut {
  device_id: string;
  api_key: string;
}

export interface MessageOut {
  id: number;
  topic: string;
  payload: string | null;
  qos: number;
  retain: boolean;
  content_type: string | null;
  user_props: string | null;
  received_in: Date;
}

export interface PublicationIn {
  topic: string;
  payload: string;
  qos: number;
  retain: boolean;
  content_type: string;
  expiry_interval: number;
  user_properties: [[string]] | null;
}

export interface PublicationOut {
  id: number;
  topic: string;
  payload: string | null;
  qos: number;
  min: number;
  confirmed_in: Date | null;
}

export interface StatusOut {
  mqtt_conncted: boolean;
  broker: string;
  client_id: string;
  total_messages: number;
  total_publications: number;
}

// PLC types

export interface PLCIn {
  device_id: string;
  name: string;
  ip: string;
  port_modbus: number;
  port_tcp: number;
  protocol: string;
  description: string | null;
  unit_id: number;
  timeout: number;
}

export interface PLCOut {
  id: number;
  device_id: string;
  name: string;
  ip: string;
  port_modbus: number;
  port_tcp: number;
  protocol: string;
  description: string | null;
  unit_id: number;
  timeout: number;
  active: boolean;
  create_in: Date;
  total_registers: number;
}

export interface PLCUpdate {
  name: string | null;
  ip: string | null;
  port_modbus: number | null;
  port_tcp: number | null;
  protocol: string | null;
  description: string | null;
  unit_id: number | null;
  timeout: number | null;
  active: boolean | null;
}

export interface MapRegisterIn {
  type: string;
  address: number;
  topic: string;
  decription: string | null;
  measure_unit: string | null;
  scale: number;
  offset: number;
  qos: number;
  read_only: boolean;
}

export interface MapRegisterOut {
  id: number;
  plc_id: number;
  type: string;
  address: number;
  address_modbus: number;
  topic: string;
  decription: string | null;
  measure_unit: string | null;
  scale: number;
  offset: number;
  qos: number;
  read_only: boolean;
  active: boolean;
  created_in: Date;
}

export interface MapRegisterUpdate {
  topic: string | null;
  decription: string | null;
  measure_unit: string | null;
  scale: number | null;
  offset: number | null;
  qos: number | null;
  read_only: boolean | null;
  active: boolean | null;
}

export interface MapBulkIn {
  registers: (registers: [MapRegisterIn]) => Promise<void>;
}

export interface TestConnOut {
  success: boolean;
  message: string;
  ip: string;
  port: number;
  unit_id: number;
}
