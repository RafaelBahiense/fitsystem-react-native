type ClientParams = {
  id?: number;
  height: number;
  weight: number;
  clientId?: number;
  user?: string;
  created_at?: Date;
};

export class ClientHealthMetrics {
  readonly id?: number;
  height: number;
  weight: number;
  readonly clientId?: number;
  readonly user?: string;
  readonly created_at?: Date;

  constructor(params: ClientParams) {
    if (params.id) this.id = params.id;
    if (params.created_at) this.created_at = params.created_at;
    if (params.user) this.user = params.user;
    if (params.clientId) this.clientId = params.clientId;

    this.height = params.height;
    this.weight = params.weight;
  }
}
