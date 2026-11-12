// Motor de análisis de similitud semántica y base de conocimientos de NAPI
export const analyzeThesisSimilarity = (inputTitle, inputSummary = '', inputTech = '', projects = []) => {
  const clean = (str) =>
    (str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2);

  const stopWords = new Set([
    'para', 'como', 'sobre', 'este', 'esta', 'estos', 'estas', 'sistema', 'plataforma', 
    'aplicacion', 'desarrollo', 'implementacion', 'diseno', 'proyecto', 'tesis', 'titulo',
    'sede', 'maipu', 'inacap', 'chile', 'mediante', 'traves', 'usando', 'utilizando', 'con'
  ]);

  const inputWords = clean(`${inputTitle} ${inputSummary} ${inputTech}`).filter((w) => !stopWords.has(w));

  if (inputWords.length === 0) {
    return {
      similarityScore: 12,
      originalityScore: 88,
      status: 'high_originality',
      level: 'Alta Originalidad',
      matches: [],
      tips: [
        'Ingresa un título más detallado con tecnologías específicas para un cálculo semántico más preciso.',
        'Considera especificar el sector o problema concreto en Sede Maipú o la zona poniente de Santiago.'
      ]
    };
  }

  const scores = projects.map((p) => {
    const projectWords = clean(`${p.title} ${p.summary} ${p.stack.join(' ')}`).filter((w) => !stopWords.has(w));
    
    // Calcular intersección de palabras clave y tecnologías
    const matchedTokens = [];
    inputWords.forEach((word) => {
      if (projectWords.includes(word)) {
        matchedTokens.push(word);
      }
    });

    const techMatches = (p.stack || []).filter((tech) => 
      inputTech.toLowerCase().includes(tech.toLowerCase()) || 
      inputTitle.toLowerCase().includes(tech.toLowerCase())
    );

    // Ponderación de similitud
    const tokenScore = (matchedTokens.length / Math.max(inputWords.length, 3)) * 60;
    const techScore = (techMatches.length / Math.max(p.stack.length, 1)) * 40;
    const combined = Math.min(Math.round(tokenScore + techScore), 96);

    return {
      project: p,
      similarity: combined,
      matchedTokens: Array.from(new Set(matchedTokens)),
      matchedTech: techMatches
    };
  });

  // Ordenar por mayor coincidencia
  scores.sort((a, b) => b.similarity - a.similarity);

  const topMatch = scores[0];
  const maxSimilarity = topMatch ? topMatch.similarity : 10;
  // Similitud calibrada realista
  const finalSimilarity = Math.min(Math.max(maxSimilarity, 8), 94);
  const originalityScore = 100 - finalSimilarity;

  let level = 'Alta Originalidad (Aprobación Recomendada)';
  let status = 'high_originality';
  let badgeColor = '#10B981'; // Green

  if (finalSimilarity >= 65) {
    level = 'Alta Similitud (Riesgo de Duplicidad con Tesis Previas)';
    status = 'high_similarity';
    badgeColor = '#EF4444'; // Red
  } else if (finalSimilarity >= 35) {
    level = 'Similitud Moderada (Requiere Diferenciación Tecnológica)';
    status = 'moderate_similarity';
    badgeColor = '#F59E0B'; // Amber
  }

  // Generar recomendaciones personalizadas
  const tips = [];
  if (finalSimilarity >= 65) {
    tips.push(`Se detectó fuerte coincidencia con la tesis "${topMatch.project.title}" (${topMatch.project.year}).`);
    tips.push('Pivota el enfoque hacia otra industria (ej. Minería, Salud, Agroindustria 4.0 o Pymes locales).');
    tips.push('Incorpora tecnologías diferenciales: Edge AI, arquitectura Serverless, Ciberseguridad Zero-Trust o algoritmos de optimización propios.');
  } else if (finalSimilarity >= 35) {
    tips.push('La temática tiene precedentes válidos en Sede Maipú. Te sugerimos profundizar en la metodología y validación en terreno.');
    tips.push('Agrega componentes de telemetría en tiempo real o integración de modelos LLM locales para mayor impacto.');
    tips.push('Define métricas de impacto cuantitativo (ej. % de ahorro, reducción de latencia, tasa de falsos positivos).');
  } else {
    tips.push('¡Excelente propuesta! Es un tema con bajísima duplicidad en el histórico de INACAP Sede Maipú.');
    tips.push('Asegura la factibilidad técnica y los accesos a datos o laboratorios requeridos para el pilotaje.');
    tips.push('Recuerda redactar el marco teórico bajo la norma APA 7ma edición requerida por INACAP.');
  }

  const topMatches = scores.filter((s) => s.similarity >= 25).slice(0, 3);

  return {
    similarityScore: finalSimilarity,
    originalityScore,
    status,
    level,
    badgeColor,
    topMatch: topMatch && topMatch.similarity >= 25 ? topMatch : null,
    matches: topMatches,
    tips
  };
};

