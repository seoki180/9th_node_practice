export class SignupDTO {
  user_Index!: string;
  name: string;
  id: string;
  password!: string;
  salt!: string;
  email!: string;
  birthday!: Date;
  address: string;
  gender: string;
  point!: number;
  profile_url!: string;
  phone!: string;
  constructor(body: any) {
    this.name = body.name ?? '';
    this.id = body.id ?? '';
    this.password = body.password ?? '';
    this.email = body.email ?? '';
    this.birthday = body.birthday ?? null;
    this.address = body.address ?? '';
    this.gender = body.gender ?? '';
    this.point = 0;
    this.profile_url = body.profile_url ?? '';
    this.phone = body.phone ?? '';
  }
}
