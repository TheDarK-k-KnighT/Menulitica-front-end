export class LoginModel {
    email: string;
    password: string;
}

export class ForgotPasswordModel {
    Email: string;
}

export class ResetPasswordModel {
    VerificationCode: string;
    ConfirmPassword: string;
    NewPassword: string;
    UserId: number;
}

export class SignUpModel{
    restaurant_name: string;
    restaurant_owner_name: string;
    restaurant_address: string;
    restaurant_pancard: string;
    number_of_tables: number;
    number_of_seats: number;
    user_subscription: string;
    user_subscription_expiry: string;
    payment: string;
    mobile_no: number;
    email: string;
    password: string;
}