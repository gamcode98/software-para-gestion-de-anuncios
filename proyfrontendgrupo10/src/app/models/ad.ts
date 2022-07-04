import { Area } from './area';

export class Ad {
  _id!: string;
  text!: string;
  typeOfContent!: {
    planeText: Boolean;
    image: Boolean;
    html: Boolean;
    video: Boolean;
  };
  publishingMedia!: [
    {
      name: String;
      accounts: String[];
    }
  ];
  entryDate!: {
    initial: Date;
    final: Date;
  };

  receivers!: [
    {
      area: Area;
      areaRoles: string[];
      status: string;
    }
  ];
  resources!: {
    pdf?: String;
    images: [String];
  };
  readingTime!: {
    type: String;
  };
  editor!: string;
}
