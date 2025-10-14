import { IsBoolean, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateTechnicianDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  specialty!: string;

  @IsInt()
  @Min(0)
  experienceYears!: number;

  @IsBoolean()
  active: boolean;
}
