**url**/api/auth/register
{
name: string
email: string
password: string
repeatPassword: string
}

email verification email required _verificationCode_ to replace in js
if not contain this code will throw problem

**url**/api/auth/email/confirm
{
email: string
otpCode: string
}

**url**/api/auth/email/refresh
{
email: string
}
_verificationCode_

**url**/api/auth/login
{
email: string
password: string
rememberMe: boolean
}

