import { SurveyResponse } from "@/hooks/useSurveyData";

export interface CategoryAnalysis {
  category: string;
  average: number;
  responses: number;
  questions: Array<{
    question: string;
    average: number;
    responses: number;
  }>;
}

export interface NPSAnalysis {
  promoters: number;
  passives: number;
  detractors: number;
  total: number;
  score: number;
}

export interface FeedbackAnalysis {
  id: string;
  content: string;
  category: string;
  sentiment?: "positive" | "neutral" | "negative";
}

export function calculateCategoryAverages(data: SurveyResponse[]): CategoryAnalysis[] {
  if (!data.length) return [];

  const validResponses = data.filter(response => response.submission_id);

  const categories = [
    {
      name: "Metodologia de Ensino",
      questions: [
        { key: "q1_a_metodologia_de_ensino_utilizada_no_curso_estimulou_a_mi", label: "Estimulou participação" },
        { key: "q2_a_metodologia_de_ensino_utilizada_no_curso_facilitou_a_ap", label: "Facilitou aprendizagem" }
      ]
    },
    {
      name: "Avaliação do Professor",
      questions: [
        { key: "q1_organização_planejamento_do_curso", label: "Organização e planejamento" },
        { key: "q2_relacionamento_com_a_turma", label: "Relacionamento com turma" },
        { key: "q3_domínio_do_assunto_conhecimento", label: "Domínio do assunto" },
        { key: "q4_aplicabilidade_dos_conteúdos_abordados_em_sala", label: "Aplicabilidade dos conteúdos" },
        { key: "q5_didática_e_comunicação", label: "Didática e comunicação" },
        { key: "q6_pontualidade_do_professor", label: "Pontualidade" }
      ]
    },
    {
      name: "Infraestrutura",
      questions: [
        { key: "q1_equipe_de_apoio", label: "Equipe de apoio" },
        { key: "q2_estrutura_da_sala_de_aula", label: "Estrutura da sala" },
        { key: "q3_conforto_e_climatização_do_ambiente", label: "Conforto e climatização" }
      ]
    },
    {
      name: "Autoavaliação",
      questions: [
        { key: "q1_minha_presença_e_participação_no_curso", label: "Presença e participação" },
        { key: "q2_minha_postura_acadêmica_perante_a_turma", label: "Postura acadêmica" },
        { key: "q3_uso_de_aparelhos_eletrônicos", label: "Uso adequado de dispositivos" },
        { key: "q4_meu_nível_de_aprendizado_e_autodesenvolvimento", label: "Nível de aprendizado" }
      ]
    }
  ];

  return categories.map(category => {
    const questionAnalysis = category.questions.map(question => {
      const scores = validResponses
        .map(response => (response as any)[question.key])
        .filter(score => score !== null && score !== undefined && !isNaN(score));
      
      const average = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
      
      return {
        question: question.label,
        average: Math.round(average * 100) / 100,
        responses: scores.length
      };
    });

    const categoryAverage = questionAnalysis.length > 0 
      ? questionAnalysis.reduce((sum, q) => sum + q.average, 0) / questionAnalysis.length 
      : 0;

    const totalResponses = questionAnalysis.length > 0 
      ? Math.max(...questionAnalysis.map(q => q.responses)) 
      : 0;

    return {
      category: category.name,
      average: Math.round(categoryAverage * 100) / 100,
      responses: totalResponses,
      questions: questionAnalysis
    };
  });
}

export function calculateNPS(data: SurveyResponse[]): NPSAnalysis {
  // Using the recommendation probability question
  const npsScores = data
    .map(response => response.q2_em_uma_escala_de_0_a_10_qual_é_a_probabilidade_de_você_re)
    .filter(score => score !== null && score !== undefined && !isNaN(score));

  const total = npsScores.length;
  const promoters = npsScores.filter(score => score >= 9).length;
  const passives = npsScores.filter(score => score >= 7 && score <= 8).length;
  const detractors = npsScores.filter(score => score <= 6).length;

  const score = total > 0 ? Math.round(((promoters - detractors) / total) * 100) : 0;

  return {
    promoters,
    passives,
    detractors,
    total,
    score
  };
}

