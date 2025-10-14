import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsPhoneNumber('EC', { message: 'Phone must be a valid Ecuadorian number' })
  phone!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;
}
