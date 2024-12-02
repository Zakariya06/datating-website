export interface IFacebookGraphResponse {
  age_range: {
    max: number;
    min: number;
  };
  birthday: string;
  email: string;
  frist_name: string;
  gender: string;
  last_name: string;
  name: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
  hometown: {
    id: string;
    name: string;
  };
  location: {
    id: string;
    name: string;
  };
}