export function extractFeedbacks(data: SurveyResponse[]): FeedbackAnalysis[] {
  const feedbacks: FeedbackAnalysis[] = [];

  data.forEach((response, index) => {
    // Methodology feedback
    if (response.q3_escreva_seu_feedback_sobre_a_metodologia_de_ensino_opcion) {
      feedbacks.push({
        id: `${response.submission_id}-methodology`,
        content: response.q3_escreva_seu_feedback_sobre_a_metodologia_de_ensino_opcion,
        category: "Metodologia",
        sentiment: determineSentiment(response.q3_escreva_seu_feedback_sobre_a_metodologia_de_ensino_opcion)
      });
    }

    // Professor feedback
    if (response.q7_escreva_seu_feedback_sobre_oa_professora) {
      feedbacks.push({
        id: `${response.submission_id}-professor`,
        content: response.q7_escreva_seu_feedback_sobre_oa_professora,
        category: "Professor",
        sentiment: determineSentiment(response.q7_escreva_seu_feedback_sobre_oa_professora)
      });
    }

    // Self-assessment feedback
    if (response.q5_escreva_seu_autofeedback_sobre_sua_participação) {
      feedbacks.push({
        id: `${response.submission_id}-self`,
        content: response.q5_escreva_seu_autofeedback_sobre_sua_participação,
        category: "Autoavaliação",
        sentiment: determineSentiment(response.q5_escreva_seu_autofeedback_sobre_sua_participação)
      });
    }

    // Improvement suggestions
    if (response.q4_como_podemos_melhorar) {
      feedbacks.push({
        id: `${response.submission_id}-improvement`,
        content: response.q4_como_podemos_melhorar,
        category: "Sugestões de Melhoria",
        sentiment: "neutral"
      });
    }
  });

  return feedbacks.filter(feedback => feedback.content.trim().length > 0);
}

function determineSentiment(text: string): "positive" | "neutral" | "negative" {
  const positiveWords = [
    "excelente", "ótimo", "bom", "muito bom", "parabéns", "sucesso", 
    "satisfeito", "recomendo", "perfeito", "maravilhoso", "incrível"
  ];
  
  const negativeWords = [
    "ruim", "péssimo", "horrível", "problema", "dificuldade", "melhorar",
    "insatisfeito", "não gostei", "terrível", "decepcionante"
  ];

  const lowerText = text.toLowerCase();
  
  const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

  if (positiveCount > negativeCount) return "positive";
  if (negativeCount > positiveCount) return "negative";
  return "neutral";
}

export function getOverallSatisfaction(data: SurveyResponse[]): number {
  const categories = calculateCategoryAverages(data);
  if (categories.length === 0) return 0;
  
  const overallAverage = categories.reduce((sum, category) => sum + category.average, 0) / categories.length;
  return Math.round(overallAverage * 100) / 100;
}

export function getCourseInfo(data: SurveyResponse[]) {
  if (data.length === 0) {
    return {
      name: "Nenhum curso encontrado",
      instructor: "N/A",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      totalResponses: 0,
      completionRate: 0
    };
  }

  const firstResponse = data[0];
  const totalResponses = data.filter(r => r.submission_id).length;
  
  return {
    name: firstResponse.qual_curso_você_deseja_avaliar || "Curso não identificado",
    instructor: firstResponse.selecione_oa_professora_responsável_pelo_curso || "Instrutor não identificado",
    startDate: firstResponse.data_de_início_do_curso || new Date().toISOString(),
    endDate: firstResponse.data_de_término_do_curso || new Date().toISOString(),
    totalResponses,
    completionRate: Math.round((totalResponses / Math.max(totalResponses, 1)) * 100)
  };
}