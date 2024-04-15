import { AuthError } from "@supabase/supabase-js";

export enum Reason {
  Unknown,
  UserBadLogin,
  UserEmailNotConfirmed,
  UserAlreadyRegistered,
  InvalidRefreshToken,
  AdminTokenRequired,
  UserBadMultiple,
  UserBadPhoneNumber,
  UserBadEmailAddress,
  UserBadPassword,
  UserMissingInformation,
  UserTooManyRequests,
}

export function detectReason(error: AuthError): Reason {
  if (!error.message) {
    return Reason.Unknown;
  }

  switch (error.status) {
    case 400:
      if (error.message.includes("Invalid login")) return Reason.UserBadLogin;
      if (error.message.includes("Email not confirmed"))
        return Reason.UserEmailNotConfirmed;
      if (error.message.includes("User already registered"))
        return Reason.UserAlreadyRegistered;
      if (error.message.includes("Invalid Refresh Token"))
        return Reason.InvalidRefreshToken;
      break;
    case 401:
      if (error.message.includes("This endpoint requires a Bearer token"))
        return Reason.AdminTokenRequired;
      if (error.message.includes("Invalid token"))
        return Reason.AdminTokenRequired;
      break;
    case 422:
      if (error.message.includes("Phone") && error.message.includes("Email"))
        return Reason.UserBadMultiple;
      if (error.message.includes("email") && error.message.includes("password"))
        return Reason.UserBadMultiple;
      if (error.message.includes("Phone")) return Reason.UserBadPhoneNumber;
      if (error.message.includes("Email")) return Reason.UserBadEmailAddress;
      if (error.message.includes("Password")) return Reason.UserBadPassword;
      if (error.message.includes("provide"))
        return Reason.UserMissingInformation;
      break;
    case 429:
      return Reason.UserTooManyRequests;
    default:
      return Reason.Unknown;
  }
  return Reason.Unknown;
}

export function getReasonMessage(reason: Reason) {
  switch (reason) {
    case Reason.UserBadLogin:
      return "Usuário ou senha inválidos.";
    case Reason.UserEmailNotConfirmed:
      return "Email não confirmado.";
    case Reason.UserAlreadyRegistered:
      return "Usuário já registrado.";
    case Reason.InvalidRefreshToken:
      return "Token de atualização inválido.";
    case Reason.AdminTokenRequired:
      return "Token de administrador é necessário.";
    case Reason.UserBadMultiple:
      return "Email e telefone inválidos.";
    case Reason.UserBadPhoneNumber:
      return "Telefone inválido.";
    case Reason.UserBadEmailAddress:
      return "Email inválido.";
    case Reason.UserBadPassword:
      return "Senha inválida.";
    case Reason.UserMissingInformation:
      return "Informações faltantes.";
    case Reason.UserTooManyRequests:
      return "Muitas requisições.";
    default:
      return "Erro desconhecido.";
  }
}
