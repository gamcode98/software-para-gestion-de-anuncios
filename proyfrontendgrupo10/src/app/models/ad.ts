export class Ad {
  _id!: string;
  text!: string;
  typeOfContent!: {
    planeText: Boolean;
    image: Boolean;
    html: Boolean;
    video: Boolean;
  };
  publishingMedia!: {
    facebook: Boolean;
    twitter: Boolean;
    youtube: Boolean;
    instagram: Boolean;
    email: Boolean;
    tv: Boolean;
  };
  entryDate!: {
    initial: Date;
    final: Date;
  };
  state!: {
    type: String;
  };
  receivers!: [
    {
      area: string;
      roles: [String];
    }
  ];
  resources!: {
    pdf: String;
    images: [String];
  };
  readingTime!: {
    type: String;
  };
  editor!: {
    ref: 'Person';
  };
}
