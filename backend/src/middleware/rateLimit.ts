import rateLimit from 'express-rate-limit'

// Allgemeines Limit für alle API-Routen
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
})

// Strenges Limit für die AI-gestützte Dokumentgenerierung (kostenpflichtige Anthropic-Calls)
export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 Stunde
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Limit für KI-Dokumentgenerierung erreicht. Bitte versuchen Sie es in einer Stunde erneut.' },
})
