import type { PSEOContentBlock } from "../pseoContent";

type ContentOverrideMap = Record<string, Partial<PSEOContentBlock>>;

// Only featured languages (en, es, de, fr, pt, it) get full translations
// Others use English with interpolated language names
export const LOCALE_OVERRIDES: ContentOverrideMap = {
  en: {
    // English is the default, no overrides needed
  },
  es: {
    pageTitle: "Calendario {{year}} Minimalista para Imprimir | Minimal",
    metaDescription:
      "Descarga tu calendario {{year}} imprimible. Diseno minimalista en formato {{format}}. Disponible en mas de 30 idiomas.",
    h1: "Calendario {{year}} Minimalista para Imprimir",
    bullets: [
      "Diseno minimalista limpio y sin distracciones",
      "Disponible en tamanos A4, A5 y Carta",
      "Orientaciones vertical y horizontal",
      "Vistas mensuales y anuales incluidas",
      "Elige inicio de semana lunes o domingo",
    ],
    bestFor: "Ideal para minimalistas que buscan una solucion de planificacion limpia",
    cta: "Obtener Calendario",
  },
  de: {
    pageTitle: "{{year}} Minimalistischer Druckbarer Kalender | Minimal",
    metaDescription:
      "Laden Sie Ihren druckbaren {{year}} Kalender herunter. Minimalistisches Design im {{format}}-Format. In uber 30 Sprachen verfugbar.",
    h1: "{{year}} Minimalistischer Druckbarer Kalender",
    bullets: [
      "Sauberes, ablenkungsfreies minimalistisches Design",
      "Verfugbar in A4, A5 und US Letter",
      "Hoch- und Querformat",
      "Monats- und Jahresansichten enthalten",
      "Wochenbeginn Montag oder Sonntag wahlbar",
    ],
    bestFor: "Ideal fur Minimalisten, die eine saubere Planungslosung suchen",
    cta: "Kalender Herunterladen",
  },
  fr: {
    pageTitle: "Calendrier {{year}} Minimaliste Imprimable | Minimal",
    metaDescription:
      "Telechargez votre calendrier {{year}} imprimable. Design minimaliste au format {{format}}. Disponible en plus de 30 langues.",
    h1: "Calendrier {{year}} Minimaliste Imprimable",
    bullets: [
      "Design minimaliste epure et sans distraction",
      "Disponible en formats A4, A5 et Lettre US",
      "Orientations portrait et paysage",
      "Vues mensuelles et annuelles incluses",
      "Choix du debut de semaine: lundi ou dimanche",
    ],
    bestFor: "Ideal pour les minimalistes recherchant une solution de planification epuree",
    cta: "Obtenir le Calendrier",
  },
  pt: {
    pageTitle: "Calendario {{year}} Minimalista para Imprimir | Minimal",
    metaDescription:
      "Baixe seu calendario {{year}} imprimivel. Design minimalista em formato {{format}}. Disponivel em mais de 30 idiomas.",
    h1: "Calendario {{year}} Minimalista para Imprimir",
    bullets: [
      "Design minimalista limpo e sem distracoes",
      "Disponivel em tamanhos A4, A5 e Carta",
      "Orientacoes retrato e paisagem",
      "Visualizacoes mensais e anuais incluidas",
      "Escolha inicio da semana: segunda ou domingo",
    ],
    bestFor: "Ideal para minimalistas que buscam uma solucao de planejamento limpa",
    cta: "Obter Calendario",
  },
  it: {
    pageTitle: "Calendario {{year}} Minimalista Stampabile | Minimal",
    metaDescription:
      "Scarica il tuo calendario {{year}} stampabile. Design minimalista in formato {{format}}. Disponibile in oltre 30 lingue.",
    h1: "Calendario {{year}} Minimalista Stampabile",
    bullets: [
      "Design minimalista pulito e senza distrazioni",
      "Disponibile in formati A4, A5 e Lettera US",
      "Orientamenti verticale e orizzontale",
      "Visualizzazioni mensili e annuali incluse",
      "Scegli inizio settimana: lunedi o domenica",
    ],
    bestFor: "Ideale per minimalisti che cercano una soluzione di pianificazione pulita",
    cta: "Ottieni Calendario",
  },
};
