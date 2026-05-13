export interface MailingChannel {
  id: string;
  name: string;
  type: string;
  idStore: string;
  active: boolean;
}

export interface MailingChannelDto {
  idStore: string[];
  types: string[];
}

export interface MailingChannelAddDto {
  id: number;
  name: string;
  type: string;
  id_store: number;
  active: boolean;
}

export interface MailingChannelUpdateDto {
  name: string;
  type: string;
  id_store: number;
  active: boolean;
}
