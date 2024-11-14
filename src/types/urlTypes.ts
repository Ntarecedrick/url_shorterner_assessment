export interface ResponseUrl {
  id: string;
  url: string;
  ttlInSeconds: number;
  createdDate: Date;
  modifiedDate: Date;
}

export interface CreateUrl {
  url: string;
  ttlInSeconds: number;
}
export interface DeleteUrl {
  id: string;
}
export interface UpdateUrl {
  id: string;
  url: string;
  ttlInSeconds: number;
}
