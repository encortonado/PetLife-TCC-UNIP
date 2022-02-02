export interface UserImage {
  userId: string;
  base64: string;
}

export class UserImageDTO implements UserImage {
  userId: string;
  base64: string;
}
