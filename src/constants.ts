
export const allClasses = {
  RESTORATION: [
    { id: 1, name: "ADU-BOAHENE KEZIAH" },
    { id: 2, name: "ADU-BOAHENE LISHA" },
    { id: 3, name: "AKORFUL BARRY" },
    { id: 4, name: "AKORFUL BERNESA" },
    { id: 5, name: "D’ABREU VIEGAS WILLIAM" },
    { id: 6, name: "DEMARI KELLY" },
    { id: 7, name: "FERAL NAVEAH" },
    { id: 8, name: "LUKALU MACAIAH" },
    { id: 9, name: "MENSAH BONSU SHENEECIA" },
    { id: 10, name: "MICAH FORBES" },
    { id: 11, name: "PURITY" },
    { id: 12, name: "NHIKA MAKAELA" }
  ],
  INSPIRATION: [
    { id: 1, name: "ADEYEMI JOSIAH" },
    { id: 2, name: "APPIAH JASON" },
    { id: 3, name: "APPIAH JOSUA" },
    { id: 4, name: "ASIEDU EZEKIEL" },
    { id: 5, name: "AURELIA XABA" },
    { id: 6, name: "AWUKU ADRIELLE EYIRAM" },
    { id: 7, name: "CHIKOSI TAWADA (TJ)" },
    { id: 8, name: "D’ABREU ANAIAH" },
    { id: 9, name: "D’ABREU JOY" },
    { id: 10, name: "ESSUMAN JEREMIAH" },
    { id: 11, name: "LOVE JOANNA" },
    { id: 12, name: "MAWIRE DANIEL" },
    { id: 13, name: "MAWIRE JEREMIAH" },
    { id: 14, name: "MUSAFARI GABRIEL" },
    { id: 15, name: "ZIBANANYI JUDAH" },
    { id: 16, name: "OWONARUIGHE CALEB" }

  ],
  RECONCILIATION: [
    { id: 1, name: "ADU-BOAHENE PRINCE" },
    { id: 2, name: "ADU-BOAHENE TORI" },
    { id: 3, name: "CHIKOZI ZOE" },
    { id: 4, name: "D’ABREU AMARIS" },
    { id: 5, name: "ESSUMAN GABRIEL" },
    { id: 6, name: "FERAL SHAVAE" },
    { id: 7, name: "MAWIRE VICTORIA" },
    { id: 8, name: "MENSAH- BONSU ARIYEL" },
    { id: 9, name: "MENSAH-BONSU JEMIMA" },
    { id: 11, name: "NHIKA SAMARA" },
    { id: 12, name: "NATHANIEL AKINSANYA" },
    { id: 13, name: "PETERS GABRIEL" },
    { id: 14, name: "TAIVEON BROTHERSON" }
  ],
  EDEN: [
    { id: 1, name: "JESSE ZIBANAYI" },
    { id: 2, name: "ISABELLA APPIAH" },
    { id: 3, name: "T’ZAYEA BROTHERSIN" },
    { id: 4, name: "KIEREN OWONURUIGHE" },
    { id: 5, name: "ZARA" },
    { id: 6, name: "ABIGAIL MUSAFIRI" },
    { id: 7, name: "VIMBISO SITHOLE" },
    { id: 8, name: "AMAYAH ADEYEMI" },
    { id: 9, name: "BROTHERSON T’ZAYEA" },
    { id: 10, name: "OWONARUIGHE KEREN" }
  ]
}

export type Student = {
  id: number,
  name: string
}

export enum ClassRooms {
  INSPIRATION = 'INSPIRATION',
  RESTORATION = 'RESTORATION',
  RECONCILIATION = 'RECONCILIATION'

}