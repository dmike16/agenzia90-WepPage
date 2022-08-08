export class Services {
  static load(): Services[] {
    const bolli = new Services(
      "Bolli",
      "Servizio Pagamento Bolli",
      "Sermetra Net Service",
      "design_services"
    );
    const passaggio = new Services(
      "Passaggi",
      "Rilascio CDP ed Etichetta",
      "ACI Copernico Service",
      "hub"
    );
    const patenti = new Services(
      "Patenti",
      "Rinnovo Patenti",
      "MTCT Services",
      "support"
    );
    const visure = new Services(
      "Visure",
      "Visure Motorizzazione e PRA",
      "Sermetra Net Service",
      "batch_prediction"
    );
    const imma = new Services(
      "Immatricolazioni",
      "Locali ed Esteri",
      "Sermetra Net Service",
      "build"
    );
    const radiozioni = new Services(
      "Radiazioni",
      "Servizio Radiazioni",
      "Sermetra Net Service",
      "supervisor_account"
    );
    const duplicati = new Services(
      "Duplicati",
      "Carte di Circolazioni e CDP",
      "Sermetra Net Service",
      "mediation"
    );
    const licenza = new Services(
      "Licenza",
      "Conto Proprio e Terzi",
      "Sermetra Net Service",
      "waterfall_chart"
    );

    return [
      bolli,
      passaggio,
      patenti,
      visure,
      imma,
      radiozioni,
      duplicati,
      licenza,
    ];
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get hint(): string {
    return this._hint;
  }

  get icon(): string {
    return this._icon;
  }

  constructor(name: string, description: string, hint: string, icon: string) {
    this._hint = hint;
    this._description = description;
    this._name = name;
    this._icon = icon;
  }

  private _name: string;
  private _description: string;
  private _hint: string;
  private _icon: string;
}
