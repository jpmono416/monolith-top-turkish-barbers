import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Validate,
  ValidatorConstraint,
  type ValidationArguments,
  type ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'hasContactMethod', async: false })
class HasContactMethodConstraint implements ValidatorConstraintInterface {
  validate(_value: unknown, args: ValidationArguments): boolean {
    const dto = args.object as CreateBookingRequestDto;
    const phone = dto.customerPhone?.trim();
    const email = dto.customerEmail?.trim();
    return Boolean(phone || email);
  }

  defaultMessage(): string {
    return 'At least one contact method (phone or email) is required';
  }
}

export class CreateBookingRequestDto {
  @IsNotEmpty()
  @IsDateString()
  @MaxLength(32)
  preferredDate!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Validate(HasContactMethodConstraint)
  customerName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Matches(/^\+?[\d\s\-()]{7,20}$/, {
    message: 'customerPhone must be a valid phone number',
  })
  customerPhone?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  customerEmail?: string;
}
