import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // Add other fields here
}
