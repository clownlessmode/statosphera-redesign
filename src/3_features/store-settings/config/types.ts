export interface StoreSettingsDto {
  ip: string;
  type: "status" | "emergencyClosure" | "openDoor" | "reboot" | "remote";
  command: boolean;
}

export interface StoreStatusRoData {
  call_stop: boolean;
  complete_closure: boolean;
  message_off_emergency_button: boolean;
  open_door: boolean;
  pressing_the_emergency_button: boolean;
  releRed: boolean;
  speaker_volume: number;
  status_door: boolean;
  was_open: boolean;
}

export interface StoreStatusRo {
  data: StoreStatusRoData;
  message: string;
  status: string;
}