export const QUICK_PROMPTS = [
  {
    id: 'similitud',
    label: '🔍 Analizar idea de tesis',
    text: 'Quiero evaluar la similitud de mi propuesta de tesis: "Sistema de gestión hospitalaria con IA y React para centros médicos de Maipú"'
  },
  {
    id: 'ideas-inf',
    label: '💡 Ideas para Informática',
    text: '¿Qué temáticas innovadoras y poco exploradas recomiendas para Ingeniería en Informática en 2026?'
  },
  {
    id: 'ideas-auto',
    label: '🤖 Ideas para Automatización / Robótica',
    text: 'Recomiéndame ideas de proyectos de título para el área de Automatización y Robótica en Sede Maipú.'
  },
  {
    id: 'normativa',
    label: '📋 Estructura de Anteproyecto INACAP',
    text: '¿Cuáles son las secciones obligatorias que debe tener el documento de anteproyecto de título en INACAP?'
  }
];

export const NAPI_KNOWLEDGE_BASE = {
  greetings: [
    '¡Hola! Soy NAPI (Navegador de Archivos de Proyectos Institucionales), tu copiloto de titulación en INACAP Sede Maipú.',
    'Estoy entrenado con el histórico de proyectos de título de nuestra sede para ayudarte a diseñar una propuesta 100% original, viable y con alto impacto tecnológico.',
    '¿Tienes un título en mente o necesitas inspiración para tu carrera?'
  ],
  sectionsHelp: `Las secciones fundamentales del Anteproyecto de Título INACAP son:
1. **Portada Institucional y Datos Generales** (Carrera, Sede Maipú, Autores, Profesor Guía).
2. **Definición del Problema u Oportunidad** (Contexto real y justificación).
3. **Objetivos** (1 Objetivo General y 3-4 Objetivos Específicos medibles).
4. **Alcance y Limitaciones** (Qué incluye y qué queda fuera del desarrollo).
5. **Estado del Arte / Marco Teórico** (Revisión de soluciones existentes y tecnologías a usar).
6. **Metodología de Trabajo** (Scrum, Cascada, Design Thinking, etc.).
7. **Carta Gantt y Planificación de Sprints**.
8. **Presupuesto y Factibilidad Técnica/Económica**.`,
  careerIdeas: {
    'informatica': [
      '**Detección de Anomalías en Redes Industriales** con autoencoders en microcontroladores Edge.',
      '**Sistema RAG (Retrieval-Augmented Generation)** privado para asistencia a pacientes crónicos en CESFAM de Maipú.',
      '**Plataforma de Trazabilidad Logística con Smart Contracts** para cooperativas agrícolas de la Región Metropolitana.',
      '**Visión Computacional para Inspección de Soldaduras** en líneas de producción automatizadas.'
    ],
    'automatizacion': [
      '**Gemelo Digital de una celda de manufactura flexible** integrada con PLC Siemens y software Ignition SCADA.',
      '**Robot móvil autónomo (AMR) con navegación SLAM LiDAR** para transporte de insumos en bodegas de Maipú.',
      '**Sistema de control predictivo multivariable (MPC)** para optimización de tratamiento de aguas residuales.'
    ]
  }
};
